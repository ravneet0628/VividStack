/**
 * Capture portfolio desktop + mobile PNGs from live URLs.
 *
 * - Waits 2s after load for layout/fonts (per plan).
 * - Chromium args reduce automation fingerprint / infobar noise; not generative images.
 * - Desktop: capture slightly above final width, then resize to 1024px wide for a modest
 *   zoom-out (tweak DESKTOP_CAPTURE if heroes feel too tight vs too small).
 *
 * Run: npm run capture:portfolio
 * Requires: npx playwright install chromium
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, "..", "src", "assets");

const SETTLE_MS = 2000;
const NAV_TIMEOUT_MS = 120_000;

/** Between 1024 (tight) and 1440 (too wide); ~15% zoom-out vs 1024-native */
const DESKTOP_CAPTURE = { width: 1200, height: 750 };
const DESKTOP_OUTPUT_WIDTH = 1024;

const targets = [
  {
    url: "https://resetat30.pages.dev/",
    desktop: "resetat30.png",
    mobile: "resetat30_mobile.png",
  },
  {
    url: "https://hmglobalinc.com/",
    desktop: "hmglobal.png",
    mobile: "hmglobal_mobile.png",
  },
  {
    url: "https://top-insurance.pages.dev/",
    desktop: "securechoice.png",
    mobile: "securechoice_mobile.png",
  },
  {
    url: "https://shivstudio.onrender.com/",
    desktop: "photolp.png",
    mobile: "photolp_mobile.png",
  },
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function captureViewport(page, outPath) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(SETTLE_MS);
  await page.screenshot({ path: outPath, type: "png", animations: "disabled" });
}

async function captureDesktopZoomedOut(page, outPath) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(SETTLE_MS);
  const buf = await page.screenshot({ type: "png", animations: "disabled" });
  await sharp(buf)
    .resize({ width: DESKTOP_OUTPUT_WIDTH })
    .png()
    .toFile(outPath);
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: [
      "--disable-blink-features=AutomationControlled",
      "--disable-infobars",
      `--window-size=${DESKTOP_CAPTURE.width},${DESKTOP_CAPTURE.height}`,
    ],
    ignoreDefaultArgs: ["--enable-automation"],
  });

  try {
    for (const t of targets) {
      console.log("Desktop:", t.url);
      const desktopCtx = await browser.newContext({
        viewport: {
          width: DESKTOP_CAPTURE.width,
          height: DESKTOP_CAPTURE.height,
        },
        deviceScaleFactor: 1,
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      });
      const dPage = await desktopCtx.newPage();
      await dPage.goto(t.url, {
        waitUntil: "domcontentloaded",
        timeout: NAV_TIMEOUT_MS,
      });
      await captureDesktopZoomedOut(
        dPage,
        path.join(assetsDir, t.desktop),
      );
      await desktopCtx.close();

      console.log("Mobile:", t.url);
      const mobileCtx = await browser.newContext({
        viewport: { width: 500, height: 749 },
        deviceScaleFactor: 1,
        userAgent:
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      });
      const mPage = await mobileCtx.newPage();
      await mPage.goto(t.url, {
        waitUntil: "domcontentloaded",
        timeout: NAV_TIMEOUT_MS,
      });
      await captureViewport(mPage, path.join(assetsDir, t.mobile));
      await mobileCtx.close();

      console.log("OK:", t.desktop, t.mobile);
    }
  } finally {
    await browser.close();
  }

  console.log("Done. Wrote 8 files under src/assets/");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
