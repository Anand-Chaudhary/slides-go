import { create } from 'zustand';
import { downloadPPTApi, getAllPPTApi, getPPTApi } from '../services/api/getPPTApi';
import { PPT } from '@/types/ppt.types';

interface PPTState {
  //eslint-disable-next-line
  ppt: any | null;
  loading: boolean;
  error: string | null;
  getPPT: (slug: string) => Promise<void>;
  getAllPPT: () => Promise<void>;
  downloadPPT: (ppt: PPT) => Promise<{ success: boolean; message: string; url: string }>;
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
      //eslint-disable-next-line
    } catch (err: any) {
      set({ error: err?.response?.data?.message || 'Failed to fetch PPT', loading: false });
    }
  },
  getAllPPT: async () =>{
    set({ loading: true, error: null });
    try {
      const data = await getAllPPTApi.getAllPPT();
      set({ ppt: data.slugs, loading: false });
      //eslint-disable-next-line
    } catch (err: any) {
      set({ error: err?.response?.data?.message || 'Failed to fetch PPT', loading: false });
    }
  },
  downloadPPT: async (ppt: PPT) => {
    set({ loading: true, error: null });
    try {
      const data = await downloadPPTApi.downloadPPT(ppt!);
      set({ loading: false });
      return data;
      //eslint-disable-next-line
    } catch (err: any) {
      set({ error: err?.response?.data?.message || 'Failed to fetch PPT', loading: false });
      throw err;
    }
  }
}));
