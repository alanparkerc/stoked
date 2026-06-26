const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const required = [
  "index.html",
  "ai-exposure-audit/index.html",
  "assets/styles.css",
  "assets/ai-exposure-hero.png"
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));

if (missing.length) {
  console.error(`Missing required build artifacts: ${missing.join(", ")}`);
  process.exit(1);
}

console.log("Build check passed: static site files are present.");
