// src/pages/course/CourseDetailTabs/FAQs.jsx

import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LeaveComment from "./LeaveComment"; // Đảm bảo component này tồn tại

const faqList = [
  {
    question: "What is EduPress?",
    answer:
      "EduPress is an online learning platform offering a wide variety of courses to help you grow your skills and knowledge.",
  },
  {
    question: "How do I enroll in a course?",
    answer:
      "You can enroll by creating an account, selecting your preferred course, and clicking the 'Enroll Now' button.",
  },
  {
    question: "Can I access the course content anytime?",
    answer:
      "Yes, all enrolled students have 24/7 access to their course materials unless stated otherwise.",
  },
  {
    question: "Do you offer certificates?",
    answer:
      "Yes, we provide a certificate of completion once you finish all course modules and assessments.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "We offer a 7-day money-back guarantee if you're not satisfied with the course. Please see our refund policy for details.",
  },
];

const FAQs = () => {
  return (
    <Box>
      {/* <Box
                sx={{
                  flex: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  backgroundColor: "#fff",
                  p: 4,
                 
                }}
              > */}
                {/* <Typography variant="h4" fontWeight={600} gutterBottom>
          Frequently Asked Questions
        </Typography> */}
        {/* <Typography variant="body2" color="text.secondary">
          Find answers to the most common questions about our platform and courses.
        </Typography> */}
      {/* </Box> */}

      <Stack spacing={2}>
        {faqList.map((faq, index) => (
          <Accordion
            key={index}
            sx={{
              borderRadius: 2,
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>

      <Divider sx={{ mt: 4, mb: 4 }} />

      <LeaveComment />
    </Box>
  );
};

export default FAQs;  