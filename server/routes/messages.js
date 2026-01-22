const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../database');
const { adminOnly } = require('../middleware/auth');

const router = express.Router();

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await db.all(`
      SELECT m.id, m.user_id, u.username, m.message_text, m.timestamp
      FROM messages m
      JOIN users u ON m.user_id = u.id
      ORDER BY m.timestamp ASC
    `);
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Send message
router.post('/', [
  body('message_text').trim().notEmpty().isLength({ max: 1000 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { message_text } = req.body;
  const user_id = req.user.id;

  try {
    const result = await db.run(
      'INSERT INTO messages (user_id, message_text) VALUES (?, ?)',
      [user_id, message_text]
    );

    // Log message send
    const clientIp = req.ip || req.connection.remoteAddress;
    await db.run(
      'INSERT INTO logs (user_id, action, ip_address) VALUES (?, ?, ?)',
      [user_id, 'message_send', clientIp]
    );

    const message = await db.get(`
      SELECT m.id, m.user_id, u.username, m.message_text, m.timestamp
      FROM messages m
      JOIN users u ON m.user_id = u.id
      WHERE m.id = ?
    `, [result.id]);

    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Delete message (admin only)
router.delete('/:id', adminOnly, async (req, res) => {
  const { id } = req.params;

  try {
    const message = await db.get('SELECT id FROM messages WHERE id = ?', [id]);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    await db.run('DELETE FROM messages WHERE id = ?', [id]);

    // Log message delete
    const clientIp = req.ip || req.connection.remoteAddress;
    await db.run(
      'INSERT INTO logs (user_id, action, ip_address) VALUES (?, ?, ?)',
      [req.user.id, 'message_delete', clientIp]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

module.exports = router;
