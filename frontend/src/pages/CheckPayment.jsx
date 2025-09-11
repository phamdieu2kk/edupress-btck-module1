import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Result, Button } from "antd";
import axiosClient from "../../api/axiosClient";

const CheckPayment = () => {
  const location = useLocation();
  const [status, setStatus] = useState("error");
  const [title, setTitle] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const { data } = await axiosClient.get(`/vnpay/check-payment?${searchParams.toString()}`);
        if (data.success) {
          setStatus("success");
          setTitle(data.message);
        } else {
          setStatus("error");
          setTitle(data.message);
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
        setTitle("Lỗi kiểm tra thanh toán");
      }
    })();
  }, [location.search]);

  return (
    <Result
      status={status}
      title={title}
      extra={[
        <Button key="home" type="primary" onClick={() => window.location.href = "/"}>Trang chủ</Button>,
      ]}
    />
  );
};

export default CheckPayment;
