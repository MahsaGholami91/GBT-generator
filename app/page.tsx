'use client';

import { useEffect } from 'react';
import { useChatStore } from '../store/chatStore';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import { v4 as uuidv4 } from 'uuid';

export default function ChatPage() {
  const activeChat = useChatStore((state) => state.getActiveChat());
  const addChat = useChatStore((state) => state.addChat);
  const addMessage = useChatStore((state) => state.addMessage);
  const activeChatId = useChatStore((state) => state.activeChatId);

  // اگر چتی فعال نیست، یکی بساز
  useEffect(() => {
    if (!activeChatId) {
      addChat('مکالمه جدید');
    }
  }, [activeChatId, addChat]);

  const handleSend = async (userInput: string) => {
    if (!activeChatId) return;

    // پیام کاربر رو اضافه کن
    const userMessage = {
      id: uuidv4(),
      role: 'user',
      content: userInput,
    };
    addMessage(activeChatId, userMessage);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userInput }),
      });

      const data = await res.json();

      const assistantMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: data.result,
      };
      addMessage(activeChatId, assistantMessage);
    } catch (err) {
      const errorMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: '❌ خطایی در دریافت پاسخ رخ داد.',
      };
      addMessage(activeChatId, errorMessage);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem',
          maxWidth: 800,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <ChatMessages />
      </div>

      <div
        style={{
          padding: '1rem',
          borderTop: '1px solid #ccc',
          maxWidth: 800,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
