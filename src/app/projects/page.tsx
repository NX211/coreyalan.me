'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import GithubPinnedRepos from '@/components/features/GithubPinnedRepos';
import PageHeader from '@/components/layout/PageHeader';
import ProjectCard from '@/components/ui-components/ProjectCard';
import OpenSourceProjects from '@/components/features/OpenSourceProjects';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { Suspense } from 'react';

type TagColor = 'blue' | 'green' | 'purple' | 'yellow' | 'orange' | 'pink' | 'red' | 'indigo' | 'gray';

interface ProjectTag {
  name: string;
  color: TagColor;
}

interface Project {
  title: string;
  description: string;
  tags: ProjectTag[];
  githubUrl?: string;
  catalogUrl?: string;
  websiteUrl?: string;
  logoUrl: string;
  logoSize?: 'normal' | 'large';
}

const featuredProjects: Project[] = [
  {
    title: "Traefik WebFinger Plugin",
    description: "A Traefik plugin that implements the WebFinger protocol (RFC7033), enabling federated identity for web applications. This plugin allows Traefik to respond to WebFinger requests, which is crucial for ActivityPub and other federated protocols.",
    tags: [
      { name: "Go", color: "blue" },
      { name: "Traefik", color: "green" },
      { name: "WebFinger", color: "purple" }
    ],
    githubUrl: "https://github.com/NX211/traefik-webfinger",
    catalogUrl: "https://plugins.traefik.io/plugins/traefik-webfinger",
    logoUrl: "/images/projects/traefik-logo.svg"
  },
  {
    title: "Traefik Proxmox Provider",
    description: "A Traefik provider for Proxmox VE that automatically discovers and routes traffic to virtual machines and containers. This plugin simplifies network configuration in Proxmox environments by dynamically generating Traefik routes.",
    tags: [
      { name: "Go", color: "blue" },
      { name: "Traefik", color: "green" },
      { name: "Proxmox", color: "yellow" }
    ],
    githubUrl: "https://github.com/NX211/traefik-proxmox-provider",
    catalogUrl: "https://plugins.traefik.io/plugins/traefik-proxmox-provider",
    logoUrl: "/images/projects/traefik-proxmox-logo.svg"
  }
];

const otherProjects: Project[] = [
  {
    title: "BNA Airport Workforce Analytics",
    description: "Developed data pipelines and analytics solutions for Nashville International Airport (BNA) to generate workforce insights. As a Systems Administrator and Data Engineer at LTA Tech Services, I helped design and implement software systems that transform operational data into actionable intelligence.",
    tags: [
      { name: "Data Engineering", color: "blue" },
      { name: "Analytics", color: "green" },
      { name: "System Administration", color: "purple" }
    ],
    websiteUrl: "https://lta-services.com",
    logoUrl: "/images/projects/bna-logo.svg",
    logoSize: "large"
  },
  {
    title: "JL Shaw Consulting",
    description: "Built and maintained a membership platform for JL Shaw Consulting using Kajabi. The site includes course content, membership management, and payment processing.",
    tags: [
      { name: "Kajabi", color: "orange" },
      { name: "Web Development", color: "blue" }
    ],
    websiteUrl: "https://members.jlshawconsulting.com",
    logoUrl: "/images/projects/jlshaw-logo.png",
    logoSize: "large"
  }
];

export default function ProjectsPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <PageHeader 
        title="Projects" 
        description="A Collection Of My Work, Open-Source Contributions, And Development Projects"
      />
      
      <div className="container mx-auto px-4">
        {/* Main Content */}
        <section className="py-8">
          <div className="prose dark:prose-invert max-w-none">
            {/* Featured Projects */}
            <h2 className="text-4xl font-bold text-[#37abc8] mb-6 text-center">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {featuredProjects.map((project) => (
                <ProjectCard 
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  githubUrl={project.githubUrl}
                  catalogUrl={project.catalogUrl}
                  logoUrl={project.logoUrl}
                />
              ))}
            </div>

            {/* GitHub Pinned Repositories */}
            <h2 className="text-4xl font-bold text-[#37abc8] mb-6 text-center">
              GitHub Pinned Repositories
            </h2>
            <div className="mb-8">
              <ErrorBoundary>
                <Suspense fallback={<div>Loading GitHub repositories...</div>}>
                  <GithubPinnedRepos />
                </Suspense>
              </ErrorBoundary>
            </div>

            {/* Other Projects */}
            <h2 className="text-4xl font-bold text-[#37abc8] mb-6 text-center">
              Other Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {otherProjects.map((project) => (
                <ProjectCard 
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  websiteUrl={project.websiteUrl}
                  logoUrl={project.logoUrl}
                  logoSize={project.logoSize}
                />
              ))}
            </div>

            {/* Open Source Contributions */}
            <h2 className="text-4xl font-bold text-[#37abc8] mb-6 text-center">
              Open Source Contributions
            </h2>
            <div className="mb-8">
              <ErrorBoundary>
                <Suspense fallback={<div>Loading open source projects...</div>}>
                  <OpenSourceProjects />
                </Suspense>
              </ErrorBoundary>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#1E293B] dark:to-[#0F172A] pt-2 pb-12 px-12 rounded-lg shadow-md border-l-4 border-primary text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#37abc8]">
                Interested in Working Together?
              </h2>
              <p className="text-xl mb-6 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                I'm always open to discussing new projects and collaborations.
              </p>
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 inline-flex items-center"
              >
                Contact Me
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 