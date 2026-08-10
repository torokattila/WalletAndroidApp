import { Purchase } from '@model/domain';
import { create } from 'zustand';

export interface PurchasesStore {
  purchases: Purchase[];
  monthlyStatistics: { month: string; value: number }[];
  isDirty: boolean;
  setPurchases: (purchases: Purchase[]) => void;
  setMonthlyStatistics: (data: { month: string; value: number }[]) => void;
  invalidate: () => void;
}

export const usePurchasesStore = create<PurchasesStore>((set) => ({
  purchases: [],
  monthlyStatistics: [],
  isDirty: true,
  setPurchases: (purchases) => set({ purchases, isDirty: false }),
  setMonthlyStatistics: (data) => set({ monthlyStatistics: data }),
  invalidate: () => set({ purchases: [], monthlyStatistics: [], isDirty: true }),
}));
