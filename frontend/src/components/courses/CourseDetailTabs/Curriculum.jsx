import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Stack,
  Button,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LockIcon from "@mui/icons-material/Lock";
import CheckIcon from "@mui/icons-material/Check";
import DescriptionIcon from "@mui/icons-material/Description";
import LeaveComment from "./LeaveComment";

const lessonsData = [
  {
    title: "Lessons With Video Content",
    totalLessons: 3,
    duration: "45 Mins",
    isExpanded: true,
    lessons: [
      {
        title: "Lessons with video content",
        time: "12:30",
        preview: true,
        completed: true,
      },
      {
        title: "Lessons with video content",
        time: "10:05",
        preview: true,
        completed: true,
        highlight: true,
      },
      {
        title: "Lessons with video content",
        time: "2:25",
        preview: true,
        locked: true,
      },
    ],
  },
  {
    title: "Lessons With Video Content",
    totalLessons: 5,
    duration: "45 Mins",
    isExpanded: false,
    lessons: [],
  },
  {
    title: "Lessons With Video Content",
    totalLessons: 5,
    duration: "45 Mins",
    isExpanded: false,
    lessons: [],
  },
];

const CurriculumTab = () => {
  const [expanded, setExpanded] = useState(0);

  const handleChange = (index) => {
    setExpanded(expanded === index ? -1 : index);
  };

  return (
    <Box mt={3} >
      {/* Accordion Section */}
      {lessonsData.map((section, index) => (
        <Accordion
          key={index}
          expanded={expanded === index}
          onChange={() => handleChange(index)}
          disableGutters
          sx={{
            mb: 1,
            borderRadius: 2,
            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              sx={{
                color: expanded === index ? "#f97316" : "inherit",
                fontWeight: expanded === index ? 600 : 500,
              }}
            >
              {section.title}
            </Typography>
            <Box flexGrow={1} />
            <Typography sx={{ mr: 2 }}>
              {section.totalLessons} Lessons
            </Typography>
            <Typography>{section.duration}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {section.lessons.length > 0 ? (
              <Stack spacing={2}>
                {section.lessons.map((lesson, i) => (
                  <Box key={i} display="flex" alignItems="center">
                    <DescriptionIcon sx={{ color: "#888", mr: 1 }} />
                    <Typography
                      variant="body2"
                      sx={{
                        flexGrow: 1,
                        color: lesson.highlight ? "#f97316" : "inherit",
                      }}
                    >
                      {lesson.title}
                    </Typography>
                    {lesson.preview && (
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          color: "#2563eb",
                          borderColor: "#2563eb",
                          textTransform: "none",
                          mr: 2,
                        }}
                      >
                        Preview
                      </Button>
                    )}
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      {lesson.time}
                    </Typography>
                    {lesson.completed && <CheckIcon color="success" />}
                    {lesson.locked && <LockIcon sx={{ color: "#999" }} />}
                  </Box>
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No lessons available.
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Divider */}
      <Divider sx={{ my: 3 }} />
<LeaveComment/>
      
    </Box>
  );
};

export default CurriculumTab;
