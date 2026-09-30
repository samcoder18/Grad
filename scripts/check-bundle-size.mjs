import { readdir, readFile, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import path from "node:path";

const assetsDir = path.join(process.cwd(), "dist", "assets");
const MAX_JS_BYTES = 625 * 1024;
const MAX_JS_GZIP_BYTES = 205 * 1024;
const jsFiles = (await readdir(assetsDir)).filter((file) => file.endsWith(".js"));

if (!jsFiles.length) {
  console.error("No JavaScript bundle found in dist/assets. Run the build first.");
  process.exit(1);
}

let rawBytes = 0;
let gzipBytes = 0;
for (const file of jsFiles) {
  rawBytes += (await stat(path.join(assetsDir, file))).size;
  gzipBytes += gzipSync(await readFile(path.join(assetsDir, file))).length;
}

const rawKiB = rawBytes / 1024;
const gzipKiB = gzipBytes / 1024;
console.log(`JavaScript budget: ${rawKiB.toFixed(1)} KiB raw / ${gzipKiB.toFixed(1)} KiB gzip.`);

if (rawBytes > MAX_JS_BYTES || gzipBytes > MAX_JS_GZIP_BYTES) {
  console.error("JavaScript bundle exceeds the 625 KiB raw / 205 KiB gzip budget.");
  process.exitCode = 1;
}
