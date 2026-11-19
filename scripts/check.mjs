// Checks every page at 375, 768 and 1440 px for horizontal overflow and saves screenshots.
//   npm install && npx playwright install chromium   (once)
//   npm run check
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';
import { startServer } from './serve.mjs';

const PAGES = ['index.html', 'impressum.html', 'datenschutz.html', '404.html'];
const WIDTHS = [375, 768, 1440];
const OUT = 'docs/screenshots';
mkdirSync(OUT, { recursive: true });

const server = await startServer(8091);
const browser = await chromium.launch();
let problems = 0;
for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  for (const p of PAGES) {
    await page.goto(`http://localhost:8091/${p}`, { waitUntil: 'networkidle' });
    const r = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const wide = [];
      for (const el of document.querySelectorAll('body *')) {
        const b = el.getBoundingClientRect();
        if (b.width && (b.right > vw + 1 || b.left < -1)) wide.push(el.tagName.toLowerCase() + '.' + [...el.classList].join('.'));
      }
      return { scroll: document.documentElement.scrollWidth - vw, wide: wide.slice(0, 5), external: [...document.querySelectorAll('link[href^="http"], script[src^="http"], img[src^="http"]')].length };
    });
    const ok = r.scroll <= 0 && r.wide.length === 0 && r.external === 0;
    if (!ok) problems++;
    const name = `${p.replace('.html', '')}-${width}.png`;
    await page.screenshot({ path: `${OUT}/${name}`, fullPage: true });
    console.log(`${ok ? 'OK  ' : 'FEHL'} ${String(width).padEnd(5)} ${p.padEnd(18)} ${ok ? '' : JSON.stringify(r)}`);
  }
  await page.close();
}
await browser.close();
server.close();
console.log(problems ? `\n${problems} Problem(e) gefunden.` : '\nKein seitlicher Überlauf, keine externen Ressourcen.');
process.exit(problems ? 1 : 0);
