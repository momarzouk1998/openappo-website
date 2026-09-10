/**
 * Derive the AVIF/WebP frame sets from the master JPEG sequence.
 *
 *   node scripts/build-frames.mjs
 *
 * Output (public/frames/):
 *   frame-NNN.jpg          master, 1920x1080 JPEG q92 — kept as last-resort fallback
 *   1920/frame-NNN.avif    desktop / tablet
 *   1920/frame-NNN.webp
 *   1280/frame-NNN.avif    phones (<=500px CSS): smaller files AND ~55% less
 *   1280/frame-NNN.webp    decoded bitmap memory, which is what makes iOS
 *                          Safari drop frames and paint black.
 *
 * Quality: the owner compared q60/q78/q88/JPEG-q92 side by side at 1:1 on a
 * real phone and could not tell them apart, so q68 sits comfortably above the
 * proven-indistinguishable point. Resolution is never raised above what the
 * viewport can physically render — a 393px phone at dpr 2 paints 786px.
 */
import sharp from "sharp";
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";

const SRC_DIR = "public/frames";
const SETS = [
  { dir: "1920", width: 1920, avif: 68, webp: 85 },
  { dir: "1280", width: 1280, avif: 72, webp: 85 },
];
const CONCURRENCY = 4;

const masters = (await readdir(SRC_DIR))
  .filter((f) => /^frame-\d+\.jpg$/.test(f))
  .sort();

if (!masters.length) {
  console.error(`no master frames in ${SRC_DIR}`);
  process.exit(1);
}
console.log(`${masters.length} master frames\n`);

for (const set of SETS) {
  await mkdir(path.join(SRC_DIR, set.dir), { recursive: true });
}

const jobs = [];
for (const file of masters) {
  for (const set of SETS) {
    const base = file.replace(/\.jpg$/, "");
    jobs.push({ file, set, out: path.join(SRC_DIR, set.dir, `${base}.avif`), fmt: "avif" });
    jobs.push({ file, set, out: path.join(SRC_DIR, set.dir, `${base}.webp`), fmt: "webp" });
  }
}

const totals = {};
let done = 0;
let next = 0;

const worker = async () => {
  while (next < jobs.length) {
    const j = jobs[next++];
    const pipe = sharp(path.join(SRC_DIR, j.file)).resize(j.set.width);
    const buf = await (j.fmt === "avif"
      ? pipe.avif({ quality: j.set.avif })
      : pipe.webp({ quality: j.set.webp })
    ).toBuffer();
    await sharp(buf).toFile(j.out);
    const key = `${j.set.dir}/${j.fmt}`;
    totals[key] = (totals[key] || 0) + buf.length;
    done++;
    if (done % 24 === 0) process.stdout.write(`  ${done}/${jobs.length}\r`);
  }
};
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

let masterBytes = 0;
for (const f of masters) masterBytes += (await stat(path.join(SRC_DIR, f))).size;

const mb = (b) => (b / 1048576).toFixed(1) + " MB";
console.log(`\n\n  master JPEG q92 1920w   ${mb(masterBytes).padStart(8)}  (baseline)`);
for (const [k, v] of Object.entries(totals).sort()) {
  const pct = (100 - (v / masterBytes) * 100).toFixed(0);
  console.log(`  ${k.padEnd(22)} ${mb(v).padStart(8)}  -${pct}%`);
}
