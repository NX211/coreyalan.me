import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faTags, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getAllPostIds, getPostData } from '@/lib/blog';

export async function generateStaticParams() {
  const paths = await getAllPostIds();
  return paths.map(path => ({
    id: path.params.id,
  }));
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id);
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <article className="max-w-4xl mx-auto">
          {/* Back to blog */}
          <div className="mb-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-primary dark:text-primary-light hover:underline"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-4 w-4" />
              Back to all posts
            </Link>
          </div>

          {/* Cover image */}
          {post.coverImage && (
            <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          )}

          {/* Title and meta */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 mb-4 space-x-6">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCalendarAlt} className="h-4 w-4 mr-2" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faUser} className="h-4 w-4 mr-2" />
                <span>{post.author}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400">
              <FontAwesomeIcon icon={faTags} className="h-4 w-4 mr-2" />
              {post.tags.map((tag, index) => (
                <span key={tag} className="mr-2">
                  #{tag}{index < post.tags.length - 1 ? ' ' : ''}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary dark:prose-a:text-primary-light prose-img:rounded-lg prose-img:shadow-md mb-8">
            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          </div>

          {/* Author bio */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              About the Author
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {post.author} is a passionate web developer and technology enthusiast.
            </p>
          </div>

          {/* Back to blog */}
          <div className="mt-8 text-center">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-primary dark:text-primary-light hover:underline"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-4 w-4" />
              Back to all posts
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
} 