const axios = require('axios');

const SCRAPER_URL = process.env.SCRAPER_URL || 'http://localhost:8000';

async function fetchProvider(provider, start, end) {
  const url = `${SCRAPER_URL}/${provider}`;
  const resp = await axios.get(url, { params: { start, end }, timeout: 8000 });
  return resp.data;
}

async function fetchAndAggregate({ start, end }) {
  const providers = ['grab', 'tada'];
  const calls = providers.map(p => fetchProvider(p, start, end).then(r => ({ provider: p, data: r })).catch(e => ({ provider: p, error: e.message })));
  const responses = await Promise.all(calls);

  const normalized = responses.map(r => {
    if (r.error) return { provider: r.provider, error: r.error };
    const rides = (r.data.rides || []).map(rt => ({
      provider: r.provider,
      ride_type: rt.type,
      fare_min: rt.fare_min,
      fare_max: rt.fare_max,
      eta_mins: rt.eta,
      surge: rt.surge || 1.0
    }));
    return { provider: r.provider, rides };
  });

  return { start, end, timestamp: new Date().toISOString(), results: normalized };
}

module.exports = { fetchAndAggregate };