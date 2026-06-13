const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

const sourcePath = path.join(__dirname, "..", "assets", "images", "product-sheet.png");
const outDir = path.join(__dirname, "..", "assets", "images", "products");

const products = [
  "fig-001", "fig-002", "fig-003", "fig-004",
  "man-001", "man-002", "man-003", "man-004",
  "com-001", "com-002", "acc-001", "acc-002",
  "acc-003", "new-001", "new-002", "pre-001"
];

const outSize = 720;

function sample(source, x, y) {
  const sx = Math.max(0, Math.min(source.width - 1, Math.round(x)));
  const sy = Math.max(0, Math.min(source.height - 1, Math.round(y)));
  return (source.width * sy + sx) << 2;
}

function cropCell(source, index) {
  const col = index % 4;
  const row = Math.floor(index / 4);
  const cell = Math.floor(Math.min(source.width, source.height) / 4);
  const gutter = Math.max(2, Math.round(cell * 0.012));
  const x = col * cell + gutter;
  const y = row * cell + gutter;
  const size = cell - gutter * 2;
  const out = new PNG({ width: outSize, height: outSize });

  for (let oy = 0; oy < outSize; oy += 1) {
    for (let ox = 0; ox < outSize; ox += 1) {
      const src = sample(source, x + (ox / outSize) * size, y + (oy / outSize) * size);
      const dst = (outSize * oy + ox) << 2;
      out.data[dst] = source.data[src];
      out.data[dst + 1] = source.data[src + 1];
      out.data[dst + 2] = source.data[src + 2];
      out.data[dst + 3] = 255;
    }
  }

  return out;
}

fs.mkdirSync(outDir, { recursive: true });
const source = PNG.sync.read(fs.readFileSync(sourcePath));

products.forEach((id, index) => {
  const image = cropCell(source, index);
  fs.writeFileSync(path.join(outDir, `${id}.png`), PNG.sync.write(image, { colorType: 6 }));
});

console.log(`Generated ${products.length} catalog product images.`);
