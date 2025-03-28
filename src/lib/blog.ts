import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';

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

export function getAllPostIds() {
  const fileNames = fs.readdirSync(blogDirectory);
  
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    };
  });
}

export function getSortedPostsData(): Omit<BlogPost, 'content' | 'contentHtml'>[] {
  // Get file names under /blog
  const fileNames = fs.readdirSync(blogDirectory);
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(blogDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as Omit<BlogPost, 'id' | 'content' | 'contentHtml'>)
    };
  });

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
  const fileContents = fs.readFileSync(fullPath, 'utf8');

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