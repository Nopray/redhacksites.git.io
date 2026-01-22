const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./database');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');
const logsRoutes = require('./routes/logs');
const { authenticate } = require('./middleware/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5000',
    /\.vercel\.app$/,
    /\.up\.railway\.app$/
  ],
  credentials: true
}));
app.use(express.json());

// Log requests in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Initialize database
db.init();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', authenticate, messagesRoutes);
app.use('/api/logs', authenticate, logsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
