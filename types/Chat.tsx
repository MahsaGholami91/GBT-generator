'use client';

import { useState } from 'react';
import Message from './message';

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'سلام! چطور می‌تونم کمکت کنم؟' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
      <div style={{ marginBottom: 20 }}>
        {messages.map((msg, i) => (
          <Message key={i} role={msg.role as any} content={msg.content} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            background: '#10a37f',
            color: 'white',
            padding: '10px 18px',
            borderRadius: 8,
            border: 'none'
          }}
        >
          ارسال
        </button>
      </div>
    </div>
  );
}
