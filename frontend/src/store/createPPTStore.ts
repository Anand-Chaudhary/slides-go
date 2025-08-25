import { createApi } from "@/services/api/createApi";
import { AxiosError } from "axios";
import { create } from "zustand";

interface GenerateContent {
    loading: boolean
    success: boolean
    error: AxiosError | null,
    message: string | null
    create: (prompt: string) => Promise<void>
}

export const createPPT = create<GenerateContent>((set) => ({
    loading: false,
    success: false,
    error: null,
    message: null,
    create: async (prompt) => {
        set({
            loading: true,
            error: null,
            success: false
        })
        try {
            const res = await createApi.getContent(prompt)
            const message = res?.message
            console.log(res?.result);
            
            set({
                loading: false,
                error: null,
                success: true,
                message
            })
            return res?.result;
            //eslint-disable-next-line
        } catch (err: any) {
            console.log(err);
            
            set({
                loading: false,
                error: err?.message || `Unable to fetch PPT`,
                success: false,
                message: null
            })
        }
    }
}))