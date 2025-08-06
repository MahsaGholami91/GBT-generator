🧠 GBT Generator – ChatGPT-like App
A lightweight, responsive AI chat interface built with Next.js App Router, Zustand for state management, and styled with vanilla CSS.
Users can start, continue, or delete conversations — just like ChatGPT. Conversations and messages are stored per chat session.

🌐 [![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://gbt-generator.vercel.app)


✨ Features
✅ Start new chat

✅ Per-chat message history

✅ Auto-generated chat titles from the first user message

✅ Delete chats

✅ Sidebar chat list with active chat highlighting

✅ Responsive design (mobile + desktop)

✅ Centralized state with Zustand

📁 Project Structure
pgsql
Copy
Edit
GBT-generator/
│
├── app/
│   ├── api/
│   │   └── chat/route.ts       # API route for fetching assistant responses
│   ├── chat/
│   │   └── page.tsx            # Main chat interface
│   ├── layout.tsx              # Root layout wrapper
│   └── globals.css             # Global styles
│
├── components/
│   ├── ChatInput.tsx           # Text input + send button
│   ├── ChatMessages.tsx        # List of chat messages
│   ├── Sidebar.tsx             # Sidebar with chat list
│   └── Sidebar.module.css      # Sidebar styles
│
├── store/
│   └── chatStore.ts            # Zustand store (chat/message state)
│
├── types/
│   └── message.ts              # Type definitions (optional)
│
└── public/
    └── favicon.ico             # App icon (optional)
🚀 Getting Started
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/GBT-generator.git
cd GBT-generator
2. Install dependencies
bash
Copy
Edit
npm install
3. Add environment variable
Create a .env.local file in the root:

env
Copy
Edit
OPENAI_API_KEY=your_openai_api_key_here
This key is required for making requests to OpenAI.

4. Run development server
bash
Copy
Edit
npm run dev
Open your browser at: http://localhost:3000

⚙️ How It Works
When a message is sent and no active chat exists, a new chat is created.

The first user message is used as the chat title (max 30 characters).

The assistant response is fetched from /api/chat, which calls the OpenAI API.

Messages are saved in Zustand’s store, scoped per chat.

Chats are listed in the sidebar after the first message is sent.

Chats can be deleted anytime.

📦 Dependencies
Next.js 14 (App Router)

React

Zustand – for state management

uuid – for generating unique IDs

📌 Notes
This is a frontend-only app using Next.js serverless functions.

The /api/chat route uses the OpenAI API – ensure you have a valid API key.

No messages are stored on a server — all state is client-side.

🪪 License
MIT — Free to use for personal or commercial project