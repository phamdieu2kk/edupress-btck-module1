import React from "react";
import {
  Box,
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LeaveComment from "./LeaveComment";

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
    <Box sx={{ bgcolor: "#F9FAFB", py: 8 }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={2}>
          Frequently Asked Questions
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          textAlign="center"
          mb={5}
        >
          Find answers to the most common questions about our platform and courses.
        </Typography>

        {faqList.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
      <LeaveComment/>
    </Box>
  );
};

export default FAQs;
