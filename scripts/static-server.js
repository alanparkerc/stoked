const fs = require("fs");
const http = require("http");
const path = require("path");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 4173);
const host = "127.0.0.1";

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".avif": "image/avif",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png"
};

function resolveFile(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]);
  const relative = cleanPath === "/" ? "index.html" : cleanPath.replace(/^\/+/, "");
  const candidate = path.resolve(root, relative);

  if (!candidate.startsWith(root)) {
    return null;
  }

  if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
    return path.join(candidate, "index.html");
  }

  return candidate;
}

const server = http.createServer((request, response) => {
  const file = resolveFile(request.url || "/");

  if (!file || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const contentType = types[path.extname(file)] || "application/octet-stream";
  response.writeHead(200, { "Content-Type": contentType });
  fs.createReadStream(file).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Stoked static server running at http://${host}:${port}/`);
});
