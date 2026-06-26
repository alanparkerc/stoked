const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
const audit = fs.readFileSync(path.join(root, "ai-exposure-audit", "index.html"), "utf8");

const assertions = [
  [
    home.includes("New: AI Exposure + Website Trust Audits") &&
      home.includes('href="/ai-exposure-audit/"'),
    "Homepage CTA links to audit page"
  ],
  [
    audit.includes("Your website should not leak leads, trust, or customer data."),
    "Audit hero headline is present"
  ],
  [
    audit.includes("AI Exposure + Website Trust Audit | Stoked Web Design"),
    "Audit SEO title is present"
  ],
  [
    audit.includes("Stoked audits websites, lead forms, tracking, automations, CRM handoff, and AI tools"),
    "Audit SEO description is present"
  ],
  [
    audit.includes("Book a $150 Report Review") &&
      audit.includes("Request a Free 3-Point Snapshot"),
    "Primary and secondary CTAs are present"
  ]
];

const failures = assertions.filter(([passed]) => !passed).map(([, message]) => message);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Route tests passed.");
