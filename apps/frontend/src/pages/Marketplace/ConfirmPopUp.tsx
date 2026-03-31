import React from 'react';
import type { TemplateCard } from 'types';
import { ConfirmPopUpActions } from './confirmPopUp/ConfirmPopUpActions';
import { ConfirmPopUpDetails } from './confirmPopUp/ConfirmPopUpDetails';
import { ConfirmPopUpHeader } from './confirmPopUp/ConfirmPopUpHeader';
import { useLenisModalLock } from './confirmPopUp/useLenisModalLock';

interface ConfirmPopUpProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  template: TemplateCard | null;
}

export const ConfirmPopUp: React.FC<ConfirmPopUpProps> = ({
  isOpen,
  onClose,
  onConfirm,
  template,
}) => {
  useLenisModalLock(isOpen);

  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-[440px] animate-in zoom-in fade-in overflow-hidden rounded-2xl border border-white/10 bg-[#1a1f2e] shadow-2xl duration-300">
        <ConfirmPopUpHeader onClose={onClose} />
        <div className="flex flex-col gap-6 p-6">
          <ConfirmPopUpDetails templateTitle={template.title} />
          <ConfirmPopUpActions onClose={onClose} onConfirm={onConfirm} />
        </div>
      </div>
    </div>
  );
};
