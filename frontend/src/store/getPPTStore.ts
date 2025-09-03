import { create } from 'zustand';
import { getPPTApi } from '../services/api/getPPTApi';

interface PPTState {
  ppt: any | null;
  loading: boolean;
  error: string | null;
  getPPT: (slug: string) => Promise<void>;
}

export const useGetPPTStore = create<PPTState>((set) => ({
  ppt: null,
  loading: false,
  error: null,
  getPPT: async (slug: string) => {
    set({ loading: true, error: null });
    try {
      const data = await getPPTApi.getPPT(slug);
      set({ ppt: data.ppt, loading: false });
    } catch (err: any) {
      set({ error: err?.response?.data?.message || 'Failed to fetch PPT', loading: false });
    }
  },
}));
