'use client';

import { useChatStore } from '../store/chatStore';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const chats = useChatStore((state) => state.chats);
  const setActiveChat = useChatStore((state) => state.setActiveChat);
  const addChat = useChatStore((state) => state.addChat);
  const activeChatId = useChatStore((state) => state.activeChatId);

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>📚 مکالمه‌ها</h2>

      <button
        className={styles.newButton}
        onClick={() => addChat('مکالمه جدید')}
      >
        + مکالمه جدید
      </button>

      <ul className={styles.list}>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className={`${styles.item} ${
              chat.id === activeChatId ? styles.active : ''
            }`}
            onClick={() => setActiveChat(chat.id)}
          >
            {chat.title}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
