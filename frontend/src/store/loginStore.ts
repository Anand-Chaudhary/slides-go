import { loginApi } from "@/services/api/loginApi"
import { create } from "zustand"

interface LoginState {
    loading: boolean,
    error: string | null
    success: boolean,
    message: string | null
    login: (data: { email: string, password: string }) => Promise<void>
}

export const loginStore = create<LoginState>((set) => ({
    loading: false,
    error: null,
    success: false,
    message: null,

    login: async (data) => {
        set({
            loading: true,
            error: null,
            success: false,
        });

        try {
            const res = await loginApi.loginUser(data)
            console.log(res)

            const ok = res?.success === true
            const msg = res?.message as string | null
            const token = res?.token as string

            if(ok){
                localStorage.setItem('token', token)
                set({
                    loading: false,
                    success: true,
                    error: null,
                    message: msg
                })
            } else{
                set({
                    loading: false,
                    success: true,
                    error: msg || `User log in failed`,
                    message: msg
                })
            }
            //eslint-disable-next-line
        } catch (err: any) {
            set({
                loading: false,
                error: err?.message || `User Login went wrong`,
                success: false,
            })
        }
    }
}))