import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const source = path.join(root, "public", "aiio-architecture.png");
const outputDir = path.join(root, "public", "system-layers");

const width = 1600;
const height = 960;
const brand = "#5A328A";

const layers = [
  {
    file: "grounding-layer-system-v7.jpg",
    start: 0,
    end: 414,
    glowX: 1040,
    glowY: 245,
    glowW: 920,
    glowH: 305,
  },
  {
    file: "understanding-layer-system-v7.jpg",
    start: 305,
    end: 688,
    glowX: 1010,
    glowY: 510,
    glowW: 880,
    glowH: 265,
  },
  {
    file: "transformation-layer-system-v7.jpg",
    start: 590,
    end: 960,
    glowX: 1010,
    glowY: 760,
    glowW: 900,
    glowH: 305,
  },
];

const idleFile = "layer-system-muted-v1.jpg";

function svg(input) {
  return Buffer.from(input);
}

function maskSvg({ start, end }) {
  const soft = 78;
  const stop = (value) => Math.max(0, Math.min(1, value / height)).toFixed(4);

  return svg(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="band" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="white" stop-opacity="0"/>
          <stop offset="${stop(start)}" stop-color="white" stop-opacity="0"/>
          <stop offset="${stop(start + soft)}" stop-color="white" stop-opacity="1"/>
          <stop offset="${stop(end - soft)}" stop-color="white" stop-opacity="1"/>
          <stop offset="${stop(end)}" stop-color="white" stop-opacity="0"/>
          <stop offset="1" stop-color="white" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#band)"/>
    </svg>
  `);
}

function highlightSvg({ glowX, glowY, glowW, glowH }) {
  return svg(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="38"/>
        </filter>
        <radialGradient id="focus" cx="50%" cy="50%" r="55%">
          <stop offset="0" stop-color="${brand}" stop-opacity="0.24"/>
          <stop offset="0.58" stop-color="${brand}" stop-opacity="0.11"/>
          <stop offset="1" stop-color="${brand}" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ffffff" stop-opacity="0.42"/>
          <stop offset="1" stop-color="${brand}" stop-opacity="0.18"/>
        </linearGradient>
      </defs>
      <ellipse cx="${glowX}" cy="${glowY}" rx="${glowW / 2}" ry="${glowH / 2}" fill="url(#focus)" filter="url(#blur)"/>
      <ellipse cx="${glowX}" cy="${glowY}" rx="${glowW / 2.18}" ry="${glowH / 2.25}" fill="none" stroke="${brand}" stroke-opacity="0.42" stroke-width="3"/>
      <rect x="18" y="18" width="${width - 36}" height="${height - 36}" rx="28" fill="none" stroke="url(#edge)" stroke-width="2" opacity="0.7"/>
    </svg>
  `);
}

function rightFadeSvg() {
  return svg(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rightFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#ffffff" stop-opacity="0"/>
          <stop offset="0.74" stop-color="#ffffff" stop-opacity="0"/>
          <stop offset="0.88" stop-color="#ffffff" stop-opacity="0.94"/>
          <stop offset="1" stop-color="#ffffff" stop-opacity="1"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#rightFade)"/>
    </svg>
  `);
}

function vignetteSvg() {
  return svg(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="vignette" cx="62%" cy="48%" r="70%">
          <stop offset="0" stop-color="#ffffff" stop-opacity="0"/>
          <stop offset="0.72" stop-color="#ffffff" stop-opacity="0"/>
          <stop offset="1" stop-color="${brand}" stop-opacity="0.10"/>
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#vignette)"/>
    </svg>
  `);
}

const stack = await sharp(source)
  .extract({ left: 390, top: 0, width: 1240, height: 916 })
  .resize({
    width,
    height,
    fit: "contain",
    background: { r: 248, g: 245, b: 251 },
  })
  .png()
  .toBuffer();

const muted = await sharp(stack)
  .modulate({ brightness: 1.16, saturation: 0.16 })
  .blur(1.35)
  .composite([
    {
      input: svg(`
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#fbf8fd" stop-opacity="0.58"/>
              <stop offset="0.55" stop-color="#f0e7f8" stop-opacity="0.44"/>
              <stop offset="1" stop-color="#ffffff" stop-opacity="0.50"/>
            </linearGradient>
          </defs>
          <rect width="${width}" height="${height}" fill="url(#wash)"/>
        </svg>
      `),
      blend: "over",
    },
  ])
  .png()
  .toBuffer();

const activeSource = await sharp(stack)
  .modulate({ brightness: 1.04, saturation: 1.22 })
  .sharpen({ sigma: 0.8 })
  .png()
  .toBuffer();

await sharp(muted)
  .composite([
    { input: rightFadeSvg(), blend: "over" },
    { input: vignetteSvg(), blend: "over" },
  ])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(path.join(outputDir, idleFile));

await Promise.all(
  layers.map(async (layer) => {
    const activeBand = await sharp(activeSource)
      .composite([{ input: maskSvg(layer), blend: "dest-in" }])
      .png()
      .toBuffer();

    await sharp(muted)
      .composite([
        { input: highlightSvg(layer), blend: "over" },
        { input: activeBand, blend: "over" },
        { input: rightFadeSvg(), blend: "over" },
        { input: vignetteSvg(), blend: "over" },
      ])
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.join(outputDir, layer.file));
  }),
);

console.log(
  [idleFile, ...layers.map((layer) => layer.file)]
    .map((file) => path.join("public", "system-layers", file))
    .join("\n"),
);
