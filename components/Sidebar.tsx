'use client';

import { useChatStore } from '../store/chatStore';
import styles from './Sidebar.module.css';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const chats = useChatStore((state) => state.chats);
  const setActiveChat = useChatStore((state) => state.setActiveChat);
  const activeChatId = useChatStore((state) => state.activeChatId);
  const deleteChat = useChatStore((state) => state.deleteChat);

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

        {/* New chat button */}
        <button
          onClick={() => setActiveChat(null)} className={styles.newButton}>
          New Chat
        </button>
        {/* Chat list */}
        <h2 className={styles.title}>Chats</h2>
   
        <ul className={styles.list}>
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={`${styles.item} ${chat.id === activeChatId ? styles.active : ''}`}
              onClick={() => setActiveChat(chat.id)}
            >
                <span onClick={() => setActiveChat(chat.id)} className={styles.chatTitle}>
                {chat.title}
              </span>
              <button
                className={styles.deleteButton}
                onClick={() => deleteChat(chat.id)}
                title="Delete chat"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
