import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';
import GitHubAvatar from '@/components/GitHubAvatar';
import PageHeader from '@/components/layout/PageHeader';
import Icon from '@/components/ui-components/Icon';

export default function About() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <PageHeader
        title="About Me"
        description="Technology consultant focusing on custom solutions for small businesses"
      />

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 sticky top-24">
                <GitHubAvatar 
                  username="NX211" 
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-primary dark:border-primary-light"
                />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
                  Corey Stone
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                  Full Stack Developer & Technology Consultant
                </p>
                <div className="flex flex-col space-y-3">
                  <a
                    href="/CoreyResume.docx"
                    download
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faDownload} className="mr-2 h-4 w-4" /> Download Resume
                  </a>
                  <a
                    href="https://calendar.app.google/4bZN3vV8H6aU5cNt9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faClock} className="mr-2 h-4 w-4" /> Schedule Meeting
                  </a>
                  <Link
                    href="/contact"
                    className="border border-primary text-primary dark:text-primary-light hover:bg-primary hover:text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2 h-4 w-4" /> Contact Me
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  My Experience
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  I work as a technology consultant primarily with small businesses, creating custom solutions to technical problems. My expertise spans web development, custom integration, and workflow automation to help businesses modernize their processes.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  With a background in systems administration and full-stack development, I bring a holistic approach to technology problems. I believe in finding the right solution for each client's unique needs, whether that's a custom web application, an automated workflow, or integrating existing systems.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-6">
                  Technical Skills
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Web Development</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
                      <li>React.js & Next.js</li>
                      <li>TypeScript & JavaScript</li>
                      <li>HTML & CSS (Tailwind)</li>
                      <li>Node.js & Express</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">System Administration</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Linux Server Administration</li>
                      <li>Windows Server & Active Directory</li>
                      <li>macOS Management</li>
                      <li>Exchange Server & Email Administration</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Cloud & Infrastructure</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Azure Cloud Services</li>
                      <li>Microsoft 365 Administration</li>
                      <li>Docker & Container Orchestration</li>
                      <li>Proxmox Virtualization</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">DevOps & Automation</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Ansible Configuration Management</li>
                      <li>CI/CD Pipelines</li>
                      <li>GitHub Actions</li>
                      <li>Infrastructure as Code</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Data & Security</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Data Engineering & Pipelines</li>
                      <li>Security Implementation</li>
                      <li>Monitoring & Logging</li>
                      <li>Disaster Recovery Planning</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Networking & Solutions</h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Network Administration & Design</li>
                      <li>Remote Work Solutions</li>
                      <li>Systems Integration</li>
                      <li>Social Media Management</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-6">
                  Professional Experience
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  I have extensive experience working across diverse technology environments. My background includes managing hybrid infrastructures with Windows, macOS, and Linux systems, implementing security-focused solutions, and developing custom integrations between disparate platforms.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  My work with Azure cloud services and Microsoft 365 has helped businesses transition to modern, scalable, and secure work environments. I specialize in creating robust data pipelines and implementing efficient network designs that improve operational workflows while maintaining security best practices.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  In addition to technical infrastructure, I've helped organizations optimize their digital presence through strategic social media management and implementing streamlined remote work solutions that enhance productivity and collaboration.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-6">
                  Current Direction
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  I'm currently focused on becoming more involved in the tech community and growing my knowledge and expertise around technologies that solve real business problems. I'm passionate about helping small businesses leverage modern technology solutions that were previously only accessible to larger enterprises.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  In addition to client work, I maintain open-source projects like Traefik plugins and create content for my HomeLab Hobby channel, where I share knowledge about home server setups, self-hosting, and infrastructure.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-6">
                  Ready to Collaborate?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  If you're looking for custom technology solutions for your business or have a project in mind, I'd love to discuss how I can help.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                    href="/projects"
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 text-center"
                  >
                    View My Projects
                  </Link>
                  <Link
                    href="/contact"
                    className="border border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 text-center"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 