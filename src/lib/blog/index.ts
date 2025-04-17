import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';
import { z } from 'zod';

// Define the blog directory path
const blogDirectory = path.join(process.cwd(), 'src/content/blog');

/**
 * Blog post schema
 */
export const blogPostSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(100),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  excerpt: z.string().min(1).max(200),
  author: z.string().min(1).max(100),
  coverImage: z.string().min(1),
  tags: z.array(z.string().min(1).max(50)).max(10),
  content: z.string(),
  contentHtml: z.string()
});

export type BlogPost = z.infer<typeof blogPostSchema>;

/**
 * Blog post metadata schema (without content)
 */
export const blogPostMetadataSchema = blogPostSchema.omit({ content: true, contentHtml: true });

export type BlogPostMetadata = z.infer<typeof blogPostMetadataSchema>;

/**
 * Blog post ID schema
 */
export const blogPostIdSchema = z.object({
  params: z.object({
    id: z.string().min(1)
  })
});

export type BlogPostId = z.infer<typeof blogPostIdSchema>;

// Single blog post data
const blogPost: Omit<BlogPost, 'content' | 'contentHtml'> = {
  id: 'building-a-portfolio',
  title: 'Building a Modern Portfolio Website',
  date: '2024-03-10',
  excerpt: 'A comprehensive guide to creating a professional portfolio website using modern web technologies.',
  author: 'Corey Stone',
  coverImage: '/images/blog/portfolio.jpg',
  tags: ['Web Development', 'Portfolio', 'Design']
};

/**
 * Get all blog post IDs
 */
export async function getAllPostIds(): Promise<BlogPostId[]> {
  const fileNames = await fs.readdir(blogDirectory);
  
  return fileNames.map((fileName: string) => ({
    params: {
      id: fileName.replace(/\.md$/, '')
    }
  }));
}

/**
 * Get sorted blog posts data
 */
export async function getSortedPostsData(): Promise<BlogPostMetadata[]> {
  const fileNames = await fs.readdir(blogDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      // Explicitly create a plain object to avoid potential serialization issues
      const postData = {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        excerpt: matterResult.data.excerpt,
        author: matterResult.data.author,
        coverImage: matterResult.data.coverImage,
        tags: matterResult.data.tags,
        // Add any other fields from your frontmatter here
      };

      return postData; // Return the plain object
    })
  );

  // Now parse the guaranteed plain objects
  return allPostsData
    .map(post => blogPostMetadataSchema.parse(post))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Get blog post data by ID
 */
export async function getPostData(id: string): Promise<BlogPost> {
  const fullPath = path.join(blogDirectory, `${id}.md`);
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(matterResult.content);
  
  const contentHtml = processedContent.toString();
  
  return blogPostSchema.parse({
    id,
    contentHtml,
    content: matterResult.content,
    ...matterResult.data
  });
}

// Export all schemas for runtime validation
export const schemas = {
  post: blogPostSchema,
  metadata: blogPostMetadataSchema,
  id: blogPostIdSchema
}; 