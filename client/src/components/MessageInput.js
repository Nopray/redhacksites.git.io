import React, { useState, useRef } from 'react';
import './MessageInput.css';

function MessageInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  return (
    <form className="message-input-container" onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message here... (Ctrl+Enter to send)"
        disabled={disabled}
        rows="3"
        maxLength={1000}
      />
      <div className="input-footer">
        <span className="char-count">{message.length}/1000</span>
        <button type="submit" disabled={disabled || !message.trim()}>
          Send
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
