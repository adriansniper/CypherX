/**
 * CypherX Search Commands Handler
 * Search and information retrieval
 */

const axios = require('axios');

/**
 * Get definitions
 */
async function getDefinition(word) {
  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = response.data[0];
    
    let definition = `📖 *Definition of "${word}":*\n\n`;
    
    if (data.phonetics && data.phonetics[0]?.text) {
      definition += `**Pronunciation:** ${data.phonetics[0].text}\n\n`;
    }

    data.meanings.forEach((meaning, index) => {
      definition += `**${meaning.partOfSpeech}:**\n`;
      meaning.definitions.slice(0, 2).forEach((def, i) => {
        definition += `${i + 1}. ${def.definition}\n`;
      });
      if (index < data.meanings.length - 1) definition += '\n';
    });

    return definition;
  } catch (error) {
    throw new Error('Word not found');
  }
}

/**
 * Get lyrics
 */
async function getLyrics(song, artist) {
  try {
    const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`);
    return response.data.lyrics;
  } catch (error) {
    throw new Error('Lyrics not found');
  }
}

/**
 * Handle search commands
 */
async function handleSearchCommand(msg, prefix) {
  const messageBody = msg.body;
  const command = messageBody.slice(prefix.length).trim();
  const commandName = command.split(' ')[0].toLowerCase();

  try {
    if (commandName === 'define' || commandName === 'definition') {
      const word = command.slice(commandName.length).trim();
      if (!word) {
        await msg.reply('❌ Usage: .define [word]\nExample: .define serendipity');
        return true;
      }
      
      const definition = await getDefinition(word);
      await msg.reply(definition);
      return true;
    }

    if (commandName === 'lyrics') {
      const parts = command.slice('lyrics'.length).trim().split('|');
      if (parts.length < 2) {
        await msg.reply('❌ Usage: .lyrics [artist] | [song]\nExample: .lyrics The Beatles | Imagine');
        return true;
      }

      const artist = parts[0].trim();
      const song = parts[1].trim();

      try {
        const lyrics = await getLyrics(song, artist);
        if (lyrics.length > 2000) {
          await msg.reply(`🎵 *Lyrics for "${song}" by ${artist}:*\n\n${lyrics.substring(0, 2000)}...\n\n(Lyrics too long, showing first part)`);
        } else {
          await msg.reply(`🎵 *Lyrics for "${song}" by ${artist}:*\n\n${lyrics}`);
        }
      } catch (error) {
        await msg.reply(`❌ Error: ${error.message}`);
      }
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error in search command:', error);
    await msg.reply(`❌ Error: ${error.message}`);
    return true;
  }
}

module.exports = {
  handleSearchCommand,
  getDefinition,
  getLyrics
};