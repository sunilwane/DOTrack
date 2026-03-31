import { Skeleton as HeroSkeleton } from '@heroui/react';
import { baseSkeletonClass } from './skeleton/constants';
import type { SkeletonProps } from './skeleton/types';
import { renderVariant } from './skeleton/variantRenderers';

export const Skeleton = ({
  children,
  isLoaded = false,
  variant = 'rectangular',
  width,
  height,
  rows = 1,
  className = '',
  skeletonClassName = '',
}: SkeletonProps) => {
  if (children !== undefined) {
    if (isLoaded) return <>{children}</>;

    return (
      <HeroSkeleton
        isLoaded={false}
        className={`rounded-xl ${baseSkeletonClass} ${className} ${skeletonClassName}`}
        style={{ width, height }}
      >
        <div className="opacity-0 pointer-events-none select-none">{children}</div>
      </HeroSkeleton>
    );
  }

  return renderVariant(variant, {
    isLoaded,
    width,
    height,
    rows,
    className,
    skeletonClassName,
    baseSkeletonClass,
  });
};
