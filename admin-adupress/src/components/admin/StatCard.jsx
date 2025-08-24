import React from "react";
import { Card, Typography, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const StatCard = ({
  title,
  value,
  change,
  changeText,
  titleColor,
  valueColor,
  changeColor,
  bgColor,
}) => {
  const isPositive = parseFloat(change) >= 0;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        bgcolor: bgColor || "background.paper",
        minHeight: 160,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 3,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Title */}
      <Typography
        variant="h6"
        color={titleColor || "text.secondary"}
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        {title}
      </Typography>

      {/* Value + Change */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: valueColor }}>
          {value}
        </Typography>
        {change && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: changeColor || "primary.main",
              color: "white",
              px: 1.2,
              py: 0.4,
              borderRadius: 1,
              fontSize: "0.8rem",
              fontWeight: "bold",
              gap: 0.5,
            }}
          >
            {isPositive ? (
              <TrendingUpIcon sx={{ fontSize: 16 }} />
            ) : (
              <TrendingDownIcon sx={{ fontSize: 16 }} />
            )}
            {Math.abs(parseFloat(change))}%
          </Box>
        )}
      </Box>

      {/* Description */}
      {changeText && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {changeText}
        </Typography>
      )}
    </Card>
  );
};

export default StatCard;
