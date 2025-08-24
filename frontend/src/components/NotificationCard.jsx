// src/components/NotificationCard.jsx
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const NotificationCard = ({ title, content }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography>{content}</Typography>
    </CardContent>
  </Card>
);

export default NotificationCard;
