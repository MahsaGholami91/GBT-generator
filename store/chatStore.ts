// app/store/chatStore.ts
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

interface ChatState {
  chats: Chat[];
  activeChatId: string | null;
  addChat: (title: string) => void;
  addMessage: (chatId: string, message: Message) => void;
  setActiveChat: (chatId: string) => void;
  getActiveChat: () => Chat | null;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  activeChatId: null,

  addChat: (title: string) => {
    const newChat: Chat = {
      id: uuidv4(),
      title,
      messages: [],
    };
    set((state) => ({
      chats: [newChat, ...state.chats],
      activeChatId: newChat.id,
    }));
  },

addMessage: (chatId, message) => {
  set((state) => ({
    chats: state.chats.map((chat) => {
      if (chat.id !== chatId) return chat;

      const isFirstMessage = chat.messages.length === 0;
      const newTitle =
        isFirstMessage && message.role === 'user'
          ? message.content.slice(0, 30) // Limit title to 30 chars
          : chat.title;

      return {
        ...chat,
        title: newTitle,
        messages: [...chat.messages, message],
      };
    }),
  }));
},


  setActiveChat: (chatId) => set(() => ({ activeChatId: chatId })),

  getActiveChat: () => {
    const { chats, activeChatId } = get();
    return chats.find((c) => c.id === activeChatId) || null;
  },
}));
