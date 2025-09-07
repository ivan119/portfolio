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
      if (!process.env.HUGGING_FACE_TOKEN) {
        // Fallback local generation for development without external keys
        const title = `AI Draft: ${prompt.slice(0, 48)}`
        const content = `Introduction\n\n${prompt}\n\nKey Points\n- Point 1\n- Point 2\n\nConclusion\nPractical takeaways for developers.`
        return { success: true, title, content } as any
      }
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);
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
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("Failed to generate content");
      }

      const data = await response.json();
      const raw = data[0]?.generated_text || "";

      // Expect a structured block; fallback to heuristic parsing
      const titleMatch = raw.match(/Title:\s*(.*)/i);
      const excerptMatch = raw.match(/Excerpt:\s*([\s\S]*?)\n\n/i);
      const tagsMatch = raw.match(/Tags:\s*(.*)/i);
      const categoryMatch = raw.match(/Category:\s*(.*)/i);
      const coverPromptMatch = raw.match(/CoverPrompt:\s*([\s\S]*?)\n\n/i);

      const title = titleMatch?.[1]?.trim() || 'Untitled Post';
      const excerpt = excerptMatch?.[1]?.trim() || '';
      const tags = tagsMatch?.[1]?.split(',').map((t: string) => t.trim()).filter(Boolean) || [];
      const category = categoryMatch?.[1]?.trim() || '';
      const coverPrompt = coverPromptMatch?.[1]?.trim() || '';

      // Strip metadata lines to form content
      const content = raw
        .replace(/Title:.*\n?/i, '')
        .replace(/Excerpt:[\s\S]*?\n\n/i, '')
        .replace(/Tags:.*\n?/i, '')
        .replace(/Category:.*\n?/i, '')
        .replace(/CoverPrompt:[\s\S]*?\n\n/i, '')
        .trim();

      return {
        success: true,
        title,
        content: content || raw,
        excerpt,
        tags,
        category,
        coverPrompt,
      } as any;
    } catch (error) {
      console.error("AI Generation Error:", error);
      // Fallback: always return a local draft so UI doesn't fail
      const title = `AI Draft: ${prompt.slice(0, 48)}`
      const content = `Introduction\n\n${prompt}\n\nKey Points\n- Point 1\n- Point 2\n\nConclusion\nPractical takeaways for developers.`
      return { success: true, title, content } as any
    }
  }
}
