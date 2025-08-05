 GBT Generator – ChatGPT-like App
    A lightweight, responsive AI chat interface built with Next.js App Router, Zustand for state management, and styled with vanilla CSS. Messages are stored per chat, and users can start, continue, or delete conversations — just like ChatGPT!

 Features
    ✅ Start new chat

    ✅ Per-chat message history

    ✅ Chat titles auto-generate from user’s first message

    ✅ Delete chats

    ✅ Sidebar chat list with active highlight

    ✅ Responsive design (mobile + desktop)

    ✅ Zustand store for managing chats/messages

 Project Structure
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
    │   └── message.ts              # Message types (optional, not always used)
    │
    └── public/
        └── favicon.ico            # Favicon (optional)


 Getting Started

1. Clone the repo
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

3. Run development server
    bash
    Copy
    Edit
    npm run dev
    Open your browser at http://localhost:3000.

 How It Works
    When the user sends a message, if there’s no active chat, a new chat is created.

    The first user message becomes the chat title (up to 30 characters).

    The assistant's response is fetched from /api/chat, which returns a simple AI response (placeholder for OpenAI API).

    Messages are stored in Zustand’s centralized store, associated with their chat.

    Users can switch chats using the sidebar or delete them.

    No chat is shown in the sidebar until the user types the first message — avoids clutter.

 Dependencies
    Next.js 14+ (App Router)

    Zustand

    uuid – for unique message/chat IDs

 Notes
    This is a front-end only project — the chat backend in /api/chat is mocked.

    To connect to OpenAI or another backend, update /api/chat/route.ts.

 License
    MIT — free for personal or commercial use.

