import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-primary dark:bg-gray-900 -z-10">
          <div className="absolute inset-0 bg-[url('/logo.png')] opacity-10 mix-blend-overlay"></div>
        </div>
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="/logo.png"
              alt="Corey Stone profile"
              className="max-w-full rounded-lg shadow-2xl mx-auto md:mx-0"
              style={{ maxWidth: '350px' }}
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Turning Vision Into Reality With Code And Design.
            </h1>
            <p className="text-xl mb-8">
              As a technology consultant and engineer, I specialize in solving real business problems through custom solutions. 
              From data pipelines to system integrations, I help small businesses leverage technology that was previously only accessible to larger enterprises.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <Link
                href="/projects"
                className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors duration-300"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors duration-300"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Check out some of my latest work. These projects showcase my skills
              and experience in developing modern web applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
                <img
                  src="https://raw.githubusercontent.com/nx211/traefik-webfinger/main/.assets/logo.svg"
                  alt="Traefik WebFinger Plugin"
                  className="h-32 object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Traefik WebFinger Plugin
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  A Traefik plugin that implements the WebFinger protocol, enabling federated identity for web applications.
                </p>
                <a
                  href="https://github.com/NX211/traefik-webfinger"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary dark:text-blue-400 font-medium inline-flex items-center"
                >
                  View Project <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
                <img
                  src="https://github.com/NX211/traefik-proxmox-provider/blob/main/.assets/logo.png?raw=true"
                  alt="Traefik Proxmox Provider"
                  className="h-32 object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Traefik Proxmox Provider
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  A Traefik provider for Proxmox VE, automatically discovering and routing traffic to virtual machines and containers.
                </p>
                <a
                  href="https://github.com/NX211/traefik-proxmox-provider"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary dark:text-blue-400 font-medium inline-flex items-center"
                >
                  View Project <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
                <img
                  src="https://yt3.googleusercontent.com/ytc/AIdro_mYxiO7j5Y4zd-ELjgUAZhZddZn7-n8V_KP8O2V=s176-c-k-c0x00ffffff-no-rj"
                  alt="HomeLab Hobby"
                  className="h-32 object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  HomeLab Hobby
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Content creator focused on home lab setup, infrastructure, and self-hosting applications.
                </p>
                <a
                  href="https://homelabhobby.social"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary dark:text-blue-400 font-medium inline-flex items-center"
                >
                  Visit Channel <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              View All Projects <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Skills
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              As a technology consultant, I work with a variety of tools and technologies to deliver custom solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Web Development</h3>
              <p className="text-gray-600 dark:text-gray-400">HTML, CSS, Next.js, JavaScript, Kajabi, Webflow</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">System Integration</h3>
              <p className="text-gray-600 dark:text-gray-400">Ansible, Docker, Python, Linux, Proxmox, Ubuntu</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Workflow Automation</h3>
              <p className="text-gray-600 dark:text-gray-400">CI/CD, Data Pipelines, Scripting, GitHub Actions</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Business Solutions</h3>
              <p className="text-gray-600 dark:text-gray-400">Custom Integrations, Process Optimization</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary dark:bg-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Let's collaborate to create custom solutions for your technical needs.
          </p>
          <Link
            href="/contact"
            className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors duration-300 inline-block"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
} 