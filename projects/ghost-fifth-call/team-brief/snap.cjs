// node snap.js t1,t2,... [outdir]   -> snap_<t>.jpg from index.html (seeks the paused GSAP timeline), then prints file names
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
(async () => {
  const ts = process.argv[2].split(',').map(Number), out = process.argv[3] || path.join(__dirname, 'snaps'), html = process.argv[4] || path.join(__dirname, 'index.html'); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  p.on('pageerror', (e) => console.log('pageerror:', String(e).slice(0, 240)));
  await p.goto('file://' + html, { waitUntil: 'domcontentloaded' }); await p.waitForFunction('!!(window.__timelines && window.__timelines.main)', null, { timeout: 90000 });
  for (const t of ts) { await p.evaluate((x) => { const tl = window.__timelines.main; tl.pause(); tl.seek(x, false); document.querySelectorAll('.clip[data-start]').forEach((e) => { const a = +e.dataset.start, d = +e.dataset.duration; e.style.display = (x >= a && x < a + d) ? 'block' : 'none'; }); }, t); await p.waitForTimeout(150); await p.screenshot({ path: path.join(out, `snap_${t}.jpg`), type: 'jpeg', quality: 82 }); console.log('snap_' + t + '.jpg'); }
  await b.close();
})().catch((e) => { console.log('FAIL', String(e).slice(0, 300)); process.exit(1); });
