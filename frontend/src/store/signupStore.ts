import { registerApi } from '@/services/api/registerApi';
import { create } from 'zustand';

interface RegisterState {
  loading: boolean;
  error: string | null;
  success: boolean;
  register: (data: { username: string; email: string; password: string }) => Promise<void>;
}

export const registerStore = create<RegisterState>((set) => ({
  loading: false,
  error: null,
  success: false,

  register: async (data) => {
    set({ loading: true, error: null, success: false });
    try {
      await registerApi.createUser(data);
      set({ loading: false, success: true, error: null });
    } catch (err: any) {
      set({
        loading: false,
        error: err?.response?.data?.message || "Something went wrong",
      });
      console.log("error: ", err)
    }
  },
}));
