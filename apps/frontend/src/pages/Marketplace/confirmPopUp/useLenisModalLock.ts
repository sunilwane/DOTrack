import { useEffect } from 'react';
import { useLenis } from 'lenis/react';

export const useLenisModalLock = (isOpen: boolean) => {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) {
      return;
    }

    if (isOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => lenis.start();
  }, [isOpen, lenis]);
};
