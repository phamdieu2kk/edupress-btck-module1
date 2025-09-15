// // controllers/vnpay.controller.js
// const crypto = require("crypto");
// const qs = require("qs");
// const moment = require("moment");

// // Config VNPay sandbox
// const VNPayConfig = {
//   vnp_TmnCode: process.env.VNP_TMNCODE || "T2IT0OPF",
//   vnp_HashSecret: process.env.VNP_HASHSECRET || "XQSW0BSNC5ZHYNU9221NBCMJS99W7FDQ",
//   vnp_Url: process.env.VNP_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
//   vnp_ReturnUrl: process.env.VNP_RETURNURL || "http://localhost:5173/payment-result",
// };

// // Hàm sắp xếp key alphabet
// function sortObject(obj) {
//   return Object.keys(obj)
//     .sort()
//     .reduce((acc, key) => {
//       acc[key] = obj[key];
//       return acc;
//     }, {});
// }

// // Tạo link thanh toán VNPay
// const createPayment = (req, res) => {
//   try {
//     const { orderId, amount, bankCode } = req.body;
//     if (!orderId || !amount) return res.status(400).json({ message: "Thiếu orderId hoặc amount" });

//     const numericAmount = Number(amount);
//     if (isNaN(numericAmount) || numericAmount <= 0)
//       return res.status(400).json({ message: "amount phải là số > 0" });

//     const vnpAmount = numericAmount * 100; // VNPay yêu cầu *100
//     const ipAddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";
//     const createDate = moment().format("YYYYMMDDHHmmss");
//     const expireDate = moment().add(30, "minutes").format("YYYYMMDDHHmmss");

//     let vnp_Params = {
//       vnp_Version: "2.1.0",
//       vnp_Command: "pay",
//       vnp_TmnCode: VNPayConfig.vnp_TmnCode,
//       vnp_Locale: "vn",
//       vnp_CurrCode: "VND",
//       vnp_TxnRef: orderId,
//       vnp_OrderInfo: `Thanh toán đơn hàng ${orderId}`,
//       vnp_OrderType: "other",
//       vnp_Amount: vnpAmount,
//       vnp_ReturnUrl: VNPayConfig.vnp_ReturnUrl,
//       vnp_IpAddr: ipAddr,
//       vnp_CreateDate: createDate,
//       vnp_ExpireDate: expireDate,
//     };

//     if (bankCode) vnp_Params.vnp_BankCode = bankCode;

//     const sortedParams = sortObject(vnp_Params);
//     const signData = qs.stringify(sortedParams, { encode: false });
//     const vnp_SecureHash = crypto.createHmac("sha512", VNPayConfig.vnp_HashSecret)
//       .update(signData)
//       .digest("hex");

//     sortedParams.vnp_SecureHash = vnp_SecureHash;

//     const paymentUrl = VNPayConfig.vnp_Url + "?" + qs.stringify(sortedParams, { encode: true });

//     return res.json({ paymentUrl });
//   } catch (err) {
//     console.error("VNPay createPayment error:", err);
//     return res.status(500).json({ message: "VNPay createPayment error" });
//   }
// };

// // Callback kiểm tra kết quả thanh toán
// const checkPayment = (req, res) => {
//   try {
//     let vnp_Params = { ...req.query };
//     const secureHash = vnp_Params.vnp_SecureHash;

//     delete vnp_Params.vnp_SecureHash;
//     delete vnp_Params.vnp_SecureHashType;

//     const sortedParams = sortObject(vnp_Params);
//     const signData = qs.stringify(sortedParams, { encode: false });
//     const vnp_SecureHashCheck = crypto.createHmac("sha512", VNPayConfig.vnp_HashSecret)
//       .update(signData)
//       .digest("hex");

//     if (secureHash === vnp_SecureHashCheck) {
//       const success = sortedParams.vnp_ResponseCode === "00";
//       return res.json({ success, data: sortedParams });
//     } else {
//       return res.status(400).json({ success: false, message: "Sai chữ ký VNPay" });
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// module.exports = { createPayment, checkPayment };












// const qs = require("qs");
// const crypto = require("crypto");

// /// Config VNPay sandbox
// const VNPayConfig = {
//   vnp_TmnCode: process.env.VNP_TMNCODE || "T2IT0OPF",
//   vnp_HashSecret: process.env.VNP_HASHSECRET || "XQSW0BSNC5ZHYNU9221NBCMJS99W7FDQ",
//   vnp_Url: process.env.VNP_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
//   vnp_ReturnUrl: process.env.VNP_RETURNURL || "http://localhost:5173/payment-result",
// };

// // Tạo payment URL VNPay
// exports.createPayment = (req, res) => {
//   try {
//     const { orderId, amount, bankCode } = req.body;

//     if (!orderId || !amount) {
//       return res.status(400).json({ message: "Thiếu orderId hoặc amount" });
//     }

//     const currDate = new Date();
//     const createDate = currDate
//       .toISOString()
//       .replace(/[-:]/g, "")
//       .split(".")[0]; // YYYYMMDDHHmmss

//     const vnp_Params = {
//       vnp_Version: "2.1.0",
//       vnp_Command: "pay",
//       vnp_TmnCode: VNPayConfig.vnp_TmnCode,
//       vnp_Amount: amount * 100, // VNPay yêu cầu *100
//       vnp_CurrCode: "VND",
//       vnp_TxnRef: orderId,
//       vnp_OrderInfo: `Thanh toán đơn hàng: ${orderId}`,
//       vnp_OrderType: "other",
//       vnp_Locale: "vn",
//       vnp_ReturnUrl: VNPayConfig.vnp_ReturnUrl,
//       vnp_CreateDate: createDate,
//     };

//     if (bankCode) vnp_Params.vnp_BankCode = bankCode;

//     // Sắp xếp key theo alphabet
//     const sortedParams = {};
//     Object.keys(vnp_Params)
//       .sort()
//       .forEach((key) => {
//         sortedParams[key] = vnp_Params[key];
//       });

//     const signData = qs.stringify(sortedParams, { encode: false });
//     const hmac = crypto.createHmac("sha512", VNPayConfig.vnp_HashSecret);
//     const secureHash = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
//     sortedParams.vnp_SecureHash = secureHash;

//     const paymentUrl = `${VNPayConfig.vnp_Url}?${qs.stringify(sortedParams, { encode: true })}`;

//     return res.status(200).json({ paymentUrl });
//   } catch (err) {
//     console.error("createPayment error:", err);
//     return res.status(500).json({ message: "Lỗi server khi tạo payment" });
//   }
// };

// // Callback/Return từ VNPay
// exports.checkPayment = (req, res) => {
//   try {
//     const vnp_Params = req.query;

//     const secureHash = vnp_Params.vnp_SecureHash;
//     delete vnp_Params.vnp_SecureHash;
//     delete vnp_Params.vnp_SecureHashType;

//     // Tạo hash để kiểm tra
//     const sortedParams = {};
//     Object.keys(vnp_Params)
//       .sort()
//       .forEach((key) => {
//         sortedParams[key] = vnp_Params[key];
//       });

//     const signData = qs.stringify(sortedParams, { encode: false });
//     const hmac = crypto.createHmac("sha512", VNPayConfig.vnp_HashSecret);
//     const checkSum = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

//     if (secureHash === checkSum) {
//       // Xác thực thành công
//       const responseCode = vnp_Params.vnp_ResponseCode; // 00 là thành công
//       const orderId = vnp_Params.vnp_TxnRef;

//       if (responseCode === "00") {
//         console.log(`Thanh toán thành công đơn ${orderId}`);
//         // TODO: cập nhật trạng thái order trong DB
//         res.redirect(`/payment/result?status=success&orderId=${orderId}`);
//       } else {
//         console.log(`Thanh toán thất bại đơn ${orderId}, code: ${responseCode}`);
//         res.redirect(`/payment/result?status=fail&orderId=${orderId}`);
//       }
//     } else {
//       console.log("Sai secureHash từ VNPay");
//       res.redirect(`/payment/result?status=invalid`);
//     }
//   } catch (err) {
//     console.error("checkPayment error:", err);
//     res.status(500).send("Lỗi server khi kiểm tra payment");
//   }
// };


// controllers/vnpay.controller.js
// controllers/vnpay.controller.js
const qs = require("qs");
const crypto = require("crypto");

// Config VNPay sandbox
const VNPayConfig = {
  vnp_TmnCode: process.env.VNP_TMNCODE || "T2IT0OPF",
  vnp_HashSecret: process.env.VNP_HASHSECRET || "XQSW0BSNC5ZHYNU9221NBCMJS99W7FDQ",
  vnp_Url: process.env.VNP_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  vnp_ReturnUrl: process.env.VNP_RETURNURL || "http://localhost:5173/payment-result",
};

// Tạo payment URL VNPay
exports.createPayment = (req, res) => {
  try {
    const { orderId, amount, bankCode } = req.body;

    if (!orderId || !amount) {
      return res.status(400).json({ message: "Thiếu orderId hoặc amount" });
    }

    // UTC+7
    const currDate = new Date();
    const vnDate = new Date(currDate.getTime() + 7 * 60 * 60 * 1000);
    const createDate = vnDate.toISOString().replace(/[-:]/g, "").split(".")[0]; // YYYYMMDDHHmmss

    const vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: VNPayConfig.vnp_TmnCode,
      vnp_Amount: Math.floor(amount) * 100, // VNPay nhận *100
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toán đơn hàng: ${orderId}`,
      vnp_OrderType: "other",
      vnp_Locale: "vn",
      vnp_ReturnUrl: VNPayConfig.vnp_ReturnUrl,
      vnp_CreateDate: createDate,
    };

    if (bankCode) vnp_Params.vnp_BankCode = bankCode;

    // Sắp xếp key alphabet
    const sortedParams = {};
    Object.keys(vnp_Params).sort().forEach((key) => {
      sortedParams[key] = vnp_Params[key];
    });

    // Tạo secureHash
    const signData = qs.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac("sha512", VNPayConfig.vnp_HashSecret);
    const secureHash = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    sortedParams.vnp_SecureHash = secureHash;

    const paymentUrl = `${VNPayConfig.vnp_Url}?${qs.stringify(sortedParams, { encode: true })}`;
    console.log("VNPay payment URL:", paymentUrl);

    return res.status(200).json({ paymentUrl });
  } catch (err) {
    console.error("createPayment error:", err);
    return res.status(500).json({ message: "Lỗi server khi tạo payment" });
  }
};

// Callback/Return từ VNPay
exports.checkPayment = (req, res) => {
  try {
    const vnp_Params = req.query;
    const secureHash = vnp_Params.vnp_SecureHash;

    delete vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHashType;

    // Sắp xếp key alphabet
    const sortedParams = {};
    Object.keys(vnp_Params).sort().forEach((key) => {
      sortedParams[key] = vnp_Params[key];
    });

    const signData = qs.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac("sha512", VNPayConfig.vnp_HashSecret);
    const checkSum = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === checkSum) {
      const responseCode = vnp_Params.vnp_ResponseCode;
      const orderId = vnp_Params.vnp_TxnRef;

      if (responseCode === "00") {
        console.log(`Thanh toán thành công đơn ${orderId}`);
        // TODO: cập nhật trạng thái order trong DB
        res.redirect(`/payment/result?status=success&orderId=${orderId}`);
      } else {
        console.log(`Thanh toán thất bại đơn ${orderId}, code: ${responseCode}`);
        res.redirect(`/payment/result?status=fail&orderId=${orderId}`);
      }
    } else {
      console.log("Sai secureHash từ VNPay");
      res.redirect(`/payment/result?status=invalid`);
    }
  } catch (err) {
    console.error("checkPayment error:", err);
    res.status(500).send("Lỗi server khi kiểm tra payment");
  }
};
