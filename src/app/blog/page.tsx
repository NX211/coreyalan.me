import Link from 'next/link';
import { getSortedPostsData } from '@/lib/blog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faTags, faClock, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import PageHeader from '@/components/PageHeader';

export default async function Blog() {
  const posts = await getSortedPostsData();
  const post = posts[0]; // Get the most recent blog post

  // Calculate reading time based on excerpt length
  const calculateReadingTime = (excerpt: string) => {
    const wordsPerMinute = 200;
    const words = excerpt.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <PageHeader
        title="Blog"
        description="Thoughts, tutorials, and insights on technology and web development."
      />

      {/* Blog Post */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {post.coverImage && (
              <div className="h-64 overflow-hidden">
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}
            <div className="p-8">
              <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 mb-4 space-x-4">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCalendarAlt} className="h-3 w-3 mr-1" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faUser} className="h-3 w-3 mr-1" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faClock} className="h-3 w-3 mr-1" />
                  <span>{calculateReadingTime(post.excerpt)}</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                <Link href={`/blog/${post.id}`} className="hover:text-primary dark:hover:text-primary-light transition-colors duration-300">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap items-center text-xs text-gray-600 dark:text-gray-400 mb-4">
                <FontAwesomeIcon icon={faTags} className="h-3 w-3 mr-1" />
                {post.tags && post.tags.map((tag, index) => (
                  <span key={tag} className="mr-2">
                    #{tag}{index < post.tags.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </div>
              <Link 
                href={`/blog/${post.id}`}
                className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors duration-300"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <FontAwesomeIcon icon={faNewspaper} className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Subscribe to the Newsletter</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Stay updated with the latest posts, tutorials, and insights delivered straight to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 