"use client";
import axios from "axios";
import toast from "react-hot-toast";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_SERVICE;

const axiosPrivate = axios.create({
  baseURL: baseURL,
});

// Redirect Manager to avoid infinite redirect loops
const RedirectManager = {
  isRedirecting: false,
  lastRedirectTime: 0,
  canRedirect() {
    const now = Date.now();
    if (!this.isRedirecting || (now - this.lastRedirectTime > 5000)) {
      this.isRedirecting = true;
      this.lastRedirectTime = now;
      return true;
    }
    return false;
  },
  reset() {
    this.isRedirecting = false;
  }
};

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

// Response Interceptor with refresh flow
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url.endsWith("/me") && !RedirectManager.canRedirect()) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh");
      const accessToken = localStorage.getItem("access");

      if (refreshToken && accessToken) {
        try {
          const refreshRes = await axios.post(
            `${baseURL}/token_refresh`,
            {
              refresh_token: refreshToken,
              token: accessToken,
            },
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          const newAccessToken = refreshRes.data.token;
          const newRefreshToken = refreshRes.data.refresh_token;

          localStorage.setItem("access", newAccessToken);
          localStorage.setItem("refresh", newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosPrivate(originalRequest); // retry original
        } catch (refreshError) {
          if (refreshError.response?.status === 401 && RedirectManager.canRedirect()) {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            window.location.href = "/";
          }
          return Promise.reject(refreshError);
        }
      } else {
        if (RedirectManager.canRedirect()) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/";
        }
        return Promise.reject(error);
      }
    }

    if (error.response?.status === 500) {
      toast.error("Please retry later!");
    }

    return Promise.reject(error);
  }
);

export default axiosPrivate;
