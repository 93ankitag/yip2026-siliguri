const SUPABASE_URL = 'https://yukimwzugeyhlegrmxql.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1a2ltd3p1Z2V5aGxlZ3JteHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3OTYyMzgsImV4cCI6MjA5ODM3MjIzOH0.Erf2en-1vgvPg7pLTs4RhBhSf26uux2bSMUWYafzft0';

const HEADERS = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/app_data?id=eq.1&select=data`, { headers: HEADERS });
    const rows = await r.json();
    const data = rows?.[0]?.data || {};
    return res.status(200).json(data);
  }

  if (req.method === 'PUT') {
    const data = req.body;
    const r = await fetch(`${SUPABASE_URL}/rest/v1/app_data?id=eq.1`, {
      method: 'PATCH',
      headers: { ...HEADERS, 'Prefer': 'return=minimal' },
      body: JSON.stringify({ data }),
    });
    return res.status(r.ok ? 200 : 500).json({ ok: r.ok });
  }

  res.status(405).end();
}
