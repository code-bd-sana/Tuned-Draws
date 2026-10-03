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
}: FairwayDrawsLogoProps) {
  const mappedSize = size === 'xl' ? 'lg' : size;
  return (
    <TunedDrawsBrandLogo
      className={className}
      size={mappedSize}
      href={href}
      subtitle="AUTOMOTIVE SWEEPSTAKES"
    />
  );
}

