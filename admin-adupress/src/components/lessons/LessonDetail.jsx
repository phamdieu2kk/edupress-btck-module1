// src/components/lessons/LessonDetail.jsx
import React from "react";
import {
  Stack,
  Card,
  CardContent,
  Paper,
  Typography,
  Divider,
  IconButton,
  Button,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import LockIcon from "@mui/icons-material/Lock";
import CheckIcon from "@mui/icons-material/Check";

const LessonDetail = ({ lessons, role, onEdit, onDelete }) => {
  // Hàm chuyển phút sang định dạng "x giờ y phút"
  const formatDuration = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0 ? `${hours} giờ ${minutes} phút` : `${minutes} phút`;
  };

  return (
    <Stack spacing={3}>
      {lessons.length === 0 ? (
        <Typography>Chưa có bài học nào.</Typography>
      ) : (
        lessons.map((l) => {
          const totalDuration = l.subLessons?.reduce(
            (sum, sub) => sum + (parseInt(sub.duration) || 0),
            0
          );

          return (
            <Card
              key={l._id}
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6 },
              }}
            >
              <CardContent>
                {/* HEADER: title + course name + edit/delete */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Stack spacing={0.5}>
                    <Typography variant="h6" fontWeight="700" color="text.primary">
                      {l.title}
                    </Typography>
                    {l.course?.title && (
                      <Typography variant="body2" color="text.secondary">
                        Khóa học: {l.course.title}
                      </Typography>
                    )}
                  </Stack>

                  {role !== "Customer" && (
                    <Stack direction="row" spacing={1}>
                      <IconButton size="small" onClick={() => onEdit(l._id)}>
                        <EditIcon fontSize="small" color="primary" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDelete(l._id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  )}
                </Stack>

                {/* THÔNG TIN CHUNG */}
                <Stack direction="row" spacing={1} mb={1}>
                  <Chip label={`Bài học con: ${l.subLessons?.length || 0}`} size="small" />
                  {typeof totalDuration === "number" && totalDuration > 0 && (
                    <Chip
                      label={`Thời lượng tổng: ${
                        totalDuration >= 60
                          ? `${Math.floor(totalDuration / 60)} giờ${totalDuration % 60 > 0 ? ` ${totalDuration % 60} phút` : ""}`
                          : `${totalDuration} phút`
                      }`}
                      size="small"
                    />
                  )}
                </Stack>

                <Divider sx={{ my: 1.5 }} />

                {/* DANH SÁCH SUBLESSONS */}
                <Stack spacing={1}>
                  {l.subLessons?.length > 0 ? (
                    l.subLessons.map((sub, idx) => (
                      <Paper
                        key={idx}
                        variant="outlined"
                        sx={{
                          p: 1.5,
                          display: "flex",
                          alignItems: "center",
                          borderRadius: 2,
                        }}
                      >
                        <DescriptionIcon fontSize="small" sx={{ mr: 1, color: "gray" }} />
                        <Typography variant="body2" sx={{ flexGrow: 1 }}>
                          {sub.title}
                        </Typography>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ mr: 2 }}
                          onClick={() => console.log("Preview", sub._id)}
                        >
                          Preview
                        </Button>
                        <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                          {sub.duration ? formatDuration(parseInt(sub.duration)) : "0 phút"}
                        </Typography>
                        {sub.isCompleted ? (
                          <CheckIcon fontSize="small" color="success" />
                        ) : sub.isLocked ? (
                          <LockIcon fontSize="small" color="action" />
                        ) : null}
                      </Paper>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Không có bài học con
                    </Typography>
                  )}
                </Stack>
              </CardContent>
            </Card>
          );
        })
      )}
    </Stack>
  );
};

export default LessonDetail;
