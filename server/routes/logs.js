const express = require('express');
const db = require('../database');
const { adminOnly } = require('../middleware/auth');

const router = express.Router();

// Get all logs (admin only)
router.get('/', adminOnly, async (req, res) => {
  try {
    const logs = await db.all(`
      SELECT l.id, l.user_id, u.username, l.action, l.ip_address, l.timestamp
      FROM logs l
      JOIN users u ON l.user_id = u.id
      ORDER BY l.timestamp DESC
      LIMIT 500
    `);
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

// Get logs for specific user (admin only)
router.get('/user/:userId', adminOnly, async (req, res) => {
  const { userId } = req.params;

  try {
    const logs = await db.all(`
      SELECT l.id, l.user_id, u.username, l.action, l.ip_address, l.timestamp
      FROM logs l
      JOIN users u ON l.user_id = u.id
      WHERE l.user_id = ?
      ORDER BY l.timestamp DESC
    `, [userId]);
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

module.exports = router;
