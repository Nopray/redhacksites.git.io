import React from 'react';
import './MessageItem.css';

function MessageItem({ message, isAdmin, onDelete }) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="message-item">
      <div className="message-header">
        <span className="message-username">{message.username}</span>
        <span className="message-time">{formatTime(message.timestamp)}</span>
      </div>
      <div className="message-content">
        <p>{message.message_text}</p>
      </div>
      {isAdmin && (
        <div className="message-actions">
          <button className="btn-delete" onClick={onDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default MessageItem;
