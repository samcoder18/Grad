import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const MAX_IMAGE_BYTES = 512 * 1024;
// Supplied carousel and Dolce bottle PNGs retain their original source pixels.
// Their dedicated budget avoids lossy recompression of the supplied artwork.
const MAX_SOURCE_BOTTLE_BYTES = 4 * 1024 * 1024;
const sourceBottleImages = new Set([
  "img/apelsin.png",
  "img/barberry.png",
  "img/cola-glass.png",
  "img/feijoa.png",
  "img/grape.png",
  "img/mojito-glass.png",
  "img/pear.png",
  "img/red-apple.png",
  "img/tarragon.png",
  "img/dolce-cola.png",
  "img/dolce-dolce-ave.png",
  "img/dolce-mojito.png",
  "img/dolce-orange.png",
  "img/dolce-lime.png",
]);

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const absolute = path.join(directory, entry.name);
      return entry.isDirectory() ? filesIn(absolute) : [absolute];
    }),
  );
  return nested.flat();
}

const sourceFiles = [
  ...(await filesIn(path.join(root, "src"))).filter((file) => /\.(?:js|jsx|css)$/.test(file)),
  path.join(root, "index.html"),
];
const sources = await Promise.all(sourceFiles.map((file) => readFile(file, "utf8")));
const combined = sources.join("\n");

const referenced = new Set();
for (const match of combined.matchAll(/asset\(\s*["']([^"']+)["']\s*\)/g)) {
  referenced.add(match[1].replace(/^\//, ""));
}
for (const match of combined.matchAll(/(?:src|href|content)=["']([^"']+)["']/g)) {
  const value = match[1];
  if (value.startsWith("data:") || value.startsWith("#")) continue;
  try {
    const pathname = value.startsWith("http") ? new URL(value).pathname : value;
    referenced.add(pathname.replace(/^\/Grad\//, "").replace(/^\//, ""));
  } catch {
    // Dynamic and malformed URLs are ignored; asset() references are handled above.
  }
}

const publicFiles = await filesIn(publicDir);
const existing = new Set(publicFiles.map((file) => path.relative(publicDir, file)));
const missing = [...referenced].filter(
  (file) => /^(?:img|docs)\//.test(file) || /^(?:favicon|apple-touch-icon)/.test(file),
).filter((file) => !existing.has(file));
const unused = [...existing].filter((file) => !combined.includes(file));

const oversized = [];
for (const file of publicFiles.filter((item) => /\.(?:avif|gif|jpe?g|png|webp)$/i.test(item))) {
  const { size } = await stat(file);
  const relative = path.relative(publicDir, file);
  const maxBytes = sourceBottleImages.has(relative) ? MAX_SOURCE_BOTTLE_BYTES : MAX_IMAGE_BYTES;
  if (size > maxBytes) {
    oversized.push(`${path.relative(root, file)} (${(size / 1024).toFixed(1)} KiB)`);
  }
}

if (missing.length || unused.length || oversized.length) {
  if (missing.length) console.error(`Missing public assets:\n- ${missing.join("\n- ")}`);
  if (unused.length) console.error(`Unused public assets:\n- ${unused.join("\n- ")}`);
  if (oversized.length) console.error(`Images over their size budget (512 KiB; original bottle PNGs 4 MiB):\n- ${oversized.join("\n- ")}`);
  process.exitCode = 1;
} else {
  console.log(`Assets OK: ${existing.size} public files are referenced and within budget.`);
}
