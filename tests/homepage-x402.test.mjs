import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { readFile } from "node:fs/promises";
import { createServer } from "node:net";
import { after, test } from "node:test";
import { setTimeout as delay } from "node:timers/promises";

let previewServer;

after(async () => {
  if (!previewServer || previewServer.exitCode !== null) {
    return;
  }

  previewServer.kill("SIGTERM");
  await Promise.race([once(previewServer, "exit"), delay(5000)]);
});

async function requestHomepage(port, attemptsRemaining, serverOutput) {
  if (previewServer.exitCode !== null) {
    throw new Error(
      `Astro exited before serving the homepage:\n${serverOutput}`
    );
  }

  try {
    const response = await fetch(`http://127.0.0.1:${port}`, {
      signal: AbortSignal.timeout(1000),
    });
    if (response.ok || response.status >= 500 || attemptsRemaining === 0) {
      return response;
    }
  } catch {
    // A refused connection means the local dev server is still starting.
  }

  if (attemptsRemaining === 0) {
    throw new Error(
      `Astro did not start the production server:\n${serverOutput}`
    );
  }

  await delay(500);
  return requestHomepage(port, attemptsRemaining - 1, serverOutput);
}

test("portfolio pages list all four merged x402 pull requests", async () => {
  const socket = createServer();
  const listening = once(socket, "listening");
  socket.listen(0, "127.0.0.1");
  await listening;
  const { port } = socket.address();
  const closed = once(socket, "close");
  socket.close();
  await closed;

  previewServer = spawn(
    process.execPath,
    [
      "node_modules/wrangler/bin/wrangler.js",
      "dev",
      "--ip",
      "127.0.0.1",
      "--port",
      String(port),
    ],
    { cwd: process.cwd(), stdio: ["ignore", "pipe", "pipe"] }
  );

  let serverOutput = "";
  previewServer.stdout
    .setEncoding("utf-8")
    .on("data", (chunk) => (serverOutput += chunk));
  previewServer.stderr
    .setEncoding("utf-8")
    .on("data", (chunk) => (serverOutput += chunk));

  const response = await requestHomepage(port, 120, serverOutput);

  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(
    html,
    /Four merged pull requests to x402/i,
    "homepage should publish the current merged PR count"
  );
  for (const number of [3051, 2344, 2278, 731]) {
    assert.match(html, new RegExp(`#${number}`));
  }
  assert.match(html, /December 2025 – September 2026/);

  const profilePaths = ["/llms.txt", "/.well-known/llms.txt", "/humans.txt"];
  const profiles = await Promise.all(
    profilePaths.map(async (path) => {
      const response = await fetch(`http://127.0.0.1:${port}${path}`);
      assert.equal(response.status, 200, `${path} should be publicly served`);
      return [path, await response.text()];
    })
  );

  for (const [path, body] of profiles) {
    assert.match(
      body,
      /four merged pull requests/i,
      `${path} should use the current count`
    );
    for (const number of [3051, 2344, 2278, 731]) {
      assert.equal(
        body.includes(`#${number}`) || body.includes(`/pull/${number}`),
        true,
        `${path} should include PR #${number}`
      );
    }
  }

  const humans = profiles.find(([path]) => path === "/humans.txt")?.[1];
  assert.match(humans, /Last update: \d{4}-\d{2}-\d{2}/);

  const { dependencies } = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf-8")
  );
  const astroMajor = dependencies.astro.match(/\d+/)?.[0];
  const reactMajor = dependencies.react.match(/\d+/)?.[0];
  assert.ok(
    humans.includes(`Built with: Astro ${astroMajor}, React ${reactMajor}`),
    "humans.txt should match the installed framework majors"
  );
});
