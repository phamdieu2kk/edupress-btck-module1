import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Typography,
  Box,
  CircularProgress,
  Divider,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DescriptionIcon from "@mui/icons-material/Description";
import LockIcon from "@mui/icons-material/Lock";
import CheckIcon from "@mui/icons-material/Check";
import QuizIcon from "@mui/icons-material/Quiz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LeaveComment from "./LeaveComment";

const CurriculumTab = ({ courseId }) => {
  const [sections, setSections] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded((prev) =>
      isExpanded ? [...prev, panel] : prev.filter((p) => p !== panel)
    );
  };

  const toggleCollapseAll = () => {
    if (expanded.length === sections.length) {
      setExpanded([]);
    } else {
      setExpanded(sections.map((_, idx) => `panel${idx}`));
    }
  };

  const formatDuration = (totalMinutes) => {
    if (!totalMinutes) return "0 min";
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours > 0 && minutes > 0) return `${hours} hours ${minutes} mins`;
    if (hours > 0) return `${hours}hours`;
    return `${minutes} mins`;
  };

  useEffect(() => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    const fetchLessons = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/lessons/course/${courseId}`
        );

        const data = res.data.sections || {};
        const sectionsArray = Object.keys(data).map((sectionName) => {
          const subLessonsRaw = Array.isArray(data[sectionName]) ? data[sectionName] : [];
          const subLessons = subLessonsRaw
            .map((lesson) => {
              if (lesson.subLessons && lesson.subLessons.length > 0) {
                return lesson.subLessons.map((sub) => ({
                  ...sub,
                  title: sub.title || lesson.title,
                  type: lesson.type || "video",
                  isLocked: lesson.isLocked || false,
                  isCompleted: lesson.isCompleted || false,
                  questions: lesson.questions || null,
                  _id: sub._id,
                }));
              }
              return {
                title: lesson.title,
                duration: lesson.duration,
                type: lesson.type || "video",
                isLocked: lesson.isLocked || false,
                isCompleted: lesson.isCompleted || false,
                questions: lesson.questions || null,
                _id: lesson._id,
              };
            })
            .flat();
          return { _id: sectionName, title: sectionName, subLessons };
        });

        setSections(sectionsArray);
      } catch (err) {
        console.error(err);
        setError("Unable to load curriculum. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={3}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box mt={3}>
      {error && (
        <Typography color="error" mt={3}>
          {error}
        </Typography>
      )}

      {sections.length > 0 ? (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="body2" color="text.secondary">
              {sections.length} Sections · {sections.reduce((acc, s) => acc + (s.subLessons?.length || 0), 0)} Lessons
            </Typography>
           <Button
  size="small"
  variant="outlined"
  onClick={toggleCollapseAll}
  sx={{
    border: "none",             
    textTransform: "none",     
    fontSize: "0.95rem",        
    color: "#efab00ff",          
        
   
  }}
>
  {expanded.length === sections.length ? "Collapse All Sections" : "Expand All Sections"}
</Button>


          </Box>

          <Stack spacing={2}>
            {sections.map((section, index) => {
              const totalDuration = section.subLessons?.reduce(
                (sum, sub) => sum + (parseInt(sub.duration) || 0),
                0
              );
              const panelId = `panel${index}`;

              return (
                <Accordion
                  key={index}
                  expanded={expanded.includes(panelId)}
                  onChange={handleChange(panelId)}
                  sx={{
                    borderRadius: 2,
                    boxShadow: 2,
                    "&:before": { display: "none" },
                    bgcolor: "#fefefe",
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box display="flex" alignItems="center" sx={{ width: "100%", pr: 2 }}>
                      <Typography variant="body1" fontWeight={600} sx={{ flexGrow: 1 }}>
                        {section.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {section.subLessons?.length || 0} Lessons
                      </Typography>
                      {totalDuration > 0 && (
                        <Typography variant="body2" color="text.secondary" ml={1}>
                          · {formatDuration(totalDuration)}
                        </Typography>
                      )}
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Divider sx={{ my: 1 }} />
                    <Stack spacing={1}>
                      {section.subLessons.length > 0 ? (
                        section.subLessons.map((sub, idx) => (
                          <Box
                            key={sub._id || idx}
                            sx={{
                              p: 1.5,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              borderRadius: 2,
                              "&:hover": { bgcolor: "#f9f9f9" },
                            }}
                          >
                            <Box display="flex" alignItems="center" gap={1} flexGrow={1}>
                              {sub.type === "quiz" ? (
                                <QuizIcon sx={{ color: "#888" }} />
                              ) : (
                                <DescriptionIcon sx={{ color: "#888" }} />
                              )}
                              <Typography variant="body2" sx={{ flexGrow: 1, wordBreak: "break-word" }}>
                                {sub.title}
                              </Typography>
                            </Box>

                            <Box display="flex" alignItems="center" gap={1} sx={{ flexShrink: 0, minWidth: 140 }}>
                              <Button
                                size="small"
                                variant="outlined"
                                sx={{
                                  minWidth: 70,
                                  bgcolor: sub.isLocked ? "grey.300" : "primary.main",
                                  color: sub.isLocked ? "grey.700" : "white",
                                  "&:hover": {
                                    bgcolor: sub.isLocked ? "grey.400" : "primary.dark",
                                  },
                                }}
                                disabled={sub.isLocked}
                              >
                                Preview
                              </Button>

                              <Typography variant="caption" color="text.secondary">
                                {sub.duration ? formatDuration(parseInt(sub.duration)) : "0 min"}
                              </Typography>

                              {sub.isCompleted ? (
                                <CheckIcon fontSize="small" color="success" />
                              ) : sub.isLocked ? (
                                <LockIcon fontSize="small" color="action" />
                              ) : (
                                <VisibilityIcon fontSize="small" sx={{ color: "gray" }} />
                              )}
                            </Box>
                          </Box>
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary" pl={4}>
                          No lessons in this section.
                        </Typography>
                      )}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Stack>
        </>
      ) : (
        <Typography variant="body2" color="text.secondary" mb={2}>
          No lessons available for this course.
        </Typography>
      )}

      {/* LeaveComment luôn hiển thị */}
      <Box mt={3}>
        <LeaveComment />
      </Box>
    </Box>
  );
};

export default CurriculumTab;
