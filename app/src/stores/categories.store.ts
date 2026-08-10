import { Category } from '@model/domain';
import { ExtendedCategory } from '@model/domain/constants/categories';
import { create } from 'zustand';

export interface CategoriesStore {
  categories: (Category | ExtendedCategory)[];
  dropdownCategories: { label: string; value: string }[];
  isDirty: boolean;
  setCategories: (categories: (Category | ExtendedCategory)[]) => void;
  setDropdownCategories: (categories: { label: string; value: string }[]) => void;
  invalidate: () => void;
}

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],
  dropdownCategories: [],
  isDirty: true,
  setCategories: (categories) => set({ categories, isDirty: false }),
  setDropdownCategories: (dropdownCategories) => set({ dropdownCategories }),
  invalidate: () => set({ categories: [], dropdownCategories: [], isDirty: true }),
}));
