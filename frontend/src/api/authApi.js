import axiosClient from "./axiosClient";

const authApi = {
  register: (data) => axiosClient.post("/auth/register", data),
  login: (data) => axiosClient.post("/auth/login", data),
  sendOtp: (data) => axiosClient.post("/auth/send-otp", data),
  resetPasswordWithOtp: (data) => axiosClient.post("/auth/reset-password-otp", data),
};

export default authApi;
