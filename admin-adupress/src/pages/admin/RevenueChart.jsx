import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

const PieChartWithLegend = () => {
  const pieData = [
    { label: "Course", value: 400, color: "#2196F3" },
    { label: "Provider", value: 150, color: "#4CAF50" },
    { label: "Discount", value: 200, color: "#FFC107" },
    { label: "Promotion", value: 100, color: "#FF5722" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 1 }}>
      {/* PieChart */}
      <PieChart
        series={[
          {
            data: pieData.map((item) => ({ value: item.value, color: item.color })),
            arcLabel: () => "",
            innerRadius: 40,
            outerRadius: 80,
            cornerRadius: 5,
            paddingAngle: 0,
          },
        ]}
        slotProps={{ legend: { hidden: true } }}
        width={180}
        height={180}
      />

      {/* Legend 2 cột */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 1,
          mt: 1,
          width: "100%",
          maxWidth: 180,
        }}
      >
        {pieData.map((item, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: item.color, mr: 1 }} />
            <Typography variant="body2" sx={{ color: "text.primary" }}>{item.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const BarChartMonthly = () => {
  const barData = [250, 400, 300, 500, 550, 600, 450];
  const xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  return (
    <Box sx={{ flexGrow: 1, minWidth: 250, ml: { xs: 0, sm: 3 }, mt: { xs: 3, sm: 0 } }}>
      <BarChart
        series={[{ data: barData, color: "#4CAF50" }]}
        height={200}
        xAxis={[{ data: xLabels, scaleType: "band" }]}
        yAxis={[{ scaleType: "linear" }]}
        slotProps={{ legend: { hidden: true } }}
        sx={{
          '.MuiChartsAxis-bottom .MuiChartsAxis-line': { stroke: 'transparent' },
          '.MuiChartsAxis-left .MuiChartsAxis-line': { stroke: 'transparent' },
          '.MuiChartsAxis-tickLabel': { fontSize: '0.8rem', fill: 'text.secondary' },
          '.MuiChartsAxis-tick': { stroke: 'transparent' },
          '.MuiChartsPlot-root': {
            grid: {
              vertical: false,
              horizontal: 'rgba(0,0,0,0.1)'
            }
          }
        }}
      />
    </Box>
  );
};

const RevenueChart = () => {
  return (
    <Card
      elevation={6} // thêm shadow
      sx={{
        borderRadius: 3,
        p: 3,
        bgcolor: "#E3F2FD", // background riêng
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Revenue
      </Typography>
      <Box sx={{ display: "flex", flexWrap: { xs: "wrap", sm: "nowrap" }, alignItems: "center", gap: 2 }}>
        <PieChartWithLegend />
        <BarChartMonthly />
      </Box>
    </Card>
  );
};

export default RevenueChart;
