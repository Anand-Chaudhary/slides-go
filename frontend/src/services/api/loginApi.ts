import axiosInstance from "../axiosInstance"

interface Login{
    email: string,
    password: string
}

export const loginApi = {
    loginUser: async ({email, password}: Login)=>{
        const {data} = await axiosInstance.post(`/users/login`, {
            email, password
        });
        return data
    }
}