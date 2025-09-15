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

// Tạo URL thanh toán VNPay chuẩn
const createPayment = (req, res) => {
  try {
    let { orderId, amount, bankCode } = req.body;
    if (!orderId || !amount || amount <= 0) {
      return res.status(400).json({ message: "Thiếu orderId hoặc amount > 0" });
    }

    amount = Math.floor(Number(amount)); // FE gửi VND nguyên, đảm bảo là số nguyên
    const vnpAmount = amount * 100;      // VNPay yêu cầu *100

     const ipAddr =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";

    // Múi giờ Việt Nam (UTC+7)
    const createDate = moment().utcOffset(7).format("YYYYMMDDHHmmss");
    const expireDate = moment().utcOffset(7).add(30, "minutes").format("YYYYMMDDHHmmss"); // 30 phút tránh timeout

    const vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: VNPayConfig.vnp_TmnCode,
      vnp_Locale: "vn",
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toan don hang ${orderId}`, // KHÔNG dùng ký tự đặc biệt
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

    // 4️⃣ Log debug
    console.log("=== VNPay Params ===", sortedParams);
    console.log("=== Sign Data ===", signData);
    console.log("=== Secure Hash ===", vnp_SecureHash);
    console.log("Payment URL:", paymentUrl);

    // 5️⃣ FE redirect sang đây
    return res.json({ paymentUrl });
  } catch (err) {
    console.error("VNPay createPayment error:", err);
    return res.status(500).json({ message: "VNPay createPayment error" });
  }
};

// Callback VNPay
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
