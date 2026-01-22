import React from 'react';
import './MessageList.css';
import MessageItem from './MessageItem';

function MessageList({ messages, currentUser, onDeleteMessage }) {
  if (messages.length === 0) {
    return (
      <div className="messages-empty">
        <p>No messages yet. Be the first to send one!</p>
      </div>
    );
  }

  return (
    <div className="messages-list">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          isAdmin={currentUser.role === 'admin'}
          onDelete={() => onDeleteMessage(message.id)}
        />
      ))}
    </div>
  );
}

export default MessageList;
