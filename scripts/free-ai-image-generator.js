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

// Unsplash API access key - get yours at https://unsplash.com/developers
// This is a free API with generous limits (50 requests per hour)
const UNSPLASH_ACCESS_KEY = "YOUR_UNSPLASH_ACCESS_KEY";

// Image configurations for each blog section
const imageConfigs = [
  {
    name: "ai-digital-landscape.jpg",
    searchTerm: "digital network technology",
    effects: "futuristic",
    overlay: {
      text: "AI Agents\nTransforming the Digital Landscape",
      position: "center",
    },
  },
  {
    name: "ai-evolution-timeline.jpg",
    searchTerm: "technology evolution timeline",
    effects: "clean",
    overlay: {
      text: "Evolution of AI Agents",
      position: "top",
    },
  },
  {
    name: "ai-industry-transformation.jpg",
    searchTerm: "futuristic industry technology",
    effects: "vibrant",
    overlay: {
      text: "AI Transforming Industries",
      position: "top",
    },
  },
  {
    name: "ai-future-collaboration.jpg",
    searchTerm: "human technology collaboration",
    effects: "warm",
    overlay: {
      text: "The Future of Human-AI Collaboration",
      position: "top",
    },
  },
];

/**
 * Fetch a random image from Unsplash based on search term
 * @param {string} searchTerm - The search term to use
 * @returns {Promise<Buffer>} - The image buffer
 */
async function fetchUnsplashImage(searchTerm) {
  try {
    // First, search for images matching the term
    const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerm)}&per_page=30&orientation=landscape`;
    const searchResponse = await fetch(searchUrl, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (!searchResponse.ok) {
      throw new Error(`Unsplash API error: ${searchResponse.statusText}`);
    }

    const searchData = await searchResponse.json();

    if (!searchData.results || searchData.results.length === 0) {
      throw new Error(`No images found for search term: ${searchTerm}`);
    }

    // Select a random image from the results
    const randomIndex = Math.floor(
      Math.random() * Math.min(searchData.results.length, 10)
    );
    const imageUrl = searchData.results[randomIndex].urls.regular;

    // Download the image
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to download image: ${imageResponse.statusText}`);
    }

    return await imageResponse.buffer();
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
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
 * Generate and save an image for a blog section
 * @param {Object} config - The image configuration
 */
async function generateAndSaveImage(config) {
  try {
    console.log(`Generating image for: ${config.name}`);

    // Fetch base image
    const imageBuffer = await fetchUnsplashImage(config.searchTerm);

    // Apply effects
    const processedBuffer = await applyImageEffects(
      imageBuffer,
      config.effects
    );

    // Add text overlay
    const finalBuffer = await addTextOverlay(processedBuffer, config.overlay);

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

  if (
    !UNSPLASH_ACCESS_KEY ||
    UNSPLASH_ACCESS_KEY === "YOUR_UNSPLASH_ACCESS_KEY"
  ) {
    console.error("Error: Please set your Unsplash API key in the script");
    console.log("Get a free API key at https://unsplash.com/developers");
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
