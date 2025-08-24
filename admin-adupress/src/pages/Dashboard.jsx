import React from "react";
import { Box, Typography } from "@mui/material";
import RecentActivity from "../components/admin/RecentActivity";
import RecentCourses from "../components/admin/RecentCourses";
import StatCard from "../components/admin/StatCard";
import RevenueChart from "./admin/RevenueChart";

const Dashboard = () => {
  const statCards = [
  { 
    title: "Courses", value: "225", change: "12.5", 
    changeText: "Increased from last month", changeColor: "#1976d2", 
    bgColor: "#E3F2FD", valueColor: "#0D47A1", titleColor: "#0D47A1"
  },
  { 
    title: "Providers", value: "28", change: "8.9", 
    changeText: "Added new providers", changeColor: "#2e7d32", 
    bgColor: "#E8F5E9", valueColor: "#1B5E20", titleColor: "#1B5E20"
  },
  { 
    title: "Revenue", value: "$105,450", change: "15.7", 
    changeText: "Revenue increased this month", changeColor: "#ed6c02", 
    bgColor: "#FFF3E0", valueColor: "#E65100", titleColor: "#E65100"
  },
  { 
    title: "Customers", value: "6,782", change: "5.1", 
    changeText: "More customers than last month", changeColor: "#d32f2f", 
    bgColor: "#FFEBEE", valueColor: "#B71C1C", titleColor: "#B71C1C"
  }
];


  return (
    <Box p={3}>

      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>Dashboard</Typography>

      {/* Stat Cards */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 4 }}>
        {statCards.map((card, i) => (
          <Box key={i} sx={{ flex: "1 1 calc(25% - 24px)", minWidth: "250px" }}>
            <StatCard {...card} />
          </Box>
        ))}
      </Box>

      {/* Charts & Recent Activity with equal height */}
      <Box sx={{ 
          display: "grid", 
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" }, 
          gap: 3, 
          mb: 4, 
          alignItems: "stretch" 
        }}>
        <RevenueChart />
        <RecentActivity />
      </Box>

      {/* Recent Courses */}
      <RecentCourses />
    </Box>
  );
};

export default Dashboard;