// src/api/courseApi.js
import axiosClient from "./axiosClient";

const courseApi = {
  getAll: () => axiosClient.get("/courses"),
  getById: (id) => axiosClient.get(`/courses/${id}`),
};

export default courseApi;
