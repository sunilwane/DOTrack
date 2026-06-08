import { useCallback, useState } from 'react';

/**
 * Hook for managing boolean toggle state.
 * Provides convenient methods for toggling, setting true, setting false, and a general setter.
 *
 * @param initialValue - Initial boolean value (default: false)
 * @returns Array containing current state and control functions
 *
 * @example
 * const [isOpen, toggle, open, close, setIsOpen] = useToggle();
 */
export function useToggle(initialValue = false): [
  boolean,
  () => void,
  () => void,
  () => void,
  (value: boolean) => void
] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return [value, toggle, setTrue, setFalse, setValue];
}
