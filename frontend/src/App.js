import React, { useState } from 'react';
import axios from 'axios';

function App(){
  const [start, setStart] = useState('Orchard Road');
  const [end, setEnd] = useState('Changi Airport');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try{
      const resp = await axios.get(`${API}/api/fare`, { params: { start, end } });
      setResult(resp.data);
    }catch(err){
      setResult({ error: err.message });
    }finally{setLoading(false)}
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Ride Fare Comparator — MVP</h1>
      <form onSubmit={submit} style={{ marginBottom: 12 }}>
        <div>
          <label>Start: <input value={start} onChange={e=>setStart(e.target.value)} /></label>
        </div>
        <div>
          <label>End: <input value={end} onChange={e=>setEnd(e.target.value)} /></label>
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Searching...' : 'Compare Fares'}</button>
      </form>

      {result && result.error && <div style={{ color: 'red' }}>Error: {result.error}</div>}

      {result && !result.error && (
        <div>
          <h2>Results</h2>
          <div>From <b>{result.start}</b> to <b>{result.end}</b> — {new Date(result.timestamp).toLocaleString()}</div>
          {result.results.map((p, i) => (
            <div key={i} style={{ border: '1px solid #ddd', padding: 10, marginTop: 8 }}>
              <h3>{p.provider.toUpperCase()}</h3>
              {p.error && <div style={{color:'red'}}>Error: {p.error}</div>}
              {p.rides && p.rides.map((r, idx) => (
                <div key={idx} style={{ padding: 6 }}>
                  <b>{r.ride_type}</b> — ETA: {r.eta_mins} mins — Fare: S${r.fare_min.toFixed(2)} - S${r.fare_max.toFixed(2)} — Surge: x{r.surge}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default App;