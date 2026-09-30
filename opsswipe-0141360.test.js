// node --test opsswipe-0141360.test.js
const { test } = require('node:test');
const assert = require('node:assert');
const { spawn } = require('node:child_process');

test('GET /api/price returns 200 and expected price', async (t) => {
  const port = 3000 + Math.floor(Math.random() * 1000);
  const proc = spawn(process.execPath, [`${__dirname}/server.js`], { env: { ...process.env, PORT: port } });
  t.after(() => proc.kill());
  const url = `http://127.0.0.1:${port}`;
  for (let i = 0; i < 50; i++) {
    try { await fetch(`${url}/livez`); break; } catch { await new Promise((r) => setTimeout(r, 50)); }
  }

  const res = await fetch(`${url}/api/price`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.deepEqual(body, { plan: 'pro', price: 9 });
});