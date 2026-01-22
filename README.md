# Public Chat Wall

A simple, single-room chat application with user registration and admin controls. Messages are permanent and stored in the database. Only registered users can send messages.

## Features

### Core Features
- **Single Chat Room**: All messages in one public space
- **User Registration**: Username + password (no email required)
- **User Authentication**: JWT-based login system
- **Persistent Messages**: All messages are archived and never auto-deleted
- **Text Only**: No file, image, or media uploads
- **Responsive Design**: Works on desktop and mobile

### Admin Features
- View and delete messages
- View user activity logs (login, registration, message sending)
- See user IP addresses and timestamps

### User Features
- Send text messages to the public room
- View all messages with timestamps
- Logout

## Tech Stack

### Backend
- **Node.js** with Express.js
- **SQLite** database
- **JWT** for authentication
- **bcrypt** for password hashing

### Frontend
- **React** 18
- **Axios** for API calls
- **React Router** for navigation
- **CSS3** for styling

## Project Structure

```
public-chat-wall/
├── server/
│   ├── server.js
│   ├── database.js
│   ├── package.json
│   ├── .env
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── messages.js
│   │   └── logs.js
│   └── models/
├── client/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.js
│       ├── App.js
│       ├── pages/
│       │   ├── LoginRegister.js
│       │   └── ChatRoom.js
│       ├── components/
│       │   ├── MessageList.js
│       │   ├── MessageItem.js
│       │   ├── MessageInput.js
│       │   └── LogsPanel.js
│       ├── hooks/
│       └── utils/
└── README.md
```

## Installation

### Prerequisites
- Node.js 14+ and npm

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
npm install
```

2. Create a `.env` file (already created with defaults):
```
PORT=5000
JWT_SECRET=your-secret-key-here-change-in-production
```

3. Start the server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
npm install
```

2. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Default Credentials

- **Username**: `admin`
- **Password**: `admin123`

⚠️ **Change these credentials in production!**

## Usage

### For Regular Users
1. Register with a username and password
2. Login with your credentials
3. Type messages in the input box at the bottom
4. Press `Ctrl+Enter` or click "Send" to post
5. Click "Logout" to exit

### For Admin
- Same as regular users, plus:
- Delete messages: Click the "Delete" button on any message
- View logs: Click "View Logs" to see user activity
- Access to login/registration history and message send timestamps

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  register_date DATETIME,
  last_login DATETIME
);
```

### Messages Table
```sql
CREATE TABLE messages (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  message_text TEXT NOT NULL,
  timestamp DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Logs Table
```sql
CREATE TABLE logs (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  action TEXT NOT NULL,
  ip_address TEXT,
  timestamp DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Messages
- `GET /api/messages` - Get all messages
- `POST /api/messages` - Send a new message
- `DELETE /api/messages/:id` - Delete a message (admin only)

### Logs
- `GET /api/logs` - Get all activity logs (admin only)
- `GET /api/logs/user/:userId` - Get logs for specific user (admin only)

## Security Considerations

- Passwords are hashed using bcrypt
- JWT tokens expire after 7 days
- Admin actions are logged
- IP addresses are recorded for all actions
- Input validation on all endpoints

## Development Notes

### Message Polling
Currently, the app polls for new messages every 2 seconds. For real-time updates, consider implementing:
- WebSocket with Socket.io
- Server-Sent Events (SSE)

### Customization Ideas
- Add user profiles with avatars
- Implement message search
- Add user status (online/offline)
- Rate limiting for message posting
- Message reactions/reactions
- Dark mode theme
- Multiple languages support

## License

MIT

## Support

For issues or questions, please create an issue in the repository.
