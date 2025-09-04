import axiosClient from "./axiosClient";

const blogsApi = {
  getAll: (params = {}) => axiosClient.get("/blogs", { params }), // params: { page, limit }
  getById: (id) => axiosClient.get(`/blogs/${id}`),
  create: (data) => axiosClient.post("/blogs", data),
  update: (id, data) => axiosClient.put(`/blogs/${id}`, data),
  delete: (id) => axiosClient.delete(`/blogs/${id}`),
};

export default blogsApi;
