const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForFunction('!!(window.__timelines&&window.__timelines.main)',null,{timeout:60000}).catch(e=>errs.push('timeout'));
for(const t of process.argv.slice(4)){await p.evaluate((t)=>{window.__timelines.main.seek(+t,false);return 0;},t);await p.waitForTimeout(250);await p.screenshot({path:process.argv[3]+'_'+t+'.png'});}
console.log('errors',errs.slice(0,4));await b.close()})();
