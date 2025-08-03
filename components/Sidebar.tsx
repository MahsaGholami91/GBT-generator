'use client';

import { useChatStore } from '../store/chatStore';
import styles from './Sidebar.module.css';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const chats = useChatStore((state) => state.chats);
  const setActiveChat = useChatStore((state) => state.setActiveChat);
  const addChat = useChatStore((state) => state.addChat);
  const activeChatId = useChatStore((state) => state.activeChatId);

  const [isOpen, setIsOpen] = useState(false);

  // Handle window resize to toggle sidebar visibility
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(true);
      else setIsOpen(false);
    };

    handleResize(); // first load
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Toggle button for mobile */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.toggleButton}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <h2 className={styles.title}>Conversations</h2>

        <button className={styles.newButton} onClick={() => addChat('New Chat')}>
          + New Chat
        </button>

        <ul className={styles.list}>
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={`${styles.item} ${chat.id === activeChatId ? styles.active : ''}`}
              onClick={() => setActiveChat(chat.id)}
            >
              {chat.title}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
