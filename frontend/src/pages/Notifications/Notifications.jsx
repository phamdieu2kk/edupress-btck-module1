// src/pages/Notifications/Notifications.jsx
import React from "react";
import { Container, Typography } from "@mui/material";
import NotificationCard from "../../components/NotificationCard";

const mockNotifications = [
  { id: 1, title: "Cập nhật khóa học", content: "Khóa React JS mới đã có sẵn." },
  { id: 2, title: "Khuyến mãi", content: "Giảm 20% học phí trong tuần này." },
];

const Notifications = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" mb={2}>Thông báo</Typography>
      {mockNotifications.map(notif => (
        <NotificationCard key={notif.id} title={notif.title} content={notif.content} />
      ))}
    </Container>
  );
};

export default Notifications;
