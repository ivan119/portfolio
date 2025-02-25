import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import sharp from "sharp";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the directory exists
const outputDir = path.join(__dirname, "../public/images/blog/ai-agents");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Pixabay API key - get yours at https://pixabay.com/api/docs/
// This is completely free and has a limit of 5,000 requests per hour
const PIXABAY_API_KEY = "YOUR_PIXABAY_API_KEY";

// Image configurations for each blog section
const imageConfigs = [
  {
    name: "ai-digital-landscape.jpg",
    searchTerm: "artificial intelligence network",
    effects: "futuristic",
    overlay: {
      text: "AI Agents\nTransforming the Digital Landscape",
      position: "center",
    },
  },
  {
    name: "ai-evolution-timeline.jpg",
    searchTerm: "technology evolution",
    effects: "clean",
    overlay: {
      text: "Evolution of AI Agents",
      position: "top",
    },
  },
  {
    name: "ai-industry-transformation.jpg",
    searchTerm: "futuristic technology industry",
    effects: "vibrant",
    overlay: {
      text: "AI Transforming Industries",
      position: "top",
    },
  },
  {
    name: "ai-future-collaboration.jpg",
    searchTerm: "human robot collaboration",
    effects: "warm",
    overlay: {
      text: "The Future of Human-AI Collaboration",
      position: "top",
    },
  },
];

/**
 * Fetch a random image from Pixabay based on search term
 * @param {string} searchTerm - The search term to use
 * @returns {Promise<Buffer>} - The image buffer
 */
async function fetchPixabayImage(searchTerm) {
  try {
    // Search for images matching the term
    const searchUrl = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(searchTerm)}&image_type=photo&orientation=horizontal&per_page=50&safesearch=true`;
    const searchResponse = await fetch(searchUrl);

    if (!searchResponse.ok) {
      throw new Error(`Pixabay API error: ${searchResponse.statusText}`);
    }

    const searchData = await searchResponse.json();

    if (!searchData.hits || searchData.hits.length === 0) {
      throw new Error(`No images found for search term: ${searchTerm}`);
    }

    // Select a random image from the results
    const randomIndex = Math.floor(
      Math.random() * Math.min(searchData.hits.length, 20)
    );
    const imageUrl = searchData.hits[randomIndex].largeImageURL;

    // Download the image
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to download image: ${imageResponse.statusText}`);
    }

    return await imageResponse.buffer();
  } catch (error) {
    console.error("Error fetching image from Pixabay:", error);
    throw error;
  }
}

/**
 * Apply futuristic effects to an image
 * @param {Buffer} imageBuffer - The original image buffer
 * @param {string} effectType - The type of effect to apply
 * @returns {Promise<Buffer>} - The processed image buffer
 */
async function applyImageEffects(imageBuffer, effectType) {
  let image = sharp(imageBuffer);

  switch (effectType) {
    case "futuristic":
      // Blue tint, increased contrast, sharpness
      image = image
        .modulate({ brightness: 0.9, saturation: 1.3 })
        .tint({ r: 0, g: 100, b: 200 })
        .gamma(0.8)
        .sharpen();
      break;

    case "clean":
      // Increase brightness, reduce saturation for a clean look
      image = image.modulate({ brightness: 1.2, saturation: 0.8 }).sharpen();
      break;

    case "vibrant":
      // Increase saturation and contrast
      image = image
        .modulate({ brightness: 1.1, saturation: 1.5 })
        .gamma(0.7)
        .sharpen();
      break;

    case "warm":
      // Warm tint, soft glow
      image = image
        .modulate({ brightness: 1.1, saturation: 1.2 })
        .tint({ r: 255, g: 200, b: 100 })
        .blur(0.3)
        .sharpen();
      break;

    default:
      // No effect
      break;
  }

  return await image.toBuffer();
}

/**
 * Add text overlay to an image
 * @param {Buffer} imageBuffer - The image buffer
 * @param {Object} overlay - The overlay configuration
 * @returns {Promise<Buffer>} - The image with overlay
 */
async function addTextOverlay(imageBuffer, overlay) {
  try {
    const { width, height } = await sharp(imageBuffer).metadata();

    // Create an SVG with the text
    const fontSize = Math.floor(width / 20);
    const lineHeight = fontSize * 1.2;

    let textY;
    switch (overlay.position) {
      case "top":
        textY = height * 0.15;
        break;
      case "center":
        textY = height * 0.5;
        break;
      case "bottom":
        textY = height * 0.85;
        break;
      default:
        textY = height * 0.15;
    }

    const lines = overlay.text.split("\\n");
    let svgText = "";

    lines.forEach((line, index) => {
      svgText += `<text x="50%" y="${textY + index * lineHeight}px" font-family="Arial" font-size="${fontSize}px" font-weight="bold" text-anchor="middle" fill="white" stroke="black" stroke-width="2">${line}</text>`;
    });

    const svgBuffer = Buffer.from(`
      <svg width="${width}" height="${height}">
        <style>
          text {
            filter: drop-shadow(0px 0px 10px rgba(0,0,0,0.7));
          }
        </style>
        ${svgText}
      </svg>
    `);

    // Composite the SVG over the image
    return await sharp(imageBuffer)
      .composite([
        {
          input: svgBuffer,
          top: 0,
          left: 0,
        },
      ])
      .toBuffer();
  } catch (error) {
    console.error("Error adding text overlay:", error);
    return imageBuffer;
  }
}

/**
 * Add a futuristic overlay to make the image more AI-like
 * @param {Buffer} imageBuffer - The image buffer
 * @returns {Promise<Buffer>} - The image with futuristic overlay
 */
async function addFuturisticOverlay(imageBuffer) {
  try {
    const { width, height } = await sharp(imageBuffer).metadata();

    // Create an SVG with futuristic elements
    const svgOverlay = `
      <svg width="${width}" height="${height}">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:rgb(0,100,255);stop-opacity:0.3" />
            <stop offset="100%" style="stop-color:rgb(0,200,255);stop-opacity:0" />
          </linearGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#grad1)" />
        
        <!-- Digital circuit lines -->
        ${Array.from({ length: 15 }, (_, i) => {
          const y = Math.floor(Math.random() * height);
          return `<path d="M0,${y} L${width},${y}" stroke="rgba(0,200,255,0.3)" stroke-width="1" stroke-dasharray="5,10,15" />`;
        }).join("")}
        
        ${Array.from({ length: 10 }, (_, i) => {
          const x = Math.floor(Math.random() * width);
          return `<path d="M${x},0 L${x},${height}" stroke="rgba(0,200,255,0.2)" stroke-width="1" stroke-dasharray="5,15,10" />`;
        }).join("")}
        
        <!-- Digital nodes -->
        ${Array.from({ length: 20 }, (_, i) => {
          const x = Math.floor(Math.random() * width);
          const y = Math.floor(Math.random() * height);
          const r = Math.floor(Math.random() * 5) + 2;
          return `<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(0,200,255,0.5)" />`;
        }).join("")}
      </svg>
    `;

    const svgBuffer = Buffer.from(svgOverlay);

    // Composite the SVG over the image
    return await sharp(imageBuffer)
      .composite([
        {
          input: svgBuffer,
          top: 0,
          left: 0,
          blend: "over",
        },
      ])
      .toBuffer();
  } catch (error) {
    console.error("Error adding futuristic overlay:", error);
    return imageBuffer;
  }
}

/**
 * Generate and save an image for a blog section
 * @param {Object} config - The image configuration
 */
async function generateAndSaveImage(config) {
  try {
    console.log(`Generating image for: ${config.name}`);

    // Fetch base image
    const imageBuffer = await fetchPixabayImage(config.searchTerm);

    // Apply effects
    const processedBuffer = await applyImageEffects(
      imageBuffer,
      config.effects
    );

    // Add futuristic overlay
    const overlaidBuffer = await addFuturisticOverlay(processedBuffer);

    // Add text overlay
    const finalBuffer = await addTextOverlay(overlaidBuffer, config.overlay);

    // Save the image
    const outputPath = path.join(outputDir, config.name);
    await fs.promises.writeFile(outputPath, finalBuffer);

    console.log(`Image saved to ${outputPath}`);
  } catch (error) {
    console.error(`Error generating image ${config.name}:`, error);
  }
}

/**
 * Main function to generate all images
 */
async function generateAllImages() {
  console.log("Starting image generation...");

  if (!PIXABAY_API_KEY || PIXABAY_API_KEY === "YOUR_PIXABAY_API_KEY") {
    console.error("Error: Please set your Pixabay API key in the script");
    console.log("Get a free API key at https://pixabay.com/api/docs/");
    process.exit(1);
  }

  // Process images sequentially to avoid rate limits
  for (const config of imageConfigs) {
    await generateAndSaveImage(config);
    // Add a small delay between requests to respect API rate limits
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("All images generated successfully!");
}

// Run the main function
generateAllImages();
