import puppeteer from "puppeteer-core";
import path from "node:path";
import fs from "node:fs";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const SITES = [
  { slug: "softwraith", url: "https://softwraith.com" },
  { slug: "aurexiva", url: "https://aurexiva.in" },
  { slug: "innovathon", url: "https://innovathon.online" },
  { slug: "kpds-studio", url: "https://kpds-studio.vercel.app" },
];

const OUT_DIR = path.resolve("public/assets/work");
fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME_PATH,
  headless: "new",
  defaultViewport: { width: 1440, height: 900 },
});

for (const site of SITES) {
  const page = await browser.newPage();
  try {
    console.log(`Navigating to ${site.url} ...`);
    await page.goto(site.url, { waitUntil: "networkidle2", timeout: 45000 });
    await new Promise((r) => setTimeout(r, 1500)); // let any load animations settle
    const outPath = path.join(OUT_DIR, `${site.slug}.png`);
    await page.screenshot({ path: outPath });
    console.log(`Saved: ${outPath}`);
  } catch (err) {
    console.error(`FAILED for ${site.url}:`, err.message);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log("Done.");
