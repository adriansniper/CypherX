# 🚀 CypherX Setup & Deployment Guide

Step-by-step guide to set up and deploy the CypherX WhatsApp bot.

## Prerequisites

- **Node.js** v14 or higher
- **npm** (comes with Node.js)
- **Claude API Key** (free tier available)
- **WhatsApp Account**
- **Internet Connection**

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/adriansniper/CypherX.git
cd CypherX
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- `whatsapp-web.js` - WhatsApp Web automation
- `qrcode-terminal` - QR code display
- `@anthropic-ai/sdk` - Claude AI API
- `dotenv` - Environment variables
- `axios` - HTTP requests

### 3. Get Claude API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to **API Keys**
4. Click **Create Key**
5. Copy your API key

### 4. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` file:

```
CLAUDE_API_KEY=sk-ant-your-actual-key-here
BOT_PREFIX=.
BOT_NAME=CypherX
```

**⚠️ Important:** Never share your API key!

### 5. Run the Bot

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

### 6. Scan QR Code

When you run the bot, a QR code appears in your terminal:

1. Open **WhatsApp** on your phone
2. Go to **Settings** → **Linked Devices** → **Link a Device**
3. Use your phone camera to **scan the QR code**
4. The bot will authenticate and start

### 7. Test the Bot

Send a message to the bot's number:

```
.help
.ping
.joke
```

---

## Deployment Options

### Option 1: Heroku (Free with Account)

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set CLAUDE_API_KEY=your_key_here

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Option 2: Railway.app

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Connect project
railway link

# Set variables
railway variables set CLAUDE_API_KEY=your_key_here

# Deploy
railway up
```

### Option 3: VPS/Cloud Server

**Ubuntu/Debian:**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Clone repository
git clone https://github.com/adriansniper/CypherX.git
cd CypherX

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your API key

# Install PM2 (process manager)
sudo npm install -g pm2

# Start bot with PM2
pm2 start bot.js --name "CypherX"

# Make it run on restart
pm2 startup
pm2 save

# View logs
pm2 logs CypherX
```

### Option 4: Docker

**Dockerfile:**

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
```

**Build and run:**

```bash
docker build -t cypherx .
docker run -e CLAUDE_API_KEY=your_key_here cypherx
```

---

## Troubleshooting

### QR Code Not Showing

**Solution:**
- Use a different terminal emulator
- Ensure terminal supports QR codes
- Update Node.js to latest version

### "CLAUDE_API_KEY not found"

**Solution:**
- Verify `.env` file exists in root directory
- Check API key is spelled correctly
- Restart bot after editing `.env`
- Ensure no spaces around the `=`

### Bot Not Responding

**Solution:**
- Check internet connection
- Verify Claude API key is valid
- Check API rate limits
- Look for errors in console
- Restart the bot

### "whatsapp-web.js" Error

**Solution:**
```bash
# Clear node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### High Memory Usage

**Solution:**
- Clear `.wwebjs_cache/` folder
- Restart the bot
- Reduce conversation history

---

## Performance Tips

1. **Use PM2** for automatic restarts
2. **Monitor memory** usage regularly
3. **Clear cache** periodically
4. **Update dependencies** monthly
5. **Test on staging** before production

---

## Security Best Practices

✅ **Do:**
- Keep `.env` in `.gitignore`
- Never share your API key
- Use strong passwords
- Update dependencies regularly
- Monitor bot activity

❌ **Don't:**
- Commit `.env` to Git
- Share your API key publicly
- Run bot with admin privileges
- Disable authentication
- Leave bot unattended

---

## Monitoring & Maintenance

### Check Bot Status

```bash
# With PM2
pm2 status
pm2 monit

# View logs
pm2 logs CypherX
```

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Update specific package
npm install package-name@latest
```

### Clean Up

```bash
# Clear npm cache
npm cache clean --force

# Clear bot cache
rm -rf .wwebjs_cache/
rm -rf .wwebjs_auth/
```

---

## Useful Commands

```bash
# Start in development
npm run dev

# Start in production
npm start

# Check Node version
node --version

# Check npm version
npm --version

# List installed packages
npm list

# Update npm
npm install -g npm@latest
```

---

## Getting Help

- **GitHub Issues:** [CypherX Issues](https://github.com/adriansniper/CypherX/issues)
- **WhatsApp:** +254759169078
- **Documentation:** See README.md

---

**Last Updated:** 2024  
**Version:** 2.0.0
