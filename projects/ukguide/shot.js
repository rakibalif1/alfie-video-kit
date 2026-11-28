const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file://' + process.argv[2]); await p.waitForFunction('window.READY===true', null, { timeout: 30000 }); await p.waitForTimeout(500);
  await p.screenshot({ path: process.argv[3] }); await b.close(); })();
