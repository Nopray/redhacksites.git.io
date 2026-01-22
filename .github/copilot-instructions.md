# Public Chat Wall - Project Setup Guide

## Project Overview
A single-room chat application with user registration, authentication, and admin controls for message deletion and activity logging.

## Quick Start

### Prerequisites
- Node.js 14+ and npm
- Git (optional)

### Installation & Running

#### 1. Backend Setup
```bash
cd server
npm install
npm start
```
Server runs on `http://localhost:5000`

#### 2. Frontend Setup (in a new terminal)
```bash
cd client
npm install
npm start
```
Application opens on `http://localhost:3000`

### Default Credentials
- **Username**: `admin`
- **Password**: `admin123`

**Important**: Change these in production!

## Project Structure

```
public-chat-wall/
├── server/                 # Node.js + Express backend
│   ├── server.js          # Main server file
│   ├── database.js        # SQLite database setup
│   ├── package.json
│   ├── .env              # Configuration
│   ├── middleware/       # Authentication middleware
│   ├── routes/           # API endpoints
│   │   ├── auth.js       # Login/Register
│   │   ├── messages.js   # Message CRUD
│   │   └── logs.js       # Admin logs
│   └── models/           # Data models (extensible)
│
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── index.js      # Entry point
│   │   ├── App.js        # Main component
│   │   ├── pages/        # Page components
│   │   │   ├── LoginRegister.js
│   │   │   └── ChatRoom.js
│   │   ├── components/   # Reusable components
│   │   │   ├── MessageList.js
│   │   │   ├── MessageItem.js
│   │   │   ├── MessageInput.js
│   │   │   └── LogsPanel.js
│   │   ├── hooks/        # Custom React hooks (extensible)
│   │   └── utils/        # Utility functions (extensible)
│   └── package.json
│
├── .vscode/              # VS Code configuration
│   ├── launch.json       # Debug configuration
│   └── extensions.json   # Recommended extensions
│
├── .gitignore
├── README.md             # Full documentation
└── copilot-instructions.md (this file)
```

## Feature Implementation Status

✅ **Completed Features:**
- User registration (username + password)
- User login/logout
- JWT authentication
- Single chat room with message display
- Message sending (text only)
- Admin message deletion
- User activity logging (login, registration, message send/delete)
- IP address tracking
- Admin logs viewing panel
- Responsive UI design
- Message timestamps
- Auto-polling for new messages (every 2 seconds)

## Database Schema

### Users Table
- id, username (unique), password_hash, role, register_date, last_login

### Messages Table
- id, user_id, message_text, timestamp

### Logs Table
- id, user_id, action, ip_address, timestamp

## API Endpoints

**Auth:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

**Messages (require authentication):**
- `GET /api/messages` - Get all messages
- `POST /api/messages` - Send message
- `DELETE /api/messages/:id` - Delete message (admin only)

**Logs (admin only):**
- `GET /api/logs` - Get all activity logs
- `GET /api/logs/user/:userId` - Get user-specific logs

## Tech Stack

**Backend:**
- Node.js with Express.js
- SQLite (database)
- bcrypt (password hashing)
- JWT (authentication)
- CORS (cross-origin support)

**Frontend:**
- React 18
- React Router 6
- Axios (HTTP client)
- CSS3 (styling)

## Development Tips

### Running in Development Mode
```bash
# Server with auto-reload (requires nodemon)
cd server
npm run dev

# Frontend (auto-reload included)
cd client
npm start
```

### Debugging
- Backend: Use VS Code launch configuration (F5)
- Frontend: Use browser DevTools (F12)

## Future Enhancement Ideas

1. **Real-time Updates**
   - Replace polling with WebSocket (Socket.io)
   - Server-Sent Events (SSE)

2. **Features**
   - Message search
   - User profiles
   - Message reactions
   - Online/offline status
   - Rate limiting
   - Dark mode

3. **Security**
   - Input sanitization
   - Rate limiting
   - CSRF protection
   - HTTPS enforcement

4. **Internationalization**
   - Multi-language support
   - Locale management

5. **Performance**
   - Message pagination
   - Caching
   - Database optimization

## Troubleshooting

**Port already in use:**
- Backend (5000): `netstat -ano | findstr :5000` (Windows)
- Frontend (3000): Change in `.env` or kill process

**Database errors:**
- Check database.db file permissions
- Verify SQLite installation

**CORS issues:**
- Check `http://localhost:3000` is in CORS whitelist on backend

## Support

Refer to [README.md](../README.md) for detailed documentation.
