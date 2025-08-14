import React, { useState } from "react";
import {
  Box,
  Typography,
  Rating,
  LinearProgress,
  Avatar,
  Stack,
  Divider,
  Pagination,
  Button,
  Icon,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ReplyIcon from "@mui/icons-material/Reply";
import LeaveComment from "./LeaveComment";

const reviewStats = {
  average: 4.9,
  total: 12421,
  distribution: {
    5: 90,
    4: 7,
    3: 2,
    2: 1,
    1: 0,
  },
};

const reviews = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    comment: "Amazing course! Highly recommend to anyone wanting to learn React.",
    date: "July 12, 2025",
  },
  {
    id: 2,
    name: "Michael Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 5,
    comment: "Instructor explains concepts very clearly. Worth every penny!",
    date: "July 10, 2025",
  },
  {
    id: 3,
    name: "Linda Nguyen",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 4,
    comment: "Good course, though I wish there were more real-world examples.",
    date: "July 8, 2025",
  },
];

const Reviews = () => {
  const [page, setPage] = useState(1);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", px: 2, py: 5 }}>
      {/* Header */}
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Student Feedback
      </Typography>

      {/* Tổng quan sao và phân phối */}
      <Stack direction="row" spacing={5} alignItems="center" mb={4}>
        <Box textAlign="center">
          <Typography variant="h2" fontWeight={700}>
            {reviewStats.average}
          </Typography>
          <Rating value={reviewStats.average} precision={0.1} readOnly />
          <Typography variant="body2" color="text.secondary">
            {reviewStats.total.toLocaleString()} Ratings
          </Typography>
        </Box>

        <Box flex={1}>
          {[5, 4, 3, 2, 1].map((star) => (
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              key={star}
              mb={0.5}
            >
              <Typography sx={{ minWidth: 24 }}>{star}</Typography>
              <StarIcon fontSize="small" color="warning" />
              <LinearProgress
                variant="determinate"
                value={reviewStats.distribution[star]}
                sx={{ flex: 1, height: 8, borderRadius: 5 }}
              />
              <Typography sx={{ minWidth: 40 }} textAlign="right">
                {reviewStats.distribution[star]}%
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>

      <Divider sx={{ mb: 4 }} />

      {/* Review chi tiết */}
      {reviews.map((r) => (
        <Box key={r.id} mb={4}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar src={r.avatar} alt={r.name} />
              <Box>
                <Typography fontWeight={600}>{r.name}</Typography>
              </Box>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {r.date}
            </Typography>
          </Stack>

          <Rating value={r.rating} readOnly size="small" />
          <Typography mt={1}>{r.comment}</Typography>

          <Button
            startIcon={<ReplyIcon sx={{ transform: "scaleX(-1)" }} />}
            variant="text"
            size="small"
            sx={{ mt: 1, color: "primary.main", textTransform: "none" }}
          >
            Reply
          </Button>

          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}

      {/* Pagination */}
      <Stack alignItems="center" mt={4}>
        <Pagination count={5} page={page} onChange={(_, val) => setPage(val)} />
      </Stack>
      <LeaveComment/>
    </Box>
  );
};

export default Reviews;
