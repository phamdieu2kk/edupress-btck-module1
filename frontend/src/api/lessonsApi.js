import axiosClient from "./axiosClient";

const lessonsApi = {
  getAll: (params = {}) => axiosClient.get("/lessons", { params }),
  getById: (id) => axiosClient.get(`/lessons/${id}`),
  getByCourse: (courseId) => axiosClient.get(`/lessons/course/${courseId}`),
  create: (data) => axiosClient.post("/lessons", data),
  update: (id, data) => axiosClient.put(`/lessons/${id}`, data),
  delete: (id) => axiosClient.delete(`/lessons/${id}`),
};

export default lessonsApi;
