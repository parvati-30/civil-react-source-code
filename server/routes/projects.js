const express = require('express');
const { query } = require('../db');

const router = express.Router();

const SELECT_PROJECTS = `
  SELECT p.id, p.title, p.project_type, p.status, p.location,
         p.description, p.start_date, p.end_date, p.image_url,
         p.created_at, p.updated_at,
         c.id AS client_id, c.name AS client_name, c.sector AS client_sector
  FROM projects p
  JOIN clients c ON p.client_id = c.id
`;

function mapRow(row) {
  return {
    id: row.id,
    title: row.title,
    projectType: row.project_type,
    status: row.status,
    location: row.location,
    description: row.description,
    startDate: row.start_date,
    endDate: row.end_date,
    imageUrl: row.image_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    client: {
      id: row.client_id,
      name: row.client_name,
      sector: row.client_sector,
    },
  };
}

// GET /api/projects - list all projects with optional filters
router.get('/', async (req, res) => {
  try {
    const { status, type } = req.query;
    const clauses = [];
    const params = [];
    if (status) {
      clauses.push('p.status = ?');
      params.push(status);
    }
    if (type) {
      clauses.push('p.project_type = ?');
      params.push(type);
    }
    const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
    const rows = await query(
      `${SELECT_PROJECTS} ${where} ORDER BY p.updated_at DESC`,
      params
    );
    res.json(rows.map(mapRow));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/projects/:id - single project
router.get('/:id', async (req, res) => {
  try {
    const rows = await query(`${SELECT_PROJECTS} WHERE p.id = ?`, [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Project not found' });
    res.json(mapRow(rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/projects - create a project
router.post('/', async (req, res) => {
  try {
    const {
      client_id,
      title,
      project_type,
      status = 'Under Progress',
      location = '',
      description = '',
      start_date = null,
      end_date = null,
      image_url = '',
    } = req.body;

    if (!client_id || !title || !project_type) {
      return res
        .status(400)
        .json({ error: 'client_id, title and project_type are required' });
    }

    const validTypes = ['Road Work', 'Infrastructure', 'Concrete', 'Asphalt', 'Paver', 'Hardscape', 'External Civil'];
    if (!validTypes.includes(project_type)) {
      return res.status(400).json({ error: `project_type must be one of: ${validTypes.join(', ')}` });
    }

    const validStatus = ['Completed', 'Under Progress'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ error: `status must be one of: ${validStatus.join(', ')}` });
    }

    const result = await query(
      `INSERT INTO projects
         (client_id, title, project_type, status, location, description, start_date, end_date, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [client_id, title, project_type, status, location, description, start_date, end_date, image_url]
    );

    const rows = await query(`${SELECT_PROJECTS} WHERE p.id = ?`, [result.insertId]);
    res.status(201).json(mapRow(rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/projects/:id - update a project (full or partial update)
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const existing = await query('SELECT * FROM projects WHERE id = ?', [id]);
    if (!existing.length) return res.status(404).json({ error: 'Project not found' });

    const current = existing[0];
    const {
      client_id = current.client_id,
      title = current.title,
      project_type = current.project_type,
      status = current.status,
      location = current.location,
      description = current.description,
      start_date = current.start_date,
      end_date = current.end_date,
      image_url = current.image_url,
    } = req.body;

    await query(
      `UPDATE projects SET
         client_id = ?, title = ?, project_type = ?, status = ?, location = ?,
         description = ?, start_date = ?, end_date = ?, image_url = ?
       WHERE id = ?`,
      [client_id, title, project_type, status, location, description, start_date, end_date, image_url, id]
    );

    const rows = await query(`${SELECT_PROJECTS} WHERE p.id = ?`, [id]);
    res.json(mapRow(rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/projects/:id/status - quickly toggle/update status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Completed', 'Under Progress'].includes(status)) {
      return res.status(400).json({ error: 'status must be "Completed" or "Under Progress"' });
    }
    const result = await query('UPDATE projects SET status = ? WHERE id = ?', [status, req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Project not found' });

    const rows = await query(`${SELECT_PROJECTS} WHERE p.id = ?`, [req.params.id]);
    res.json(mapRow(rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
