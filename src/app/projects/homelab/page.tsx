'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faNetworkWired, faShieldAlt, faDatabase, faFilm, faBook, faMusic, faVideo } from '@fortawesome/free-solid-svg-icons';
import PageHeader from '@/components/layout/PageHeader';
import ProjectCard from '@/components/ui-components/ProjectCard';

type TagColor = 'blue' | 'green' | 'purple' | 'yellow' | 'orange' | 'pink' | 'red' | 'indigo' | 'gray';

interface ServiceTag {
  name: string;
  color: TagColor;
}

interface Service {
  title: string;
  description: string;
  tags: ServiceTag[];
  icon: any;
  category: 'infrastructure' | 'media' | 'development' | 'security' | 'other';
}

const infrastructureServices: Service[] = [
  {
    title: "Docker Swarm",
    description: "Container orchestration platform running across multiple nodes for high availability and scalability.",
    tags: [
      { name: "Containerization", color: "blue" },
      { name: "High Availability", color: "green" },
      { name: "Orchestration", color: "purple" }
    ],
    icon: faServer,
    category: "infrastructure"
  },
  {
    title: "Traefik",
    description: "Cloud-native edge router and reverse proxy that handles routing and load balancing for all services.",
    tags: [
      { name: "Reverse Proxy", color: "blue" },
      { name: "Load Balancing", color: "green" },
      { name: "SSL/TLS", color: "purple" }
    ],
    icon: faNetworkWired,
    category: "infrastructure"
  },
  {
    title: "Authelia",
    description: "Open-source authentication and authorization server providing secure access to services.",
    tags: [
      { name: "Authentication", color: "blue" },
      { name: "Security", color: "red" },
      { name: "SSO", color: "purple" }
    ],
    icon: faShieldAlt,
    category: "security"
  }
];

const mediaServices: Service[] = [
  {
    title: "Bazarr",
    description: "Companion Application that Manages and Downloads Subtitles",
    tags: [],
    icon: faServer,
    category: "media"
  },
  {
    title: "Fileflows",
    description: "File processing automation tool",
    tags: [],
    icon: faServer,
    category: "media"
  },
  {
    title: "Immich",
    description: "Self-Hosted Photo & Video Solution",
    tags: [],
    icon: faServer,
    category: "media"
  },
  {
    title: "Jellyfin",
    description: "The Free Software Media System",
    tags: [],
    icon: faServer,
    category: "media"
  },
  {
    title: "Kavita",
    description: "Cross Platform Reading Server",
    tags: [],
    icon: faServer,
    category: "media"
  },
  {
    title: "Lidarr",
    description: "Looks and smells like Sonarr but Made for Music",
    tags: [],
    icon: faServer,
    category: "media"
  },
  {
    title: "Overseerr",
    description: "Want a movie or TV show on Jellyfin use Overseerr",
    tags: [],
    icon: faServer,
    category: "media"
  },
  {
    title: "Peertube",
    description: "Free Software to Take Back Control of your Videos",
    tags: [],
    icon: faServer,
    category: "media"
  },
  {
    title: "Plex",
    description: "The Free Software Media System",
    tags: [],
    icon: faServer,
    category: "media"
  },
  {
    title: "Prowlarr",
    description: "A Indexer for Bittorrent and Usenet",
    tags: [],
    icon: faServer,
    category: "media"
  },
  {
    title: "Radarr",
    description: "A fork of Sonarr to work with Movies à la Couchpotato",
    tags: [],
    icon: faServer,
    category: "media"
  },
  {
    title: "Readarr",
    description: "eBook collection manager for Usenet and BitTorrent users",
    tags: [],
    icon: faServer,
    category: "media"
  },
  {
    title: "SABnzbd",
    description: "The Automated Usenet Download Tool",
    tags: [],
    icon: faServer,
    category: "media"
  },
  {
    title: "Sonarr",
    description: "Smart PVR for newsgroup and bittorrent users",
    tags: [],
    icon: faServer,
    category: "media"
  },
  {
    title: "Suggestarr",
    description: "Suggest content to your *arr applications",
    tags: [],
    icon: faServer,
    category: "media"
  },
  {
    title: "Tautulli",
    description: "Monitor your Plex Media Server",
    tags: [],
    icon: faServer,
    category: "media"
  },
  {
    title: "Transmission",
    description: "BitTorrent client",
    tags: [],
    icon: faServer,
    category: "media"
  },
  {
    title: "Tube Archivist",
    description: "Your Self Hosted Youtube Media Server",
    tags: [],
    icon: faServer,
    category: "media"
  },
  {
    title: "unpackerr",
    description: "Extract Downloads from arr Apps",
    tags: [],
    icon: faServer,
    category: "media"
  },
  {
    title: "Wizarr",
    description: "Manage Plex Invites + Onboarding",
    tags: [],
    icon: faServer,
    category: "media"
  }
];

const otherServices: Service[] = [
  {
    title: "Authelia",
    description: "An Open Source Authentication + Authorization Server",
    tags: [],
    icon: faServer,
    category: "other"
  },
  {
    title: "Elasticsearch",
    description: "A Distributed, RESTful Search + Analytics Engine",
    tags: [],
    icon: faServer,
    category: "other"
  },
  {
    title: "FreeScout",
    description: "Open Source Helpdesk + Shared Mailbox",
    tags: [],
    icon: faServer,
    category: "other"
  },
  {
    title: "Gitea",
    description: "Community Managed Git Solution",
    tags: [],
    icon: faServer,
    category: "other"
  },
  {
    title: "Guacamole",
    description: "Clientless Remote Desktop Gateway",
    tags: [],
    icon: faServer,
    category: "other"
  },
  {
    title: "Homer",
    description: "A Very Simple Static Homepage",
    tags: [],
    icon: faServer,
    category: "other"
  },
  {
    title: "IT Tools",
    description: "A Handy Online Tool for Developers",
    tags: [],
    icon: faServer,
    category: "other"
  },
  {
    title: "Jaeger",
    description: "Open source, end-to-end distributed tracing",
    tags: [],
    icon: faServer,
    category: "other"
  },
  {
    title: "Mastodon",
    description: "Decentralized Federated Social Network",
    tags: [],
    icon: faServer,
    category: "other"
  },
  {
    title: "Minio",
    description: "High Performance Object Storage Server Compatible with S3",
    tags: [],
    icon: faServer,
    category: "other"
  },
  {
    title: "MkDocs",
    description: "Fast, Simple + Downright Gorgeous Static Site Generator",
    tags: [],
    icon: faServer,
    category: "other"
  },
  {
    title: "Paperless",
    description: "Scan, Index and Archive all your Physical Documents",
    tags: [],
    icon: faServer,
    category: "other"
  },
  {
    title: "Paperless AI",
    description: "AI-powered document processing",
    tags: [],
    icon: faServer,
    category: "other"
  },
  {
    title: "Plausible",
    description: "Lightweight + Open Source Website Analytics Tool",
    tags: [],
    icon: faServer,
    category: "other"
  },
  {
    title: "Shlink",
    description: "Self Hosted URL Shortener",
    tags: [],
    icon: faServer,
    category: "other"
  },
  {
    title: "Traefik",
    description: "The Cloud Native Edge Router",
    tags: [],
    icon: faServer,
    category: "other"
  }
];

export default function HomelabPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <PageHeader 
        title="My Home Lab" 
        description="A Self-Hosted Infrastructure Showcase"
      />
      
      <div className="container mx-auto px-4">
        <section className="py-8">
          <div className="prose dark:prose-invert max-w-none">
            {/* Network Architecture */}
            <h2 className="text-4xl font-bold text-[#37abc8] mb-6 text-center">
              Network Architecture
            </h2>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#1E293B] dark:to-[#0F172A] p-6 rounded-lg shadow-md border-l-4 border-primary mb-8">
              <p className="text-lg mb-4">
                The homelab is built on a robust network architecture with multiple VLANs for security and isolation:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>LAN (VLAN 1): Primary network for trusted devices</li>
                <li>Workbench (VLAN 10): Development environment</li>
                <li>Proxy (VLAN 20): Docker swarm services</li>
                <li>IoT (VLAN 30): Smart devices</li>
                <li>Security (VLAN 60): Security systems</li>
                <li>Management (VLAN 99): Network management</li>
              </ul>
            </div>

            {/* Infrastructure Services */}
            <h2 className="text-4xl font-bold text-[#37abc8] mb-6 text-center">
              Infrastructure Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {infrastructureServices.map((service) => (
                <ProjectCard 
                  key={service.title}
                  title={service.title}
                  description={service.description}
                  tags={service.tags}
                  logoUrl={`/images/services/${service.title === "Docker Swarm" ? "docker" : service.title.toLowerCase().replace(/\s+/g, '-')}.svg`}
                />
              ))}
            </div>

            {/* Media Services */}
            <h2 className="text-4xl font-bold text-[#37abc8] mb-6 text-center">
              Media Services
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              {mediaServices.map((service) => (
                <Link
                  key={service.title}
                  href={service.title === "Bazarr" ? "https://github.com/morpheus65535/bazarr/" :
                        service.title === "Fileflows" ? "https://github.com/reportbro/fileflows" :
                        service.title === "Immich" ? "https://immich.app/" :
                        service.title === "Jellyfin" ? "https://jellyfin.org" :
                        service.title === "Kavita" ? "https://github.com/Kareadita/Kavita" :
                        service.title === "Lidarr" ? "https://github.com/lidarr/Lidarr/" :
                        service.title === "Overseerr" ? "https://overseerr.dev/" :
                        service.title === "Peertube" ? "https://joinpeertube.org/" :
                        service.title === "Plex" ? "https://plex.tv" :
                        service.title === "Prowlarr" ? "https://prowlarr.github.io" :
                        service.title === "Radarr" ? "https://github.com/Radarr/Radarr/" :
                        service.title === "Readarr" ? "https://github.com/Readarr/Readarr/" :
                        service.title === "SABnzbd" ? "https://sabnzbd.org/" :
                        service.title === "Sonarr" ? "https://github.com/Sonarr/Sonarr/" :
                        service.title === "Suggestarr" ? "https://github.com/Cloudbox/Cloudbox" :
                        service.title === "Tautulli" ? "https://tautulli.com/" :
                        service.title === "Transmission" ? "https://transmissionbt.com/" :
                        service.title === "Tube Archivist" ? "https://www.tubearchivist.com" :
                        service.title === "unpackerr" ? "https://github.com/Unpackerr/unpackerr" :
                        service.title === "Wizarr" ? "https://github.com/Wizarrrr/wizarr" : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block no-underline hover:no-underline"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300">
                    <img
                      src={`/images/services/${service.title.toLowerCase().replace(/\s+/g, '-')}.svg`}
                      alt={service.title}
                      className="w-12 h-12 mb-2"
                    />
                    <span className="text-sm font-medium text-center">{service.title}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Other Services */}
            <h2 className="text-4xl font-bold text-[#37abc8] mb-6 text-center">
              Other Services
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              {otherServices.map((service) => (
                <Link
                  key={service.title}
                  href={service.title === "Authelia" ? "https://www.authelia.com/" :
                        service.title === "Elasticsearch" ? "https://www.elastic.co/elasticsearch/" :
                        service.title === "FreeScout" ? "https://freescout.net/" :
                        service.title === "Gitea" ? "https://gitea.com/" :
                        service.title === "Guacamole" ? "https://guacamole.apache.org/" :
                        service.title === "Homer" ? "https://github.com/bastienwirtz/homer/" :
                        service.title === "IT Tools" ? "https://it-tools.tech" :
                        service.title === "Jaeger" ? "https://www.jaegertracing.io/" :
                        service.title === "Mastodon" ? "https://mastodon.social" :
                        service.title === "Minio" ? "https://min.io/" :
                        service.title === "MkDocs" ? "https://js.wiki/" :
                        service.title === "Paperless" ? "https://github.com/paperless-ngx" :
                        service.title === "Paperless AI" ? "https://github.com/paperless-ngx" :
                        service.title === "Plausible" ? "https://plausible.io/" :
                        service.title === "Shlink" ? "https://shlink.io/" :
                        service.title === "Traefik" ? "https://containo.us/traefik/" : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block no-underline hover:no-underline"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300">
                    <img
                      src={`/images/services/${service.title.toLowerCase().replace(/\s+/g, '-')}.svg`}
                      alt={service.title}
                      className="w-12 h-12 mb-2"
                    />
                    <span className="text-sm font-medium text-center">{service.title}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Security Features */}
            <h2 className="text-4xl font-bold text-[#37abc8] mb-6 text-center">
              Security Features
            </h2>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#1E293B] dark:to-[#0F172A] p-6 rounded-lg shadow-md border-l-4 border-primary mb-8">
              <ul className="list-disc pl-6 space-y-2">
                <li>Network segmentation with VLANs</li>
                <li>Centralized authentication via Authelia</li>
                <li>SSL/TLS encryption for all services</li>
                <li>Regular security updates and monitoring</li>
                <li>Container isolation via Docker Swarm</li>
                <li>Rate limiting and DDoS protection</li>
              </ul>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#1E293B] dark:to-[#0F172A] pt-2 pb-12 px-12 rounded-lg shadow-md border-l-4 border-primary text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#37abc8]">
                Want to Learn More?
              </h2>
              <p className="text-xl mb-6 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Check out the Workbench repository for detailed documentation and configuration.
              </p>
              <Link
                href="https://github.com/NX211/workbench"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 inline-flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Workbench Repository
                <FontAwesomeIcon icon={faServer} className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 