import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ProjectCard from '@/components/ui-components/ProjectCard';
import ProjectFeatureCard from '@/components/features/ProjectFeatureCard';

export default function Home() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center md:justify-start">
            <Image
              src="/images/logo.png"
              alt="Corey Alan Logo"
              width={300}
              height={150}
              className="max-w-full h-auto mx-auto md:mx-0"
              priority
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Turning Vision Into Reality With Code And Design.
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-gray-600 dark:text-gray-400">
              As a technology consultant and engineer, I specialize in solving real business problems through custom solutions. 
              From data pipelines to system integrations, I help small businesses leverage technology that was previously only accessible to larger enterprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:space-x-4 justify-center md:justify-start">
              <Link
                href="/projects"
                className="w-full sm:w-auto bg-primary text-white hover:bg-primary-dark px-6 py-3 rounded-lg font-medium transition-colors duration-300 text-center"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto border border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-lg font-medium transition-colors duration-300 text-center"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Check out some of my latest work. These projects showcase my skills
              and experience in developing modern web applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Traefik WebFinger Plugin */}
            <ProjectFeatureCard
              title="Traefik WebFinger Plugin"
              description="A Traefik plugin that adds WebFinger support to your Traefik instance, enabling decentralized identity discovery."
              imageUrl="https://raw.githubusercontent.com/nx211/traefik-webfinger/main/.assets/logo.svg"
              technologies={["Go", "Traefik", "WebFinger"]}
              githubUrl="https://github.com/nx211/traefik-webfinger"
              type="backend"
            />

            {/* Traefik Proxmox Provider */}
            <ProjectFeatureCard
              title="Traefik Proxmox Provider"
              description="A Traefik provider for Proxmox VE, automatically discovering and routing traffic to virtual machines and containers."
              imageUrl="https://github.com/NX211/traefik-proxmox-provider/blob/main/.assets/logo.png?raw=true"
              technologies={["Go", "Traefik", "Proxmox"]}
              githubUrl="https://github.com/NX211/traefik-proxmox-provider"
              type="backend"
            />

            {/* Project 3 */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
              <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
                <Image
                  src="/images/homelab-hobby-logo.png"
                  alt="HomeLab Hobby"
                  fill
                  style={{ objectFit: 'contain' }}
                  className="p-4"
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
      <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Skills
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto">
            Let's collaborate to create custom solutions for your technical needs.
          </p>
          <Link
            href="/projects"
            className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors duration-300 inline-block"
          >
            View All Projects <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
} 