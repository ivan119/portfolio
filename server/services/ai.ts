import { type BlogGenerationResponse } from "~/types/blog";

// Using a better model for blog generation
const HUGGING_FACE_API =
  "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct";

const createPrompt = (
  userPrompt: string,
) => `You are a senior tech blogger and web development expert. Write an engaging, technical yet accessible blog post.

User's Request: "${userPrompt}"

Writing Guidelines:
- Create content that is both technical and engaging
- Include specific examples and code snippets where relevant
- Focus on practical applications and real-world use cases
- Consider current industry trends and future implications
- Add your expert insights and recommendations

Structure:
- Start with an attention-grabbing introduction
- Break down complex concepts into digestible sections
- Include technical details without being overwhelming
- End with actionable takeaways or conclusions

Additional Focus Points:
- Latest frameworks and tools in the context
- Best practices and optimization tips
- Industry standards and emerging trends
- Performance considerations
- Security implications if relevant

Format as:
Title: [Create an SEO-friendly, specific title]

[Write structured content with clear sections, examples, and technical insights]`;

export class AIService {
  static async generateBlogPost(
    prompt: string = "latest technologies in web development",
  ): Promise<BlogGenerationResponse> {
    try {
      const response = await fetch(HUGGING_FACE_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
        },
        body: JSON.stringify({
          inputs: createPrompt(prompt),
          parameters: {
            max_length: 2000,
            temperature: 0.8, // Slightly increased for more creativity
            top_p: 0.9,
            return_full_text: true,
            repetition_penalty: 1.2,
            presence_penalty: 0.6, // Encourages more unique content
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate content");
      }

      const data = await response.json();
      const content = data[0]?.generated_text || "";

      // Extract title and content
      const lines = content.split("\n").filter((line) => line.trim());
      const titleLine = lines.find((line) => line.startsWith("Title:"));
      const title = titleLine
        ? titleLine.replace("Title:", "").trim()
        : "Latest Web Development Technologies and Trends";

      // Get content after title
      const contentStartIndex =
        lines.findIndex((line) => line.startsWith("Title:")) + 1;
      const blogContent = lines.slice(contentStartIndex).join("\n");

      return {
        success: true,
        title,
        content:
          blogContent ||
          "Exploring the latest web development technologies and their impact on modern software development.",
      };
    } catch (error) {
      console.error("AI Generation Error:", error);
      return {
        success: false,
        error: "Failed to generate blog post content",
      };
    }
  }
}
