/**
 * CypherX Tool Commands Handler
 * Utility tools and helpers
 */

const axios = require('axios');

/**
 * Generate QR Code
 */
async function generateQRCode(text) {
  try {
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`;
  } catch (error) {
    throw new Error('Could not generate QR code');
  }
}

/**
 * Get random password
 */
function generatePassword(length = 12) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

/**
 * Get current weather
 */
async function getWeather(city) {
  try {
    const response = await axios.get(`https://wttr.in/${city}?format=j1`);
    const current = response.data.current_condition[0];
    const weather = `🌤️ *Weather in ${city}*\n
Temperature: ${current.temp_C}°C
Condition: ${current.weatherDesc[0].value}
Humidity: ${current.humidity}%
Wind: ${current.windspeedKmph} km/h`;
    return weather;
  } catch (error) {
    throw new Error('City not found or weather service unavailable');
  }
}

/**
 * Handle tool commands
 */
async function handleToolCommand(msg, prefix) {
  const messageBody = msg.body;
  const command = messageBody.slice(prefix.length).trim();
  const commandName = command.split(' ')[0].toLowerCase();

  try {
    if (commandName === 'qr') {
      const text = command.slice('qr'.length).trim();
      if (!text) {
        await msg.reply('❌ Usage: .qr [text]\nExample: .qr https://github.com');
        return true;
      }
      const qrUrl = await generateQRCode(text);
      await msg.reply(qrUrl);
      return true;
    }

    if (commandName === 'password' || commandName === 'genpass') {
      const length = parseInt(command.split(' ')[1]) || 12;
      if (length < 4 || length > 50) {
        await msg.reply('❌ Password length must be between 4 and 50');
        return true;
      }
      const password = generatePassword(length);
      await msg.reply(`🔐 *Generated Password:*\n${password}`);
      return true;
    }

    if (commandName === 'weather') {
      const city = command.slice('weather'.length).trim();
      if (!city) {
        await msg.reply('❌ Usage: .weather [city name]\nExample: .weather London');
        return true;
      }
      const weather = await getWeather(city);
      await msg.reply(weather);
      return true;
    }

    if (commandName === 'calc' || commandName === 'calculate') {
      const expression = command.slice(commandName.length).trim();
      if (!expression) {
        await msg.reply('❌ Usage: .calc [expression]\nExample: .calc 2+2*10');
        return true;
      }
      try {
        // Simple calculation (only numbers and basic operators)
        if (!/^[\d+\-*/(). ]+$/.test(expression)) {
          await msg.reply('❌ Invalid expression. Use only numbers and operators: + - * / ( )');
          return true;
        }
        const result = Function('"use strict"; return (' + expression + ')')();
        await msg.reply(`🧮 *Result:*\n${expression} = ${result}`);
      } catch (err) {
        await msg.reply('❌ Invalid expression');
      }
      return true;
    }

    if (commandName === 'base64') {
      const subcommand = command.split(' ')[1]?.toLowerCase();
      const text = command.slice(commandName.length).trim().split(' ').slice(1).join(' ');

      if (!subcommand || !text) {
        await msg.reply('❌ Usage:\n.base64 encode [text]\n.base64 decode [base64]');
        return true;
      }

      if (subcommand === 'encode') {
        const encoded = Buffer.from(text).toString('base64');
        await msg.reply(`📝 *Base64 Encoded:*\n${encoded}`);
      } else if (subcommand === 'decode') {
        try {
          const decoded = Buffer.from(text, 'base64').toString('utf-8');
          await msg.reply(`📝 *Base64 Decoded:*\n${decoded}`);
        } catch (err) {
          await msg.reply('❌ Invalid base64');
        }
      } else {
        await msg.reply('❌ Unknown subcommand. Use: encode or decode');
      }
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error in tool command:', error);
    await msg.reply(`❌ Error: ${error.message}`);
    return true;
  }
}

module.exports = {
  handleToolCommand,
  generateQRCode,
  generatePassword,
  getWeather
};