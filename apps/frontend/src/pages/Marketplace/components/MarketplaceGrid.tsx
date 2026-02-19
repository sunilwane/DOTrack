import { Skeleton } from '../../../Components/Skeleton';
import { TemplateCardComponent } from '../../../Components/common/marketplace/TemplateCard';
import type { TemplateCard } from 'types';

interface MarketplaceGridProps {
  isLoading: boolean;
  templates: TemplateCard[];
  onDeploy: (template: TemplateCard) => void;
}

const MarketplaceGrid = ({ isLoading, templates, onDeploy }: MarketplaceGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {isLoading
      ? Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} variant="card" height="320px" />
        ))
      : templates.map((template) => (
          <TemplateCardComponent key={template.id} template={template} onDeploy={onDeploy} />
        ))}
  </div>
);

export default MarketplaceGrid;
