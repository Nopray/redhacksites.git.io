import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatRoom.css';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import LogsPanel from '../components/LogsPanel';

const api = axios.create({
  baseURL: window.API_URL || 'http://localhost:5000'
});

function ChatRoom({ user, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const token = localStorage.getItem('token');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await api.get('/api/messages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  const handleSendMessage = async (messageText) => {
    try {
      setLoading(true);
      await api.post(
        '/api/messages',
        { message_text: messageText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchMessages();
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      await api.delete(`/api/messages/${messageId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchMessages();
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  return (
    <div className="chatroom-container">
      <div className="chatroom-header">
        <h1>Public Chat Wall</h1>
        <div className="header-controls">
          {user.role === 'admin' && (
            <button
              className="btn-logs"
              onClick={() => setShowLogs(!showLogs)}
            >
              {showLogs ? 'Hide Logs' : 'View Logs'}
            </button>
          )}
          <div className="user-info">
            <span className="username">{user.username}</span>
            {user.role === 'admin' && <span className="badge-admin">Admin</span>}
          </div>
          <button className="btn-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="chatroom-content">
        {showLogs ? (
          <LogsPanel token={token} />
        ) : (
          <>
            <MessageList
              messages={messages}
              currentUser={user}
              onDeleteMessage={handleDeleteMessage}
            />
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {!showLogs && (
        <MessageInput
          onSendMessage={handleSendMessage}
          disabled={loading}
        />
      )}
    </div>
  );
}

export default ChatRoom;
