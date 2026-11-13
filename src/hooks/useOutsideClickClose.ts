import { useEffect } from 'react';

import type { RefObject } from 'react';

export const useOutsideClickClose = <T extends HTMLElement>(
  isOpen: boolean,
  ref: RefObject<T | null>,
  onClose: () => void
): void => {
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, ref, onClose]);
};
