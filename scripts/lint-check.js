const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const files = [
  "index.html",
  "ai-exposure-audit/index.html",
  "assets/styles.css"
];

const failures = [];

for (const file of files) {
  const source = fs.readFileSync(path.join(root, file), "utf8");

  if (source.includes("\t")) {
    failures.push(`${file}: contains tab indentation`);
  }

  if (/TODO|FIXME/.test(source)) {
    failures.push(`${file}: contains TODO/FIXME placeholder`);
  }

  if (file.endsWith(".html")) {
    if (!/<meta\s+name="viewport"/.test(source)) {
      failures.push(`${file}: missing viewport meta tag`);
    }

    if (!/<title>[^<]+<\/title>/.test(source)) {
      failures.push(`${file}: missing title`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Lint check passed.");
