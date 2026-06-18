/**
 * CypherX Joke Generator Command Handler
 * Integrates with the Official Joke API to provide joke commands
 */

const { getRandomJoke, getJokeByType, getAvailableTypes } = require('./utils/jokeGenerator');

/**
 * Handle joke-related commands
 * @param {Object} msg - WhatsApp message object
 * @param {string} command - The command string
 * @returns {Promise<boolean>} True if command was handled
 */
async function handleJokeCommand(msg, command) {
  try {
    if (command.startsWith('/joke')) {
      await msg.react('😂');
      const parts = command.split(' ');
      
      if (parts.length > 1) {
        // Get joke by type
        const jokeType = parts[1].toLowerCase();
        const joke = await getJokeByType(jokeType);
        await msg.reply(`😂 ${joke}`);
        console.log(`✅ Sent ${jokeType} joke to ${msg.from}`);
      } else {
        // Get random joke
        const joke = await getRandomJoke();
        await msg.reply(`😂 ${joke}`);
        console.log(`✅ Sent random joke to ${msg.from}`);
      }
      return true;
    }
    
    if (command === '/types') {
      const types = await getAvailableTypes();
      const typesList = types.join(', ');
      const typesText = `📋 **Available Joke Types:**\n${typesList}\n\n💡 Use: /joke [type]`;
      await msg.reply(typesText);
      console.log(`✅ Sent available types to ${msg.from}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error handling joke command:', error);
    await msg.reply(`❌ Error: ${error.message}`);
    return true;
  }
}

module.exports = {
  handleJokeCommand
};
