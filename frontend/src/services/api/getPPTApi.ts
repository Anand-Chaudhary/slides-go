import axiosInstance from '../axiosInstance'

export const getPPTApi = {
    getPPT: async (slug: string) => {
        const token = localStorage.getItem(`token`)
        const { data } = await axiosInstance.get(`/ppt/get-ppt?slug=${slug}`, {
            headers: {
                Authorization: `bearer ${token}`
            }
        });
        return data;
    }
}

export const getAllPPTApi = {
    getAllPPT: async () => {
        const token = localStorage.getItem(`token`)
        const { data } = await axiosInstance.get(`/ppt/get-all-ppt`, {
            headers: {
                Authorization: `bearer ${token}`
            }
        });
        return data;
    }
}