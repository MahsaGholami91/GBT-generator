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
  addMessage: (message: Message) => void;
  deleteChat: (id: string) => void;
  setActiveChat: (chatId: string | null) => void;
  getActiveChat: () => Chat | null;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  activeChatId: null,

 addMessage: (message: Message) => {
  set((state) => {
    let chats = [...state.chats];
    const activeChatId = state.activeChatId;

    if (!activeChatId) {
      const newChat: Chat = {
        id: uuidv4(),
        title: message.role === 'user' ? message.content.slice(0, 30) : 'New Chat',
        messages: [message],
      };
      return {
        chats: [newChat, ...chats],
        activeChatId: newChat.id,
      };
    }

    chats = chats.map((chat) => {
      if (chat.id !== activeChatId) return chat;

      const isFirstMessage = chat.messages.length === 0;
      const newTitle =
        isFirstMessage && message.role === 'user'
          ? message.content.slice(0, 30)
          : chat.title;

      return {
        ...chat,
        title: newTitle,
        messages: [...chat.messages, message],
      };
    });

    return { chats };
  });
},


  deleteChat: (id: string) =>
    set((state) => ({
      chats: state.chats.filter((chat) => chat.id !== id),
      activeChatId: state.activeChatId === id ? null : state.activeChatId,
    })),

  setActiveChat: (chatId) => set(() => ({ activeChatId: chatId })),

  getActiveChat: () => {
    const { chats, activeChatId } = get();
    return chats.find((c) => c.id === activeChatId) || null;
  },
}));
