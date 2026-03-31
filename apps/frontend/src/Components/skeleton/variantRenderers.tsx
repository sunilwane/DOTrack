import type { ReactElement } from 'react';
import { renderCard, renderProject, renderTable } from './complexRenderers';
import { renderBadge, renderButton, renderCircular, renderDefault, renderText } from './simpleRenderers';
import type {
  SkeletonRendererContext,
  SkeletonVariant,
  SkeletonVariantRenderer,
} from './types';

export const variantRenderers: Partial<Record<SkeletonVariant, SkeletonVariantRenderer>> = {
  badge: renderBadge,
  button: renderButton,
  text: renderText,
  project: renderProject,
  card: renderCard,
  table: renderTable,
  circular: renderCircular,
  rectangular: renderDefault,
};

export const renderVariant = (
  variant: SkeletonVariant,
  context: SkeletonRendererContext
): ReactElement => {
  const renderer = variantRenderers[variant] || renderDefault;
  return renderer(context);
};
