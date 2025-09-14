// import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: "http://localhost:5000/api",
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });

// axiosClient.interceptors.request.use(config => {
//   console.log("API Request:", config.url, config.data || config.params);
//   return config;
// });

// axiosClient.interceptors.response.use(response => {
//   console.log("API Response:", response.data);
//   return response;
// });

// export default axiosClient;



















// // import axios from "axios";

// // const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// // const axiosClient = axios.create({
// //   baseURL,
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// //   withCredentials: true,
// // });

// // axiosClient.interceptors.request.use(
// //   (config) => {
// //     console.log("API Request:", config.method?.toUpperCase(), config.url, config.data || "");
// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // axiosClient.interceptors.response.use(
// //   (response) => {
// //     console.log("API Response:", response.data);
// //     return response.data;
// //   },
// //   (error) => {
// //     console.error("API Response Error:", error.response?.data || error.message);
// //     throw error;
// //   }
// // );

// // export default axiosClient;


// src/api/axiosClient.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosClient = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // nếu backend có cookie/session
});

// Log request để debug
axiosClient.interceptors.request.use((config) => {
  console.log(
    "API Request:",
    config.method?.toUpperCase(),
    config.url,
    config.data || config.params || ""
  );
  return config;
});

// Log response để debug
axiosClient.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.data);
    return response;
  },
  (error) => {
    console.error(
      "API Error:",
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export default axiosClient;
