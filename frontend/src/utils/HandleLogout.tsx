import axiosInstance from "@/services/axiosInstance"
import { toast } from "sonner";

const HandleLogout = () => {
    const token = localStorage.getItem('token')
    axiosInstance.get(`/users/logout`, {
        headers: {
            Authorization: `bearer ${token}`
        }
    }).then((res) => {
        console.log(res);
        
        if (res?.status === 200) {
            localStorage.removeItem('token');
            toast.success(res?.data?.message || `User Logged out`)
            console.log(`Sending to /`);
            
            window.location.href = `/login`
        } else {
            toast.error(res?.data?.message || `User Logged Out Failed`)
        }
    })
}

export default HandleLogout