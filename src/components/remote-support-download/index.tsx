'use client';

import React, { useState, useEffect } from 'react';
import { DownloadIcon } from 'lucide-react';
import Image from 'next/image';
import { getLatestRustDeskRelease } from '@/lib/github';

// Define types for clarity
type DownloadLink = {
  label: string;
  url: string;
  icon?: React.ReactNode;
};

type OsDownloadInfo = {
  osName: string;
  iconPath: string;
  getDownloadLinks: (assets: { name: string; browser_download_url: string }[]) => DownloadLink[];
};

const downloadData: OsDownloadInfo[] = [
  {
    osName: "Windows",
    iconPath: "/images/os-logos/windows.svg",
    getDownloadLinks: (assets) => [
      {
        label: "EXE Installer",
        url: assets.find(asset => asset.name.endsWith('.exe'))?.browser_download_url || '#',
      },
      {
        label: "MSI Installer",
        url: assets.find(asset => asset.name.endsWith('.msi'))?.browser_download_url || '#',
      },
    ],
  },
  {
    osName: "macOS",
    iconPath: "/images/os-logos/macos.svg",
    getDownloadLinks: (assets) => [
      {
        label: "DMG (Intel/Apple Silicon)",
        url: assets.find(asset => asset.name.endsWith('.dmg'))?.browser_download_url || '#',
      },
    ],
  },
  {
    osName: "Ubuntu",
    iconPath: "/images/os-logos/ubuntu.svg",
    getDownloadLinks: (assets) => [
      {
        label: "DEB Package (x86_64)",
        url: assets.find(asset => asset.name.endsWith('.deb'))?.browser_download_url || '#',
      },
    ],
  },
];

export function RemoteSupportDownload() {
  const [release, setRelease] = useState<Awaited<ReturnType<typeof getLatestRustDeskRelease>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelease = async () => {
      try {
        setLoading(true);
        const data = await getLatestRustDeskRelease();
        setRelease(data);
      } catch (err) {
        console.error('Error fetching RustDesk release:', err);
        setError('Failed to load download information');
      } finally {
        setLoading(false);
      }
    };

    fetchRelease();
  }, []);

  return (
    <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-md p-6 w-full mx-auto">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
        {downloadData.map(({ osName, iconPath, getDownloadLinks }) => {
          const links = getDownloadLinks(release?.assets || []);
          
          return (
            <div key={osName} className="flex flex-col items-center p-4 border rounded-lg border-gray-200 dark:border-gray-700">
              <div className="w-10 h-10 mb-3 relative">
                <Image
                  src={iconPath}
                  alt={`${osName} logo`}
                  width={40}
                  height={40}
                />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{osName}</h3>
              <div className="flex flex-col gap-2 w-full">
                {links.map(({ label, url }) => (
                  <a 
                    key={label} 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    download
                    className={`inline-flex items-center justify-center px-4 py-2 rounded-md transition-colors duration-300 ${
                      url === '#' || loading
                        ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-primary-dark'
                    }`}
                  >
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Optional: Export types if needed elsewhere
// export type { DownloadLink, OsDownloadInfo }; 