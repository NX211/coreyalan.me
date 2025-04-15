import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ProjectCard from '@/components/ui-components/ProjectCard';
import ProjectFeatureCard from '@/components/features/ProjectFeatureCard';

export default function Home() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I'm a full-stack developer passionate about building modern web applications
            and contributing to open-source projects.
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
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

            {/* BNA Airport Workforce Analytics */}
            <ProjectCard
              title="BNA Airport Workforce Analytics"
              description="Developed data pipelines and analytics solutions for Nashville International Airport (BNA) to generate workforce insights."
              tags={[
                { name: "Data Engineering", color: "blue" },
                { name: "Analytics", color: "green" },
                { name: "System Administration", color: "purple" }
              ]}
              websiteUrl="https://lta-services.com"
              logoUrl="/images/projects/bna-logo.png"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary dark:bg-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to See More?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Check out my full portfolio of projects and contributions.
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