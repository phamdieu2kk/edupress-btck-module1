import React from "react";
import { Avatar, Box, Typography, Stack, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import instructorData from "@/data/instructorMock";
import LeaveComment from "./LeaveComment";

const Instructor = ({ course }) => {
  // Calculate the total number of lessons (including sub-lessons)
  const totalLessons = course?.sections?.reduce((total, section) => {
    const sectionLessons = section.subLessons ? section.subLessons.length : 0;
    return total + sectionLessons;
  }, 0) || 0;

  // Get the total number of students
  const totalStudents = course?.students || 0;

  return (
    <Box sx={{ p: 3, borderRadius: 2, boxShadow: 3, backgroundColor: "#fff" }}>
      <Stack direction="row" spacing={4} alignItems="center">
        <Avatar
          src={instructorData.avatar}
          alt={instructorData.name}
          variant="square"
          sx={{ width: 120, height: 120, bgcolor: "#f26c6d", borderRadius: 2 }}
        >
          <Typography variant="h4" sx={{ color: "#fff", fontWeight: 600, fontFamily: "serif" }}>
            {/* ThimPress logo text */}
            पा
          </Typography>
        </Avatar>

        <Box flex={1}>
          <Typography variant="h6" fontWeight="bold">ThimPress</Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            LearnPress is a comprehensive WordPress LMS Plugin for WordPress. This is one of the best WordPress LMS Plugins which can be used to easily create & sell courses online.
          </Typography>

          {/* Display students and lessons */}
          <Stack direction="column" spacing={1} alignItems="flex-start" mt={2}>
  {/* Students */}
  <Stack direction="row" spacing={1} alignItems="center">
    <PeopleIcon sx={{ color: "#FF6B00" }} />
    <Typography variant="body1" color="text.primary">
      <span >{totalStudents || 0} Students </span> {/* Default to 0 if no students */}
    </Typography>
  </Stack>

  {/* Lessons */}
    <Stack direction="row" spacing={1} alignItems="center">
    <MenuBookIcon sx={{ color: '#FF6B00' }} />
    <Typography variant="body1" color="text.primary">
      <span>
  {course.lessons || 0} Lesson{course.lessons !== 1 ? "s" : ""}
</span>

    </Typography>
  </Stack>
</Stack>

        </Box>
      </Stack>

      <Typography variant="body1" color="text.primary" mt={2}>
        LearnPress is a comprehensive WordPress LMS Plugin for WordPress. This is one of the best WordPress LMS Plugins which can be used to easily create & sell courses online.
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center" mt={2}>
        <Typography variant="body2" color="text.primary">Follow:</Typography>
        <IconButton href={instructorData.social.facebook} target="_blank"><FacebookIcon sx={{ color: "#555" }} /></IconButton>
        <IconButton href={instructorData.social.pinterest} target="_blank"><PinterestIcon sx={{ color: "#555" }} /></IconButton>
        <IconButton href={instructorData.social.twitter} target="_blank"><TwitterIcon sx={{ color: "#555" }} /></IconButton>
        <IconButton href={instructorData.social.instagram} target="_blank"><InstagramIcon sx={{ color: "#555" }} /></IconButton>
        <IconButton href={instructorData.social.youtube} target="_blank"><YouTubeIcon sx={{ color: "#555" }} /></IconButton>
      </Stack>

      <Box mt={3}>
        <LeaveComment />
      </Box>
    </Box>
  );
};

export default Instructor;
