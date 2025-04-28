import Link from 'next/link';
import { ReactNode } from 'react';

interface ClientPortalCardProps {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
}

export function ClientPortalCard({ title, description, href, icon }: ClientPortalCardProps) {
  return (
    <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">
            <Link href={href} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              {title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
} 