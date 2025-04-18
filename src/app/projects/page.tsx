'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faLink, faArrowRight, faCode } from '@fortawesome/free-solid-svg-icons';
import GithubPinnedRepos from '@/components/GithubPinnedRepos';
import PageHeader from '@/components/layout/PageHeader';
import ProjectCard from '@/components/ui-components/ProjectCard';
import ProjectFeatureCard from '@/components/features/ProjectFeatureCard';
import { useProjects } from '@/lib/queries/useProjects';
import { ProjectInfo, ProjectFeature } from '@/types/common';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { ApiErrorBoundary } from '@/components/error/ErrorBoundary';

export default function Projects() {
  const { data: projects, isLoading, error } = useProjects();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ErrorBoundary>
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <PageHeader
          title="My Projects"
          description="A collection of my work, open-source contributions, and development projects"
        />

        {/* Featured Projects */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Traefik WebFinger - Added from old/page-5.tsx */}
              <ProjectCard 
                title="Traefik WebFinger Plugin"
                description="A Traefik plugin that implements the WebFinger protocol (RFC7033), enabling federated identity for web applications. This plugin allows Traefik to respond to WebFinger requests, which is crucial for ActivityPub and other federated protocols."
                tags={[
                  { name: "Go", color: "blue" },
                  { name: "Traefik", color: "green" },
                  { name: "WebFinger", color: "purple" }
                ]}
                githubUrl="https://github.com/NX211/traefik-webfinger"
                catalogUrl="https://plugins.traefik.io/plugins/traefik-webfinger"
                logoUrl="https://raw.githubusercontent.com/nx211/traefik-webfinger/main/.assets/logo.svg"
              />

              {/* Traefik Proxmox Provider - Added from old/page-5.tsx */}
              <ProjectCard 
                title="Traefik Proxmox Provider"
                description="A Traefik provider for Proxmox VE that automatically discovers and routes traffic to virtual machines and containers. This plugin simplifies network configuration in Proxmox environments by dynamically generating Traefik routes."
                tags={[
                  { name: "Go", color: "blue" },
                  { name: "Traefik", color: "green" },
                  { name: "Proxmox", color: "yellow" }
                ]}
                githubUrl="https://github.com/NX211/traefik-proxmox-provider"
                catalogUrl="https://plugins.traefik.io/plugins/traefik-proxmox-provider"
                logoUrl="https://github.com/NX211/traefik-proxmox-provider/blob/main/.assets/logo.png?raw=true"
              />
            </div>
          </div>
        </section>

        {/* GitHub Pinned Repos */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              GitHub Projects
            </h2>
            <GithubPinnedRepos username="NX211" />
          </div>
        </section>

        {/* Other Projects */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Other Projects
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* BNA Airport Data Analytics */}
              <ProjectCard 
                title="BNA Airport Workforce Analytics"
                description="Developed data pipelines and analytics solutions for Nashville International Airport (BNA) to generate workforce insights. As a Systems Administrator and Data Engineer at LTA Tech Services, I helped design and implement software systems that transform operational data into actionable intelligence."
                tags={[
                  { name: "Data Engineering", color: "blue" },
                  { name: "Analytics", color: "green" },
                  { name: "System Administration", color: "purple" }
                ]}
                websiteUrl="https://lta-services.com"
                logoUrl="/images/projects/bna-logo.png"
              />
              
              {/* JL Shaw Consulting */}
              <ProjectCard 
                title="JL Shaw Consulting"
                description="Built and maintained a membership platform for JL Shaw Consulting using Kajabi. The site includes course content, membership management, and payment processing."
                tags={[
                  { name: "Kajabi", color: "orange" },
                  { name: "Web Development", color: "pink" }
                ]}
                websiteUrl="https://members.jlshawconsulting.com"
                logoUrl="/jlshaw_logo.png"
              />
              
              {/* Kajabi Vault */}
              <ProjectCard 
                title="Kajabi Vault"
                description="A custom solution built for Kajabi users, providing secure access to content and resources. [More details needed]"
                tags={[
                  { name: "Kajabi", color: "orange" },
                  { name: "Web Development", color: "pink" },
                  { name: "Next.js", color: "blue" }
                ]}
                logoUrl="/kajabi-vault-logo.svg"
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary dark:bg-primary-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Interested in Working Together?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              I'm always open to discussing new projects and collaborations.
            </p>
            <Link
              href="/contact"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors duration-300 inline-block"
            >
              Contact Me
            </Link>
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
}

function isProjectFeature(project: ProjectInfo | ProjectFeature): project is ProjectFeature {
  return 'imageUrl' in project;
} 