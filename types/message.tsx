type Props = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Message({ role, content }: Props) {
  const isUser = role === 'user';

  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      margin: '10px 0'
    }}>
      {!isUser && <div style={{ fontSize: 24, marginRight: 8 }}>🤖</div>}
      <div style={{
        background: isUser ? '#1d4ed8' : '#374151',
        color: 'white',
        padding: '10px 16px',
        borderRadius: '12px',
        maxWidth: '70%',
        whiteSpace: 'pre-wrap'
      }}>
        {content}
      </div>
      {isUser && <div style={{ fontSize: 24, marginLeft: 8 }}>🧑</div>}
    </div>
  );
}
