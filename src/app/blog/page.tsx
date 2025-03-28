import Link from 'next/link';
import { getSortedPostsData } from '@/lib/blog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faTags } from '@fortawesome/free-solid-svg-icons';
import PageHeader from '@/components/PageHeader';

export default function Blog() {
  const posts = getSortedPostsData();

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <PageHeader
        title="Blog"
        description="Thoughts, tutorials, and insights on technology and web development."
      />

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {post.coverImage && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.coverImage} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    <Link href={`/blog/${post.id}`} className="hover:text-primary dark:hover:text-primary-light transition-colors duration-300">
                      {post.title}
                    </Link>
                  </h2>
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
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
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
                    className="inline-block text-primary dark:text-primary-light hover:underline"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 