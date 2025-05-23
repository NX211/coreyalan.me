import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ProjectCard from '@/components/ui-components/ProjectCard';
import ProjectFeatureCard from '@/components/features/ProjectFeatureCard';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="/images/logo.png"
              alt="Corey Alan Logo"
              className="max-w-full mx-auto md:mx-0"
              style={{ maxWidth: '300px' }}
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Turning Vision Into Reality With Code And Design.
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-gray-600 dark:text-gray-400">
              As technology consultants and engineers, we specialize in solving real business problems through custom solutions. 
              From data pipelines to system integrations, we help small businesses leverage technology that was previously only accessible to larger enterprises.
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
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl font-bold text-[#37abc8] mb-6 text-center">
              Featured Projects
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Check out some of our latest work. These projects showcase our skills and experience in developing modern web applications and custom business solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <img
                    src="/images/projects/traefik-logo.svg"
                    alt="Traefik WebFinger Plugin"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
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
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <img
                    src="/images/projects/traefik-proxmox-logo.svg"
                    alt="Traefik Proxmox Provider"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
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
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <img
                    src="/images/homelab-hobby-logo.png"
                    alt="HomeLab Hobby"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#37abc8] mb-4">
              Technical Skills
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              As technology consultants, we work with a variety of tools and technologies to deliver custom solutions.
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
              <p className="text-gray-600 dark:text-gray-400">Ansible, Docker, Python, Linux, Proxmox, Google Workspace, Microsoft 365</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Workflow Automation</h3>
              <p className="text-gray-600 dark:text-gray-400">CI/CD, Data Pipelines, Scripting, GitHub Actions, Zapier</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Business Solutions</h3>
              <p className="text-gray-600 dark:text-gray-400">Custom Integrations, Process Optimization</p>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Platforms Section */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#37abc8] mb-4">
              Commercial Platforms
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              I specialize in implementing and integrating these industry-leading platforms to create powerful business solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-5xl mx-auto">
            {/* Kajabi */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-[220px] flex items-center justify-center">
              <Image
                src="/images/logos/kajabi_logo.png"
                alt="Kajabi"
                width={150}
                height={150}
                className="h-auto max-w-[130px] object-contain"
                priority
              />
            </div>

            {/* Google Workspace */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-[220px] flex items-center justify-center">
              <Image
                src="/images/logos/google_workspace.png"
                alt="Google Workspace"
                width={150}
                height={150}
                className="h-auto max-w-[130px] object-contain"
                priority
              />
            </div>

            {/* WordPress */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-[220px] flex items-center justify-center">
              <Image
                src="/images/logos/wordpress_logo.png"
                alt="WordPress"
                width={150}
                height={150}
                className="h-auto max-w-[130px] object-contain"
                priority
              />
            </div>

            {/* Zapier */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-[220px] flex items-center justify-center">
              <Image
                src="/images/logos/zapier_logo.svg"
                alt="Zapier"
                width={150}
                height={150}
                className="h-auto max-w-[130px] object-contain"
                priority
              />
            </div>

            {/* Webflow */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-[220px] flex items-center justify-center">
              <Image
                src="/images/logos/webflow_logo.png"
                alt="Webflow"
                width={150}
                height={150}
                className="h-auto max-w-[130px] object-contain"
                priority
              />
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