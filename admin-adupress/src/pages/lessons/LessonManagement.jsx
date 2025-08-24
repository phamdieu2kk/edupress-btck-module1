// src/pages/lessons/LessonManagement.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  IconButton,
  Button,
  Collapse,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link, useParams } from "react-router-dom";

const LessonManagement = () => {
  const { courseId } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Fake data: lessons + subLessons + videoUrl
  const [lessons, setLessons] = useState([
    {
      _id: "689d81df59e354ef62edce00",
      id: 1,
      courseId: 1,
      title: "What is LearnPress?",
      duration: "20 Minutes",
      order: 1,
      videoUrl: "https://youtube.com/lesson1",
      subLessons: [
        { _id: "s1", title: "Intro video", duration: "5 Minutes", videoUrl: "https://youtube.com/s1" },
        { _id: "s2", title: "Documentation overview", duration: "10 Minutes", videoUrl: "https://youtube.com/s2" },
      ],
    },
    {
      _id: "689d81df59e354ef62edce01",
      id: 2,
      courseId: 1,
      title: "How to use LearnPress?",
      duration: "60 Minutes",
      order: 2,
      videoUrl: "https://youtube.com/lesson2",
      subLessons: [
        { _id: "s3", title: "Install plugin", duration: "15 Minutes", videoUrl: "https://youtube.com/s3" },
        { _id: "s4", title: "Create course", duration: "20 Minutes", videoUrl: "https://youtube.com/s4" },
      ],
    },
    {
      _id: "689d81df59e354ef62edce03",
      id: 4,
      courseId: 2,
      title: "LearnPress Introduction",
      duration: "30 Minutes",
      order: 1,
      videoUrl: "https://youtube.com/lesson3",
      subLessons: [
        { _id: "s5", title: "Overview features", duration: "10 Minutes", videoUrl: "https://youtube.com/s5" },
      ],
    },
  ]);

  const [openLessonId, setOpenLessonId] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài học này?")) {
      setLessons(lessons.filter((l) => l._id !== id));
    }
  };

  const toggleOpen = (id) => {
    setOpenLessonId(openLessonId === id ? null : id);
  };

  const commonCellSx = { fontWeight: 700 };

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          mb: 2,
          gap: 1,
        }}
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{ fontWeight: "bold", color: "#FB8C00" }}
        >
          Quản lý bài học
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#FB8C00", "&:hover": { backgroundColor: "#FF9800" } }}
          component={Link}
          to={`/admin/lessons/${courseId}/create`}
        >
          + Thêm bài học
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: "#FFF3E0" }}>
            <TableRow>
              <TableCell align="center" sx={{ ...commonCellSx, color: "#FB8C00" }}>STT</TableCell>
              <TableCell sx={{ ...commonCellSx, color: "#FB8C00" }}>Tiêu đề</TableCell>
              {!isMobile && (
                <>
                  <TableCell sx={{ ...commonCellSx, color: "#FB8C00" }}>Thời lượng</TableCell>
                  <TableCell sx={{ ...commonCellSx, color: "#FB8C00" }}>Bài học</TableCell>
                </>
              )}
              <TableCell align="center" sx={{ ...commonCellSx, color: "#FB8C00" }}>Hành động</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {lessons.map((lesson, index) => (
              <React.Fragment key={lesson._id}>
                <TableRow sx={{ "&:hover": { backgroundColor: "rgba(251,140,0,0.05)" } }}>
                  <TableCell align="center" sx={commonCellSx}>
                    <IconButton size="small" onClick={() => toggleOpen(lesson._id)}>
                      {openLessonId === lesson._id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    {index + 1}
                  </TableCell>
                  <TableCell sx={commonCellSx}>
                    {lesson.title}{" "}
                    <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8 }}>
                      Xem
                    </a>
                  </TableCell>
                  {!isMobile && (
                    <>
                      <TableCell>{lesson.duration}</TableCell>
                      <TableCell>{lesson.order}</TableCell>
                    </>
                  )}
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <IconButton
                        size="small"
                        color="primary"
                        component={Link}
                        to={`/admin/lessons/${courseId}/edit/${lesson._id}`}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(lesson._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>

                {/* SubLessons */}
                {lesson.subLessons && (
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={isMobile ? 3 : 5}>
                      <Collapse in={openLessonId === lesson._id} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Danh sách bài học con:
                          </Typography>
                          <Table size="small">
                            <TableBody>
                              {lesson.subLessons.map((sub, subIndex) => (
                                <TableRow key={sub._id}>
                                  <TableCell sx={{ pl: 4 }}>
                                    {subIndex + 1}. {sub.title}{" "}
                                    <a href={sub.videoUrl} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8 }}>
                                      Xem
                                    </a>
                                  </TableCell>
                                  {!isMobile && <TableCell>{sub.duration}</TableCell>}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LessonManagement;
