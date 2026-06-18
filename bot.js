const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const Anthropic = require('@anthropic-ai/sdk');
const { handleJokeCommand } = require('./handlers/jokeHandler');
const { handleCommand, sendHelpMenu, sendBotStatus } = require('./handlers/commandRouter');
const { handleAICommand } = require('./handlers/aiCommands');
const { handleFunCommand } = require('./handlers/funCommands');
const { handleToolCommand } = require('./handlers/toolCommands');
const { handleSearchCommand } = require('./handlers/searchCommands');
const { handleGroupCommand } = require('./handlers/groupCommands');
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

// Bot configuration
const BOT_PREFIX = process.env.BOT_PREFIX || '.';
const OWNER_NUMBER = '+254759169078';

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
  console.log(`🔧 Prefix: ${BOT_PREFIX}`);
  console.log(`📞 Owner: ${OWNER_NUMBER}`);
});

// Message handler
client.on('message_create', async msg => {
  try {
    // Don't respond to own messages
    if (msg.fromMe) return;

    const messageBody = msg.body.trim();
    const prefix = BOT_PREFIX;

    // Check if message starts with prefix
    if (!messageBody.startsWith(prefix)) return;

    const command = messageBody.slice(prefix.length).trim().split(' ')[0].toLowerCase();

    console.log(`📨 Command from ${msg.author || msg.from}: ${command}`);

    // Show typing indicator
    await msg.getChat().then(chat => chat.sendSeen());

    let handled = false;

    // Route to appropriate handler
    if (command === 'joke' || command === 'jokes' || command === 'types') {
      handled = await handleJokeCommand(msg, messageBody);
    } else if (command === 'gpt' || command === 'ai' || command === 'chat' || command === 'analyze' || command === 'translate' || command === 'summarize' || command === 'code') {
      handled = await handleAICommand(msg, prefix);
    } else if (command === 'fact' || command === 'quote' || command === 'trivia' || command === 'meme') {
      handled = await handleFunCommand(msg, prefix);
    } else if (command === 'qr' || command === 'password' || command === 'genpass' || command === 'weather' || command === 'calc' || command === 'calculate' || command === 'base64') {
      handled = await handleToolCommand(msg, prefix);
    } else if (command === 'define' || command === 'definition' || command === 'lyrics') {
      handled = await handleSearchCommand(msg, prefix);
    } else if (command === 'members' || command === 'totalmembers' || command === 'groupid' || command === 'link') {
      handled = await handleGroupCommand(msg, prefix);
    } else if (command === 'help' || command === 'menu') {
      handled = await sendHelpMenu(msg);
    } else if (command === 'status') {
      handled = await sendBotStatus(msg);
    } else if (command === 'ping') {
      const startTime = Date.now();
      const pongMsg = await msg.reply('🏓 Pong!');
      const endTime = Date.now();
      const latency = endTime - startTime;
      await pongMsg.edit(`🏓 Pong! (${latency}ms)`);
      handled = true;
    } else if (command === 'echo') {
      const echoText = messageBody.slice(prefix.length + 4).trim();
      await msg.reply(echoText || 'Please provide text to echo');
      handled = true;
    }

    if (!handled) {
      await msg.reply(`❌ Unknown command: ${command}\nSend ${prefix}help for available commands`);
    }

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
