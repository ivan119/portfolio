import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the directory exists
const outputDir = path.join(__dirname, "../public/images/blog/ai-agents");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Initialize OpenAI client
// You'll need to set OPENAI_API_KEY as an environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Image prompts for each blog section
const imagePrompts = [
  {
    name: "ai-digital-landscape.jpg",
    prompt:
      "A futuristic digital landscape with AI agents, showing a network of glowing nodes and connections in a dark blue environment, with abstract representations of AI entities processing data, 4K, highly detailed, sci-fi aesthetic",
  },
  {
    name: "ai-evolution-timeline.jpg",
    prompt:
      "A visual timeline showing the evolution of AI from simple rule-based systems to advanced autonomous agents, with visual representations of each era, minimalist design, infographic style, light background, 4K",
  },
  {
    name: "ai-industry-transformation.jpg",
    prompt:
      "A futuristic visualization showing AI transforming multiple industries simultaneously - healthcare, finance, manufacturing, and transportation, with glowing connections between them, isometric style, vibrant colors, 4K",
  },
  {
    name: "ai-future-collaboration.jpg",
    prompt:
      "A harmonious scene depicting human-AI collaboration, showing a human and an abstract AI entity working together creatively, with flowing energy between them, warm gradient background, optimistic futuristic style, 4K",
  },
];

/**
 * Generate an image using DALL-E and save it to the file system
 * @param {string} prompt - The prompt to generate the image from
 * @param {string} outputPath - The path to save the image to
 */
async function generateAndSaveImage(prompt, outputPath) {
  try {
    console.log(`Generating image for prompt: ${prompt}`);

    const response = await openai.images.generate({
      model: "dall-e-3", // or "dall-e-2" for faster, less detailed images
      prompt: prompt,
      n: 1,
      size: "1024x1024", // DALL-E 3 supports 1024x1024, 1792x1024, or 1024x1792
      quality: "standard", // or "hd" for higher quality
      response_format: "b64_json",
    });

    // Get the base64 image data
    const imageData = response.data[0].b64_json;

    // Convert base64 to buffer and save to file
    const buffer = Buffer.from(imageData, "base64");
    fs.writeFileSync(outputPath, buffer);

    console.log(`Image saved to ${outputPath}`);
  } catch (error) {
    console.error("Error generating image:", error);
  }
}

/**
 * Main function to generate all images
 */
async function generateAllImages() {
  console.log("Starting AI image generation...");

  for (const imagePrompt of imagePrompts) {
    const outputPath = path.join(outputDir, imagePrompt.name);
    await generateAndSaveImage(imagePrompt.prompt, outputPath);
  }

  console.log("All images generated successfully!");
}

// Check if API key is set
if (!process.env.OPENAI_API_KEY) {
  console.error("Error: OPENAI_API_KEY environment variable is not set");
  console.log("Please set your OpenAI API key using:");
  console.log("export OPENAI_API_KEY=your_api_key_here (Linux/Mac)");
  console.log("or");
  console.log("set OPENAI_API_KEY=your_api_key_here (Windows)");
  process.exit(1);
}

// Run the main function
generateAllImages();
