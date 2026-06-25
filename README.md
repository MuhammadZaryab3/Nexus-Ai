# NexusAI — AI Chatbot

A clean, full-featured AI chat app built with React + Vite + Tailwind CSS, powered by Google Gemini.

## Features
- Real AI responses via Google Gemini API
- Chat history saved to localStorage
- Markdown + code block rendering
- Copy message button
- Dark / Light mode toggle
- Suggestion chips on welcome screen
- Auto-resizing input, Shift+Enter for new lines
- Smooth animations

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Get your free Gemini API key
1. Go to https://aistudio.google.com
2. Sign in with your Google account
3. Click **Get API Key** → **Create API Key**
4. Copy the key

### 3. Add your API key
```bash
cp .env.example .env
```
Open `.env` and replace `your_gemini_api_key_here` with your actual key.

### 4. Run the app
```bash
npm run dev
```

Open http://localhost:5173 and start chatting!

## Build for production
```bash
npm run build
```

## Deploy to Vercel
1. Push to GitHub
2. Go to vercel.com → Import project
3. Add `VITE_GEMINI_API_KEY` in Environment Variables
4. Deploy!


## Project Structure
```
src/
├── context/ThemeContext.jsx   ← dark/light mode
├── hooks/useChat.js           ← all AI + history logic
├── components/
│   ├── Sidebar.jsx            ← left nav + chat history
│   ├── ChatWindow.jsx         ← message display + welcome screen
│   ├── MessageBubble.jsx      ← individual message with copy button
│   ├── TypingIndicator.jsx    ← animated dots while AI responds
│   └── InputBar.jsx           ← message input
└── pages/ChatPage.jsx         ← main page
```
