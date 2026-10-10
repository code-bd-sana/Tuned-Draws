import React from 'react';
import TunedDrawsBrandLogo from '../../shared/TunedDrawsBrandLogo';

interface FairwayDrawsLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
  href?: string;
  priority?: boolean;
}

/**
  * Official Brand Logo bridge pointing to TunedDrawsBrandLogo.
  */
export default function FairwayDrawsLogo({
  className,
  size = 'md',
  href = '/',
  priority = false,
}: FairwayDrawsLogoProps) {
  return (
    <TunedDrawsBrandLogo
      className={className}
      size={size}
      href={href}
      priority={priority}
    />
  );
}

