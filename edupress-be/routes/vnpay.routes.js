// // routes/vnpay.routes.js
// const express = require("express");
// const router = express.Router();
// const crypto = require("crypto");
// const querystring = require("qs");
// const moment = require("moment"); // Thêm moment

// // VNPay sandbox configuration
// const vnp_TmnCode = "T2IT0OPF";
// const vnp_HashSecret = "XQSW0BSNC5ZHYNU9221NBCMJS99W7FDQ";
// const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
// const vnp_ReturnUrl = "http://localhost:5173/payment-result";

// // Helper function to sort object keys
// function sortObject(obj) {
//   let sorted = {};
//   let str = [];
//   let key;
//   for (key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       str.push(encodeURIComponent(key));
//     }
//   }
//   str.sort();
//   for (key = 0; key < str.length; key++) {
//     sorted[str[key]] = obj[decodeURIComponent(str[key])];
//   }
//   return sorted;
// }

// // POST /api/vnpay/create-payment
// router.post("/create-payment", async (req, res) => {
//   try {
//     const { amount, orderId, bankCode } = req.body;

//     if (!amount || !orderId) {
//       return res.status(400).json({ success: false, message: "Missing params" });
//     }

//     const createDate = moment().format("YYYYMMDDHHmmss");
//     const ipAddr = req.ip || req.connection.remoteAddress || "127.0.0.1";

//     let vnp_Params = {
//       vnp_Version: "2.1.0",
//       vnp_Command: "pay",
//       vnp_TmnCode,
//       vnp_Amount: parseInt(amount) * 100,
//       vnp_CurrCode: "VND",
//       vnp_TxnRef: orderId,
//       vnp_OrderInfo: `Thanh toan don hang: ${orderId}`,
//       vnp_OrderType: "other",
//       vnp_Locale: "vn",
//       vnp_ReturnUrl,
//       vnp_IpAddr: ipAddr,
//       vnp_CreateDate: createDate,
//     };

//     if (bankCode) {
//       vnp_Params.vnp_BankCode = bankCode;
//     }

//     vnp_Params = sortObject(vnp_Params);
//     const signData = querystring.stringify(vnp_Params, { encode: false });
//     const hmac = crypto.createHmac("sha512", vnp_HashSecret);
//     const vnp_SecureHash = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

//     const paymentUrl = `${vnp_Url}?${querystring.stringify(vnp_Params)}&vnp_SecureHash=${vnp_SecureHash}`;

//     return res.json({ success: true, paymentUrl });
//   } catch (err) {
//     console.error("VNPay create-payment error:", err);
//     return res.status(500).json({ success: false, message: "VNPay server error", error: err.message });
//   }
// });

// // GET /api/vnpay/check_payment
// // Endpoint này xử lý kết quả trả về từ VNPay
// router.get("/check_payment", (req, res) => {
//   let vnp_Params = req.query;
//   const secureHash = vnp_Params.vnp_SecureHash;

//   delete vnp_Params.vnp_SecureHash;
//   delete vnp_Params.vnp_SecureHashType;

//   vnp_Params = sortObject(vnp_Params);
//   const signData = querystring.stringify(vnp_Params, { encode: false });
//   const hmac = crypto.createHmac("sha512", vnp_HashSecret);
//   const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

//   if (secureHash === signed) {
//     const responseCode = vnp_Params.vnp_ResponseCode;
//     if (responseCode === "00") {
//       res.json({ success: true, message: "Thanh toán thành công", data: vnp_Params });
//     } else {
//       res.json({ success: false, message: "Thanh toán thất bại", data: vnp_Params });
//     }
//   } else {
//     res.status(400).json({ success: false, message: "Checksum không hợp lệ" });
//   }
// });

// module.exports = router;




// // routes/vnpay.routes.js
// const express = require("express");
// const router = express.Router();
// const crypto = require("crypto");
// const querystring = require("qs");
// const moment = require("moment");

// // VNPay sandbox configuration
// const vnp_TmnCode = "T2IT0OPF";
// const vnp_HashSecret = "XQSW0BSNC5ZHYNU9221NBCMJS99W7FDQ";
// const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
// const vnp_ReturnUrl = "http://localhost:5173/payment-result";

// // Helper function to sort object keys
// function sortObject(obj) {
//   let sorted = {};
//   let str = [];
//   let key;
//   for (key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       str.push(encodeURIComponent(key));
//     }
//   }
//   str.sort();
//   for (key = 0; key < str.length; key++) {
//     sorted[str[key]] = obj[decodeURIComponent(str[key])];
//   }
//   return sorted;
// }

// // POST /api/vnpay/create-payment
// router.post("/create-payment", async (req, res) => {
//   try {
//     const { amount, orderId, bankCode } = req.body;

//     if (!amount || !orderId) {
//       return res.status(400).json({ success: false, message: "Missing params" });
//     }

//     const createDate = moment().format("YYYYMMDDHHmmss");
//     const ipAddr = req.ip || req.connection.remoteAddress || "127.0.0.1";

//     let vnp_Params = {
//       vnp_Version: "2.1.0",
//       vnp_Command: "pay",
//       vnp_TmnCode,
//       vnp_Amount: parseInt(amount) * 100,
//       vnp_CurrCode: "VND",
//       vnp_TxnRef: orderId,
//       vnp_OrderInfo: `Thanh toan don hang: ${orderId}`,
//       vnp_OrderType: "other",
//       vnp_Locale: "vn",
//       vnp_ReturnUrl,
//       vnp_IpAddr: ipAddr,
//       vnp_CreateDate: createDate,
//     };

//     if (bankCode) {
//       vnp_Params.vnp_BankCode = bankCode;
//     }

//     // Sắp xếp các tham số theo thứ tự alphabet
//     vnp_Params = sortObject(vnp_Params);
    
//     // Tạo chuỗi dữ liệu để ký
//     const signData = querystring.stringify(vnp_Params, { encode: false });
    
//     // Tạo chữ ký SHA512
//     const hmac = crypto.createHmac("sha512", vnp_HashSecret);
//     const vnp_SecureHash = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

//     // Tạo URL thanh toán hoàn chỉnh
//     const paymentUrl = `${vnp_Url}?${querystring.stringify(vnp_Params)}&vnp_SecureHash=${vnp_SecureHash}`;

//     return res.json({ success: true, paymentUrl });
//   } catch (err) {
//     console.error("VNPay create-payment error:", err);
//     return res.status(500).json({ success: false, message: "VNPay server error", error: err.message });
//   }
// });

// // GET /api/vnpay/check_payment
// router.get("/check_payment", (req, res) => {
//   let vnp_Params = req.query;
//   const secureHash = vnp_Params.vnp_SecureHash;

//   delete vnp_Params.vnp_SecureHash;
//   delete vnp_Params.vnp_SecureHashType;

//   vnp_Params = sortObject(vnp_Params);
//   const signData = querystring.stringify(vnp_Params, { encode: false });
//   const hmac = crypto.createHmac("sha512", vnp_HashSecret);
//   const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

//   if (secureHash === signed) {
//     const responseCode = vnp_Params.vnp_ResponseCode;
//     if (responseCode === "00") {
//       res.json({ success: true, message: "Thanh toán thành công", data: vnp_Params });
//     } else {
//       res.json({ success: false, message: "Thanh toán thất bại", data: vnp_Params });
//     }
//   } else {
//     res.status(400).json({ success: false, message: "Checksum không hợp lệ" });
//   }
// });

// module.exports = router;



// // routes/vnpay.routes.js
// const express = require("express");
// const router = express.Router();
// const crypto = require("crypto");
// const querystring = require("qs");
// const moment = require("moment");

// // Lấy giá trị từ file .env
// const vnp_TmnCode = process.env.VNP_TMNCODE;
// const vnp_HashSecret = process.env.VNP_HASHSECRET;
// const vnp_Url = process.env.VNP_URL;
// const vnp_ReturnUrl = process.env.VNP_RETURNURL;

// // Helper function để sắp xếp các key của object theo thứ tự alphabet
// function sortObject(obj) {
//   let sorted = {};
//   let str = [];
//   let key;
//   for (key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       str.push(key);
//     }
//   }
//   str.sort();
//   for (key = 0; key < str.length; key++) {
//     sorted[str[key]] = obj[str[key]];
//   }
//   return sorted;
// }

// // POST /api/vnpay/create-payment
// router.post("/create-payment", async (req, res) => {
//   try {
//     const { amount, orderId, bankCode } = req.body;

//     if (!amount || !orderId) {
//       return res.status(400).json({ success: false, message: "Missing params" });
//     }

//     const createDate = moment().format("YYYYMMDDHHmmss");
//     const ipAddr = req.ip || req.connection.remoteAddress || "127.0.0.1";

//     let vnp_Params = {
//       vnp_Version: "2.1.0",
//       vnp_Command: "pay",
//       vnp_TmnCode,
//       vnp_Amount: parseInt(amount) * 100,
//       vnp_CurrCode: "VND",
//       vnp_TxnRef: orderId,
//       vnp_OrderInfo: `Thanh toan don hang: ${orderId}`,
//       vnp_OrderType: "other",
//       vnp_Locale: "vn",
//       vnp_ReturnUrl,
//       vnp_IpAddr: ipAddr,
//       vnp_CreateDate: createDate,
//     };

//     if (bankCode) {
//       vnp_Params.vnp_BankCode = bankCode;
//     }

//     vnp_Params = sortObject(vnp_Params);
    
//     const signData = querystring.stringify(vnp_Params, { encode: false });
    
//     const hmac = crypto.createHmac("sha512", vnp_HashSecret);
//     const vnp_SecureHash = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

//     const paymentUrl = `${vnp_Url}?${querystring.stringify(vnp_Params)}&vnp_SecureHash=${vnp_SecureHash}`;

//     // Log để kiểm tra
//     console.log("Chuỗi dữ liệu ký:", signData);
//     console.log("Chữ ký được tạo:", vnp_SecureHash);

//     return res.json({ success: true, paymentUrl });
//   } catch (err) {
//     console.error("VNPay create-payment error:", err);
//     return res.status(500).json({ success: false, message: "VNPay server error", error: err.message });
//   }
// });

// // GET /api/vnpay/check_payment
// router.get("/check_payment", (req, res) => {
//   let vnp_Params = req.query;
//   const secureHash = vnp_Params.vnp_SecureHash;

//   delete vnp_Params.vnp_SecureHash;
//   delete vnp_Params.vnp_SecureHashType;

//   vnp_Params = sortObject(vnp_Params);
//   const signData = querystring.stringify(vnp_Params, { encode: false });
//   const hmac = crypto.createHmac("sha512", vnp_HashSecret);
//   const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

//   if (secureHash === signed) {
//     const responseCode = vnp_Params.vnp_ResponseCode;
//     if (responseCode === "00") {
//       res.json({ success: true, message: "Thanh toán thành công", data: vnp_Params });
//     } else {
//       res.json({ success: false, message: "Thanh toán thất bại", data: vnp_Params });
//     }
//   } else {
//     res.status(400).json({ success: false, message: "Checksum không hợp lệ" });
//   }
// });

// module.exports = router;














const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const qs = require("qs");
const moment = require("moment");

const VNPayConfig = {
  vnp_TmnCode: process.env.VNP_TMNCODE || "T2IT0OPF",
  vnp_HashSecret: process.env.VNP_HASHSECRET || "XQSW0BSNC5ZHYNU9221NBCMJS99W7FDQ",
  vnp_Url: process.env.VNP_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  vnp_ReturnUrl: process.env.VNP_RETURNURL || "http://localhost:5173/payment-result",
};

// helper sort object
function sortObject(obj) {
  const sorted = {};
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      sorted[key] = obj[key];
    });
  return sorted;
}

// Tạo URL thanh toán VNPay
router.post("/create-payment", (req, res) => {
  try {
    const { orderId, amount, bankCode } = req.body;
    if (!orderId || !amount) return res.status(400).json({ message: "Thiếu dữ liệu" });

    const ipAddr = req.ip && req.ip !== "::1" ? req.ip : "127.0.0.1";
    const createDate = moment().format("YYYYMMDDHHmmss");

    let vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: VNPayConfig.vnp_TmnCode,
      vnp_Locale: "vn",
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toan don hang #${orderId}`,
      vnp_OrderType: "other",
      vnp_Amount: parseInt(amount) * 100, // VNPay yêu cầu nhân 100
      vnp_ReturnUrl: VNPayConfig.vnp_ReturnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    if (bankCode) vnp_Params.vnp_BankCode = bankCode;

    vnp_Params = sortObject(vnp_Params);

    const signData = qs.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", VNPayConfig.vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params.vnp_SecureHash = signed;

    const paymentUrl = `${VNPayConfig.vnp_Url}?${qs.stringify(vnp_Params, { encode: false })}`;
    return res.json({ paymentUrl });
  } catch (err) {
    console.error("VNPay create-payment error:", err);
    return res.status(500).json({ message: "Có lỗi khi tạo giao dịch VNPay" });
  }
});

module.exports = router;



















// const express = require("express");
// const router = express.Router();
// const crypto = require("crypto");
// const qs = require("qs");
// const moment = require("moment");

// const VNPayConfig = {
//   vnp_TmnCode: process.env.VNP_TMNCODE || "T2IT0OPF",
//   vnp_HashSecret: process.env.VNP_HASHSECRET || "XQSW0BSNC5ZHYNU9221NBCMJS99W7FDQ",
//   vnp_Url: process.env.VNP_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
//   vnp_ReturnUrl: process.env.VNP_RETURNURL || "http://localhost:5173/payment-result",
// };

// function sortObject(obj) {
//   const sorted = {};
//   Object.keys(obj).sort().forEach((key) => {
//     sorted[key] = obj[key];
//   });
//   return sorted;
// }

// // Create payment
// router.post("/create-payment", (req, res) => {
//   try {
//     const { amount, orderId, bankCode } = req.body;
//     if (!amount || !orderId) return res.status(400).json({ message: "Thiếu dữ liệu" });

//     const createDate = moment().format("YYYYMMDDHHmmss");
//     const ipAddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

//     let vnp_Params = {
//       vnp_Version: "2.1.0",
//       vnp_Command: "pay",
//       vnp_TmnCode: VNPayConfig.vnp_TmnCode,
//       vnp_Amount: amount * 100,
//       vnp_CurrCode: "VND",
//       vnp_TxnRef: orderId,
//       vnp_OrderInfo: `Thanh toán đơn hàng #${orderId}`,
//       vnp_OrderType: "other",
//       vnp_Locale: "vn",
//       vnp_ReturnUrl: VNPayConfig.vnp_ReturnUrl,
//       vnp_IpAddr: ipAddr,
//       vnp_CreateDate: createDate,
//     };

//     if (bankCode) vnp_Params.vnp_BankCode = bankCode;

//     vnp_Params = sortObject(vnp_Params);

//     const signData = qs.stringify(vnp_Params, { encode: false });
//     const hmac = crypto.createHmac("sha512", VNPayConfig.vnp_HashSecret);
//     vnp_Params.vnp_SecureHash = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

//     const paymentUrl = `${VNPayConfig.vnp_Url}?${qs.stringify(vnp_Params, { encode: false })}`;
//     return res.json({ code: "00", vnpUrl: paymentUrl });
//   } catch (err) {
//     console.error("VNPay create-payment error:", err);
//     res.status(500).json({ code: "99", message: "Server error" });
//   }
// });

// // Return URL
// router.get("/return", (req, res) => {
//   let vnp_Params = req.query;
//   const secureHash = vnp_Params.vnp_SecureHash;
//   delete vnp_Params.vnp_SecureHash;
//   delete vnp_Params.vnp_SecureHashType;
//   vnp_Params = sortObject(vnp_Params);

//   const signData = qs.stringify(vnp_Params, { encode: false });
//   const hmac = crypto.createHmac("sha512", VNPayConfig.vnp_HashSecret);
//   const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

//   if (secureHash === signed) {
//     if (vnp_Params.vnp_ResponseCode === "00") {
//       res.json({ code: "00", message: "Thanh toán thành công", data: vnp_Params });
//     } else {
//       res.json({ code: vnp_Params.vnp_ResponseCode, message: "Thanh toán thất bại", data: vnp_Params });
//     }
//   } else {
//     res.status(400).json({ code: "97", message: "Checksum không hợp lệ" });
//   }
// });

// module.exports = router;
