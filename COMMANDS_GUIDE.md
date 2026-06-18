# 📚 CypherX Commands Complete Guide

This guide lists all available commands in the CypherX WhatsApp bot.

## Prefix

All commands start with `.` (dot)

---

## 🤖 AI Commands

### Chat with Claude
```
.gpt [your prompt]
.ai [your prompt]
.chat [your prompt]
```

**Examples:**
```
.gpt What is artificial intelligence?
.ai Tell me about quantum physics
.chat How do I learn Python?
```

### Generate Code
```
.code [what you want]
```

**Example:**
```
.code function to calculate fibonacci numbers
```

### Analyze Text
```
.analyze [text to analyze]
```

**Example:**
```
.analyze This product is absolutely amazing!
```

### Translate Text
```
.translate [language] | [text]
```

**Examples:**
```
.translate Spanish | Hello world
.translate French | Good morning
```

### Summarize Text
```
.summarize [text to summarize]
```

---

## 😂 Fun & Entertainment

### Jokes
```
.joke                    # Random joke
.joke [type]            # Joke by category
.types                  # List all joke types
```

**Examples:**
```
.joke
.joke programming
.joke dad
```

### Facts
```
.fact
```

### Quotes
```
.quote
```

### Trivia
```
.trivia
```

### Memes
```
.meme
```

---

## 🛠️ Tools & Utilities

### QR Code Generator
```
.qr [text or URL]
```

**Examples:**
```
.qr https://github.com
.qr Contact info
```

### Password Generator
```
.password [length]
.genpass [length]
```

**Examples:**
```
.password 12
.genpass 16
```

### Weather
```
.weather [city name]
```

**Examples:**
```
.weather London
.weather Tokyo
.weather New York
```

### Calculator
```
.calc [expression]
.calculate [expression]
```

**Examples:**
```
.calc 2+2
.calc 100*5-20
.calc (10+5)*2
```

### Base64 Encoding/Decoding
```
.base64 encode [text]
.base64 decode [base64]
```

**Examples:**
```
.base64 encode hello world
.base64 decode aGVsbG8gd29ybGQ=
```

---

## 🔍 Search Commands

### Define Word
```
.define [word]
.definition [word]
```

**Examples:**
```
.define serendipity
.definition eloquent
```

### Get Song Lyrics
```
.lyrics [artist] | [song]
```

**Examples:**
```
.lyrics The Beatles | Imagine
.lyrics Taylor Swift | Blank Space
```

---

## 👥 Group Commands

**Note:** These commands only work in groups!

### Member Information
```
.members
.totalmembers
```

### Get Group ID
```
.groupid
```

### Get Invite Link
```
.link
```

---

## 📋 General Commands

### Help Menu
```
.help
.menu
```

### Bot Status
```
.status
```

### Ping (Latency Check)
```
.ping
```

### Echo Text
```
.echo [text]
```

**Example:**
```
.echo Hello CypherX!
```

---

## Available Joke Types

When using `.joke [type]`, you can use:

- `general` - General jokes
- `programming` - Programming/tech jokes
- `knock-knock` - Knock-knock jokes
- `dad` - Dad jokes
- `science` - Science jokes
- `children` - Kids jokes
- And more!

Use `.types` to see the complete list.

---

## Tips & Tricks

### Conversation History
The bot remembers your conversation! Ask follow-up questions and it will understand context.

```
You: .gpt What is Python?
Bot: Python is a programming language...

You: .gpt Is it easy to learn?
Bot: Yes, Python is known for being beginner-friendly...
```

### Multi-line Text
For longer text in commands like `.analyze` or `.summarize`, you can send multiple lines.

### Command Shortcuts
Some commands have multiple names:
- `.gpt` = `.ai` = `.chat`
- `.password` = `.genpass`
- `.members` = `.totalmembers`
- `.define` = `.definition`
- `.calc` = `.calculate`

### Error Handling
If something goes wrong, the bot will tell you:
- What went wrong
- How to use the command correctly
- An example

---

## API Limits & Considerations

- **Claude AI**: Usage may be limited by API quota
- **Weather**: Works best with common city names
- **Lyrics**: Some songs may not have lyrics available
- **Definitions**: English words only
- **QR Code**: Works with URLs and text
- **Password**: Can generate 4-50 character passwords

---

## Need Help?

- Send `.help` to see the menu
- Send `.status` to check if bot is working
- Send `.ping` to check connection speed

---

**Last Updated:** 2024  
**Version:** 2.0.0
