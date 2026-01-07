import express from 'express';
import { bot } from '../bot/bot.js';
import { getUserState, updateUserState, saveGeneratedVideo, getYouTubeChannel } from '../db/database.js';
import { createSupabaseClient } from '../db/supabase.js';
import { getYouTubeUploadKeyboard, getMainKeyboard } from '../bot/messages.js';

const router = express.Router();
const supabase = createSupabaseClient();

// No longer needed - polling is removed

// Handle kie.ai callback
router.post('/', async (req, res) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Received callback from kie.ai:`, JSON.stringify(req.body, null, 2));

  try {
    // Extract data from req.body.data (callback structure)
    const callbackData = req.body.data || req.body;
    const { taskId, state, resultJson, failCode, failMsg } = callbackData;

    if (!taskId) {
      console.error(`[${timestamp}] Callback missing taskId`);
      return res.status(400).json({ error: 'Missing taskId' });
    }

    // Find user by taskId
    const { data: tasks, error } = await supabase
      .from('user_tasks')
      .select('*')
      .eq('task_id', taskId)
      .limit(1);

    if (error) {
      console.error(`[${timestamp}] Database error finding task:`, error);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!tasks || tasks.length === 0) {
      console.log(`[${timestamp}] Task ${taskId} not found in database`);
      return res.status(404).json({ error: 'Task not found' });
    }

    const task = tasks[0];
    const userId = task.user_id;
    const chatId = task.chat_id;

    console.log(`[${timestamp}] Processing callback for task ${taskId}, user ${userId}, state: ${state}`);

    // Get loading message ID from task result_json BEFORE updating it
    // (loadingMessageId is stored temporarily in result_json before callback arrives)
    let loadingMessageId = null;
    try {
      if (task.result_json) {
        const tempData = JSON.parse(task.result_json);
        // Check if it's the temporary data with loadingMessageId
        if (tempData.loadingMessageId) {
          loadingMessageId = tempData.loadingMessageId;
          console.log(`[${timestamp}] Found loading message ID: ${loadingMessageId} for task ${taskId}`);
        }
      }
    } catch (e) {
      // Ignore if result_json is not JSON or doesn't have loadingMessageId
      // It might already be the actual result JSON from a previous callback
    }

    // Update task status (this will replace result_json with actual result)
    await supabase
      .from('user_tasks')
      .update({
        state: state,
        result_json: resultJson,
        fail_code: failCode,
        fail_msg: failMsg,
        updated_at: new Date().toISOString()
      })
      .eq('task_id', taskId);

    // Handle different states
    if (state === 'success') {
      let result = {};
      try {
        result = JSON.parse(resultJson || '{}');
      } catch (parseError) {
        console.error(`[${timestamp}] Error parsing resultJson for task ${taskId}:`, parseError);
        result = {};
      }
      const videoUrl = result.resultUrls?.[0];

      if (videoUrl) {
        console.log(`[${timestamp}] Task ${taskId} completed successfully, sending video to user ${userId}`);
        
        // Get user state to get prompt for library
        const userState = await getUserState(supabase, userId);
        const prompt = userState?.prompt || null;
        
        // Save video to library
        try {
          await saveGeneratedVideo(supabase, userId, taskId, videoUrl, prompt);
          console.log(`[${timestamp}] Video saved to library: taskId ${taskId}`);
        } catch (saveError) {
          console.error(`[${timestamp}] Error saving video to library:`, saveError);
          // Continue even if save fails
        }
        
        // Check if YouTube is configured
        const youtubeChannel = await getYouTubeChannel(supabase, userId);
        const hasYouTube = youtubeChannel !== null;
        
        // Replace loading message (hourglass emoji) with video
        if (loadingMessageId) {
          try {
            // Delete the loading message
            await bot.deleteMessage(chatId, loadingMessageId);
            console.log(`[${timestamp}] Deleted loading message ${loadingMessageId} for task ${taskId}`);
          } catch (deleteError) {
            console.warn(`[${timestamp}] Could not delete loading message ${loadingMessageId}:`, deleteError.message);
            // Continue even if deletion fails
          }
        }
        
        // Send success message and video
        await bot.sendMessage(chatId, '✅ تم توليد الفيديو بنجاح!');
        const videoMsg = await bot.sendVideo(chatId, videoUrl, hasYouTube ? getYouTubeUploadKeyboard() : undefined);

        // Reset user state (but keep taskId for reference)
        if (userState) {
          userState.userId = userId.toString(); // Ensure userId is set
          userState.state = 'idle';
          userState.taskId = taskId; // Keep taskId for potential YouTube upload
          await updateUserState(supabase, userState, userId);
        }
      } else {
        console.error(`[${timestamp}] No video URL in result for task ${taskId}`);
        await bot.sendMessage(chatId, '❌ تم توليد الفيديو لكن لم يتم العثور على رابط الفيديو.', getMainKeyboard());
        
        // Reset user state
        const userState = await getUserState(supabase, userId);
        if (userState) {
          userState.userId = userId.toString();
          userState.state = 'idle';
          userState.taskId = null;
          await updateUserState(supabase, userState, userId);
        }
      }
    } else if (state === 'fail') {
      console.error(`[${timestamp}] Task ${taskId} failed: ${failMsg}`);
      
      // Replace loading message with error message
      if (loadingMessageId) {
        try {
          await bot.editMessageText('❌ فشل توليد الفيديو.', {
            chat_id: chatId,
            message_id: loadingMessageId
          });
        } catch (editError) {
          // If edit fails, delete and send new message
          try {
            await bot.deleteMessage(chatId, loadingMessageId);
          } catch (deleteError) {
            // Ignore
          }
          
          let errorMessage = '❌ فشل توليد الفيديو.';
          if (failMsg) {
            errorMessage += `\n\nالتفاصيل:\n${failMsg}`;
          }
          if (failCode) {
            errorMessage += `\n\nرمز الخطأ: ${failCode}`;
          }
          await bot.sendMessage(chatId, errorMessage, getMainKeyboard());
        }
      } else {
        let errorMessage = '❌ فشل توليد الفيديو.';
        if (failMsg) {
          errorMessage += `\n\nالتفاصيل:\n${failMsg}`;
        }
        if (failCode) {
          errorMessage += `\n\nرمز الخطأ: ${failCode}`;
        }
        await bot.sendMessage(chatId, errorMessage, getMainKeyboard());
      }

      // Reset user state
      const userState = await getUserState(supabase, userId);
      if (userState) {
        userState.userId = userId.toString(); // Ensure userId is set
        userState.state = 'idle';
        userState.taskId = null;
        await updateUserState(supabase, userState, userId);
      }
    }

    res.json({ success: true });
  } catch (error) {
    const errorTimestamp = new Date().toISOString();
    console.error(`[${errorTimestamp}] Error processing callback:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as callbackRouter };

