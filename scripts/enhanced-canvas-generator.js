import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createCanvas } from "canvas";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the directory exists
const outputDir = path.join(__dirname, "../public/images/blog/ai-agents");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Image configurations
const imageConfigs = [
  {
    name: "ai-digital-landscape.jpg",
    title: "AI Agents",
    subtitle: "Transforming the Digital Landscape",
    style: "network",
    colorScheme: "blue",
  },
  {
    name: "ai-evolution-timeline.jpg",
    title: "Evolution of AI Agents",
    subtitle: "",
    style: "timeline",
    colorScheme: "light",
  },
  {
    name: "ai-industry-transformation.jpg",
    title: "AI Transforming Industries",
    subtitle: "",
    style: "sectors",
    colorScheme: "purple",
  },
  {
    name: "ai-future-collaboration.jpg",
    title: "The Future of Human-AI Collaboration",
    subtitle: "",
    style: "collaboration",
    colorScheme: "warm",
  },
];

// Helper function to generate a random color
function getRandomColor(alpha = 1) {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Helper function to create a gradient
function createGradient(ctx, width, height, colorScheme) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);

  switch (colorScheme) {
    case "blue":
      gradient.addColorStop(0, "#0f2027");
      gradient.addColorStop(0.5, "#203a43");
      gradient.addColorStop(1, "#2c5364");
      break;
    case "purple":
      gradient.addColorStop(0, "#4b6cb7");
      gradient.addColorStop(1, "#182848");
      break;
    case "warm":
      gradient.addColorStop(0, "#3a1c71");
      gradient.addColorStop(0.5, "#d76d77");
      gradient.addColorStop(1, "#ffaf7b");
      break;
    case "light":
      gradient.addColorStop(0, "#f5f7fa");
      gradient.addColorStop(1, "#e5e9f0");
      break;
    default:
      gradient.addColorStop(0, "#0f2027");
      gradient.addColorStop(0.5, "#203a43");
      gradient.addColorStop(1, "#2c5364");
  }

  return gradient;
}

// Draw network style image
function drawNetworkStyle(ctx, width, height, colorScheme) {
  // Background gradient
  ctx.fillStyle = createGradient(ctx, width, height, colorScheme);
  ctx.fillRect(0, 0, width, height);

  // Draw nodes and connections
  const nodes = [];
  const nodeCount = 150;

  // Create nodes
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 4 + 1,
      speed: Math.random() * 0.5 + 0.1,
      connections: Math.floor(Math.random() * 3) + 1,
    });
  }

  // Draw connections
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    for (let j = 0; j < node.connections; j++) {
      // Find a random node to connect to
      const targetIndex = Math.floor(Math.random() * nodes.length);
      if (targetIndex !== i) {
        const target = nodes[targetIndex];

        // Calculate distance
        const dx = target.x - node.x;
        const dy = target.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Only connect if within reasonable distance
        if (distance < width / 4) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);

          // Line style based on distance
          const opacity = 1 - distance / (width / 4);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  // Draw nodes
  for (const node of nodes) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fill();
  }

  // Add some glowing circles for emphasis
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 50 + 20;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, "rgba(0, 150, 255, 0.3)");
    gradient.addColorStop(1, "rgba(0, 150, 255, 0)");

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

// Draw timeline style image
function drawTimelineStyle(ctx, width, height, colorScheme) {
  // Background
  ctx.fillStyle = createGradient(ctx, width, 0, colorScheme);
  ctx.fillRect(0, 0, width, height);

  // Draw timeline
  const timelineY = height / 2;
  ctx.beginPath();
  ctx.moveTo(100, timelineY);
  ctx.lineTo(width - 100, timelineY);
  ctx.strokeStyle = colorScheme === "light" ? "#333" : "#fff";
  ctx.lineWidth = 4;
  ctx.stroke();

  // Timeline points
  const timelinePoints = [
    { year: "1950s", label: "Rule-based Systems", x: 150 },
    { year: "1980s", label: "Expert Systems", x: 350 },
    { year: "2000s", label: "Machine Learning", x: 550 },
    { year: "2010s", label: "Deep Learning", x: 750 },
    { year: "2020s", label: "Autonomous Agents", x: 950 },
  ];

  const pointColor = colorScheme === "light" ? "#0078d7" : "#00a8ff";
  const textColor = colorScheme === "light" ? "#333" : "#fff";

  timelinePoints.forEach((point, index) => {
    // Draw point
    ctx.beginPath();
    ctx.arc(point.x, timelineY, 15, 0, Math.PI * 2);
    ctx.fillStyle = pointColor;
    ctx.fill();

    // Draw year
    ctx.font = "bold 24px Arial";
    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.fillText(point.year, point.x, timelineY - 40);

    // Draw label
    ctx.font = "20px Arial";
    ctx.fillText(point.label, point.x, timelineY + 50);

    // Draw connecting line to next point if not the last one
    if (index < timelinePoints.length - 1) {
      const nextPoint = timelinePoints[index + 1];
      ctx.beginPath();
      ctx.moveTo(point.x + 15, timelineY);
      ctx.lineTo(nextPoint.x - 15, timelineY);
      ctx.strokeStyle = pointColor;
      ctx.lineWidth = 4;
      ctx.stroke();
    }

    // Add some decorative elements
    ctx.beginPath();
    ctx.arc(point.x, timelineY, 30, 0, Math.PI * 2);
    ctx.strokeStyle = `${pointColor}50`;
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  // Add some decorative elements
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 5 + 2;

    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fillStyle = `${pointColor}30`;
    ctx.fill();
  }
}

// Draw sectors style image
function drawSectorsStyle(ctx, width, height, colorScheme) {
  // Background gradient
  ctx.fillStyle = createGradient(ctx, width, 0, colorScheme);
  ctx.fillRect(0, 0, width, height);

  // Industry sectors
  const sectors = [
    { name: "Healthcare", icon: "🏥", x: 200, y: 200 },
    { name: "Finance", icon: "💰", x: 500, y: 200 },
    { name: "Manufacturing", icon: "🏭", x: 800, y: 200 },
    { name: "Transportation", icon: "🚗", x: 350, y: 400 },
    { name: "Retail", icon: "🛒", x: 650, y: 400 },
  ];

  // Draw sectors
  sectors.forEach((sector) => {
    // Draw circle
    ctx.beginPath();
    ctx.arc(sector.x, sector.y, 80, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw icon
    ctx.font = "50px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(sector.icon, sector.x, sector.y - 15);

    // Draw name
    ctx.font = "bold 24px Arial";
    ctx.fillText(sector.name, sector.x, sector.y + 40);

    // Add glow effect
    ctx.beginPath();
    ctx.arc(sector.x, sector.y, 90, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 10;
    ctx.stroke();
  });

  // Draw connections between sectors and AI
  const aiX = width / 2;
  const aiY = height / 2 + 50;

  // Draw AI node
  ctx.beginPath();
  ctx.arc(aiX, aiY, 100, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  ctx.fill();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw AI text
  ctx.font = "bold 40px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("AI", aiX, aiY - 15);
  ctx.font = "bold 24px Arial";
  ctx.fillText("Agents", aiX, aiY + 25);

  // Draw connections
  sectors.forEach((sector) => {
    ctx.beginPath();
    ctx.moveTo(sector.x, sector.y);
    ctx.lineTo(aiX, aiY);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Add animated particles along the connection
    const particleCount = 3;
    const dx = aiX - sector.x;
    const dy = aiY - sector.y;

    for (let i = 0; i < particleCount; i++) {
      const t = Math.random();
      const px = sector.x + dx * t;
      const py = sector.y + dy * t;

      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fill();
    }
  });

  // Add some background elements
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;

    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 2 + 1, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.fill();
  }
}

// Draw collaboration style image
function drawCollaborationStyle(ctx, width, height, colorScheme) {
  // Background
  ctx.fillStyle = createGradient(ctx, width, height, colorScheme);
  ctx.fillRect(0, 0, width, height);

  // Draw human silhouette
  const humanX = width * 0.35;
  const humanY = height * 0.5;
  const humanRadius = 80;

  // Glow effect for human
  const humanGlow = ctx.createRadialGradient(
    humanX,
    humanY,
    humanRadius * 0.5,
    humanX,
    humanY,
    humanRadius * 1.5
  );
  humanGlow.addColorStop(0, "rgba(255, 255, 255, 0.3)");
  humanGlow.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.beginPath();
  ctx.arc(humanX, humanY, humanRadius * 1.5, 0, Math.PI * 2);
  ctx.fillStyle = humanGlow;
  ctx.fill();

  // Human circle
  ctx.beginPath();
  ctx.arc(humanX, humanY, humanRadius, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.fill();

  // Draw robot/AI silhouette
  const aiX = width * 0.65;
  const aiY = height * 0.5;
  const aiSize = 160;

  // Glow effect for AI
  const aiGlow = ctx.createRadialGradient(
    aiX,
    aiY,
    aiSize * 0.5,
    aiX,
    aiY,
    aiSize
  );
  aiGlow.addColorStop(0, "rgba(0, 200, 255, 0.3)");
  aiGlow.addColorStop(1, "rgba(0, 200, 255, 0)");

  ctx.beginPath();
  ctx.arc(aiX, aiY, aiSize, 0, Math.PI * 2);
  ctx.fillStyle = aiGlow;
  ctx.fill();

  // AI square
  ctx.beginPath();
  ctx.rect(aiX - aiSize / 2, aiY - aiSize / 2, aiSize, aiSize);
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.fill();

  // Draw connection between human and AI
  ctx.beginPath();
  ctx.moveTo(humanX + humanRadius, humanY);
  ctx.lineTo(aiX - aiSize / 2, humanY);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
  ctx.lineWidth = 10;
  ctx.stroke();

  // Add particles along the connection
  for (let i = 0; i < 20; i++) {
    const t = Math.random();
    const px =
      humanX + humanRadius + (aiX - aiSize / 2 - humanX - humanRadius) * t;
    const py = humanY + (Math.random() - 0.5) * 20;

    ctx.beginPath();
    ctx.arc(px, py, Math.random() * 3 + 1, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fill();
  }

  // Draw human label
  ctx.font = "bold 30px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Human", humanX, humanY + humanRadius + 50);
  ctx.font = "24px Arial";
  ctx.fillText(
    "Creativity, Empathy, Ethics",
    humanX,
    humanY + humanRadius + 90
  );

  // Draw AI label
  ctx.font = "bold 30px Arial";
  ctx.fillText("AI Agent", aiX, aiY + aiSize / 2 + 50);
  ctx.font = "24px Arial";
  ctx.fillText(
    "Data Processing, Pattern Recognition",
    aiX,
    aiY + aiSize / 2 + 90
  );

  // Draw collaboration label
  ctx.font = "bold 24px Arial";
  ctx.fillText("Collaborative Intelligence", width / 2, humanY - 80);

  // Add some background elements
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 3 + 1;

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
    ctx.fill();
  }
}

// Add title to image
function addTitle(ctx, width, height, title, subtitle) {
  // Add title
  ctx.font = "bold 60px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(title, width / 2, height / 2 - 30);

  if (subtitle) {
    ctx.font = "40px Arial";
    ctx.fillText(subtitle, width / 2, height / 2 + 30);
  }

  // Add shadow effect
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
}

// Generate image based on configuration
function generateImage(config) {
  console.log(`Generating image: ${config.name}`);

  // Create canvas
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Draw based on style
  switch (config.style) {
    case "network":
      drawNetworkStyle(ctx, width, height, config.colorScheme);
      break;
    case "timeline":
      drawTimelineStyle(ctx, width, height, config.colorScheme);
      break;
    case "sectors":
      drawSectorsStyle(ctx, width, height, config.colorScheme);
      break;
    case "collaboration":
      drawCollaborationStyle(ctx, width, height, config.colorScheme);
      break;
    default:
      drawNetworkStyle(ctx, width, height, config.colorScheme);
  }

  // Add title if not timeline or sectors (which have their own titles)
  if (config.style === "network" || config.style === "collaboration") {
    addTitle(ctx, width, height, config.title, config.subtitle);
  }

  // Save the image
  const buffer = canvas.toBuffer("image/jpeg", { quality: 0.9 });
  const outputPath = path.join(outputDir, config.name);
  fs.writeFileSync(outputPath, buffer);

  console.log(`Image saved to ${outputPath}`);
}

// Generate all images
function generateAllImages() {
  console.log("Starting image generation...");

  for (const config of imageConfigs) {
    generateImage(config);
  }

  console.log("All images generated successfully!");
}

// Run the main function
generateAllImages();
