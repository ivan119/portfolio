import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

type Provider = 'openai' | 'stability' | 'replicate' | 'none'

function getProvider(): Provider {
  if (process.env.OPENAI_API_KEY) return 'openai'
  if (process.env.STABILITY_API_KEY) return 'stability'
  if (process.env.REPLICATE_API_TOKEN) return 'replicate'
  return 'none'
}

export class ImageAIService {
  static async generateCover(prompt: string, outPath: string): Promise<string> {
    const provider = getProvider()
    switch (provider) {
      case 'openai':
        return this.generateOpenAI(prompt, outPath)
      case 'stability':
        return this.generateStability(prompt, outPath)
      case 'replicate':
        return this.generateReplicate(prompt, outPath)
      default:
        return this.generateFallback(prompt, outPath)
    }
  }

  private static async writeBufferWebp(buffer: Buffer, outPath: string) {
    await fs.mkdir(path.dirname(outPath), { recursive: true })
    const webp = await sharp(buffer).webp({ quality: 82 }).toBuffer()
    await fs.writeFile(outPath, webp)
    return outPath
  }

  private static async generateOpenAI(prompt: string, outPath: string) {
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt,
        size: '1024x1024',
        quality: 'hd'
      })
    })
    if (!res.ok) throw new Error('OpenAI image generation failed')
    const json = await res.json()
    const b64 = json.data?.[0]?.b64_json
    if (!b64) throw new Error('OpenAI returned no image')
    const buf = Buffer.from(b64, 'base64')
    return this.writeBufferWebp(buf, outPath)
  }

  private static async generateStability(prompt: string, outPath: string) {
    const res = await fetch('https://api.stability.ai/v2beta/stable-image/generate/core', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`
      },
      body: (() => {
        const form = new FormData()
        form.append('prompt', prompt)
        form.append('output_format', 'webp')
        form.append('aspect_ratio', '16:9')
        return form
      })()
    })
    if (!res.ok) throw new Error('Stability generation failed')
    const arrayBuf = await res.arrayBuffer()
    return this.writeBufferWebp(Buffer.from(arrayBuf), outPath)
  }

  private static async generateReplicate(prompt: string, outPath: string) {
    const res = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: 'stability-ai/sdxl:8f8d1c...',
        input: { prompt, width: 1024, height: 576 }
      })
    })
    if (!res.ok) throw new Error('Replicate request failed')
    const json = await res.json()
    // In production, poll until completed; here assume direct URL in output
    const url = json?.output?.[0]
    if (!url) throw new Error('Replicate returned no output')
    const imgRes = await fetch(url)
    const buf = Buffer.from(await imgRes.arrayBuffer())
    return this.writeBufferWebp(buf, outPath)
  }

  private static async generateFallback(prompt: string, outPath: string) {
    const [w, h] = [1200, 675]
    const bg = '#0ea5e9'
    const base = await sharp({ create: { width: w, height: h, channels: 3, background: bg } }).png().toBuffer()
    const fontSize = Math.floor(w / 18)
    const svg = Buffer.from(`
      <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <style>.t{font:${fontSize}px sans-serif;font-weight:700;fill:#fff}</style>
        <rect width="100%" height="100%" fill="#0ea5e9"/>
        <text x="50%" y="55%" text-anchor="middle" class="t">${(prompt||'AI Post').slice(0,40)}</text>
      </svg>
    `)
    const out = await sharp(base).composite([{ input: svg, left: 0, top: 0 }]).webp({ quality: 82 }).toBuffer()
    await fs.mkdir(path.dirname(outPath), { recursive: true })
    await fs.writeFile(outPath, out)
    return outPath
  }
}


