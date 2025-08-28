// src/api/axiosClient.js
import axios from "axios";

// Vite dùng import.meta.env
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // nếu backend dùng cookie
});

// Interceptor: trả về data trực tiếp
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API error:", error);
    throw error;
  }
);

export default axiosClient;
