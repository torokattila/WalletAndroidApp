import create from 'zustand';

export interface Credential {
  firstname: string;
  lastname: string;
  setFirstname: (firstname: string) => void;
  setLastname: (lastname: string) => void;
}

export const useCredentialStore = create<Credential>((set) => ({
  firstname: '',
  lastname: '',
  setFirstname: (firstname: string) => set({ firstname }),
  setLastname: (lastname: string) => set({ lastname }),
}));
