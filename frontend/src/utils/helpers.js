// // // src/utils/helpers.js

// // /**
// //  * Định dạng tiền tệ để hiển thị cho người dùng (có dấu .)
// //  * @param {number} amount - Giá trị USD cần format
// //  * @param {number} rate - Tỷ giá quy đổi (default: 24000 VND/USD)
// //  * @returns {string} - Ví dụ: "1.000.000₫"
// //  */
// // export const formatCurrencyDisplay = (amount, rate = 24000) => {
// //   if (amount === 0) return "Miễn phí";
// //   if (!amount || isNaN(amount)) return "0₫";

// //   const vndValue = amount * rate;
// //   return vndValue.toLocaleString("vi-VN") + "₫";
// // };

// // /**
// //  * Định dạng tiền tệ để gửi lên cổng thanh toán (không có dấu . hoặc ,)
// //  * @param {number} amount - Giá trị USD cần format
// //  * @param {number} rate - Tỷ giá quy đổi (default: 24000 VND/USD)
// //  * @returns {string} - Ví dụ: "1000000"
// //  */
// // export const formatCurrencyPayment = (amount, rate = 24000) => {
// //   if (!amount || isNaN(amount)) return "0";

// //   const vndValue = amount * rate;
// //   return Math.round(vndValue).toString();
// // };





// /**
//  * Định dạng tiền tệ để hiển thị cho người dùng (có dấu .).
//  * @param {number} amount - Giá trị USD.
//  * @returns {string} - Ví dụ: "1.000.000₫"
//  */
// export const formatCurrencyDisplay = (amount) => {
//   const USD_TO_VND = 24000;
//   if (amount === 0) return "Free";
//   if (!amount || isNaN(amount)) return "0₫";

//   const vndValue = amount * USD_TO_VND;
//   return vndValue.toLocaleString("vi-VN") + "₫";
// };

// /**
//  * Định dạng tiền tệ để gửi lên cổng thanh toán (không có dấu . hoặc ,).
//  * @param {number} amount - Giá trị USD.
//  * @returns {number} - Ví dụ: 1000000
//  */
// export const formatCurrencyPayment = (amount) => {
//   const USD_TO_VND = 24000;
//   if (!amount || isNaN(amount)) return 0;
  
//   const vndValue = amount * USD_TO_VND;
//   return Math.round(vndValue);
// };



/**
 * Hiển thị tiền cho người dùng (có dấu . và ₫)
 * @param {number} amount - Giá trị USD
 * @returns {string} Ví dụ: "1.000.000₫"
 */
export const formatCurrencyDisplay = (amount) => {
  const USD_TO_VND = 24000;
  if (!amount || isNaN(amount) || amount === 0) return "0₫";
  const vndValue = amount * USD_TO_VND;
  return vndValue.toLocaleString("vi-VN"); // chỉ hiển thị số, thêm ₫ nếu muốn
};

/**
 * Chỉ gửi số nguyên sang VNPay (không có dấu, không có ₫)
 * @param {number} amount - Giá trị USD
 * @returns {number} Ví dụ: 1000000
 */
export const formatCurrencyPayment = (amount) => {
  const USD_TO_VND = 24000;
  if (!amount || isNaN(amount)) return 0;
  const vndValue = amount * USD_TO_VND;
  return Math.round(vndValue); // trả về số nguyên
};
