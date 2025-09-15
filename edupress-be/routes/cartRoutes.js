const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const verifyToken = require("../middlewares/authmiddleware");

// GET cart của user hiện tại
router.get("/", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.course");
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST thêm sản phẩm vào cart
router.post("/", verifyToken, async (req, res) => {
  try {
    const { courseId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [{ course: courseId, quantity: quantity || 1 }] });
    } else {
      const existingItem = cart.items.find(item => item.course.toString() === courseId);
      if (existingItem) {
        existingItem.quantity += quantity || 1;
      } else {
        cart.items.push({ course: courseId, quantity: quantity || 1 });
      }
    }

    await cart.save();
    const populatedCart = await cart.populate("items.course");
    res.json(populatedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update số lượng sản phẩm
// router.put("/", verifyToken, async (req, res) => {
//   try {
//     const { courseId, quantity } = req.body;
//     const cart = await Cart.findOne({ user: req.user.id });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     const item = cart.items.find(item => item.course.toString() === courseId);
//     if (!item) return res.status(404).json({ message: "Item not found" });

//     item.quantity = quantity;
//     await cart.save();
//     const populatedCart = await cart.populate("items.course");
//     res.json(populatedCart);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });



router.put("/", verifyToken, async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(item => item._id.toString() === itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    await cart.save();
    const populatedCart = await cart.populate("items.course");
    res.json(populatedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



// DELETE xoá sản phẩm khỏi cart
router.delete("/:itemId", verifyToken, async (req, res) => {
  try {
    const { itemId } = req.params;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();
    const populatedCart = await cart.populate("items.course");
    res.json(populatedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;