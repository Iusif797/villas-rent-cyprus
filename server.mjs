import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(".");
const port = Number(process.env.PORT || 4173);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".webm": "video/webm",
  ".webp": "image/webp",
};

const toFilePath = (url) => {
  const pathname = decodeURIComponent(new URL(url, `http://localhost:${port}`).pathname);
  const normalized = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const target = join(root, normalized === "/" ? "index.html" : normalized);
  return target.startsWith(root) ? target : join(root, "index.html");
};

const sendFile = (request, response, filePath) => {
  const stat = statSync(filePath);
  const type = types[extname(filePath).toLowerCase()] || "application/octet-stream";
  const range = request.headers.range;

  response.setHeader("Accept-Ranges", "bytes");
  response.setHeader("Content-Type", type);
  response.setHeader("Cache-Control", "no-store");

  if (!range) {
    response.writeHead(200, { "Content-Length": stat.size });
    createReadStream(filePath).pipe(response);
    return;
  }

  const [startValue, endValue] = range.replace(/bytes=/, "").split("-");
  const start = Number.parseInt(startValue, 10);
  const end = endValue ? Number.parseInt(endValue, 10) : stat.size - 1;

  if (Number.isNaN(start) || Number.isNaN(end) || start >= stat.size || end >= stat.size) {
    response.writeHead(416, { "Content-Range": `bytes */${stat.size}` });
    response.end();
    return;
  }

  response.writeHead(206, {
    "Content-Length": end - start + 1,
    "Content-Range": `bytes ${start}-${end}/${stat.size}`,
  });
  createReadStream(filePath, { start, end }).pipe(response);
};

createServer((request, response) => {
  const filePath = toFilePath(request.url || "/");

  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  sendFile(request, response, filePath);
}).listen(port, () => {
  console.log(`Villa scroll film running at http://localhost:${port}/`);
});
