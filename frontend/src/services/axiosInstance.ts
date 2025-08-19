import axios from "axios";

if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
  throw new Error("Missing NEXT_PUBLIC_BACKEND_URL environment variable");
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;