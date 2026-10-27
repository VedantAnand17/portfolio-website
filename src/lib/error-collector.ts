interface ErrorCollectorOptions {
  log: (error: Error, context: Record<string, unknown>) => void;
  limit?: () => Promise<boolean>;
}

export interface ErrorReport {
  message: string;
  stack?: string;
  path: string;
  name?: string;
}

export function redact(value: string): string {
  return value
    .replaceAll(/https?:\/\/[^\s)]+/g, (url) => {
      try {
        const parsed = new URL(url);
        parsed.username = "";
        parsed.password = "";
        parsed.search = "";
        parsed.hash = "";
        return parsed.toString();
      } catch {
        return "[url]";
      }
    })
    .replaceAll(/\bBearer\s+[^\s,;]+/gi, "Bearer [redacted]")
    .replaceAll(
      /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g,
      "[redacted]"
    )
    .replaceAll(
      /\b(?:token|password|secret|api[_-]?key|authorization)\s*[=:]\s*[^\s,;]+/gi,
      "[redacted]"
    )
    .replaceAll(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g, "[email]")
    .slice(0, 4000);
}

async function readReport(request: Request): Promise<unknown | Response> {
  const reader = request.body?.getReader();
  if (!reader) {
    return new Response(null, { status: 400 });
  }
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      // eslint-disable-next-line no-await-in-loop -- Stream chunks must be read sequentially.
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      size += value.byteLength;
      if (size > 8192) {
        // eslint-disable-next-line no-await-in-loop -- Stop the stream before rejecting the oversized report.
        await reader.cancel();
        return new Response(null, { status: 413 });
      }
      chunks.push(value);
    }
    const body = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      body.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return JSON.parse(new TextDecoder().decode(body));
  } catch {
    return new Response(null, { status: 400 });
  }
}

function sanitizeReport(fields: Record<string, unknown>): ErrorReport {
  return {
    message: redact(String(fields.message)).slice(0, 1000),
    stack:
      typeof fields.stack === "string"
        ? redact(fields.stack).slice(0, 3000)
        : undefined,
    name:
      typeof fields.name === "string"
        ? redact(fields.name).slice(0, 100)
        : "Error",
    path:
      typeof fields.path === "string"
        ? redact(fields.path.split(/[?#]/)[0]).slice(0, 256)
        : "/",
  };
}

export async function handleErrorReport(
  request: Request,
  options: ErrorCollectorOptions
): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(null, { status: 405, headers: { allow: "POST" } });
  }
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return new Response(null, { status: 403 });
  }
  const report = await readReport(request);
  if (report instanceof Response) {
    return report;
  }
  if (
    typeof report !== "object" ||
    report === null ||
    !("message" in report) ||
    typeof report.message !== "string" ||
    !report.message.trim()
  ) {
    return new Response(null, { status: 400 });
  }
  if (options.limit && !(await options.limit())) {
    return new Response(null, { status: 429 });
  }
  const sanitized = sanitizeReport(report as Record<string, unknown>);
  const error = new Error(sanitized.message);
  error.name = sanitized.name ?? "Error";
  if (sanitized.stack) {
    error.stack = sanitized.stack;
  }
  options.log(error, {
    source: "browser",
    path: sanitized.path,
    application: "portfolio-website",
  });
  return new Response(null, { status: 204 });
}
