import { Income } from '@model/domain';
import { create } from 'zustand';

export interface IncomesStore {
  incomes: Income[];
  isDirty: boolean;
  setIncomes: (incomes: Income[]) => void;
  invalidate: () => void;
}

export const useIncomesStore = create<IncomesStore>((set) => ({
  incomes: [],
  isDirty: true,
  setIncomes: (incomes) => set({ incomes, isDirty: false }),
  invalidate: () => set({ incomes: [], isDirty: true }),
}));
