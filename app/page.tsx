'use client';

import { useChatStore } from '../store/chatStore';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import { v4 as uuidv4 } from 'uuid';

export default function ChatPage() {
  const addMessage = useChatStore((state) => state.addMessage);

  const handleSend = async (userInput: string) => {
    const userMessage = {
      id: uuidv4(),
      role: 'user' as const,
      content: userInput,
    };

    addMessage(userMessage); // Add user message to the chat

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userInput }),
      });

      const data = await res.json();

      const assistantMessage = {
        id: uuidv4(),
        role: 'assistant' as const,
        content: data.result,
      };

      addMessage(assistantMessage);
    } catch (err) {
      const errorMessage = {
        id: uuidv4(),
        role: 'assistant' as const,
        content: '❌ Something went wrong.',
      };
      addMessage(errorMessage);
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
