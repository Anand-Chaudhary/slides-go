import { registerApi } from '@/services/api/registerApi';
import { create } from 'zustand';

interface RegisterState {
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string | null
  register: (data: { username: string; email: string; password: string }) => Promise<void>;
}

export const registerStore = create<RegisterState>((set) => ({
  loading: false,
  error: null,
  success: false,
  message: null,

  register: async (data) => {
    set({ loading: true, error: null, success: false });
    try {
      const res = await registerApi.createUser(data);

      const ok = res?.success === true
      const msg = res?.message as string
      const token = res?.token as string

      if(ok){
        localStorage.setItem('token', token)
        set({ loading: false, success: true, error: null, message: msg });
      } else{
        set({
        loading: false,
        error: msg,
        success: false,
        message: msg
      });
      }
    } catch (err: any) {
      console.log("error: ", err)
    }
  },
}));
