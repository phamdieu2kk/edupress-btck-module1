import React from "react";
import { Card, Typography, Box } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PeopleIcon from "@mui/icons-material/People";
import EmailIcon from "@mui/icons-material/Email";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"; // icon mới

const RecentActivity = () => {
  // dữ liệu để dễ mở rộng, thêm item mới chỉ cần thêm object
  const activities = [
    {
      title: "New Course",
      description: "Creating a new course",
      icon: <InsertDriveFileIcon sx={{ color: "#2196F3" }} />,
      iconBg: "#E3F2FD",
    },
    {
      title: "New Payment",
      description: "A new payment has been made",
      icon: <PeopleIcon sx={{ color: "#4CAF50" }} />,
      iconBg: "#E8F5E9",
    },
    {
      title: "New Notification",
      description: "A new notification has been sent",
      icon: <EmailIcon sx={{ color: "#FF9800" }} />,
      iconBg: "#FFF3E0",
    },
    {
      title: "New Alert",
      description: "System alert received",
      icon: <NotificationsActiveIcon sx={{ color: "#F44336" }} />,
      iconBg: "#FFEBEE",
    },
  ];

  return (
    <Card
      elevation={6}
      sx={{ borderRadius: 3, p: 3, bgcolor: "#FFF3E0" }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Recent Activity
      </Typography>
      <Box>
        {activities.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: index !== activities.length - 1 ? 2 : 0, // margin bottom trừ item cuối
            }}
          >
            <Box
              sx={{
                bgcolor: item.iconBg,
                p: 1.5,
                borderRadius: 1,
                minWidth: 48, // đảm bảo icon luôn căn đều
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: 2,
              }}
            >
              {item.icon}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: "bold" }}>{item.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default RecentActivity;
