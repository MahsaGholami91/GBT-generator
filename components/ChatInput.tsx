'use client';

import { useState } from 'react';

interface Props {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    onSend(trimmed);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <input
        type="text"
        value={input}
        placeholder="پیام خود را بنویسید..."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          flex: 1,
          padding: '0.75rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '1rem',
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        ارسال
      </button>
    </div>
  );
}
