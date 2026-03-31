import { PlusSquare, Upload } from 'lucide-react';
import type { ReactNode } from 'react';
import type { MainDashboardQuickAction } from 'types';

export const quickActionIconByKey: Record<MainDashboardQuickAction['icon'], ReactNode> = {
  'plus-square': <PlusSquare size={20} />,
  upload: <Upload size={20} />,
};
