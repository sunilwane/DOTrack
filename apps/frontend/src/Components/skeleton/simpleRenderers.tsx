import { Skeleton as HeroSkeleton } from '@heroui/react';
import type { SkeletonVariantRenderer } from './types';

export const renderBadge: SkeletonVariantRenderer = ({
  isLoaded,
  width,
  height,
  className,
  skeletonClassName,
  baseSkeletonClass,
}) => (
  <HeroSkeleton
    isLoaded={isLoaded}
    className={`rounded-full ${baseSkeletonClass} ${className} ${skeletonClassName}`}
    style={{ width: width || '60px', height: height || '22px' }}
  />
);

export const renderButton: SkeletonVariantRenderer = ({
  isLoaded,
  width,
  height,
  className,
  skeletonClassName,
  baseSkeletonClass,
}) => (
  <HeroSkeleton
    isLoaded={isLoaded}
    className={`rounded-lg ${baseSkeletonClass} ${className} ${skeletonClassName}`}
    style={{ width: width || '100px', height: height || '32px' }}
  />
);

export const renderText: SkeletonVariantRenderer = ({
  isLoaded,
  width,
  height,
  rows,
  className,
  skeletonClassName,
  baseSkeletonClass,
}) => (
  <div className={`flex flex-col gap-2.5 ${className}`}>
    {Array.from({ length: rows }).map((_, index) => (
      <HeroSkeleton
        key={index}
        isLoaded={isLoaded}
        className={`rounded-lg ${baseSkeletonClass} ${skeletonClassName}`}
        style={{
          width: width || (index === rows - 1 ? '70%' : '100%'),
          height: height || '14px',
        }}
      />
    ))}
  </div>
);

export const renderCircular: SkeletonVariantRenderer = ({
  isLoaded,
  width,
  height,
  className,
  skeletonClassName,
  baseSkeletonClass,
}) => (
  <HeroSkeleton
    isLoaded={isLoaded}
    className={`rounded-full ${baseSkeletonClass} ${className} ${skeletonClassName}`}
    style={{ width: width || '40px', height: height || '40px' }}
  />
);

export const renderDefault: SkeletonVariantRenderer = ({
  isLoaded,
  width,
  height,
  className,
  skeletonClassName,
  baseSkeletonClass,
}) => (
  <HeroSkeleton
    isLoaded={isLoaded}
    className={`rounded-lg ${baseSkeletonClass} ${className} ${skeletonClassName}`}
    style={{ width: width || '100%', height: height || '20px' }}
  />
);
