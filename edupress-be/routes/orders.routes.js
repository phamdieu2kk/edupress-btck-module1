// // routes/orders.routes.js
// const express = require("express");
// const router = express.Router();

// // Fake DB tạm thời (chỉ lưu trong memory)
// let orders = [];

// // POST /api/orders/create
// router.post("/create", (req, res) => {
//   try {
//     const { orderId, cart, total } = req.body;
//     if (!orderId || !cart || !total) {
//       return res.status(400).json({ ok: false, message: "Missing params" });
//     }

//     // Lưu order tạm thời
//     const newOrder = { orderId, cart, total, status: "pending" };
//     orders.push(newOrder);

//     return res.json({ ok: true, orderId: newOrder.orderId });
//   } catch (err) {
//     console.error("Create order error:", err);
//     return res.status(500).json({ ok: false, message: "Server error" });
//   }
// });

// module.exports = router;





// // routes/orders.routes.js
// const express = require("express");
// const router = express.Router();

// let ordersDB = [];

// router.post("/create", (req, res) => {
//   try {
//     const { orderId, cart, total } = req.body;
//     if (!orderId || !total) {
//       return res.status(400).json({ message: "Thiếu dữ liệu orderId hoặc total" });
//     }

//     const order = { orderId, cart, total, status: "pending" };
//     ordersDB.push(order);

//     console.log("✅ Order created:", order);
//     res.json({ message: "Order created", order });
//   } catch (err) {
//     console.error("❌ Order error:", err);
//     res.status(500).json({ message: "Có lỗi khi tạo order" });
//   }
// });

// module.exports = router;




const express = require("express");
const router = express.Router();

let ordersDB = [];

router.post("/create", (req, res) => {
  try {
    const { orderId, cart, total } = req.body;
    if (!orderId || !total) {
      return res.status(400).json({ message: "Thiếu dữ liệu orderId hoặc total" });
    }

    const order = { orderId, cart, total, status: "pending" };
    ordersDB.push(order);

    console.log("✅ Order created:", order);
    res.json({ ok: true, order });
  } catch (err) {
    console.error("❌ Order error:", err);
    res.status(500).json({ message: "Có lỗi khi tạo order" });
  }
});

module.exports = router;
