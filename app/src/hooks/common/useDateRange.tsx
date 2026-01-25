/**
 * Reusable date range picker hook
 * Eliminates duplicate date picker logic across Incomes and Purchases screens
 */

import { useState, useCallback, useRef } from 'react';

export interface UseDateRangeResult {
  fromDate: Date;
  toDate: Date;
  isFromDatePickerOpen: boolean;
  isToDatePickerOpen: boolean;
  openFromDatePicker: () => void;
  closeFromDatePicker: () => void;
  openToDatePicker: () => void;
  closeToDatePicker: () => void;
  setFromDate: (date: Date) => void;
  setToDate: (date: Date) => void;
  clearDates: () => void;
  isDateRangeActive: boolean;
}

export const useDateRange = (): UseDateRangeResult => {
  const fromDateRef = useRef(new Date());
  const toDateRef = useRef(new Date());
  const [isFromDatePickerOpen, setIsFromDatePickerOpen] = useState(false);
  const [isToDatePickerOpen, setIsToDatePickerOpen] = useState(false);

  const openFromDatePicker = useCallback(() => {
    setIsFromDatePickerOpen(true);
  }, []);

  const closeFromDatePicker = useCallback(() => {
    setIsFromDatePickerOpen(false);
  }, []);

  const openToDatePicker = useCallback(() => {
    setIsToDatePickerOpen(true);
  }, []);

  const closeToDatePicker = useCallback(() => {
    setIsToDatePickerOpen(false);
  }, []);

  const setFromDate = useCallback(
    (date: Date) => {
      fromDateRef.current = date;
      closeFromDatePicker();
    },
    [closeFromDatePicker]
  );

  const setToDate = useCallback(
    (date: Date) => {
      toDateRef.current = date;
      closeToDatePicker();
    },
    [closeToDatePicker]
  );

  const clearDates = useCallback(() => {
    fromDateRef.current = new Date();
    toDateRef.current = new Date();
  }, []);

  const isDateRangeActive = fromDateRef.current.getTime() !== toDateRef.current.getTime();

  return {
    fromDate: fromDateRef.current,
    toDate: toDateRef.current,
    isFromDatePickerOpen,
    isToDatePickerOpen,
    openFromDatePicker,
    closeFromDatePicker,
    openToDatePicker,
    closeToDatePicker,
    setFromDate,
    setToDate,
    clearDates,
    isDateRangeActive,
  };
};
