// const express = require("express");
// const router = express.Router();
// const { createPayment, paymentReturn } = require("../controllers/vnpay.controller");

// router.post("/create-payment", createPayment);
// router.get("/return", paymentReturn);

// module.exports = router;

// // routes/vnpay.routes.js
// const express = require("express");
// const router = express.Router();
// const vnpayController = require("../controllers/vnpay.controller");

// // Tạo payment URL (JSON hoặc redirect trực tiếp)
// router.post("/create-payment", vnpayController.createPayment);

// // VNPay callback (khi người dùng thanh toán xong sẽ redirect về đây)
// router.get("/vnpay_return", vnpayController.checkPayment); // giữ nguyên tên này

// module.exports = router;














// // routes/vnpay.routes.js
// const express = require("express");
// const router = express.Router();
// const vnpayController = require("../controllers/vnpay.controller");

// // Tạo payment URL
// router.post("/create-payment", vnpayController.createPayment);

// // VNPay callback
// router.get("/vnpay_return", vnpayController.checkPayment);

// module.exports = router;






// // routes/vnpay.routes.js
// const express = require("express");
// const router = express.Router();
// const vnpayController = require("../controllers/vnpay.controller");

// // Tạo payment URL
// router.post("/create-payment", vnpayController.createPayment);

// // Callback VNPay
// router.get("/vnpay_return", vnpayController.checkPayment);

// module.exports = router;


const express = require("express");
const router = express.Router();
const { createPayment, checkPayment } = require("../controllers/vnpay.controller");

// Tạo payment
router.post("/create-payment", createPayment);

// Callback/Return từ VNPay
router.get("/check-payment", checkPayment);

module.exports = router;
