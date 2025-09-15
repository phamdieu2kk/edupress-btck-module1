// // controllers/vnpay.controller.js
// const crypto = require("crypto");
// const qs = require("qs");
// const moment = require("moment");

// // Config
// const VNPayConfig = {
//   vnp_TmnCode: process.env.VNP_TMNCODE || "T2IT0OPF",
//   vnp_HashSecret: process.env.VNP_HASHSECRET || "XQSW0BSNC5ZHYNU9221NBCMJS99W7FDQ",
//   vnp_Url: process.env.VNP_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
//   vnp_ReturnUrl: process.env.VNP_RETURNURL || "http://localhost:5173/payment-result",
// };

// // Hàm sort object theo key
// function sortObject(obj) {
//   const sorted = {};
//   Object.keys(obj).sort().forEach((key) => {
//     sorted[key] = obj[key];
//   });
//   return sorted;
// }

// // ========== API tạo link thanh toán ==========
// exports.createPayment = (req, res) => {
//   try {
//     let { orderId, amount, bankCode, redirect } = req.body;

//     if (!orderId || !amount) {
//       return res.status(400).json({ message: "Thiếu orderId hoặc amount" });
//     }

//     amount = Number(amount);
//     if (isNaN(amount) || amount <= 0) {
//       return res.status(400).json({ message: "amount phải là số > 0" });
//     }

//     // Lấy IP client
//     const ipAddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";

//     // Format ngày giờ
//     const createDate = moment().format("YYYYMMDDHHmmss");
//     const expireDate = moment().add(15, "minutes").format("YYYYMMDDHHmmss");

//     // Tạo mã giao dịch duy nhất
//     const txnRef = Date.now().toString().slice(-10);

//     let vnp_Params = {
//       vnp_Version: "2.1.0",
//       vnp_Command: "pay",
//       vnp_TmnCode: VNPayConfig.vnp_TmnCode,
//       vnp_Locale: "vn",
//       vnp_CurrCode: "VND",
//       vnp_TxnRef: txnRef,
//       vnp_OrderInfo: `Thanh toán đơn hàng #${orderId}`,
//       vnp_OrderType: "other",
//       vnp_Amount: amount * 100, // số tiền x100
//       vnp_ReturnUrl: VNPayConfig.vnp_ReturnUrl,
//       vnp_IpAddr: ipAddr,
//       vnp_CreateDate: createDate,
//       vnp_ExpireDate: expireDate,
//     };

//     if (bankCode) vnp_Params.vnp_BankCode = bankCode;

//     // B1: sort params
//     vnp_Params = sortObject(vnp_Params);

//     // B2: tạo chữ ký
//     const signData = qs.stringify(vnp_Params, { encode: false });
//     const hmac = crypto.createHmac("sha512", VNPayConfig.vnp_HashSecret);
//     const signed = hmac.update(signData).digest("hex");

//     vnp_Params.vnp_SecureHash = signed;

//     // B3: build paymentUrl
//     // const paymentUrl = `${VNPayConfig.vnp_Url}?${qs.stringify(vnp_Params, { encode: true })}`;
// const paymentUrl = `${VNPayConfig.vnp_Url}?${qs.stringify(vnp_Params, { encode: false })}`;
// console.log("==== Params to sign ====", vnp_Params);
// console.log("==== SignData ====", signData);
// console.log("==== SecureHash ====", signed);

//     console.log("[VNPay] createPayment ->", paymentUrl);

//     // Nếu FE gửi redirect=true thì redirect thẳng
//     if (redirect) {
//       return res.redirect(paymentUrl);
//     }

//     // Ngược lại trả JSON cho FE tự xử lý
//     return res.json({ paymentUrl });
//   } catch (err) {
//     console.error("VNPay createPayment error:", err);
//     return res.status(500).json({ message: "Có lỗi khi tạo giao dịch VNPay" });
//   }
// };

// // ========== API check kết quả thanh toán ==========
// exports.checkPayment = (req, res) => {
//   try {
//     let vnp_Params = { ...req.query };
//     const secureHash = vnp_Params.vnp_SecureHash;
//     delete vnp_Params.vnp_SecureHash;
//     delete vnp_Params.vnp_SecureHashType;

//     vnp_Params = sortObject(vnp_Params);
//     const signData = qs.stringify(vnp_Params, { encode: false });
//     const hmac = crypto.createHmac("sha512", VNPayConfig.vnp_HashSecret);
//     const signed = hmac.update(signData).digest("hex");

//     if (secureHash === signed) {
//       const responseCode = vnp_Params.vnp_ResponseCode;
//       if (responseCode === "00") {
//         return res.json({
//           success: true,
//           message: "Thanh toán thành công",
//           data: vnp_Params,
//         });
//       } else {
//         return res.json({
//           success: false,
//           message: "Thanh toán thất bại",
//           data: vnp_Params,
//         });
//       }
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "Checksum không hợp lệ",
//       });
//     }
//   } catch (err) {
//     console.error("VNPay checkPayment error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };


// // controllers/vnpay.controller.js
// const crypto = require("crypto");
// const qs = require("qs");
// const moment = require("moment");

// // Config
// const VNPayConfig = {
//   vnp_TmnCode: process.env.VNP_TMNCODE || "T2IT0OPF",
//   vnp_HashSecret: process.env.VNP_HASHSECRET || "XQSW0BSNC5ZHYNU9221NBCMJS99W7FDQ",
//   vnp_Url: process.env.VNP_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
//   vnp_ReturnUrl: process.env.VNP_RETURNURL || "http://localhost:5173/payment-result",
// };

// // Hàm sort object theo key
// function sortObject(obj) {
//   const sorted = {};
//   Object.keys(obj).sort().forEach((key) => {
//     sorted[key] = obj[key];
//   });
//   return sorted;
// }

// // ========== API tạo link thanh toán ==========
// exports.createPayment = (req, res) => {
//   try {
//     let { orderId, amount, bankCode, redirect } = req.body;

//     if (!orderId || !amount) {
//       return res.status(400).json({ message: "Thiếu orderId hoặc amount" });
//     }

//     amount = Number(amount);
//     if (isNaN(amount) || amount <= 0) {
//       return res.status(400).json({ message: "amount phải là số > 0" });
//     }

//     // Lấy IP client
//     const ipAddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";

//     // Format ngày giờ
//     const createDate = moment().format("YYYYMMDDHHmmss");
//     const expireDate = moment().add(15, "minutes").format("YYYYMMDDHHmmss");

//     // Tạo mã giao dịch duy nhất
//     const txnRef = Date.now().toString().slice(-10);

//     let vnp_Params = {
//       vnp_Version: "2.1.0",
//       vnp_Command: "pay",
//       vnp_TmnCode: VNPayConfig.vnp_TmnCode,
//       vnp_Locale: "vn",
//       vnp_CurrCode: "VND",
//       vnp_TxnRef: txnRef,
//       vnp_OrderInfo: `Thanh toán đơn hàng #${orderId}`,
//       vnp_OrderType: "other",
//       vnp_Amount: amount * 100, // số tiền x100
//       vnp_ReturnUrl: VNPayConfig.vnp_ReturnUrl,
//       vnp_IpAddr: ipAddr,
//       vnp_CreateDate: createDate,
//       vnp_ExpireDate: expireDate,
//     };

//     if (bankCode) vnp_Params.vnp_BankCode = bankCode;

//     // B1: sort params
//     vnp_Params = sortObject(vnp_Params);

//     // B2: tạo chữ ký
//     const signData = qs.stringify(vnp_Params, { encode: false });
//     const hmac = crypto.createHmac("sha512", VNPayConfig.vnp_HashSecret);
//     const signed = hmac.update(signData).digest("hex");

//     vnp_Params.vnp_SecureHash = signed;

//     // B3: build paymentUrl (encode: true!)
//     const paymentUrl = `${VNPayConfig.vnp_Url}?${qs.stringify(vnp_Params, { encode: true })}`;

//     console.log("==== Params to sign ====", vnp_Params);
//     console.log("==== SignData ====", signData);
//     console.log("==== SecureHash ====", signed);
//     console.log("[VNPay] createPayment ->", paymentUrl);

//     if (redirect) {
//       return res.redirect(paymentUrl);
//     }

//     return res.json({ paymentUrl });
//   } catch (err) {
//     console.error("VNPay createPayment error:", err);
//     return res.status(500).json({ message: "Có lỗi khi tạo giao dịch VNPay" });
//   }
// };

// // ========== API check kết quả thanh toán ==========
// exports.checkPayment = (req, res) => {
//   try {
//     let vnp_Params = { ...req.query };
//     const secureHash = vnp_Params.vnp_SecureHash;
//     delete vnp_Params.vnp_SecureHash;
//     delete vnp_Params.vnp_SecureHashType;

//     vnp_Params = sortObject(vnp_Params);
//     const signData = qs.stringify(vnp_Params, { encode: false });
//     const hmac = crypto.createHmac("sha512", VNPayConfig.vnp_HashSecret);
//     const signed = hmac.update(signData).digest("hex");

//     if (secureHash === signed) {
//       const responseCode = vnp_Params.vnp_ResponseCode;
//       if (responseCode === "00") {
//         return res.json({
//           success: true,
//           message: "Thanh toán thành công",
//           data: vnp_Params,
//         });
//       } else {
//         return res.json({
//           success: false,
//           message: "Thanh toán thất bại",
//           data: vnp_Params,
//         });
//       }
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "Checksum không hợp lệ",
//       });
//     }
//   } catch (err) {
//     console.error("VNPay checkPayment error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };














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
//   return Object.keys(obj).sort().reduce((acc, key) => {
//     acc[key] = obj[key];
//     return acc;
//   }, {});
// }

// const createPayment = (req, res) => {
//   try {
//     // 💡 Bảo vệ destructure
//     const { orderId, amount, bankCode, redirect } = req.body || {};
//     if (!orderId || !amount) {
//       console.error("[VNPay] createPayment missing params:", req.body);
//       return res.status(400).json({ message: "Thiếu orderId hoặc amount" });
//     }

//     const numericAmount = Number(amount);
//     if (isNaN(numericAmount) || numericAmount <= 0) {
//       return res.status(400).json({ message: "amount phải là số > 0" });
//     }

//     const ipAddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";
//     const createDate = moment().format("YYYYMMDDHHmmss");
//     const expireDate = moment().add(15, "minutes").format("YYYYMMDDHHmmss");
//     const txnRef = Date.now().toString().slice(-10);

//     let vnp_Params = {
//       vnp_Version: "2.1.0",
//       vnp_Command: "pay",
//       vnp_TmnCode: VNPayConfig.vnp_TmnCode,
//       vnp_Locale: "vn",
//       vnp_CurrCode: "VND",
//       vnp_TxnRef: txnRef,
//       vnp_OrderInfo: `Thanh toán đơn hàng #${orderId}`,
//       vnp_OrderType: "other",
//       vnp_Amount: numericAmount * 100,
//       vnp_ReturnUrl: VNPayConfig.vnp_ReturnUrl,
//       vnp_IpAddr: ipAddr,
//       vnp_CreateDate: createDate,
//       vnp_ExpireDate: expireDate,
//     };
//     if (bankCode) vnp_Params.vnp_BankCode = bankCode;

//     vnp_Params = sortObject(vnp_Params);
//     const signData = qs.stringify(vnp_Params, { encode: false });
//     const signed = crypto.createHmac("sha512", VNPayConfig.vnp_HashSecret).update(signData).digest("hex");
//     vnp_Params.vnp_SecureHash = signed;

//     const paymentUrl = `${VNPayConfig.vnp_Url}?${qs.stringify(vnp_Params, { encode: true })}`;

//     console.log("[VNPay] Params:", vnp_Params);
//     console.log("[VNPay] Payment URL:", paymentUrl);

//     if (redirect) return res.redirect(paymentUrl);
//     return res.json({ paymentUrl });
//   } catch (err) {
//     console.error("[VNPay] createPayment error:", err);
//     return res.status(500).json({ message: "Có lỗi khi tạo giao dịch VNPay" });
//   }
// };

// const checkPayment = (req, res) => {
//   try {
//     let vnp_Params = { ...req.query };
//     const secureHash = vnp_Params.vnp_SecureHash;
//     delete vnp_Params.vnp_SecureHash;
//     delete vnp_Params.vnp_SecureHashType;

//     vnp_Params = sortObject(vnp_Params);
//     const signData = qs.stringify(vnp_Params, { encode: false });
//     const signed = crypto.createHmac("sha512", VNPayConfig.vnp_HashSecret).update(signData).digest("hex");

//     if (secureHash === signed) {
//       const responseCode = vnp_Params.vnp_ResponseCode;
//       return res.json({
//         success: responseCode === "00",
//         message: responseCode === "00" ? "Thanh toán thành công" : "Thanh toán thất bại",
//         data: vnp_Params,
//       });
//     } else {
//       return res.status(400).json({ success: false, message: "Checksum không hợp lệ" });
//     }
//   } catch (err) {
//     console.error("[VNPay] checkPayment error:", err);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// module.exports = { createPayment, checkPayment };














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
//   return Object.keys(obj).sort().reduce((acc, key) => {
//     acc[key] = obj[key];
//     return acc;
//   }, {});
// }

// const createPayment = (req, res) => {
//   try {
//     let { orderId, amount, bankCode } = req.body;
//     if (!orderId || !amount) return res.status(400).json({ message: "Thiếu orderId hoặc amount" });

//     amount = Number(amount);
//     if (isNaN(amount) || amount < 1000) amount = 10000; // đảm bảo >1000
//     amount = Math.round(amount) * 100; // VNPay nhân 100

//     const ipAddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";
//     const createDate = moment().format("YYYYMMDDHHmmss");
//     const expireDate = moment().add(15, "minutes").format("YYYYMMDDHHmmss");

//     let vnp_Params = {
//       vnp_Version: "2.1.0",
//       vnp_Command: "pay",
//       vnp_TmnCode: VNPayConfig.vnp_TmnCode,
//       vnp_Locale: "vn",
//       vnp_CurrCode: "VND",
//       vnp_TxnRef: orderId,
//       vnp_OrderInfo: `Thanh toán đơn hàng #${orderId}`,
//       vnp_OrderType: "other",
//       vnp_Amount: amount,
//       vnp_ReturnUrl: VNPayConfig.vnp_ReturnUrl,
//       vnp_IpAddr: ipAddr,
//       vnp_CreateDate: createDate,
//       vnp_ExpireDate: expireDate,
//     };

//     if (bankCode) vnp_Params.vnp_BankCode = bankCode;

//     vnp_Params = sortObject(vnp_Params);
//     const signData = qs.stringify(vnp_Params, { encode: false });
//     const signed = crypto.createHmac("sha512", VNPayConfig.vnp_HashSecret).update(signData).digest("hex");
//     vnp_Params.vnp_SecureHash = signed;

//     const paymentUrl = `${VNPayConfig.vnp_Url}?${qs.stringify(vnp_Params, { encode: true })}`;
//     return res.json({ paymentUrl });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "VNPay createPayment error" });
//   }
// };


// const checkPayment = (req, res) => {
//   try {
//     let vnp_Params = { ...req.query };
//     const secureHash = vnp_Params.vnp_SecureHash;
//     delete vnp_Params.vnp_SecureHash;
//     delete vnp_Params.vnp_SecureHashType;

//     vnp_Params = sortObject(vnp_Params);
//     const signData = qs.stringify(vnp_Params, { encode: false });
//     const signed = crypto.createHmac("sha512", VNPayConfig.vnp_HashSecret).update(signData).digest("hex");

//     if (secureHash === signed) {
//       const responseCode = vnp_Params.vnp_ResponseCode;
//       return res.json({
//         success: responseCode === "00",
//         message: responseCode === "00" ? "Thanh toán thành công" : "Thanh toán thất bại",
//         data: vnp_Params,
//       });
//     } else {
//       return res.status(400).json({ success: false, message: "Checksum không hợp lệ" });
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// module.exports = { createPayment, checkPayment };



// // controllers/vnpay.controller.js
// const crypto = require("crypto");
// const qs = require("qs");
// const moment = require("moment");

// const VNPayConfig = {
//   vnp_TmnCode: process.env.VNP_TMNCODE,
//   vnp_HashSecret: process.env.VNP_HASHSECRET,
//   vnp_Url: process.env.VNP_URL,
//   vnp_ReturnUrl: process.env.VNP_RETURNURL,
// };

// function sortObject(obj) {
//   return Object.keys(obj)
//     .sort()
//     .reduce((acc, key) => {
//       acc[key] = obj[key];
//       return acc;
//     }, {});
// }

// // Tạo URL thanh toán
// const createPayment = (req, res) => {
//   try {
//     let { orderId, amount, bankCode } = req.body;
//     if (!orderId || !amount) return res.status(400).json({ message: "Thiếu orderId hoặc amount" });

//     amount = Math.round(Number(amount)) * 100; // VNPay nhận số nguyên *100
//     const ipAddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";
//     const createDate = moment().format("YYYYMMDDHHmmss");
//     const expireDate = moment().add(15, "minutes").format("YYYYMMDDHHmmss");

//     let vnp_Params = {
//       vnp_Version: "2.1.0",
//       vnp_Command: "pay",
//       vnp_TmnCode: VNPayConfig.vnp_TmnCode,
//       vnp_Locale: "vn",
//       vnp_CurrCode: "VND",
//       vnp_TxnRef: orderId,
//       vnp_OrderInfo: `Thanh toán đơn hàng #${orderId}`,
//       vnp_OrderType: "other",
//       vnp_Amount: amount,
//       vnp_ReturnUrl: VNPayConfig.vnp_ReturnUrl,
//       vnp_IpAddr: ipAddr,
//       vnp_CreateDate: createDate,
//       vnp_ExpireDate: expireDate,
//     };

//     if (bankCode) vnp_Params.vnp_BankCode = bankCode;

//     vnp_Params = sortObject(vnp_Params);
//     const signData = qs.stringify(vnp_Params, { encode: false });
//     const signed = crypto.createHmac("sha512", VNPayConfig.vnp_HashSecret).update(signData).digest("hex");
//     vnp_Params.vnp_SecureHash = signed;

//     const paymentUrl = `${VNPayConfig.vnp_Url}?${qs.stringify(vnp_Params, { encode: true })}`;
//     return res.json({ paymentUrl });
//   } catch (err) {
//     console.error("VNPay createPayment error:", err);
//     return res.status(500).json({ message: "VNPay createPayment error" });
//   }
// };

// // Callback VNPay
// const checkPayment = (req, res) => {
//   try {
//     let vnp_Params = { ...req.query };
//     const secureHash = vnp_Params.vnp_SecureHash;
//     delete vnp_Params.vnp_SecureHash;
//     delete vnp_Params.vnp_SecureHashType;

//     vnp_Params = sortObject(vnp_Params);
//     const signData = qs.stringify(vnp_Params, { encode: false });
//     const signed = crypto.createHmac("sha512", VNPayConfig.vnp_HashSecret).update(signData).digest("hex");

//     if (secureHash === signed) {
//       const responseCode = vnp_Params.vnp_ResponseCode;
//       return res.json({
//         success: responseCode === "00",
//         message: responseCode === "00" ? "Thanh toán thành công" : "Thanh toán thất bại",
//         data: vnp_Params,
//       });
//     } else {
//       return res.status(400).json({ success: false, message: "Sai chữ ký VNPay" });
//     }
//   } catch (err) {
//     console.error("VNPay callback error:", err);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// module.exports = { createPayment, checkPayment };
// controllers/vnpay.controller.js
const crypto = require("crypto");
const qs = require("qs");
const moment = require("moment");

// Cấu hình VNPay sandbox
const VNPayConfig = {
  vnp_TmnCode: process.env.VNP_TMNCODE,      // Mã website
  vnp_HashSecret: process.env.VNP_HASHSECRET, // Secret key
  vnp_Url: process.env.VNP_URL,               // Ví dụ: https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
  vnp_ReturnUrl: process.env.VNP_RETURNURL,   // URL callback FE
};

// Sắp xếp key alphabet
function sortObject(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
}

// Tạo URL thanh toán VNPay
const createPayment = (req, res) => {
  try {
    let { orderId, amount, bankCode } = req.body;
    if (!orderId || !amount) {
      return res.status(400).json({ message: "Thiếu orderId hoặc amount" });
    }

    amount = Number(amount); // FE gửi VND nguyên
    const vnpAmount = amount * 100; // VNPay yêu cầu *100

    const ipAddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";
    const createDate = moment().format("YYYYMMDDHHmmss");
    const expireDate = moment().add(30, "minutes").format("YYYYMMDDHHmmss");

    const vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: VNPayConfig.vnp_TmnCode,
      vnp_Locale: "vn",
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toán đơn hàng ${orderId}`, // KHÔNG dùng #
      vnp_OrderType: "other",
      vnp_Amount: vnpAmount,
      vnp_ReturnUrl: VNPayConfig.vnp_ReturnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
      vnp_ExpireDate: expireDate,
    };

    if (bankCode) vnp_Params.vnp_BankCode = bankCode;

    // 1️⃣ Sắp xếp key alphabet
    const sortedParams = sortObject(vnp_Params);

    // 2️⃣ Tạo chữ ký HMAC SHA512
    const signData = qs.stringify(sortedParams, { encode: false });
    const vnp_SecureHash = crypto
      .createHmac("sha512", VNPayConfig.vnp_HashSecret)
      .update(signData)
      .digest("hex");

    sortedParams.vnp_SecureHash = vnp_SecureHash;

    // 3️⃣ Tạo URL redirect, encode toàn bộ tham số
    const paymentUrl = VNPayConfig.vnp_Url + "?" + qs.stringify(sortedParams, { encode: true });

    // 4️⃣ Log đầy đủ để debug
    console.log("=== VNPay Params ===");
    console.log(sortedParams);
    console.log("=== Sign Data ===");
    console.log(signData);
    console.log("=== Secure Hash ===");
    console.log(vnp_SecureHash);

    // 5️⃣ FE chỉ cần redirect URL này
    return res.json({ paymentUrl });
  } catch (err) {
    console.error("VNPay createPayment error:", err);
    return res.status(500).json({ message: "VNPay createPayment error" });
  }
};

// Callback từ VNPay
const checkPayment = (req, res) => {
  try {
    let vnp_Params = { ...req.query };
    const secureHash = vnp_Params.vnp_SecureHash;

    delete vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHashType;

    const sortedParams = sortObject(vnp_Params);
    const signData = qs.stringify(sortedParams, { encode: false });
    const vnp_SecureHashCheck = crypto
      .createHmac("sha512", VNPayConfig.vnp_HashSecret)
      .update(signData)
      .digest("hex");

    if (secureHash === vnp_SecureHashCheck) {
      const success = sortedParams.vnp_ResponseCode === "00";
      return res.json({ success, data: sortedParams });
    } else {
      return res.status(400).json({ success: false, message: "Sai chữ ký VNPay" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { createPayment, checkPayment };
