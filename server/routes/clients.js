const express = require('express');
const { query } = require('../db');

const router = express.Router();

// GET /api/clients - list all clients with project counts
router.get('/', async (req, res) => {
  try {
    const rows = await query(`
      SELECT c.id, c.name, c.sector, c.website, c.created_at,
             COUNT(p.id) AS project_count
      FROM clients c
      LEFT JOIN projects p ON p.client_id = c.id
      GROUP BY c.id, c.name, c.sector, c.website, c.created_at
      ORDER BY c.name ASC
    `);
    res.json(rows.map((r) => ({
      id: r.id,
      name: r.name,
      sector: r.sector,
      website: r.website,
      createdAt: r.created_at,
      projectCount: Number(r.project_count),
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/clients - create a client
router.post('/', async (req, res) => {
  try {
    const { name, sector = '', website = '' } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });
    const result = await query('INSERT INTO clients (name, sector, website) VALUES (?, ?, ?)', [
      name,
      sector,
      website,
    ]);
    const rows = await query('SELECT * FROM clients WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Client name already exists' });
    }
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
