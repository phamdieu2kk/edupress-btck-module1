import React from "react";
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "./Footer";
const Faqs = () => {
  const breadcrumbPaths = [
    { name: "Home", href: "/" },
    { name: "Faqs", href: "/faqs" },
  ];

  const faqsLeft = [
    {
      question: "What Does Royalty Free Mean?",
      answer:
        "Royalty-free means you pay for the license once and can use it repeatedly without paying additional royalties.",
    },
    {
      question: "How Can I Download the Course Materials?",
      answer:
        "You can download materials from the course dashboard under the 'Resources' tab after enrollment.",
    },
    {
      question: "Can I Access Courses Offline?",
      answer:
        "Yes. With our mobile app, you can download the lessons and watch them offline at your convenience.",
    },
    {
      question: "What Payment Methods Are Accepted?",
      answer:
        "We accept all major credit cards, PayPal, and Google Pay. Payments are processed securely.",
    },
  ];

  const faqsRight = [
    {
      question: "Can I Get a Refund?",
      answer:
        "Yes. We offer a 14-day money-back guarantee if you're not satisfied with the course content.",
    },
    {
      question: "Do You Provide Certificates?",
      answer:
        "Absolutely. After completing a course and passing the assessment, you'll receive a certificate.",
    },
    {
      question: "How to Contact Support?",
      answer:
        "You can reach our support team via the 'Contact Us' page or by emailing support@example.com.",
    },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <Box sx={{ px: 2, pt: 2 }}>
        <Breadcrumbs paths={breadcrumbPaths} />
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
          Frequently Asked Questions
        </Typography>

        {/* FAQs in two columns */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          {/* Left Column */}
          <Box flex={1}>
            {faqsLeft.map((faq, index) => (
              <Accordion key={index} sx={{ mb: 2 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`left-panel-${index}`}
                  id={`left-header-${index}`}
                >
                  <Typography variant="h6">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          {/* Right Column */}
          <Box flex={1}>
            {faqsRight.map((faq, index) => (
              <Accordion key={index} sx={{ mb: 2 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`right-panel-${index}`}
                  id={`right-header-${index}`}
                >
                  <Typography variant="h6">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>

        {/* Illustration Image */}
        <Box sx={{ textAlign: "left", mt: 8 }}>
          <img
            src="https://edupress.thimpress.com/wp-content/uploads/2023/02/faqs.png"
            alt="FAQ Illustration"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: 8,
            }}
          />
        </Box>
      </Container>

      {/* ✅ Add Footer Here */}
      <Footer />
    </>
  );
};

export default Faqs;
