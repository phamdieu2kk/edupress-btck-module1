// import React, { useState } from "react";
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Stack,
//   Typography,
//   Box,
//   CircularProgress,
//   Button,
//   Fade,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import DescriptionIcon from "@mui/icons-material/Description";
// import LockIcon from "@mui/icons-material/Lock";
// import CheckIcon from "@mui/icons-material/Check";
// import QuizIcon from "@mui/icons-material/Quiz";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import LeaveComment from "./LeaveComment";

// import useCourseLessons from "@/hook/useCourseLessons";

// const CurriculumTab = ({ courseId, courseDuration }) => {
//   const [expanded, setExpanded] = useState([]);
//   const [activeSubLesson, setActiveSubLesson] = useState(null);

//   const { sections, loading, error } = useCourseLessons(courseId);

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded((prev) =>
//       isExpanded ? [...prev, panel] : prev.filter((p) => p !== panel)
//     );
//   };

//   const toggleCollapseAll = () => {
//     if (expanded.length === sections.length) setExpanded([]);
//     else setExpanded(sections.map((_, idx) => `panel${idx}`));
//   };

//   // --------- Hàm formatDuration mới ----------
//   const formatDuration = (totalMinutes) => {
//     if (!totalMinutes) return "0 min";
//     if (totalMinutes < 60) return `${totalMinutes} mins`;
//     const hours = Math.floor(totalMinutes / 60);
//     const minutes = totalMinutes % 60;
//     if (minutes === 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
//     return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} mins`;
//   };
//   // ------------------------------------------

//   if (loading)
//     return (
//       <Box display="flex" justifyContent="center" mt={3}>
//         <CircularProgress />
//       </Box>
//     );

//   return (
//     <Fade in timeout={500}>
//       <Box>
//         {error && (
//           <Typography color="error" mt={3}>
//             {error}
//           </Typography>
//         )}

//         <Box
//           sx={{
//             padding: 3,
//             borderRadius: 2,
//             boxShadow: 3,
//             backgroundColor: "#fff",
//           }}
//         >
//           {sections.length > 0 && (
//             <>
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 mb={2}
//               >
//                 <Stack
//                   direction="row"
//                   spacing={1.5}
//                   sx={{ color: "#888", alignItems: "center" }}
//                 >
//                   <Typography variant="body2" fontWeight={600}>
//                     {sections.length} Sections
//                   </Typography>
//                   <Typography variant="body2">•</Typography>
//                   <Typography variant="body2" fontWeight={600}>
//                     {sections.reduce(
//                       (acc, s) => acc + (s.subLessons?.length || 0),
//                       0
//                     )}{" "}
//                     Lessons
//                   </Typography>
//                   <Typography variant="body2">•</Typography>
//                   <Typography variant="body2" fontWeight={600}>
//                     {courseDuration ? `${courseDuration} Weeks` : "2 Weeks"}
//                   </Typography>
//                 </Stack>

//                 <Button
//                   size="small"
//                   onClick={toggleCollapseAll}
//                   sx={{
//                     textTransform: "none",
//                     fontSize: "0.95rem",
//                     color: "#efab00ff",
//                     "&:hover": { backgroundColor: "#efab00ff", color: "#fff" },
//                   }}
//                 >
//                   {expanded.length === sections.length
//                     ? "Collapse All Sections"
//                     : "Expand All Sections"}
//                 </Button>
//               </Box>

//               <Stack spacing={2}>
//                 {sections.map((section, index) => {
//                   const totalDuration = section.subLessons?.reduce(
//                     (sum, sub) => sum + (parseInt(sub.duration) || 0),
//                     0
//                   );
//                   const panelId = `panel${index}`;

//                   return (
//                     <Accordion
//                       key={index}
//                       expanded={expanded.includes(panelId)}
//                       onChange={handleChange(panelId)}
//                       sx={{
//                         borderRadius: 2,
//                         "&:before": { display: "none" },
//                         bgcolor: "#f9f9f9",
//                         boxShadow: 1,
//                       }}
//                     >
//                       <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                         <Box
//                           display="flex"
//                           alignItems="center"
//                           sx={{ width: "100%", pr: 2 }}
//                         >
//                           <Typography
//                             variant="body1"
//                             fontWeight={600}
//                             sx={{ flexGrow: 1, color: "#efab00ff" }}
//                           >
//                             {section.title}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             {section.subLessons?.length || 0} Lessons
//                           </Typography>
//                           {totalDuration > 0 && (
//                             <Typography
//                               variant="body2"
//                               color="text.secondary"
//                               ml={1}
//                             >
//                               · {formatDuration(totalDuration)}
//                             </Typography>
//                           )}
//                         </Box>
//                       </AccordionSummary>

//                       <AccordionDetails sx={{ p: 0 }}>
//                         <Stack spacing={0}>
//                           {section.subLessons.map((sub, idx) => (
//                             <Box
//                               key={sub._id || idx}
//                               onClick={() => setActiveSubLesson(sub._id)}
//                               sx={{
//                                 p: 1.5,
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "space-between",
//                                 borderBottom:
//                                   idx !== section.subLessons.length - 1
//                                     ? "1px solid #eee"
//                                     : "none",
//                                 "&:hover": { bgcolor: "#f3f3f3" },
//                                 color:
//                                   activeSubLesson === sub._id
//                                     ? "#efab00ff"
//                                     : "inherit",
//                               }}
//                             >
//                               <Box
//                                 display="flex"
//                                 alignItems="center"
//                                 gap={1}
//                                 flexGrow={1}
//                               >
//                                 {sub.type === "quiz" ? (
//                                   <QuizIcon sx={{ color: "#888" }} />
//                                 ) : (
//                                   <DescriptionIcon sx={{ color: "#888" }} />
//                                 )}
//                                 <Typography
//                                   variant="body2"
//                                   sx={{ flexGrow: 1, wordBreak: "break-word" }}
//                                 >
//                                   {sub.title}
//                                 </Typography>
//                               </Box>

//                               <Box
//                                 display="flex"
//                                 alignItems="center"
//                                 gap={1}
//                                 sx={{
//                                   flexShrink: 0,
//                                   minWidth: 140,
//                                   justifyContent: "flex-end",
//                                 }}
//                               >
//                                 <Button
//                                   size="small"
//                                   variant="contained"
//                                   sx={{
//                                     minWidth: 70,
//                                     bgcolor: "#007bff",
//                                     color: "#fff",
//                                     "&:hover": { bgcolor: "#0056b3" },
//                                     textTransform: "none",
//                                   }}
//                                 >
//                                   Preview
//                                 </Button>

//                                 {/* Fix chiều rộng ô thời lượng */}
//                                 <Box
//                                   sx={{
//                                     width: 70,
//                                     textAlign: "right",
//                                   }}
//                                 >
//                                   <Typography
//                                     variant="caption"
//                                     color="text.secondary"
//                                   >
//                                     {formatDuration(sub.duration)}
//                                   </Typography>
//                                 </Box>

//                                 {sub.isCompleted ? (
//                                   <CheckIcon fontSize="small" color="success" />
//                                 ) : sub.isLocked ? (
//                                   <LockIcon fontSize="small" color="action" />
//                                 ) : (
//                                   <VisibilityIcon
//                                     fontSize="small"
//                                     sx={{ color: "gray" }}
//                                   />
//                                 )}
//                               </Box>
//                             </Box>
//                           ))}
//                         </Stack>
//                       </AccordionDetails>
//                     </Accordion>
//                   );
//                 })}
//               </Stack>
//             </>
//           )}

//           <Box mt={3}>
//             <LeaveComment />
//           </Box>
//         </Box>
//       </Box>
//     </Fade>
//   );
// };

// export default CurriculumTab;


// src/components/CurriculumTab.jsx
import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Typography,
  Box,
  CircularProgress,
  Button,
  Fade,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DescriptionIcon from "@mui/icons-material/Description";
import LockIcon from "@mui/icons-material/Lock";
import CheckIcon from "@mui/icons-material/Check";
import QuizIcon from "@mui/icons-material/Quiz";
import VisibilityIcon from "@mui/icons-material/Visibility";

import LeaveComment from "./LeaveComment";
import useCourseLessons from "@/hook/useCourseLessons";

const CurriculumTab = ({ courseId, courseDuration }) => {
  const [expanded, setExpanded] = useState([]);
  const [activeSubLesson, setActiveSubLesson] = useState(null);

  // lấy dữ liệu qua custom hook (dùng axiosClient bên trong hook)
  const { sections, loading, error } = useCourseLessons(courseId);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded((prev) =>
      isExpanded ? [...prev, panel] : prev.filter((p) => p !== panel)
    );
  };

  const toggleCollapseAll = () => {
    if (expanded.length === sections.length) setExpanded([]);
    else setExpanded(sections.map((_, idx) => `panel${idx}`));
  };

  // format thời lượng
  const formatDuration = (totalMinutes) => {
    if (!totalMinutes) return "0 min";
    if (totalMinutes < 60) return `${totalMinutes} mins`;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (minutes === 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
    return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} mins`;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={3}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Fade in timeout={500}>
      <Box>
        {error && (
          <Typography color="error" mt={3}>
            {error}
          </Typography>
        )}

        <Box
          sx={{
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#fff",
          }}
        >
          {sections.length > 0 && (
            <>
              {/* Header Sections */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ color: "#888", alignItems: "center" }}
                >
                  <Typography variant="body2" fontWeight={600}>
                    {sections.length} Sections
                  </Typography>
                  <Typography variant="body2">•</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {sections.reduce(
                      (acc, s) => acc + (s.subLessons?.length || 0),
                      0
                    )}{" "}
                    Lessons
                  </Typography>
                  <Typography variant="body2">•</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {courseDuration ? `${courseDuration} Weeks` : "2 Weeks"}
                  </Typography>
                </Stack>

                <Button
                  size="small"
                  onClick={toggleCollapseAll}
                  sx={{
                    textTransform: "none",
                    fontSize: "0.95rem",
                    color: "#efab00ff",
                    "&:hover": { backgroundColor: "#efab00ff", color: "#fff" },
                  }}
                >
                  {expanded.length === sections.length
                    ? "Collapse All Sections"
                    : "Expand All Sections"}
                </Button>
              </Box>

              {/* Sections */}
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
                        "&:before": { display: "none" },
                        bgcolor: "#f9f9f9",
                        boxShadow: 1,
                      }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box
                          display="flex"
                          alignItems="center"
                          sx={{ width: "100%", pr: 2 }}
                        >
                          <Typography
                            variant="body1"
                            fontWeight={600}
                            sx={{ flexGrow: 1, color: "#efab00ff" }}
                          >
                            {section.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {section.subLessons?.length || 0} Lessons
                          </Typography>
                          {totalDuration > 0 && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              ml={1}
                            >
                              · {formatDuration(totalDuration)}
                            </Typography>
                          )}
                        </Box>
                      </AccordionSummary>

                      <AccordionDetails sx={{ p: 0 }}>
                        <Stack spacing={0}>
                          {section.subLessons.map((sub, idx) => (
                            <Box
                              key={sub._id || idx}
                              onClick={() => setActiveSubLesson(sub._id)}
                              sx={{
                                p: 1.5,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                borderBottom:
                                  idx !== section.subLessons.length - 1
                                    ? "1px solid #eee"
                                    : "none",
                                "&:hover": { bgcolor: "#f3f3f3" },
                                color:
                                  activeSubLesson === sub._id
                                    ? "#efab00ff"
                                    : "inherit",
                              }}
                            >
                              <Box
                                display="flex"
                                alignItems="center"
                                gap={1}
                                flexGrow={1}
                              >
                                {sub.type === "quiz" ? (
                                  <QuizIcon sx={{ color: "#888" }} />
                                ) : (
                                  <DescriptionIcon sx={{ color: "#888" }} />
                                )}
                                <Typography
                                  variant="body2"
                                  sx={{ flexGrow: 1, wordBreak: "break-word" }}
                                >
                                  {sub.title}
                                </Typography>
                              </Box>

                              <Box
                                display="flex"
                                alignItems="center"
                                gap={1}
                                sx={{
                                  flexShrink: 0,
                                  minWidth: 140,
                                  justifyContent: "flex-end",
                                }}
                              >
                                <Button
                                  size="small"
                                  variant="contained"
                                  sx={{
                                    minWidth: 70,
                                    bgcolor: "#007bff",
                                    color: "#fff",
                                    "&:hover": { bgcolor: "#0056b3" },
                                    textTransform: "none",
                                  }}
                                >
                                  Preview
                                </Button>

                                <Box sx={{ width: 70, textAlign: "right" }}>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {formatDuration(sub.duration)}
                                  </Typography>
                                </Box>

                                {sub.isCompleted ? (
                                  <CheckIcon fontSize="small" color="success" />
                                ) : sub.isLocked ? (
                                  <LockIcon fontSize="small" color="action" />
                                ) : (
                                  <VisibilityIcon
                                    fontSize="small"
                                    sx={{ color: "gray" }}
                                  />
                                )}
                              </Box>
                            </Box>
                          ))}
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </Stack>
            </>
          )}

          <Box mt={3}>
            <LeaveComment />
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default CurriculumTab;
