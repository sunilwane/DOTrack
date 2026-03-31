import React from 'react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconBgColor?: string;
  actions?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    disabled?: boolean;
  }[];
  maxWidth?: string;
}

/**
 * Generic Modal component for dialogs and confirmations.
 * Provides a consistent modal UI with customizable content and actions.
 *
 * @example
 * <Modal
 *   isOpen={showModal}
 *   onClose={() => setShowModal(false)}
 *   title="Confirm Action"
 *   description="Are you sure?"
 *   actions={[
 *     { label: 'Cancel', onClick: handleCancel, variant: 'secondary' },
 *     { label: 'Confirm', onClick: handleConfirm, variant: 'primary' }
 *   ]}
 * >
 *   <p>Additional content here</p>
 * </Modal>
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  icon,
  iconBgColor = 'bg-primary/10',
  actions = [],
  maxWidth = 'max-w-md',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className={`bg-white dark:bg-slate-900 rounded-2xl p-6 ${maxWidth} mx-4 shadow-2xl border border-slate-200 dark:border-slate-800`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          {icon && (
            <div className={`size-12 rounded-full ${iconBgColor} flex items-center justify-center`}>
              {icon}
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-slate-500">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content */}
        {children && <div className="mb-6">{children}</div>}

        {/* Actions */}
        {actions.length > 0 && (
          <div className="flex gap-3">
            {actions.map((action, index) => (
              <Button
                key={index}
                onClick={action.onClick}
                variant={action.variant || 'primary'}
                disabled={action.disabled}
                className="flex-1"
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
