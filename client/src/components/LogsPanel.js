import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LogsPanel.css';

const api = axios.create({
  baseURL: window.API_URL || 'http://localhost:5000'
});

function LogsPanel({ token }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/logs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLogs(response.data);
    } catch (err) {
      setError('Failed to fetch logs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'login':
      case 'register':
        return 'action-auth';
      case 'message_send':
        return 'action-send';
      case 'message_delete':
        return 'action-delete';
      default:
        return '';
    }
  };

  if (loading) {
    return <div className="logs-panel loading">Loading logs...</div>;
  }

  if (error) {
    return <div className="logs-panel error">{error}</div>;
  }

  return (
    <div className="logs-panel">
      <div className="logs-header">
        <h2>Activity Logs</h2>
        <p className="logs-count">Total: {logs.length} entries</p>
      </div>

      {logs.length === 0 ? (
        <div className="logs-empty">No logs available</div>
      ) : (
        <div className="logs-table">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Action</th>
                <th>IP Address</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="col-username">{log.username}</td>
                  <td>
                    <span className={`action-badge ${getActionColor(log.action)}`}>
                      {log.action.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="col-ip">{log.ip_address}</td>
                  <td className="col-time">{formatTime(log.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LogsPanel;
