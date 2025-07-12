import axios from "axios";

const axiosPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_SERVICE,
});

export default axiosPublic;
