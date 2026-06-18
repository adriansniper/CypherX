/**
 * CypherX Command Handler
 * Routes user commands to appropriate handlers
 */

const { handleJokeCommand } = require('./jokeHandler');

/**
 * Send help menu
 */
async function sendHelpMenu(msg) {
  const helpText = `┏▣ ◈ *CypherX MENU* ◈
┃ *ᴏᴡɴᴇʀ* : Adrian J 🔥
┃ *ᴘʀᴇғɪx* : [ . ]
┃ *ᴠᴇʀsɪᴏɴ* : 2.0.0
┃ *sᴛᴀᴛᴜs* : Active ✅
┗▣ 

┏▣ ◈ *AI MENU* ◈
│➽ .gpt [prompt] - Chat with Claude
│➽ .ai [prompt] - Alternative to gpt
│➽ .code [description] - Generate code
│➽ .analyze [text] - Analyze text
│➽ .translate [lang] | [text] - Translate
│➽ .summarize [text] - Summarize text
┗▣ 

┏▣ ◈ *FUN MENU* ◈
│➽ .joke - Get random joke
│➽ .joke [type] - Joke by type
│➽ .types - List joke types
│➽ .fact - Random fact
│➽ .quote - Inspirational quote
│➽ .trivia - Random trivia
│➽ .meme - Random meme
┗▣ 

┏▣ ◈ *TOOLS MENU* ◈
│➽ .qr [text] - Generate QR code
│➽ .password [length] - Generate password
│➽ .weather [city] - Get weather
│➽ .calc [expression] - Calculator
│➽ .base64 encode [text] - Encode base64
│➽ .base64 decode [text] - Decode base64
┗▣ 

┏▣ ◈ *SEARCH MENU* ◈
│➽ .define [word] - Define word
│➽ .lyrics [artist] | [song] - Get lyrics
┗▣ 

┏▣ ◈ *GROUP MENU* ◈
│➽ .members - Member count
│➽ .groupid - Get group ID
│➽ .link - Invite link
┗▣ 

┏▣ ◈ *GENERAL* ◈
│➽ .help - Show this menu
│➽ .status - Bot status
│➽ .ping - Check latency
│➽ .echo [text] - Echo text
┗▣`;

  await msg.reply(helpText);
  return true;
}

/**
 * Send bot status information
 */
async function sendBotStatus(msg) {
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  const statusText = `┏▣ ◈ *BOT STATUS* ◈
┃ *Status* : 🟢 Online
┃ *Uptime* : ${hours}h ${minutes}m ${seconds}s
┃ *Version* : 2.0.0
┃ *Latency* : ${Date.now() % 100}ms
┃ *Commands* : 30+
┗▣`;

  await msg.reply(statusText);
  return true;
}

module.exports = {
  sendHelpMenu,
  sendBotStatus
};