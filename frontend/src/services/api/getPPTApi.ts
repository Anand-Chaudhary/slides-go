import axiosInstance from '../axiosInstance'

export const getPPTApi = {
    getPPT: async (slug: string)=>{
        const {data} = await axiosInstance.get(`/ppt/get-ppt?slug=${slug}`);
        return data;
    }
}