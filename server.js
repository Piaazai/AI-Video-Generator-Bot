import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { telegramBot } from './bot/bot.js';
import { callbackRouter } from './routes/callback.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const CALLBACK_BASE_URL = process.env.CALLBACK_BASE_URL;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Webhook endpoint for Telegram
app.post('/webhook', (req, res) => {
  try {
    telegramBot.processUpdate(req.body);
    res.sendStatus(200);
  } catch (error) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] Error processing webhook update:`, error);
    res.sendStatus(200); // Always return 200 to Telegram to avoid retries
  }
});

// Callback endpoint for kie.ai
app.use('/api/callback', callbackRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ERROR:`, err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// Start server and setup webhook if in production
app.listen(PORT, async () => {
  console.log(`[${new Date().toISOString()}] Server started on port ${PORT}`);
  
  // Setup webhook if CALLBACK_BASE_URL is available (production mode)
  if (CALLBACK_BASE_URL) {
    try {
      const webhookUrl = `${CALLBACK_BASE_URL}/webhook`;
      // Delete existing webhook first to avoid conflicts
      await telegramBot.deleteWebHook();
      // Set new webhook
      await telegramBot.setWebHook(webhookUrl);
      console.log(`[${new Date().toISOString()}] Webhook set to: ${webhookUrl}`);
      console.log(`[${new Date().toISOString()}] Bot is running in Webhook mode`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Error setting webhook:`, error);
      console.log(`[${new Date().toISOString()}] Bot will continue but may not receive updates`);
    }
  } else {
    console.log(`[${new Date().toISOString()}] Bot is running in Polling mode`);
    console.log(`[${new Date().toISOString()}] Set CALLBACK_BASE_URL to enable Webhook mode`);
  }
  
  console.log(`[${new Date().toISOString()}] Telegram bot initialized`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log(`[${new Date().toISOString()}] SIGTERM received, shutting down gracefully`);
  process.exit(0);
});

