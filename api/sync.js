const JBIN_ID = '6a426488f5f4af5e29415db9';
const JBIN_KEY = '$2a$10$CkseSO40Mt.FaerRwwXjRO38sWuT8XS6lkTWeU6cyM9JBAUSmz6Ka';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const headers = {
    'X-Master-Key': JBIN_KEY,
    'X-Bin-Meta': 'false',
    'Content-Type': 'application/json',
  };

  if (req.method === 'GET') {
    const r = await fetch(`https://api.jsonbin.io/v3/b/${JBIN_ID}/latest`, { headers });
    const data = await r.json();
    return res.status(r.status).json(data);
  }

  if (req.method === 'PUT') {
    const body = JSON.stringify(req.body);
    const r = await fetch(`https://api.jsonbin.io/v3/b/${JBIN_ID}`, {
      method: 'PUT', headers, body
    });
    const data = await r.json();
    return res.status(r.status).json(data);
  }

  res.status(405).end();
}
