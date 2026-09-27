// Captures the real URL Shortener (https://urlshortener.thomasmoserdev.com) for the portfolio hover video.
// Run: HOVER_KIT_DIR=<portfolio>/resources/hover-videos/kit HOVER_KIT_DEPS=<deps>/package.json node capture.mjs
//
// The form is never submitted: a submit inserts a row in the production database, and the
// app cannot run locally without that Postgres database. The video therefore shows real typing,
// the cursor reaching "Shorten", and the footer's Contact dialog, but no shortened result.
import { writeFileSync } from "node:fs";
const { openBrowser, warmUp, shoot, box } = await import(`${process.env.HOVER_KIT_DIR}/capture.mjs`);

const dir = new URL("./captures", import.meta.url).pathname;
const SITE = "https://urlshortener.thomasmoserdev.com";
const URL_TEXT = "https://thomasmoserdev.com";
const { browser, page } = await openBrowser();
const layout = { text: URL_TEXT };

await page.goto(SITE, { waitUntil: "networkidle" });
await warmUp(page);
await page.mouse.move(1270, 790);
await page.waitForTimeout(300);
await shoot(page, dir, "home", { full: false });

// One capture per typed character. Only the form row changes while typing, so each state is
// captured as a clip of that row (placed back at the same position in the composition).
const input = 'input[type="url"]';
layout.input = await box(page, input);
layout.button = await box(page, 'button[type="submit"]');
const clip = { x: layout.input.x - 10, y: layout.input.y - 10, width: layout.input.w + layout.button.w + 20, height: layout.input.h + 20 };
layout.clip = clip;
await page.click(input, { position: { x: 60, y: 24 } });
await page.mouse.move(1270, 790);
for (let i = 1; i <= URL_TEXT.length; i++) {
  await page.keyboard.type(URL_TEXT[i - 1]);
  await page.waitForTimeout(80);
  await page.screenshot({ path: `${dir}/typed-${i}.png`, clip });
}
await page.hover('button[type="submit"]');
await page.waitForTimeout(300);
await page.screenshot({ path: `${dir}/typed-full.png`, fullPage: true });

// Footer: hover the Contact link, then open the real Contact dialog (it only lists links).
await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
await page.waitForTimeout(400);
layout.scroll = await page.evaluate(() => window.scrollY);
layout.contact = await box(page, "text=Contact");
await page.hover("text=Contact");
await page.waitForTimeout(400);
await shoot(page, dir, "footer-hover", { full: false });
await page.click("text=Contact");
await page.mouse.move(1270, 790);
await page.waitForTimeout(1200);
await shoot(page, dir, "contact", { full: false });
layout.linkedin = await box(page, "[role=dialog] >> text=LinkedIn");

writeFileSync(`${dir}/layout.js`, `window.LAYOUT = ${JSON.stringify(layout, null, 2)};\n`);
console.log(JSON.stringify(layout));
await browser.close();
