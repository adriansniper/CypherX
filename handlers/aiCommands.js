/**
 * CypherX AI Commands Handler
 * Integrates with Claude AI for various AI-powered features
 */

const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY
});

// Store conversation history per chat
const conversationHistory = new Map();

/**
 * Handle AI chat command
 * @param {Object} msg - WhatsApp message object
 * @param {string} prefix - Command prefix
 * @returns {Promise<boolean>} True if command was handled
 */
async function handleAICommand(msg, prefix) {
  const messageBody = msg.body;
  const command = messageBody.slice(prefix.length).trim();
  const commandName = command.split(' ')[0].toLowerCase();

  try {
    if (commandName === 'gpt' || commandName === 'ai' || commandName === 'chat') {
      const userPrompt = command.slice(commandName.length).trim();
      
      if (!userPrompt) {
        await msg.reply('❌ Please provide a prompt. Example: .gpt What is AI?');
        return true;
      }

      // Show typing indicator
      await msg.getChat().then(chat => chat.sendSeen());

      const chatId = msg.from;
      
      // Initialize conversation history if new chat
      if (!conversationHistory.has(chatId)) {
        conversationHistory.set(chatId, []);
      }

      const history = conversationHistory.get(chatId);
      
      // Add user message to history
      history.push({
        role: 'user',
        content: userPrompt
      });

      // Keep conversation history limited (last 10 messages)
      if (history.length > 10) {
        history.shift();
      }

      console.log(`📨 AI Request from ${msg.author || msg.from}: ${userPrompt}`);

      // Get response from Claude
      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: 'You are CypherX, an intelligent WhatsApp AI assistant. Provide helpful, accurate, and concise responses. Keep responses under 500 characters when possible for WhatsApp formatting.',
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
      console.log(`✅ AI Response sent: ${botReply.substring(0, 50)}...\n`);
      return true;
    }

    if (commandName === 'analyze') {
      const text = command.slice('analyze'.length).trim();
      
      if (!text) {
        await msg.reply('❌ Usage: .analyze [text to analyze]');
        return true;
      }

      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: 'Analyze the following text and provide insights about sentiment, tone, key themes, and any important information.',
        messages: [{
          role: 'user',
          content: text
        }]
      });

      await msg.reply(response.content[0].text);
      return true;
    }

    if (commandName === 'translate') {
      const parts = command.slice('translate'.length).trim().split('|');
      
      if (parts.length < 2) {
        await msg.reply('❌ Usage: .translate [language] | [text]\nExample: .translate Spanish | Hello world');
        return true;
      }

      const language = parts[0].trim();
      const textToTranslate = parts[1].trim();

      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 512,
        system: `Translate the following text to ${language}. Only provide the translation, nothing else.`,
        messages: [{
          role: 'user',
          content: textToTranslate
        }]
      });

      await msg.reply(`🌐 *Translation to ${language}:*\n${response.content[0].text}`);
      return true;
    }

    if (commandName === 'summarize') {
      const text = command.slice('summarize'.length).trim();
      
      if (!text) {
        await msg.reply('❌ Usage: .summarize [text to summarize]');
        return true;
      }

      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 512,
        system: 'Summarize the following text concisely. Highlight the main points.',
        messages: [{
          role: 'user',
          content: text
        }]
      });

      await msg.reply(`📋 *Summary:*\n${response.content[0].text}`);
      return true;
    }

    if (commandName === 'code') {
      const prompt = command.slice('code'.length).trim();
      
      if (!prompt) {
        await msg.reply('❌ Usage: .code [describe what you want]\nExample: .code function to calculate fibonacci');
        return true;
      }

      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        system: 'You are a coding expert. Generate code snippets based on user requests. Provide clean, well-commented code.',
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      const code = response.content[0].text;
      await msg.reply(`💻 *Code:*\n\`\`\`\n${code}\n\`\`\``);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error in AI command:', error);
    await msg.reply(`❌ Error: ${error.message}`);
    return true;
  }
}

/**
 * Clear conversation history for a chat
 */
function clearHistory(chatId) {
  conversationHistory.delete(chatId);
}

/**
 * Clear all conversation histories
 */
function clearAllHistories() {
  conversationHistory.clear();
}

module.exports = {
  handleAICommand,
  clearHistory,
  clearAllHistories
};
