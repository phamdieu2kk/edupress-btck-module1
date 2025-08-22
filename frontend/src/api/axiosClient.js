// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
 // khớp với edupress-be
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // nếu BE dùng cookie
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error(error);
    throw error;
  }
);

export default axiosClient;
