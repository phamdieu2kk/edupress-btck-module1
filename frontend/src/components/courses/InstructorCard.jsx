// src/components/course/InstructorCard.jsx

import React from "react";
import {
  Avatar,
  Box,
  Typography,
  Stack,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const InstructorCard = ({ instructor }) => {
  return (
    <Card
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 3,
        maxWidth: 350,
        width: "100%",
        mx: "auto",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src={instructor.avatar}
          alt={instructor.name}
          sx={{ width: 72, height: 72 }}
        />
        <Box>
          <Typography fontWeight="bold">{instructor.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {instructor.title}
          </Typography>
        </Box>
      </Stack>

      <CardContent sx={{ px: 0 }}>
        <Typography mt={1} variant="body2">
          {instructor.description}
        </Typography>

        <Stack direction="row" spacing={2} mt={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <PeopleIcon fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              {instructor.students} Students
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <MenuBookIcon fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              {instructor.lessons} Lessons
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1} mt={2}>
          {instructor.social.facebook && (
            <IconButton size="small" href={instructor.social.facebook}>
              <FacebookIcon fontSize="small" />
            </IconButton>
          )}
          {instructor.social.twitter && (
            <IconButton size="small" href={instructor.social.twitter}>
              <TwitterIcon fontSize="small" />
            </IconButton>
          )}
          {instructor.social.instagram && (
            <IconButton size="small" href={instructor.social.instagram}>
              <InstagramIcon fontSize="small" />
            </IconButton>
          )}
          {instructor.social.pinterest && (
            <IconButton size="small" href={instructor.social.pinterest}>
              <PinterestIcon fontSize="small" />
            </IconButton>
          )}
          {instructor.social.youtube && (
            <IconButton size="small" href={instructor.social.youtube}>
              <YouTubeIcon fontSize="small" />
            </IconButton>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default InstructorCard;
