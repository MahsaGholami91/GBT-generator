'use client';

import { useChatStore } from '@/store/chatStore';

const ChatMessages = () => {
  const activeChat = useChatStore((state) => state.getActiveChat());

  if (!activeChat) {
    return <p style={{ textAlign: 'center' }}>هنوز هیچ مکالمه‌ای شروع نشده است.</p>;
  }

  return (
    <div>
      {activeChat.messages.map((msg) => (
        <div
          key={msg.id}
          style={{
            marginBottom: '1rem',
            textAlign: msg.role === 'user' ? 'right' : 'left',
          }}
        >
          <b>{msg.role === 'user' ? 'شما' : 'ربات'}:</b> {msg.content}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
