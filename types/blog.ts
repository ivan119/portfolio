export interface BlogPost {
  id: string
  title: string
  content: string
  image: string
  createdAt: string
  slug: string
  excerpt?: string
  tags?: string[]
  category?: string
  coverPrompt?: string
}

export interface GeneratePostPayload {
  prompt: string
}

export interface SavePostResponse {
  success: boolean;
  post?: BlogPost;
  error?: string;
}

export class BlogGenerationResponse {}