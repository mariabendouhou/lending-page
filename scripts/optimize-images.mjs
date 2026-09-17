import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';

const PUBLIC_DIR = path.resolve(import.meta.dirname, '..', 'public');

// maxWidth is picked from how large the image ever renders on screen (with
// a ~2x allowance for retina displays), not the source resolution.
const IMAGES = [
  { file: 'ChatGPT Image Sep 10, 2026, 01_39_31 PM.png', maxWidth: 1920, quality: 72 }, // hero-bg
  { file: 'ChatGPT Image Sep 10, 2026, 04_02_57 PM.png', maxWidth: 1600, quality: 72 }, // ps-banner-bg-img
  { file: 'cta-bg.png', maxWidth: 1920, quality: 72 }, // final-cta background
  { file: 'wall-switch.png', maxWidth: 300, quality: 80 }, // small card preview
  { file: 'smart-kitchen.png', maxWidth: 900, quality: 76 },
  { file: 'phoneMockup.png', maxWidth: 800, quality: 82 }, // hero phone screenshot
  { file: 'dashboard.png', maxWidth: 1200, quality: 80 },
  { file: 'dashboard-laptop-mockup.png', maxWidth: 1200, quality: 80 },
  { file: 'facture.png', maxWidth: 300, quality: 80 }, // small card preview
  { file: 'phone-yaniss.png', maxWidth: 900, quality: 84 }, // main comparison phone screenshot
  { file: 'ChatGPT Image Sep 14, 2026, 08_27_53 PM.png', maxWidth: 900, quality: 82 }, // fallback for phone-yaniss
  { file: 'logo.png', maxWidth: 400, quality: 88 },
  { file: 'logo-brand.png', maxWidth: 400, quality: 88 },
];

const results = [];

for (const { file, maxWidth, quality } of IMAGES) {
  const srcPath = path.join(PUBLIC_DIR, file);
  if (!fs.existsSync(srcPath)) {
    console.warn(`SKIP (not found): ${file}`);
    continue;
  }
  const outFile = file.replace(/\.png$/i, '.webp');
  const outPath = path.join(PUBLIC_DIR, outFile);
  const beforeSize = fs.statSync(srcPath).size;

  await sharp(srcPath)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality })
    .toFile(outPath);

  const afterSize = fs.statSync(outPath).size;
  results.push({ file, outFile, beforeSize, afterSize });
  fs.unlinkSync(srcPath);
}

let totalBefore = 0;
let totalAfter = 0;
for (const r of results) {
  totalBefore += r.beforeSize;
  totalAfter += r.afterSize;
  console.log(
    `${r.file} -> ${r.outFile}: ${(r.beforeSize / 1024).toFixed(0)}KB -> ${(r.afterSize / 1024).toFixed(0)}KB`
  );
}
console.log(
  `\nTOTAL: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB`
);
