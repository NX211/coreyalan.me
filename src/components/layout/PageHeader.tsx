'use client';

import Link from 'next/link';
import Icon from '@/components/ui-components/Icon';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface PageHeaderProps {
  title: string;
  description?: string;
  backLink?: string;
}

export default function PageHeader({ title, description, backLink }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {backLink && (
        <Link
          href={backLink}
          className="mb-4 inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <Icon icon={faArrowLeft} className="mr-2 h-4 w-4" />
          Back
        </Link>
      )}
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-lg text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
} 