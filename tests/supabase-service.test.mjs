import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createServer } from "node:http";
import { rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";

const testsDir = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(testsDir, ".cache");
const rows = [
  {
    id: 1,
    author: "Ari",
    comment: "For this story",
    createdat: "2026-11-14T12:00:00.000Z",
    storyid: "story-123",
  },
  {
    id: 2,
    author: "Bo",
    comment: "For another story",
    createdat: "2026-11-14T12:01:00.000Z",
    storyid: "story-456",
  },
];
let server;
let service;
let origin;
let receivedInsert;

before(async () => {
  await build({ configFile: path.join(testsDir, "vite.config.mjs") });
  ({ Comment_V1_Service: service } = await import(
    pathToFileURL(path.join(outputDir, "comment-service.mjs")).href
  ));

  server = createServer(async (request, response) => {
    const requestUrl = new URL(request.url, "http://127.0.0.1");
    if (requestUrl.pathname !== "/rest/v1/comments_v1") {
      response.writeHead(404).end();
      return;
    }

    response.setHeader("content-type", "application/json; charset=utf-8");
    if (request.method === "GET") {
      const storyFilter = requestUrl.searchParams.get("storyid");
      if (storyFilter === "eq.error-story") {
        response.writeHead(400).end(
          JSON.stringify({
            code: "PGRST100",
            details: null,
            hint: null,
            message: "Fixture rejected this story query",
          })
        );
        return;
      }

      const storyId = storyFilter?.replace(/^eq\./, "");
      const result = rows.filter((row) => row.storyid === storyId);
      response.writeHead(200, {
        "content-range": `0-${result.length - 1}/${result.length}`,
      });
      response.end(JSON.stringify(result));
      return;
    }

    if (request.method === "POST") {
      const chunks = [];
      for await (const chunk of request) chunks.push(chunk);
      receivedInsert = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      const inserted = { ...receivedInsert, id: 3 };
      rows.push(inserted);
      response.writeHead(201);
      response.end(JSON.stringify(inserted));
      return;
    }

    response.writeHead(405).end();
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  origin = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server?.listening) {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve()))
    );
  }
  await rm(outputDir, { recursive: true, force: true });
});

test("comments_v1 uses the real Supabase client for scoped reads, inserts, and errors", async () => {
  assert.throws(() => new service("", "fixture-key"), /Invalid supabaseUrl/);

  const comments = new service(origin, "fixture-key");
  const loaded = await comments.getBy("storyid", "story-123");
  assert.equal(loaded.error, null);
  assert.deepEqual(
    loaded.data.map(({ storyid }) => storyid),
    ["story-123"]
  );
  assert.equal(loaded.data[0].comment, "For this story");

  const posted = await comments.insert({
    author: "Casey",
    comment: "A new note",
    createdAt: "2026-11-14T12:02:00.000Z",
    storyId: "story-123",
  });
  assert.equal(posted.error, null);
  assert.deepEqual(receivedInsert, {
    author: "Casey",
    comment: "A new note",
    createdat: "2026-11-14T12:02:00.000Z",
    storyid: "story-123",
  });
  assert.equal(posted.data.id, 3);
  assert.equal(posted.data.storyid, "story-123");

  const rejected = await comments.getBy("storyid", "error-story");
  assert.equal(rejected.data, null);
  assert.equal(rejected.error.code, "PGRST100");
  assert.equal(rejected.error.message, "Fixture rejected this story query");
});
