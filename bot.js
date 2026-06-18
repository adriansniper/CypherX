const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

// Initialize WhatsApp client
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

// Initialize Anthropic Claude client
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY
});

// Store conversation history per chat
const conversationHistory = new Map();

// QR Code generation
client.on('qr', qr => {
  console.log('\n📱 Scan this QR code with WhatsApp to login:');
  qrcode.generate(qr, { small: true });
});

// Bot ready
client.on('ready', () => {
  console.log('✅ CypherX bot is ready!');
});

// Message handler
client.on('message_create', async msg => {
  try {
    // Don't respond to own messages
    if (msg.fromMe) return;

    const chatId = msg.from;
    const userMessage = msg.body.trim();

    // Initialize conversation history if new chat
    if (!conversationHistory.has(chatId)) {
      conversationHistory.set(chatId, []);
    }

    // Add user message to history
    const history = conversationHistory.get(chatId);
    history.push({
      role: 'user',
      content: userMessage
    });

    // Keep conversation history limited (last 10 messages)
    if (history.length > 10) {
      history.shift();
    }

    // Show typing indicator
    await client.sendPresenceAvailable();
    await msg.getChat().then(chat => chat.sendSeen());

    // Get response from Claude
    console.log(`📨 Message from ${msg.author || msg.from}: ${userMessage}`);

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: 'You are CypherX, a helpful WhatsApp assistant. Respond concisely and naturally. Keep responses under 160 characters when possible to fit WhatsApp formatting.',
      messages: history
    });

    const botReply = response.content[0].text;

    // Add bot response to history
    history.push({
      role: 'assistant',
      content: botReply
    });

    // Send response
    await msg.reply(botReply);
    console.log(`✅ Reply sent: ${botReply}\n`);

  } catch (error) {
    console.error('❌ Error processing message:', error);
    try {
      await msg.reply('Sorry, I encountered an error. Please try again later.');
    } catch (replyError) {
      console.error('Failed to send error message:', replyError);
    }
  }
});

// Handle disconnection
client.on('disconnected', reason => {
  console.log('⚠️ WhatsApp disconnected:', reason);
});

// Handle authentication failure
client.on('auth_failure', msg => {
  console.error('❌ Authentication failed:', msg);
});

// Start the bot
client.initialize();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n\n👋 Shutting down CypherX...');
  await client.destroy();
  process.exit(0);
});
