import { createApi } from "@/services/api/createApi"
import { ContentResponse } from "@/types/response.type"
import { AxiosError } from "axios"
import { create } from "zustand"

interface GenerateContent {
  loading: boolean
  success: boolean
  error: AxiosError | null
  message: string | null
  ppt: ContentResponse | null
  create: (prompt: string) => Promise<ContentResponse | undefined>
}

export const usePPTStore = create<GenerateContent>((set) => ({
  loading: false,
  success: false,
  error: null,
  message: null,
  ppt: null,
  create: async (prompt) => {
    set({
      loading: true,
      error: null,
      success: false,
      ppt: null
    })
    try {
      const res = await createApi.getContent(prompt)
      const message = res?.message

      set({
        loading: false,
        error: null,
        success: true,
        message,
        ppt: res // save the entire PPT response here
      })

      return res
      //eslint-disable-next-line
    } catch (err: any) {
      console.log(err)

      set({
        loading: false,
        error: err?.message || `Unable to fetch PPT`,
        success: false,
        message: null,
        ppt: null
      })
    }
  }
}))