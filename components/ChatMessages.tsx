'use client';

import { useChatStore } from '@/store/chatStore';
import styles from './ChatMessages.module.css';

const ChatMessages = () => {
  const activeChat = useChatStore((state) => state.getActiveChat());

  if (!activeChat) {
    return <p className={styles.empty}>No conversation started yet.</p>;
  }

  return (
    <div className={styles.messages}>
      {activeChat.messages.map((msg) => (
        <div
          key={msg.id}
          className={`${styles.message} ${msg.role === 'user' ? styles.user : styles.assistant}`}
        >
          {msg.content}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
