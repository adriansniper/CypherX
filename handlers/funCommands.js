/**
 * CypherX Fun Commands Handler
 * Entertainment and fun features
 */

const axios = require('axios');

/**
 * Get a random fact
 */
async function getFact() {
  try {
    const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
    return response.data.text;
  } catch (error) {
    return 'Could not fetch fact at the moment.';
  }
}

/**
 * Get a random quote
 */
async function getQuote() {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    return `"${response.data.content}"\n— ${response.data.author}`;
  } catch (error) {
    return 'Could not fetch quote at the moment.';
  }
}

/**
 * Get random trivia
 */
async function getTrivia() {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
    const question = response.data.results[0];
    
    // Decode HTML entities
    const decode = (str) => {
      const map = {
        '&quot;': '"',
        '&#039;': "'",
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>'
      };
      return str.replace(/&quot;|&#039;|&amp;|&lt;|&gt;/g, (m) => map[m]);
    };

    return `🧠 *${decode(question.question)}*\n\n_Difficulty: ${question.difficulty}_`;
  } catch (error) {
    return 'Could not fetch trivia at the moment.';
  }
}

/**
 * Handle fun commands
 */
async function handleFunCommand(msg, prefix) {
  const messageBody = msg.body;
  const command = messageBody.slice(prefix.length).trim().toLowerCase();
  const commandName = command.split(' ')[0];

  try {
    if (commandName === 'fact') {
      const fact = await getFact();
      await msg.reply(`📚 *Random Fact:*\n${fact}`);
      return true;
    }

    if (commandName === 'quote') {
      const quote = await getQuote();
      await msg.reply(`💭 *Random Quote:*\n${quote}`);
      return true;
    }

    if (commandName === 'trivia') {
      const trivia = await getTrivia();
      await msg.reply(`${trivia}`);
      return true;
    }

    if (commandName === 'meme') {
      try {
        const response = await axios.get('https://api.imgflip.com/get_memes');
        const memes = response.data.data.memes;
        const randomMeme = memes[Math.floor(Math.random() * memes.length)];
        await msg.reply(`😂 *Random Meme:*\n${randomMeme.name}\n${randomMeme.url}`);
      } catch (error) {
        await msg.reply('❌ Could not fetch meme at the moment.');
      }
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error in fun command:', error);
    await msg.reply(`❌ Error: ${error.message}`);
    return true;
  }
}

module.exports = {
  handleFunCommand,
  getFact,
  getQuote,
  getTrivia
};