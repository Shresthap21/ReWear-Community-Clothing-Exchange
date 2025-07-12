"use client";
import axios from "axios";
import toast from "react-hot-toast";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_SERVICE;

const axiosPrivate = axios.create({
  baseURL: baseURL,
});


// Request Interceptor
axiosPrivate.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("access");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default axiosPrivate;
