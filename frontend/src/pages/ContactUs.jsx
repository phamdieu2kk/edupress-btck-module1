// src/pages/Contact.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LeaveComment from "../components/courses/CourseDetailTabs/LeaveComment";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "./Footer";
const ContactUs = () => {
  const breadcrumbPaths = [
    { name: "Home", href: "/" },
    { name: "Contact Us" }, // trang hiện tại thì không cần href
  ];

  return (
    <>
      {/* Breadcrumb */}
      <Box sx={{ py: 2 }}>
        <Breadcrumbs paths={breadcrumbPaths} />
      </Box>

      {/* Main Contact Info + Map */}
      <Container maxWidth="lg"  >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            alignItems: "stretch",
          }}
        >
          {/* Left: Contact Details */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Need A Direct Line?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Crass massa et odio donec faucibus in. Vitae pretium massa dolor
              ullamcorper lectus elit quam.
            </Typography>

            <Stack spacing={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <PhoneIcon color="primary" sx={{ fontSize: 30 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    (123) 456 7890
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <EmailIcon color="primary" sx={{ fontSize: 30 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    contact@thimpress.com
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>

          {/* Right: Embedded Google Map */}
          <Box
            sx={{
              flex: 1,
              minHeight: { xs: 300, md: 400 },
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 3,
            }}
          >
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.2267678512595!2d144.9631628153163!3d-37.81720897975179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b5c1c0a2f1%3A0x504567845f061e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2s!4v1678888888888!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
        </Box>
      </Container>

      {/* Contact Form Section */}
      <Container maxWidth="lg" >
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <LeaveComment />
      </Container>
       <Footer />
    </>
  );
};

export default ContactUs;
