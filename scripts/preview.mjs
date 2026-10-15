import { parseArgs } from "node:util";

import { unstable_startWorker } from "wrangler";

const { values } = parseArgs({
  options: { port: { type: "string", default: "3100" } },
});
const worker = await unstable_startWorker({
  config: "wrangler.jsonc",
  dev: {
    remote: false,
    inferOriginFromRoutes: false,
    server: { hostname: "127.0.0.1", port: Number(values.port) },
  },
});
await worker.ready;
console.log(`Worker preview ready at ${await worker.url}`);
async function stop() {
  await worker.dispose();
  process.exit(0);
}
process.once("SIGINT", stop);
process.once("SIGTERM", stop);
