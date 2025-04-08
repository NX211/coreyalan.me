import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';

// Define the blog directory path
const blogDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  coverImage: string;
  tags: string[];
  content: string;
  contentHtml: string;
}

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

export async function getAllPostIds() {
  const fileNames = await fs.readdir(blogDirectory);
  
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    };
  });
}

export async function getSortedPostsData(): Promise<Omit<BlogPost, 'content' | 'contentHtml'>[]> {
  // Get file names under /blog
  const fileNames = await fs.readdir(blogDirectory);
  const allPostsData = await Promise.all(fileNames.map(async fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(blogDirectory, fileName);
    const fileContents = await fs.readFile(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as Omit<BlogPost, 'id' | 'content' | 'contentHtml'>)
    };
  }));

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(id: string): Promise<BlogPost> {
  const fullPath = path.join(blogDirectory, `${id}.md`);
  const fileContents = await fs.readFile(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark with rehype to convert markdown into HTML string with enhanced formatting
  const processedContent = await remark()
    .use(remarkGfm) // GitHub Flavored Markdown: tables, strikethrough, tasklists, etc.
    .use(remarkBreaks) // Converts soft line breaks to <br> elements
    .use(remarkRehype, { allowDangerousHtml: true }) // Convert markdown AST to HTML AST
    .use(rehypeRaw) // Parse HTML in the markdown
    .use(rehypeStringify) // Convert HTML AST to string
    .process(matterResult.content);
    
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    content: matterResult.content,
    contentHtml,
    ...(matterResult.data as Omit<BlogPost, 'id' | 'content' | 'contentHtml'>)
  };
} 