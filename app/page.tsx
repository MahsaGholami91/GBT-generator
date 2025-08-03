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

  // create a new chat if no active chat exists
  useEffect(() => {
    if (!activeChatId) {
      addChat('New Chat');
    }
  }, [activeChatId, addChat]);

  const handleSend = async (userInput: string) => {
    if (!activeChatId) return;

    // Add user message
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
        content: '❌ Something went wrong.',
      };
      addMessage(activeChatId, errorMessage);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
