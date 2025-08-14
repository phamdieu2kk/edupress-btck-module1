import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const feedbacks = [
  {
    id: 1,
    text: "I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born.",
    name: "Roe Smith",
    title: "Designer",
  },
  {
    id: 2,
    text: "The idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.",
    name: "Jane Doe",
    title: "Developer",
  },
  {
    id: 3,
    text: "These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled.",
    name: "John Wick",
    title: "Instructor",
  },
  {
    id: 4,
    text: "Pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters.",
    name: "Emily Rose",
    title: "Artist",
  },
];

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1536 }, items: 4 },
  desktop: { breakpoint: { max: 1536, min: 1200 }, items: 4 },
  laptop: { breakpoint: { max: 1200, min: 960 }, items: 3 },
  tablet: { breakpoint: { max: 960, min: 600 }, items: 2 },
  mobile: { breakpoint: { max: 600, min: 0 }, items: 1 },
};

const StudentFeedbacks = () => {
  return (
    <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: "#f7f7f7" }}>
      <Container maxWidth="lg">
        {/* Tiêu đề */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Student Feedbacks
          </Typography>
          <Typography variant="body1" color="text.secondary">
            What Students Say About Academy LMS
          </Typography>
        </Box>

        {/* Carousel Feedback */}
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={4000}
          arrows={false}
          showDots={false}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
        >
          {feedbacks.map((feedback) => (
            <Box key={feedback.id} px={2}>
              <Card
                sx={{
                  border: 1,
                  borderRadius: 3,
                  height: "100%",
                  boxShadow: 3,
                  p: 2,
                  transition: "all 0.3s ease",
                  "&:hover .quote-icon path": {
                    fill: "#f05e0fff", // Màu khi hover (ví dụ: xanh dương MUI)
                  },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box
                    sx={{
                      mb: 2,
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <svg
                      className="quote-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width={36}
                      height={30}
                      viewBox="0 0 36 30"
                      fill="none"
                    >
                      <path
                        d="M24.5 29.8L35.5 2.3L29.9 0L16.6 26.7L24.5 29.8ZM7.9 29.8L18.9 2.3L13.3 0L0 26.7L7.9 29.8Z"
                        fill="#E0E0E0"
                      />
                    </svg>
                  </Box>

                  <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
                    {feedback.text}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {feedback.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {feedback.title}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
};

export default StudentFeedbacks;
