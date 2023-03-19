import { create } from 'zustand';

export type ToastType = 'success' | 'error';

export type ShowToastParams = {
  type: ToastType;
  title: string;
  subtitle?: string;
};

export interface ToastNotification {
  visible: boolean;
  toastType: ToastType;
  toastTitle: string;
  toastSubtitle: string;
  show: (params: ShowToastParams) => void;
  hide: () => void;
}

export const useToastNotificationStore = create<ToastNotification>((set) => ({
  visible: false,
  toastType: 'success',
  toastTitle: '',
  toastSubtitle: '',
  show: (params: ShowToastParams) =>
    set({
      visible: true,
      toastType: params.type,
      toastTitle: params.title,
      toastSubtitle: params.subtitle ?? '',
    }),
  hide: () => set({ visible: false }),
}));
