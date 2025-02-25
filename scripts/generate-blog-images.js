import fs from "fs";
import { createCanvas } from "canvas";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the directory exists
const outputDir = path.join(__dirname, "../public/images/blog/ai-agents");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Helper function to generate a random color
function getRandomColor(alpha = 1) {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// 1. AI Digital Landscape
function generateDigitalLandscape() {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext("2d");

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#0f2027");
  gradient.addColorStop(0.5, "#203a43");
  gradient.addColorStop(1, "#2c5364");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw network nodes
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 5 + 2;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fill();

    // Draw connections between some nodes
    if (i % 3 === 0) {
      for (let j = 0; j < 3; j++) {
        const x2 = Math.random() * canvas.width;
        const y2 = Math.random() * canvas.height;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  // Add title
  ctx.font = "bold 60px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("AI Agents", canvas.width / 2, canvas.height / 2 - 30);
  ctx.font = "40px Arial";
  ctx.fillText(
    "Transforming the Digital Landscape",
    canvas.width / 2,
    canvas.height / 2 + 30
  );

  // Save the image
  const buffer = canvas.toBuffer("image/jpeg");
  fs.writeFileSync(path.join(outputDir, "ai-digital-landscape.jpg"), buffer);
  console.log("Generated: ai-digital-landscape.jpg");
}

// 2. AI Evolution Timeline
function generateEvolutionTimeline() {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#f5f5f7";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw timeline
  const timelineY = canvas.height / 2;
  ctx.beginPath();
  ctx.moveTo(100, timelineY);
  ctx.lineTo(canvas.width - 100, timelineY);
  ctx.strokeStyle = "#333";
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

  timelinePoints.forEach((point, index) => {
    // Draw point
    ctx.beginPath();
    ctx.arc(point.x, timelineY, 15, 0, Math.PI * 2);
    ctx.fillStyle = "#0078d7";
    ctx.fill();

    // Draw year
    ctx.font = "bold 24px Arial";
    ctx.fillStyle = "#333";
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
      ctx.strokeStyle = "#0078d7";
      ctx.lineWidth = 4;
      ctx.stroke();
    }
  });

  // Add title
  ctx.font = "bold 48px Arial";
  ctx.fillStyle = "#333";
  ctx.textAlign = "center";
  ctx.fillText("Evolution of AI Agents", canvas.width / 2, 80);

  // Save the image
  const buffer = canvas.toBuffer("image/jpeg");
  fs.writeFileSync(path.join(outputDir, "ai-evolution-timeline.jpg"), buffer);
  console.log("Generated: ai-evolution-timeline.jpg");
}

// 3. AI Industry Transformation
function generateIndustryTransformation() {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext("2d");

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, "#4b6cb7");
  gradient.addColorStop(1, "#182848");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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
  });

  // Draw connections between sectors and AI
  const aiX = canvas.width / 2;
  const aiY = canvas.height / 2 + 50;

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
  });

  // Add title
  ctx.font = "bold 48px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("AI Transforming Industries", canvas.width / 2, 50);

  // Save the image
  const buffer = canvas.toBuffer("image/jpeg");
  fs.writeFileSync(
    path.join(outputDir, "ai-industry-transformation.jpg"),
    buffer
  );
  console.log("Generated: ai-industry-transformation.jpg");
}

// 4. Future of Human-AI Collaboration
function generateFutureCollaboration() {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext("2d");

  // Background
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#3a1c71");
  gradient.addColorStop(0.5, "#d76d77");
  gradient.addColorStop(1, "#ffaf7b");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw human silhouette
  ctx.beginPath();
  ctx.arc(400, 300, 80, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.fill();

  // Draw robot/AI silhouette
  ctx.beginPath();
  ctx.rect(720, 220, 160, 160);
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.fill();

  // Draw connection between human and AI
  ctx.beginPath();
  ctx.moveTo(480, 300);
  ctx.lineTo(720, 300);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
  ctx.lineWidth = 10;
  ctx.stroke();

  // Draw human label
  ctx.font = "bold 30px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Human", 400, 420);
  ctx.font = "24px Arial";
  ctx.fillText("Creativity, Empathy, Ethics", 400, 460);

  // Draw AI label
  ctx.font = "bold 30px Arial";
  ctx.fillText("AI Agent", 800, 420);
  ctx.font = "24px Arial";
  ctx.fillText("Data Processing, Pattern Recognition", 800, 460);

  // Draw collaboration label
  ctx.font = "bold 24px Arial";
  ctx.fillText("Collaborative Intelligence", 600, 250);

  // Add title
  ctx.font = "bold 48px Arial";
  ctx.textAlign = "center";
  ctx.fillText("The Future of Human-AI Collaboration", canvas.width / 2, 80);

  // Save the image
  const buffer = canvas.toBuffer("image/jpeg");
  fs.writeFileSync(path.join(outputDir, "ai-future-collaboration.jpg"), buffer);
  console.log("Generated: ai-future-collaboration.jpg");
}

// Generate all images
generateDigitalLandscape();
generateEvolutionTimeline();
generateIndustryTransformation();
generateFutureCollaboration();

console.log("All blog images generated successfully!");
