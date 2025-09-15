// // import axiosClient from "./axiosClient";

// // const payAndRedirect = async (orderId, amountVND, bankCode = "") => {
// //   try {
// //     const res = await axiosClient.post("/vnpay/create-payment", {
// //       orderId,
// //       amount: amountVND,
// //       bankCode,
// //     });

// //     if (res?.vnpUrl) {
// //       window.location.href = res.vnpUrl;
// //       return true;
// //     }
// //     return false;
// //   } catch (err) {
// //     console.error("VNPay API error:", err);
// //     return false;
// //   }
// // };

// // export default { payAndRedirect };





// import axiosClient from "./axiosClient";

// const payAndRedirect = async (orderId, amountVND, bankCode = "") => {
//   try {
//     const res = await axiosClient.post("/vnpay/create-payment", {
//       orderId,
//       amount: amountVND,
//       bankCode,
//     });

//     if (res?.paymentUrl) {
//       window.location.href = res.paymentUrl;
//       return true;
//     }
//     alert("VNPay trả về URL không hợp lệ");
//     return false;
//   } catch (err) {
//     console.error("VNPay API error:", err);
//     alert("Không thể kết nối VNPay");
//     return false;
//   }
// };

// export default { payAndRedirect };

import axiosClient from "./axiosClient";

const payAndRedirect = async (orderId, amountVND, bankCode = "") => {
  try {
    const res = await axiosClient.post("/vnpay/create-payment", {
      orderId,
      amount: amountVND,
      bankCode,
    });

    if (res?.paymentUrl) {
      window.location.href = res.paymentUrl;
      return true;
    }
    alert("VNPay trả về URL không hợp lệ");
    return false;
  } catch (err) {
    console.error("VNPay API error:", err);
    alert("Không thể kết nối VNPay");
    return false;
  }
};

export default { payAndRedirect };
