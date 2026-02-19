import type { ReactElement, ReactNode } from 'react';

export type SkeletonVariant =
  | 'text'
  | 'circular'
  | 'rectangular'
  | 'card'
  | 'table'
  | 'button'
  | 'badge'
  | 'project';

export interface SkeletonProps {
  children?: ReactNode;
  isLoaded?: boolean;
  variant?: SkeletonVariant;
  width?: string;
  height?: string;
  rows?: number;
  className?: string;
  skeletonClassName?: string;
}

export interface SkeletonRendererContext {
  isLoaded: boolean;
  width?: string;
  height?: string;
  rows: number;
  className: string;
  skeletonClassName: string;
  baseSkeletonClass: string;
}

export type SkeletonVariantRenderer = (context: SkeletonRendererContext) => ReactElement;
