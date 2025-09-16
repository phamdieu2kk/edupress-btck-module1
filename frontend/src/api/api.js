// // src/api.js
// import axios from "axios";

// // Tự động lấy baseURL theo môi trường
// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
// });

// // -------------------- AUTH --------------------
// export const registerUser = async (userData) => {
//   try {
//     const response = await api.post("/auth/register", userData);
//     return response.data;
//   } catch (error) {
//     console.error("Register error:", error);
//     throw error.response?.data || error;
//   }
// };

// export const loginUser = async (userData) => {
//   try {
//     const response = await api.post("/auth/login", userData);
//     return response.data;
//   } catch (error) {
//     console.error("Login error:", error);
//     throw error.response?.data || error;
//   }
// };

// // -------------------- COURSES --------------------
// export const getCourses = async () => {
//   try {
//     const response = await api.get("/courses");
//     return response.data;
//   } catch (error) {
//     console.error("Get courses error:", error);
//     throw error.response?.data || error;
//   }
// };

// export const getCourseById = async (id) => {
//   try {
//     const response = await api.get(`/courses/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Get course by id error:", error);
//     throw error.response?.data || error;
//   }
// };

// export const createCourse = async (courseData) => {
//   try {
//     const response = await api.post("/courses", courseData);
//     return response.data;
//   } catch (error) {
//     console.error("Create course error:", error);
//     throw error.response?.data || error;
//   }
// };

// export const updateCourse = async (id, courseData) => {
//   try {
//     const response = await api.put(`/courses/${id}`, courseData);
//     return response.data;
//   } catch (error) {
//     console.error("Update course error:", error);
//     throw error.response?.data || error;
//   }
// };

// export const deleteCourse = async (id) => {
//   try {
//     const response = await api.delete(`/courses/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Delete course error:", error);
//     throw error.response?.data || error;
//   }
// };

// export default api;


// src/api.js
import axios from "axios";

// Tự động lấy baseURL theo môi trường (Vite)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // nếu backend có cookie / auth
});

// -------------------- AUTH --------------------
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error.response?.data || error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error.response?.data || error;
  }
};

// -------------------- COURSES --------------------
export const getCourses = async (limit = 0) => {
  try {
    const response = await api.get(`/courses${limit ? `?limit=${limit}` : ""}`);
    return response.data;
  } catch (error) {
    console.error("Get courses error:", error);
    throw error.response?.data || error;
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get course by id error:", error);
    throw error.response?.data || error;
  }
};

export const createCourse = async (courseData) => {
  try {
    const response = await api.post("/courses", courseData);
    return response.data;
  } catch (error) {
    console.error("Create course error:", error);
    throw error.response?.data || error;
  }
};

export const updateCourse = async (id, courseData) => {
  try {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  } catch (error) {
    console.error("Update course error:", error);
    throw error.response?.data || error;
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete course error:", error);
    throw error.response?.data || error;
  }
};

export default api;
