// controllers/vnpay.controller.js
const qs = require("qs");
const crypto = require("crypto");
const dateFormat = require("dateformat");

// Config VNPay sandbox
const VNPayConfig = {
  vnp_TmnCode: process.env.VNP_TMNCODE || "T2IT0OPF",
  vnp_HashSecret: process.env.VNP_HASHSECRET || "XQSW0BSNC5ZHYNU9221NBCMJS99W7FDQ",
  vnp_Url: process.env.VNP_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  vnp_ReturnUrl: process.env.VNP_RETURNURL || "http://localhost:5173/payment-result",
};

// Helper sort object alphabetically
const sortObject = (obj) => {
  const sorted = {};
  Object.keys(obj).sort().forEach(key => {
    sorted[key] = obj[key];
  });
  return sorted;
};

// Tạo payment URL VNPay
exports.createPayment = (req, res) => {
  try {
    const ipAddr = req.headers['x-forwarded-for'] ||
                   req.connection.remoteAddress ||
                   req.socket.remoteAddress ||
                   (req.connection.socket ? req.connection.socket.remoteAddress : null);

    let { orderId, amount, bankCode, orderDescription, orderType, language } = req.body;

    if (!orderId || !amount) return res.status(400).json({ message: "Thiếu orderId hoặc amount" });

    // Thời gian tạo order
    const date = new Date();
    const createDate = dateFormat(date, 'yyyymmddHHMMss');
    language = language || 'vn';
    orderType = orderType || 'other';
    orderDescription = orderDescription || `Thanh toán đơn hàng ${orderId}`;

    let vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: VNPayConfig.vnp_TmnCode,
      vnp_Amount: parseInt(amount) * 100, // VND nhân 100
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderDescription,
      vnp_OrderType: orderType,
      vnp_Locale: language,
      vnp_ReturnUrl: VNPayConfig.vnp_ReturnUrl,
      vnp_CreateDate: createDate,
      vnp_IpAddr: ipAddr || '127.0.0.1',
    };

    // BankCode fix undefined
    if (bankCode !== undefined && bankCode !== null && bankCode !== "") {
      vnp_Params.vnp_BankCode = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    const signData = qs.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", VNPayConfig.vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
    vnp_Params.vnp_SecureHash = signed;

    const paymentUrl = VNPayConfig.vnp_Url + "?" + qs.stringify(vnp_Params, { encode: true });

    console.log("=== VNPay Payment URL ===");
    console.log(paymentUrl);

    // Sandbox redirect chuẩn theo demo
    res.redirect(paymentUrl);

  } catch (err) {
    console.error("createPayment error:", err);
    res.status(500).json({ message: "Lỗi server khi tạo payment" });
  }
};

// Callback / Return từ VNPay
exports.checkPayment = (req, res) => {
  try {
    const vnp_Params = req.query;
    const secureHash = vnp_Params.vnp_SecureHash;

    delete vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHashType;

    const sortedParams = sortObject(vnp_Params);
    const signData = qs.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac("sha512", VNPayConfig.vnp_HashSecret);
    const checkSum = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

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
