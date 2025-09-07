import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const posts = [
  {
    slug: "quantum-computing-ai-next-frontier",
    title: "Quantum Computing and AI",
    outDir: path.join(
      __dirname,
      "../public/images/blog/quantum-computing-ai-next-frontier"
    ),
    files: [
      { name: "hero.webp", color: "#0ea5e9", text: "Quantum AI" },
      {
        name: "applications.webp",
        color: "#22c55e",
        text: "Quantum Applications",
      },
    ],
  },
  {
    slug: "federated-learning-privacy-preserving-ai",
    title: "Federated Learning",
    outDir: path.join(
      __dirname,
      "../public/images/blog/federated-learning-privacy-preserving-ai"
    ),
    files: [
      { name: "hero.webp", color: "#8b5cf6", text: "Federated Learning" },
      {
        name: "collaboration.webp",
        color: "#14b8a6",
        text: "Privacy-Preserving AI",
      },
    ],
  },
];

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function createPlaceholder(width, height, background, text) {
  // Base background
  const base = await sharp({
    create: { width, height, channels: 3, background },
  })
    .png()
    .toBuffer();

  // Simple gradient overlay
  const gradient = await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    },
  })
    .composite([
      {
        input: Buffer.from(
          `<svg width="${width}" height="${height}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="white" stop-opacity="0.08"/><stop offset="100%" stop-color="white" stop-opacity="0"/></linearGradient></defs><rect width="${width}" height="${height}" fill="url(#g)"/></svg>`
        ),
        left: 0,
        top: 0,
      },
    ])
    .png()
    .toBuffer();

  const combined = await sharp(base)
    .composite([{ input: gradient, left: 0, top: 0 }])
    .toBuffer();

  // Text overlay SVG
  const fontSize = Math.floor(width / 16);
  const svg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .title { font: ${fontSize}px sans-serif; font-weight: 700; fill: white; }
        .shadow { filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6)); }
      </style>
      <text x="50%" y="55%" text-anchor="middle" class="title shadow">${text}</text>
    </svg>
  `);

  const out = await sharp(combined)
    .composite([{ input: svg, left: 0, top: 0 }])
    .webp({ quality: 80 })
    .toBuffer();
  return out;
}

async function run() {
  for (const post of posts) {
    await ensureDir(post.outDir);
    for (const f of post.files) {
      const target = path.join(post.outDir, f.name);
      if (fs.existsSync(target)) continue;

      const img = await createPlaceholder(1200, 675, f.color, f.text);
      await fs.promises.writeFile(target, img);
      console.log("created", target);
    }
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});


