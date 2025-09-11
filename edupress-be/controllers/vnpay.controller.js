const moment = require("moment");
const qs = require("qs");
const crypto = require("crypto");

const vnp_TmnCode = process.env.VNP_TMNCODE;
const vnp_HashSecret = process.env.VNP_HASHSECRET;
const vnp_Url = process.env.VNP_URL;
const vnp_ReturnUrl = process.env.VNP_RETURNURL;

// Helper function để sắp xếp object
function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = obj[decodeURIComponent(str[key])];
  }
  return sorted;
}

// Hàm tạo URL thanh toán
exports.createPayment = async (req, res) => {
  try {
    const { amount, orderId, bankCode, orderDescription } = req.body;

    const createDate = moment().format("YYYYMMDDHHmmss");
    const ipAddr =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    let vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: vnp_TmnCode,
      vnp_Locale: "vn",
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderDescription || `Thanh toan don hang #${orderId}`,
      vnp_OrderType: "other",
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: vnp_ReturnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    if (bankCode) {
      vnp_Params["vnp_BankCode"] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    const signData = qs.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params.vnp_SecureHash = signed;

    const paymentUrl = `${vnp_Url}?${qs.stringify(vnp_Params, {
      encode: false,
    })}`;

    return res.json({ code: "00", vnpUrl: paymentUrl });
  } catch (error) {
    console.error("Error creating VNPay payment URL:", error);
    return res.status(500).json({ code: "99", message: "Server error" });
  }
};

// Hàm xử lý kết quả trả về từ VNPay (Return URL)
exports.paymentReturn = (req, res) => {
  let vnp_Params = req.query;

  const secureHash = vnp_Params.vnp_SecureHash;
  delete vnp_Params.vnp_SecureHash;
  delete vnp_Params.vnp_SecureHashType;

  vnp_Params = sortObject(vnp_Params);
  const signData = qs.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", vnp_HashSecret);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    // Check trạng thái giao dịch
    const responseCode = vnp_Params.vnp_ResponseCode;
    if (responseCode === "00") {
      res.json({ code: "00", message: "Thanh toán thành công", data: vnp_Params });
    } else {
      res.json({ code: responseCode, message: "Thanh toán thất bại", data: vnp_Params });
    }
  } else {
    res.status(400).json({ code: "97", message: "Checksum không hợp lệ" });
  }
};