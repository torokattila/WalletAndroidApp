/**
 * Reusable modal state management hook
 * Eliminates duplicate modal logic across all screens with modals
 */

import { useState, useCallback } from 'react';

export interface UseModalResult<T = any> {
  isOpen: boolean;
  data: T | null;
  isEditMode: boolean;
  open: (editData?: T) => void;
  close: () => void;
  toggle: () => void;
}

export const useModal = <T = any,>(): UseModalResult<T> => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const open = useCallback((editData?: T) => {
    if (editData) {
      setData(editData);
      setIsEditMode(true);
    } else {
      setData(null);
      setIsEditMode(false);
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setData(null);
    setIsEditMode(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    data,
    isEditMode,
    open,
    close,
    toggle,
  };
};
