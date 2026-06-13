const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

const sourcePath = path.join(__dirname, "..", "assets", "images", "emporium-hero.png");
const outDir = path.join(__dirname, "..", "assets", "images", "products");

const products = [
  "fig-001", "fig-002", "fig-003", "fig-004",
  "man-001", "man-002", "man-003", "man-004",
  "com-001", "com-002", "acc-001", "acc-002",
  "acc-003", "new-001", "new-002", "pre-001"
];

const crops = [
  [0.58, 0.18, 0.19, 0.28],
  [0.72, 0.17, 0.18, 0.30],
  [0.86, 0.12, 0.12, 0.40],
  [0.62, 0.42, 0.20, 0.28],
  [0.30, 0.30, 0.22, 0.28],
  [0.40, 0.28, 0.22, 0.32],
  [0.48, 0.27, 0.24, 0.30],
  [0.34, 0.50, 0.22, 0.30],
  [0.50, 0.45, 0.26, 0.30],
  [0.58, 0.08, 0.30, 0.22],
  [0.83, 0.46, 0.12, 0.32],
  [0.92, 0.42, 0.08, 0.38],
  [0.73, 0.56, 0.22, 0.24],
  [0.17, 0.56, 0.28, 0.26],
  [0.56, 0.66, 0.26, 0.20],
  [0.68, 0.54, 0.22, 0.26]
];

const outWidth = 720;
const outHeight = 405;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function sample(source, x, y) {
  const sx = clamp(Math.round(x), 0, source.width - 1);
  const sy = clamp(Math.round(y), 0, source.height - 1);
  return (source.width * sy + sx) << 2;
}

function makeImage(source, crop) {
  const [xRatio, yRatio, wRatio, hRatio] = crop;
  const x = Math.round(source.width * xRatio);
  const y = Math.round(source.height * yRatio);
  const w = Math.round(source.width * wRatio);
  const h = Math.round(source.height * hRatio);
  const out = new PNG({ width: outWidth, height: outHeight });

  for (let oy = 0; oy < outHeight; oy += 1) {
    for (let ox = 0; ox < outWidth; ox += 1) {
      const sx = x + (ox / outWidth) * w;
      const sy = y + (oy / outHeight) * h;
      const src = sample(source, sx, sy);
      const dst = (outWidth * oy + ox) << 2;
      out.data[dst] = Math.min(255, Math.round(source.data[src] * 1.04));
      out.data[dst + 1] = Math.min(255, Math.round(source.data[src + 1] * 1.04));
      out.data[dst + 2] = Math.min(255, Math.round(source.data[src + 2] * 1.06));
      out.data[dst + 3] = 255;
    }
  }

  return out;
}

fs.mkdirSync(outDir, { recursive: true });
const source = PNG.sync.read(fs.readFileSync(sourcePath));

products.forEach((id, index) => {
  const image = makeImage(source, crops[index]);
  fs.writeFileSync(path.join(outDir, `${id}.png`), PNG.sync.write(image, { colorType: 6 }));
});

console.log(`Generated ${products.length} product images.`);
