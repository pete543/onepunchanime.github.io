const fs = require("fs");
const path = require("path");

const root = process.cwd();
const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith(".html"));
const missing = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  for (const href of html.matchAll(/href="([^"]+\.html)"/g)) {
    const target = path.join(root, href[1]);
    if (!fs.existsSync(target)) missing.push(`${file} -> ${href[1]}`);
  }
  for (const src of html.matchAll(/(?:src|href)="(assets\/[^"]+)"/g)) {
    const target = path.join(root, src[1]);
    if (!fs.existsSync(target)) missing.push(`${file} -> ${src[1]}`);
  }
}

if (missing.length) {
  console.error("Missing linked files:");
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML files. All local links resolve.`);
