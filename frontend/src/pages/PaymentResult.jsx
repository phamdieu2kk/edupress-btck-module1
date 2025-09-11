// src/pages/PaymentResult.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { Box, Typography, Alert, CircularProgress } from "@mui/material";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PaymentResult = () => {
  const query = useQuery();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      const params = {};
      for (let pair of query.entries()) params[pair[0]] = pair[1];

      try {
        // Gọi API backend để kiểm tra kết quả thanh toán
        const res = await axiosClient.get("/vnpay/check_payment", { params });
        setResult(res.data);
      } catch (err) {
        console.error(err);
        setError("Không thể xác thực kết quả thanh toán");
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [query]);

  if (loading) return (
    <Box mt={8} textAlign="center">
      <CircularProgress />
      <Typography mt={2}>Đang kiểm tra kết quả thanh toán...</Typography>
    </Box>
  );

  if (error) return (
    <Box mt={8} maxWidth={500} mx="auto">
      <Alert severity="error">{error}</Alert>
    </Box>
  );

  return (
    <Box mt={8} maxWidth={500} mx="auto" p={3} border="1px solid #ddd" borderRadius={2}>
      {result?.success ? (
        <Alert severity="success">
          Thanh toán thành công! <br />
          Mã giao dịch: {result.data.vnp_TransactionNo || result.data.vnp_TxnRef} <br />
          Số tiền: {result.data.vnp_Amount ? result.data.vnp_Amount / 100 : ""} VND
        </Alert>
      ) : (
        <Alert severity="error">
          Thanh toán thất bại! <br />
          {result?.data?.vnp_ResponseCode && <>Mã lỗi: {result.data.vnp_ResponseCode} <br /></>}
          {result?.message}
        </Alert>
      )}
    </Box>
  );
};

export default PaymentResult;