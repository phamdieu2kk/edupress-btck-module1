// src/api/cart.js
import axiosClient from "./axiosClient";

// Lấy giỏ hàng
export const getCart = async () => {
  try {
    const res = await axiosClient.get("/cart");
    return res.data;
  } catch (err) {
    console.error("Get cart error:", err);
    throw err.response?.data || err;
  }
};

// Thêm vào giỏ hàng
export const addToCart = async (courseId, quantity = 1, token) => {
  try {
    const res = await axiosClient.post(
      "/cart",
      { courseId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error("Add to cart error:", err);
    throw err.response?.data || err;
  }
};

// Xóa khỏi giỏ hàng
export const removeFromCart = async (courseId, token) => {
  try {
    const res = await axiosClient.delete(`/cart/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Remove cart error:", err);
    throw err.response?.data || err;
  }
};
