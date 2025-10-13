export interface BlogPost {
  author: string;
  id: string;
  title: string;
  content: Content[];
  image: string;
  createdAt?: string;
  excerpt?: string;
  tags?: string[];
  category?: string;
  coverImage?: string;
  date?: string;
}
type Content = {
  alt?: string;
  caption?: string;
  content: string;
  level?: Level;
  type: string;
  src?: string;
};
type Level = {
  $numberInt: string | number;
};
export interface PreviewBlogPost {
  author: string;
  coverImage: string;
  date: string;
  excerpt: string;
  id: string;
  title: string;
}
