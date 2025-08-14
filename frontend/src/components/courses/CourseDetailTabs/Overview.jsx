import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Checkbox,
  FormControlLabel,
  IconButton,
  Container,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LeaveComment from "./LeaveComment";

const Overview = () => {
  const toggleDrawer = () => {
    // logic mở Drawer nếu có
  };

  return (
    <Box sx={{ mt: 4, py: 4, bgcolor: "#f8f8f8" }}>
      <Container maxWidth="md" >
        {/* Header (mobile) */}
        

        {/* Grid 2 cột: 6 - 4 */}
        <Grid container spacing={4} alignItems="stretch">
          {/* Cột mô tả 6 phần */}
        
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                backgroundColor: "#ffffff",
                p: 3,
                borderRadius: 2,
                boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
              }}
            >
              <Typography variant="body1">
                LearnPress is a comprehensive WordPress LMS Plugin for WordPress.
                This is one of the best WordPress LMS Plugins which can be used to
                easily create & sell courses online. You can create a course
                curriculum with lessons & quizzes included which is managed with an
                easy-to-use interface for users.
              </Typography>
              <Typography variant="body1">
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
          </Grid>




          {/* Cột bình luận 4 phần */}
          <Grid item xs={12} md={4}>
          <LeaveComment/>




            {/* <Box
              p={3}
              bgcolor="#ffffff"
              borderRadius={2}
              boxShadow="0px 2px 10px rgba(0,0,0,0.05)"
            >
              <Typography variant="h6" gutterBottom>
                Leave A Comment
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Your email address will not be published. Required fields are marked *
              </Typography>

              <Stack spacing={2} mt={2}>
                <TextField label="Name*" variant="outlined" fullWidth />
                <TextField label="Email*" variant="outlined" fullWidth />
                <TextField
                  label="Comment"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                />
              </Stack>
              <FormControlLabel
                control={<Checkbox />}
                label="Save my name, email in this browser for the next time I comment"
                sx={{ mt: 2 }}
              />
              <Button variant="contained" color="warning" sx={{ mt: 2 }}>
                Post Comment
              </Button>
            </Box> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Overview;