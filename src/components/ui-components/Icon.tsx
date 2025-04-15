'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface IconProps {
  icon: IconDefinition;
  className?: string;
}

export default function Icon({ icon, className = '' }: IconProps) {
  return <FontAwesomeIcon icon={icon} className={className} />;
} 