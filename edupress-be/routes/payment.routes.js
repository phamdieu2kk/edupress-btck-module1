// const express = require("express");
// const router = express.Router();

// // Fake payment processing with cart
// router.post("/process-payment", async (req, res) => {
//   try {
//     const { orderId, cart, total, method } = req.body;

//     if (!orderId || !cart || !total || !method) {
//       return res.status(400).json({ message: "Thiếu dữ liệu thanh toán" });
//     }

//     console.log("=== Payment Request ===");
//     console.log({ orderId, cart, total, method });

//     await new Promise((r) => setTimeout(r, 1200));

//     const isSuccess = Math.random() > 0.1; // 90% chance success
//     const result = {
//       orderId,
//       total,
//       method,
//       status: isSuccess ? "success" : "failed",
//       message: isSuccess
//         ? "Thanh toán thành công"
//         : "Thanh toán thất bại, vui lòng thử lại",
//     };

//     console.log("=== Payment Result ===");
//     console.log(result);

//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Lỗi server khi xử lý thanh toán" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();

// POST /api/payment/test
router.post("/test", (req, res) => {
  const { orderId, cart, total } = req.body;

  if (!orderId || !cart?.length || !total) {
    return res.status(400).json({ message: "Missing parameters" });
  }

  // Giả lập lưu order
  const order = {
    orderId,
    cart,
    total,
    status: "paid",
    paymentUrl: `http://localhost:5173/payment-result`,
  };

  console.log("✅ Order created (TEST MODE):", order);

  return res.json(order);
});

module.exports = router;
