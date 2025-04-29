import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faTags, faArrowLeft, faClock } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faMastodon, faBluesky } from '@fortawesome/free-brands-svg-icons';
import { getAllPostIds, getPostData } from '@/lib/blog';
import PageHeader from '@/components/layout/PageHeader';
import Icon from '@/components/ui-components/Icon';
import GitHubAvatar from '@/components/GitHubAvatar';

export async function generateStaticParams() {
  const paths = await getAllPostIds();
  return paths.map(path => ({
    id: path.params.id,
  }));
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id);
  
  // Calculate reading time based on content length
  const wordsPerMinute = 200;
  const words = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <PageHeader 
        title={post.title}
        description={post.excerpt}
      />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Column */}
          <article className="lg:col-span-8">
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

            {/* Meta information card */}
            <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center">
                    <Icon icon={faCalendarAlt} className="h-4 w-4 text-primary mr-2" />
                    <span className="text-gray-600 dark:text-gray-400">{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center">
                    <Icon icon={faUser} className="h-4 w-4 text-primary mr-2" />
                    <span className="text-gray-600 dark:text-gray-400">{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Icon icon={faClock} className="h-4 w-4 text-primary mr-2" />
                    <span className="text-gray-600 dark:text-gray-400">{readingTime} min read</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  <Icon icon={faTags} className="h-4 w-4 text-primary" />
                  {post.tags.map((tag, index) => (
                    <span 
                      key={tag}
                      className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-8">
              <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-[#37abc8] dark:prose-headings:text-[#37abc8] prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary dark:prose-a:text-primary-light prose-img:rounded-lg prose-img:shadow-md">
                <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
              </div>
            </div>

            {/* Back to blog */}
            <div className="mt-8 text-center">
              <Link 
                href="/blog" 
                className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-4 w-4" />
                Back to all posts
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 pt-16">
              {/* Author bio */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#1E293B] dark:to-[#0F172A] rounded-lg p-8 border-l-4 border-primary">
                <h3 className="text-2xl font-bold text-[#37abc8] mb-4">
                  About the Author
                </h3>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <GitHubAvatar 
                      username="NX211" 
                      className="w-24 h-24 rounded-full object-cover border-4 border-primary dark:border-primary-light"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{post.author}</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      Full Stack Developer & Technology Consultant Specializing in Custom Solutions for Small Businesses.
                    </p>
                  </div>

                  {/* Decorative dots */}
                  <div className="flex justify-center space-x-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                    <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    <a 
                      href="https://github.com/NX211" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
                      aria-label="GitHub"
                    >
                      <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/corey-stone-17b19a80" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
                      aria-label="LinkedIn"
                    >
                      <FontAwesomeIcon icon={faLinkedin} className="h-6 w-6" />
                    </a>
                    <a 
                      href="https://authoritah.social/@nx211" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
                      aria-label="Mastodon"
                    >
                      <FontAwesomeIcon icon={faMastodon} className="h-6 w-6" />
                    </a>
                    <a 
                      href="https://bsky.app/profile/nx211.bsky.social" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
                      aria-label="Bluesky"
                    >
                      <FontAwesomeIcon icon={faBluesky} className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
} 