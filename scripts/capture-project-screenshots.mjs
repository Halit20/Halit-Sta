// Project-site screenshot capture — CDP, no deps (Node >= 22).
// Visits each public project URL, captures a 1440x1000 WebP thumbnail.
import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9334;
const OUT = process.argv[2];
mkdirSync(OUT, { recursive: true });

const SITES = [
  ["aspire-academy-london", "https://aspireacademylondon.com/"],
  ["al-monte", "https://www.al-monte.de/"],
  ["blender-fahrzeugtechnik", "https://blender-fahrzeugtechnik.de/"],
  ["coll-hills-kitchen", "https://coll-hills-kitchen.com/"],
  ["artanhaus-gebaeudetechnik", "https://artanhaus-gebaeudetechnik.de/"],
  ["perparim-mont", "https://www.perparim-mont.com/"],
  ["lasa-bau", "https://lasa-bau.de/"],
  ["mint-walldorf", "https://mint-walldorf.de/"],
  ["rudari-gartenbau", "https://www.rudari-gartenbau.de/"],
  ["energytech-ks", "https://energytech-ks.light-gears.de/"],
  ["energytech-inventory-login", "https://inv.energytech-ks.com.light-gears.de/login.php"],
  ["nitro-festival", "https://nitro-festival.light-gears.de/"],
  ["mpv-gmbh-login", "https://mpv-gmbh.light-gears.de/#/login"],
  ["lgs-marketplace", "https://market.light-gears.de/"],
  ["kurtaj", "https://kurtaj.light-gears.de/"],
  ["lgs-dash-login", "https://dash.light-gears.de/"],
  ["batllava-premium-resort", "https://www.batllavaresort.com/"],
  ["ecofruits-ks", "https://ecofruits-ks.com/"],
  ["krasniqi-detailing-co", "https://krasniqidetailingco.com/", "http://krasniqidetailingco.com/"],
  ["gerdoc-pizza", "https://gerdocpizza.com/"],
];

const chrome = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`,
  "--headless=new",
  "--hide-scrollbars",
  "--disable-gpu-sandbox",
  "--no-first-run",
  "--no-default-browser-check",
  "--mute-audio",
  `--user-data-dir=${OUT}\\chrome-profile`,
  "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForCdp() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json`);
      const targets = await res.json();
      const page = targets.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(500);
  }
  throw new Error("CDP endpoint never came up");
}

let id = 0;
const pending = new Map();
let ws;
function send(method, params = {}, timeoutMs = 30000) {
  return new Promise((resolve, reject) => {
    const mid = ++id;
    const timer = setTimeout(() => {
      pending.delete(mid);
      reject(new Error(`${method} timed out`));
    }, timeoutMs);
    pending.set(mid, {
      resolve: (v) => { clearTimeout(timer); resolve(v); },
      reject: (e) => { clearTimeout(timer); reject(e); },
    });
    ws.send(JSON.stringify({ id: mid, method, params }));
  });
}

async function capture(slug, url) {
  await send("Page.navigate", { url });
  await sleep(9000); // load + fonts + hero animations settle
  // hide cookie banners heuristically (common consent containers)
  await send("Runtime.evaluate", {
    expression: `
      for (const sel of ['#cookie-banner','.cookie-banner','#cookieConsent',
        '.cc-window','#CybotCookiebotDialog','#usercentrics-root',
        '.cmplz-cookiebanner','#cmplz-cookiebanner-container','#onetrust-consent-sdk',
        '[id*="cookie" i][class*="banner" i]','.elementor-popup-modal']) {
        document.querySelectorAll(sel).forEach(e => e.style.display = 'none');
      } window.scrollTo(0, 0); true;
    `,
  }).catch(() => {});
  await sleep(800);
  const shot = await send("Page.captureScreenshot", { format: "webp", quality: 84 });
  writeFileSync(`${OUT}\\${slug}.webp`, Buffer.from(shot.data, "base64"));
  console.log(`OK   ${slug}`);
}

async function main() {
  const wsUrl = await waitForCdp();
  ws = new WebSocket(wsUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    }
  };

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false,
  });

  const failed = [];
  for (const [slug, url, fallbackUrl] of SITES) {
    try {
      await capture(slug, url);
    } catch (e) {
      if (fallbackUrl) {
        try {
          await capture(slug, fallbackUrl);
          continue;
        } catch (e2) {
          failed.push([slug, String(e2.message || e2)]);
          console.log(`FAIL ${slug}: ${e2.message || e2}`);
          continue;
        }
      }
      failed.push([slug, String(e.message || e)]);
      console.log(`FAIL ${slug}: ${e.message || e}`);
    }
  }

  console.log("--- summary ---");
  console.log(`captured: ${SITES.length - failed.length}/${SITES.length}`);
  for (const [slug, err] of failed) console.log(`failed: ${slug} — ${err}`);
  ws.close();
  chrome.kill();
}

main().catch((e) => { console.error(e); chrome.kill(); process.exit(1); });
