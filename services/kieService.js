import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const KIE_API_URL = process.env.KIE_API_URL || 'https://api.kie.ai';
const KIE_API_KEY = process.env.KIE_API_KEY;
const CALLBACK_BASE_URL = process.env.CALLBACK_BASE_URL;

if (!KIE_API_KEY) {
  console.error(`[${new Date().toISOString()}] ERROR: KIE_API_KEY is not set`);
}

// Create axios instance with default config
const kieApi = axios.create({
  baseURL: KIE_API_URL,
  headers: {
    'Authorization': `Bearer ${KIE_API_KEY}`,
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

// Request interceptor for logging
kieApi.interceptors.request.use(
  (config) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] KIE API Request: ${config.method.toUpperCase()} ${config.url}`);
    if (config.data) {
      console.log(`[${timestamp}] Request data:`, JSON.stringify(config.data, null, 2));
    }
    return config;
  },
  (error) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] KIE API Request Error:`, error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging
kieApi.interceptors.response.use(
  (response) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] KIE API Response: ${response.status} ${response.config.url}`);
    if (response.data) {
      console.log(`[${timestamp}] Response data:`, JSON.stringify(response.data, null, 2));
    }
    return response;
  },
  (error) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] KIE API Response Error:`, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Create a video generation task
 */
export async function startVideoGeneration(userState, supabase) {
  const timestamp = new Date().toISOString();
  
  if (!KIE_API_KEY) {
    throw new Error('KIE_API_KEY is not configured');
  }

  if (!userState.videoUrl || !userState.imageUrl || !userState.prompt) {
    throw new Error('Missing required data: videoUrl, imageUrl, or prompt');
  }

  // Always include callBackUrl if CALLBACK_BASE_URL is set
  const callBackUrl = CALLBACK_BASE_URL ? `${CALLBACK_BASE_URL}/api/callback` : undefined;

  const requestData = {
    model: 'kling-2.6/motion-control',
    input: {
      prompt: userState.prompt,
      input_urls: [userState.imageUrl],
      video_urls: [userState.videoUrl],
      character_orientation: 'video', // Required: 'image' (max 10s) or 'video' (max 30s)
      mode: '720p' // Can be changed to '1080p' for higher quality
    }
  };

  // Add callBackUrl if available (required for production)
  if (callBackUrl) {
    requestData.callBackUrl = callBackUrl;
  }

  console.log(`[${timestamp}] Creating video generation task for user ${userState.userId}`);

  try {
    const response = await kieApi.post('/api/v1/jobs/createTask', requestData);
    
    if (response.data.code !== 200) {
      const errorMsg = response.data.message || 'Unknown error';
      console.error(`[${timestamp}] KIE API returned error: ${errorMsg}`);
      throw new Error(`KIE API Error: ${errorMsg}`);
    }

    const taskId = response.data.data?.taskId;
    if (!taskId) {
      throw new Error('No taskId returned from KIE API');
    }

    console.log(`[${timestamp}] Task created successfully: ${taskId}`);
    return taskId;
  } catch (error) {
    const errorTimestamp = new Date().toISOString();
    if (error.response) {
      // API responded with error
      const errorData = error.response.data;
      const errorMessage = errorData?.message || error.message;
      const errorCode = errorData?.code;
      
      console.error(`[${errorTimestamp}] KIE API Error Response:`, {
        code: errorCode,
        message: errorMessage,
        data: errorData
      });
      
      throw new Error(`KIE API Error (${errorCode}): ${errorMessage}`);
    } else if (error.request) {
      // Request made but no response
      console.error(`[${errorTimestamp}] KIE API No Response:`, error.message);
      throw new Error(`Network error: ${error.message}`);
    } else {
      // Error setting up request
      console.error(`[${errorTimestamp}] KIE API Request Setup Error:`, error.message);
      throw error;
    }
  }
}

/**
 * Check task status
 */
export async function checkTaskStatus(taskId) {
  const timestamp = new Date().toISOString();
  
  if (!KIE_API_KEY) {
    throw new Error('KIE_API_KEY is not configured');
  }

  console.log(`[${timestamp}] Checking task status: ${taskId}`);

  try {
    const response = await kieApi.get('/api/v1/jobs/recordInfo', {
      params: { taskId }
    });

    if (response.data.code !== 200) {
      const errorMsg = response.data.message || 'Unknown error';
      console.error(`[${timestamp}] KIE API returned error: ${errorMsg}`);
      throw new Error(`KIE API Error: ${errorMsg}`);
    }

    const data = response.data.data;
    if (!data) {
      throw new Error('No data returned from KIE API');
    }

    return {
      taskId: data.taskId,
      state: data.state,
      resultJson: data.resultJson,
      failCode: data.failCode,
      failMsg: data.failMsg,
      completeTime: data.completeTime,
      createTime: data.createTime,
      costTime: data.costTime
    };
  } catch (error) {
    const errorTimestamp = new Date().toISOString();
    if (error.response) {
      const errorData = error.response.data;
      const errorMessage = errorData?.message || error.message;
      const errorCode = errorData?.code;
      
      console.error(`[${errorTimestamp}] KIE API Error Response:`, {
        code: errorCode,
        message: errorMessage
      });
      
      throw new Error(`KIE API Error (${errorCode}): ${errorMessage}`);
    } else {
      console.error(`[${errorTimestamp}] Error checking task status:`, error.message);
      throw error;
    }
  }
}

