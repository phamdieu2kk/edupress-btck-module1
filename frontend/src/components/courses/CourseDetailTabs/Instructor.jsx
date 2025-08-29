import React from "react";
import {
  Avatar,
  Box,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import instructorData from "@/data/instructorMock";
import LeaveComment from "./LeaveComment";

const socialColors = {
  facebook: "#1877F2",
  twitter: "#1DA1F2",
  instagram: "#E1306C",
  youtube: "#FF0000",
  pinterest: "#BD081C",
};

const Instructor = () => {
  return (
    <Box sx={{ bgcolor: "#f8f8f8" }}>
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* Left: Instructor Info */}
        <Box
          sx={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            backgroundColor: "#fff",
            p: 4,
            borderRadius: 3,
            boxShadow: 1,
          }}
        >
          <Stack direction="row" spacing={4} alignItems="center">
            <Avatar
              src={instructorData.avatar}
              alt={instructorData.name}
              sx={{ width: 120, height: 120 }}
            />
            <Box flex={1}>
              <Typography variant="h6" fontWeight="bold">
                {instructorData.name}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" mb={1}>
                {instructorData.title}
              </Typography>
              <Typography variant="body1" color="text.primary" mb={2}>
                {instructorData.description}
              </Typography>

              <Stack direction="row" spacing={3} alignItems="center" mb={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <PeopleIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {instructorData.students} Students
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <MenuBookIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {instructorData.lessons} Lessons
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={2}>
                {instructorData.social.facebook && (
                  <IconButton
                    href={instructorData.social.facebook}
                    target="_blank"
                    sx={{
                      transition: "color 0.3s",
                      "&:hover": { color: socialColors.facebook },
                    }}
                  >
                    <FacebookIcon />
                  </IconButton>
                )}
                {instructorData.social.twitter && (
                  <IconButton
                    href={instructorData.social.twitter}
                    target="_blank"
                    sx={{
                      transition: "color 0.3s",
                      "&:hover": { color: socialColors.twitter },
                    }}
                  >
                    <TwitterIcon />
                  </IconButton>
                )}
                {instructorData.social.instagram && (
                  <IconButton
                    href={instructorData.social.instagram}
                    target="_blank"
                    sx={{
                      transition: "color 0.3s",
                      "&:hover": { color: socialColors.instagram },
                    }}
                  >
                    <InstagramIcon />
                  </IconButton>
                )}
                {instructorData.social.pinterest && (
                  <IconButton
                    href={instructorData.social.pinterest}
                    target="_blank"
                    sx={{
                      transition: "color 0.3s",
                      "&:hover": { color: socialColors.pinterest },
                    }}
                  >
                    <PinterestIcon />
                  </IconButton>
                )}
                {instructorData.social.youtube && (
                  <IconButton
                    href={instructorData.social.youtube}
                    target="_blank"
                    sx={{
                      transition: "color 0.3s",
                      "&:hover": { color: socialColors.youtube },
                    }}
                  >
                    <YouTubeIcon />
                  </IconButton>
                )}
              </Stack>
            </Box>
          </Stack>
           <LeaveComment />
        </Box>

       
      </Box>
    </Box>
  );
};

export default Instructor;
