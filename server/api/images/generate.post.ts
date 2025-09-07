import { defineEventHandler, readBody } from 'h3'
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

async function ensureDir(dir: string) {
  await fs.promises.mkdir(dir, { recursive: true })
}

async function createPlaceholder(width: number, height: number, background: string, text: string) {
  const base = await sharp({ create: { width, height, channels: 3, background } }).png().toBuffer()

  const gradient = await sharp({ create: { width, height, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 0 } } })
    .composite([{ input: Buffer.from(`<svg width="${width}" height="${height}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="white" stop-opacity="0.08"/><stop offset="100%" stop-color="white" stop-opacity="0"/></linearGradient></defs><rect width="${width}" height="${height}" fill="url(#g)"/></svg>`), left: 0, top: 0 }])
    .png()
    .toBuffer()

  const combined = await sharp(base).composite([{ input: gradient, left: 0, top: 0 }]).toBuffer()

  const fontSize = Math.floor(width / 16)
  const svg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .title { font: ${fontSize}px sans-serif; font-weight: 700; fill: white; }
        .shadow { filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6)); }
      </style>
      <text x="50%" y="55%" text-anchor="middle" class="title shadow">${text}</text>
    </svg>
  `)

  const out = await sharp(combined).composite([{ input: svg, left: 0, top: 0 }]).webp({ quality: 80 }).toBuffer()
  return out
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ slug: string; files?: { name: string; color: string; text: string }[] }>(event)
  if (!body?.slug) {
    return { ok: false, error: 'Missing slug' }
  }

  const outDir = path.join(process.cwd(), 'public/images/blog', body.slug)
  await ensureDir(outDir)

  const files = body.files?.length ? body.files : [
    { name: 'hero.webp', color: '#0ea5e9', text: body.slug.replace(/-/g, ' ').slice(0, 24) },
    { name: 'secondary.webp', color: '#22c55e', text: 'AI' }
  ]

  const created: string[] = []
  for (const f of files) {
    const target = path.join(outDir, f.name)
    if (!fs.existsSync(target)) {
      const img = await createPlaceholder(1200, 675, f.color, f.text)
      await fs.promises.writeFile(target, img)
      created.push(`/images/blog/${body.slug}/${f.name}`)
    }
  }

  return { ok: true, created }
})


