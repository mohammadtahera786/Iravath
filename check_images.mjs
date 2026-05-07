import fs from 'fs';
import https from 'https';

const code = fs.readFileSync('src/data/menu.ts', 'utf8');
const urls = [...code.matchAll(/https:\/\/images\.unsplash\.com[^"']+/g)].map(m => m[0]);

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.request(url, { method: 'HEAD' }, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 400) {
        resolve({ url, status: 'OK' });
      } else {
        resolve({ url, status: 'BROKEN', code: res.statusCode });
      }
    }).on('error', () => resolve({ url, status: 'ERROR' })).end();
  });
}

Promise.all(urls.map(checkUrl)).then(results => {
  const broken = results.filter(r => r.status !== 'OK');
  if (broken.length === 0) {
    console.log("All Unsplash images are OK.");
  } else {
    console.log("Broken images:");
    console.log(JSON.stringify(broken, null, 2));
  }
});
