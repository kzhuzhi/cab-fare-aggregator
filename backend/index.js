const express = require('express');
const cors = require('cors');
const fareAggregator = require('./fareAggregator');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({status: 'ok'}));

app.get('/api/fare', async (req, res) => {
  const { start, end } = req.query;
  if (!start || !end) return res.status(400).json({ error: 'start and end required' });
  try {
    const result = await fareAggregator.fetchAndAggregate({ start, end });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));