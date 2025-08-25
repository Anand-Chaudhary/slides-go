import axiosInstance from "../axiosInstance";

export const createApi = {
    getContent: async (prompt: string)=>{
        const token = localStorage.getItem(`token`)
        const {data} = await axiosInstance.get(`/ai/get-response?prompt=${prompt}`, {
            headers: {
                Authorization: `bearer ${token}`
            }
        })
        console.log(data?.result);
        
        return data;
    }
}