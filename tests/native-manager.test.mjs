import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { pathToFileURL } from "node:url";

const staticRoot = process.env.NATIVE_STORYBOOK_DIR;
const playwrightPath = process.env.NATIVE_PLAYWRIGHT_ENTRY;
assert.ok(staticRoot, "Set NATIVE_STORYBOOK_DIR to the built fixture");
assert.ok(
  playwrightPath,
  "Set NATIVE_PLAYWRIGHT_ENTRY to playwright-core/index.mjs"
);
const { chromium } = await import(pathToFileURL(playwrightPath).href);

function listen(server, port) {
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", resolve);
  });
}

function close(server) {
  return new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}

const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
};

test("native manager loads and posts story and MDX discussions", async () => {
  const reads = [];
  const inserts = [];
  const postgrest = createServer(async (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.setHeader("Content-Type", "application/json");
    if (request.method === "OPTIONS") {
      response.writeHead(204).end();
      return;
    }
    const url = new URL(request.url, "http://127.0.0.1:4179");
    assert.equal(url.pathname, "/rest/v1/comments_v1");
    if (request.method === "GET") {
      const storyId = url.searchParams.get("storyid").slice(3);
      reads.push(storyId);
      response.end(
        JSON.stringify([
          {
            id: 1,
            author: "Fixture reader",
            comment: `Comment for ${storyId}`,
            createdat: "2026-11-14T12:00:00Z",
            storyid: storyId,
          },
        ])
      );
      return;
    }
    const chunks = [];
    for await (const chunk of request) chunks.push(chunk);
    const inserted = JSON.parse(Buffer.concat(chunks).toString());
    inserts.push(inserted);
    response.writeHead(201).end(JSON.stringify({ ...inserted, id: 2 }));
  });
  const files = createServer(async (request, response) => {
    const pathname = new URL(request.url, "http://127.0.0.1:4178").pathname;
    const relative = pathname === "/" ? "index.html" : pathname.slice(1);
    const file = path.resolve(staticRoot, relative);
    if (!file.startsWith(`${path.resolve(staticRoot)}${path.sep}`)) {
      response.writeHead(403).end();
      return;
    }
    try {
      const bytes = await readFile(file);
      response.setHeader(
        "Content-Type",
        mimeTypes[path.extname(file)] || "application/octet-stream"
      );
      response.end(bytes);
    } catch {
      response.writeHead(404).end();
    }
  });
  await listen(postgrest, 4179);
  await listen(files, 4178);
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    headless: true,
  });
  const page = await browser.newPage();
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  try {
    const external = [];
    page.on("request", (request) => {
      if (
        !new URL(request.url()).hostname.match(/^(127\.0\.0\.1|localhost)$/)
      ) {
        external.push(request.url());
      }
    });
    for (const storyId of [
      "example-button--primary",
      "example-introduction--docs",
    ]) {
      await page.goto(`http://127.0.0.1:4178/?path=/story/${storyId}`);
      await page.getByRole("tab", { name: "Discussion", exact: true }).click();
      await page.getByText(`Comment for ${storyId}`, { exact: true }).waitFor();
      await page
        .getByRole("textbox", { name: "Author Name", exact: true })
        .fill("Fixture author");
      await page
        .getByRole("textbox", { name: "Comment", exact: true })
        .fill(`Posted to ${storyId}`);
      await page.getByRole("button", { name: "Submit", exact: true }).click();
      await page.getByText(`Posted to ${storyId}`, { exact: true }).waitFor();
      assert.equal(inserts.at(-1).storyid, storyId);
      assert.equal(inserts.at(-1).author, "Fixture author");
      assert.ok(reads.includes(storyId));
    }
    assert.deepEqual(external, []);
    assert.deepEqual(pageErrors, []);
  } catch (error) {
    console.error({ reads, inserts, pageErrors, url: page.url() });
    console.error(await page.locator("body").innerText());
    throw error;
  } finally {
    await browser.close();
    await Promise.all([close(files), close(postgrest)]);
  }
});
