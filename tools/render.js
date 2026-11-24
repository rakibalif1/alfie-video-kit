// Renders an episode folder to silent.mp4 by capturing the scene page frame by frame. Usage: node render.js <episode-dir>
const http = require('http'), fs = require('fs'), path = require('path'), { spawn } = require('child_process');
const ROOT = path.resolve(__dirname, '..'), EP = path.resolve(process.argv[2]);
let pw; try { pw = require('playwright'); } catch (e) { pw = require(path.join(ROOT, 'node_modules/playwright')); }
const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.vrm': 'application/octet-stream', '.css': 'text/css' };
const map = (u) => u.startsWith('/ep/') ? path.join(EP, u.slice(4)) : u.startsWith('/characters/') ? path.join(ROOT, u) : u.startsWith('/node_modules/') ? path.join(ROOT, u) : path.join(ROOT, 'web', u === '/' ? 'scene.html' : u);
const srv = http.createServer((req, res) => {
  const f = map(decodeURIComponent(req.url.split('?')[0]));
  fs.readFile(f, (err, buf) => { if (err) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' }); res.end(buf); });
}).listen(0, '127.0.0.1', async () => {
  const port = srv.address().port;
  const b = await pw.chromium.launch({ ...(process.env.CHROME || fs.existsSync('/opt/pw-browsers/chromium') ? { executablePath: process.env.CHROME || '/opt/pw-browsers/chromium' } : {}), args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 720, height: 1280 } });
  p.on('pageerror', (e) => console.log('pageerror:', String(e).slice(0, 300)));
  await p.goto(`http://127.0.0.1:${port}/scene.html`);
  await p.waitForFunction('window.ready===true', null, { timeout: 120000 });
  const fps = await p.evaluate('window.fps'), dur = await p.evaluate('window.dur'), N = Math.ceil((dur + 0.6) * fps);
  const out = path.join(EP, 'silent.mp4');
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let i = 0; i < N; i++) {
    await p.evaluate(`window.renderAt(${i / fps})`);
    const buf = await p.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if (i % 60 === 0) console.log('frame', i, '/', N, Math.round((Date.now() - t0) / 1000) + 's');
  }
  ff.stdin.end(); await new Promise((r) => ff.on('close', r)); await b.close(); srv.close(); console.log('rendered', N, 'frames');
});
