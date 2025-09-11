// const express = require("express");
// const qs = require("qs");
// const crypto = require("crypto");
// const moment = require("moment");

// const router = express.Router();

// const vnp_TmnCode = process.env.VNP_TMNCODE;
// const vnp_HashSecret = process.env.VNP_HASHSECRET;
// const vnp_Url = process.env.VNP_URL;
// const vnp_ReturnUrl = process.env.VNP_RETURNURL;

// // ====== API tạo URL thanh toán ======
// router.post("/create", async (req, res) => {
//   try {
//     const { amount, orderId } = req.body;

//     const date = new Date();
//     const createDate = moment(date).format("YYYYMMDDHHmmss");
//     const txnRef = orderId || moment(date).format("DDHHmmss");

//     let vnp_Params = {};
//     vnp_Params["vnp_Version"] = "2.1.0";
//     vnp_Params["vnp_Command"] = "pay";
//     vnp_Params["vnp_TmnCode"] = vnp_TmnCode;
//     vnp_Params["vnp_Locale"] = "vn";
//     vnp_Params["vnp_CurrCode"] = "VND";
//     vnp_Params["vnp_TxnRef"] = txnRef;
//     vnp_Params["vnp_OrderInfo"] = `Thanh toan don hang ${txnRef}`;
//     vnp_Params["vnp_OrderType"] = "other";
//     vnp_Params["vnp_Amount"] = amount * 100; // VNPay yêu cầu x100
//     vnp_Params["vnp_ReturnUrl"] = vnp_ReturnUrl;
//     vnp_Params["vnp_IpAddr"] = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
//     vnp_Params["vnp_CreateDate"] = createDate;

//     // Sort params
//     vnp_Params = sortObject(vnp_Params);

//     const signData = qs.stringify(vnp_Params, { encode: false });
//     const hmac = crypto.createHmac("sha512", vnp_HashSecret);
//     const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

//     vnp_Params["vnp_SecureHash"] = signed;
//     const paymentUrl = vnp_Url + "?" + qs.stringify(vnp_Params, { encode: false });

//     return res.json({ code: "00", url: paymentUrl });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ code: "99", message: "Tao giao dich that bai" });
//   }
// });

// // ====== API nhận kết quả trả về ======
// router.get("/return", async (req, res) => {
//   let vnp_Params = req.query;

//   const secureHash = vnp_Params["vnp_SecureHash"];
//   delete vnp_Params["vnp_SecureHash"];
//   delete vnp_Params["vnp_SecureHashType"];

//   vnp_Params = sortObject(vnp_Params);

//   const signData = qs.stringify(vnp_Params, { encode: false });
//   const hmac = crypto.createHmac("sha512", vnp_HashSecret);
//   const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

//   if (secureHash === signed) {
//     // Check trạng thái giao dịch
//     const responseCode = vnp_Params["vnp_ResponseCode"];
//     if (responseCode === "00") {
//       return res.json({ code: "00", message: "Thanh toán thành công", data: vnp_Params });
//     } else {
//       return res.json({ code: responseCode, message: "Thanh toán thất bại", data: vnp_Params });
//     }
//   } else {
//     return res.status(400).json({ code: "97", message: "Checksum không hợp lệ" });
//   }
// });

// // ===== Helper sort =====
// function sortObject(obj) {
//   let sorted = {};
//   let keys = Object.keys(obj).sort();
//   keys.forEach((key) => {
//     sorted[key] = obj[key];
//   });
//   return sorted;
// }

// module.exports = router;
