// src/controllers/cartController.js
import Cart from "../models/Cart.js";

// Lấy giỏ hàng của user
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.course");
    if (!cart) return res.status(200).json({ items: [] });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Thêm khóa học vào giỏ hàng
export const addToCart = async (req, res) => {
  const { courseId } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [{ course: courseId }] });
    } else {
      const itemIndex = cart.items.findIndex((item) => item.course.toString() === courseId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ course: courseId });
      }
    }

    await cart.save();
    const populatedCart = await cart.populate("items.course");
    res.status(200).json(populatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa khóa học khỏi giỏ hàng
export const removeFromCart = async (req, res) => {
  const { courseId } = req.params;
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.course.toString() !== courseId);
    await cart.save();
    const populatedCart = await cart.populate("items.course");
    res.status(200).json(populatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa tất cả giỏ hàng
export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] }, { new: true });
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
