import React from "react";
import { Box, Typography } from "@mui/material";
import LeaveComment from "./LeaveComment";

const Overview = () => {
  return (
    <Box sx={{  }}>
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          display: "flex",
          flexDirection: "column", // full-width, không chia cột
          gap: 3,
        }}
      >
        {/* Nội dung chính */}
        <Box
          sx={{
            backgroundColor: "#fff",
            p: 3,
            borderRadius: 2,
            boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <Typography variant="body1" mb={2}>
            LearnPress is a comprehensive WordPress LMS Plugin for WordPress.
            This is one of the best WordPress LMS Plugins which can be used to
            easily create & sell courses online. You can create a course
            curriculum with lessons & quizzes included which is managed with an
            easy-to-use interface for users.
          </Typography>
          <Typography variant="body1" mb={2}>
            Having this WordPress LMS Plugin, now you have a chance to quickly
            and easily create education, online school, online-course websites
            with no coding knowledge required.
          </Typography>
          <Typography variant="body1">
            LearnPress is free and always will be, but it is still a premium
            high-quality WordPress Plugin that definitely helps you with making
            money from your WordPress Based LMS. Try and see how amazing it is.
          </Typography>
        </Box>

        {/* LeaveComment đặt ngay dưới nội dung */}
        <LeaveComment />
      </Box>
    </Box>
  );
};

export default Overview;
