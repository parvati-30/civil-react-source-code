require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { testConnection } = require('./db');

const projectsRouter = require('./routes/projects');
const clientsRouter = require('./routes/clients');

const app = express();
const PORT = Number(process.env.PORT || 5000);

app.use(cors());
app.use(express.json());

app.use('/api/projects', projectsRouter);
app.use('/api/clients', clientsRouter);

app.get('/api/health', async (req, res) => {
  try {
    await testConnection();
    res.json({ status: 'ok', db: 'connected', service: 'J.Giridhar Construction API' });
  } catch (err) {
    res.status(500).json({ status: 'error', db: 'disconnected', message: err.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`J.Giridhar Construction API running on port ${PORT}`);
});
