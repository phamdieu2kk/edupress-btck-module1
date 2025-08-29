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
} from "@mui/material";
import {
  StarRounded as StarRoundedIcon,
  StarBorderRounded as StarBorderRoundedIcon,
  Reply as ReplyIcon,
} from "@mui/icons-material";
import LeaveComment from "./LeaveComment";

const reviewStats = {
  average: 4.0,
  total: 146951,
  distribution: { 5: 90, 4: 5, 3: 2, 2: 2, 1: 1 },
};

const reviews = [
  {
    id: 1,
    name: "Laura Hipster",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 4.5,
    comment:
      "Quisque nec non amet quis. Varius tellus justo odio parturient mauris curabitur lorem in. Pulvinar sit ultrices mi ut eleifend luctus ut. Id sed faucibus bibendum augue id cras purus. At eget euismod cursus non. Molestie dignissim sed volutpat feugiat vel.",
    date: "October 03, 2022",
  },
  {
    id: 2,
    name: "Laura Hipster",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 4.5,
    comment:
      "Quisque nec non amet quis. Varius tellus justo odio parturient mauris curabitur lorem in. Pulvinar sit ultrices mi ut eleifend luctus ut. Id sed faucibus bibendum augue id cras purus. At eget euismod cursus non. Molestie dignissim sed volutpat feugiat vel.",
    date: "October 03, 2022",
  },
  {
    id: 3,
    name: "Laura Hipster",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 4.5,
    comment:
      "Quisque nec non amet quis. Varius tellus justo odio parturient mauris curabitur lorem in. Pulvinar sit ultrices mi ut eleifend luctus ut. Id sed faucibus bibendum augue id cras purus. At eget euismod cursus non. Molestie dignissim sed volutpat feugiat vel.",
    date: "October 03, 2022",
  },
  {
    id: 4,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=4",
    rating: 3.5,
    comment: "Pretty good overall, nhưng có thể cải thiện thêm.",
    date: "October 05, 2022",
  },
  {
    id: 5,
    name: "Alice Wonder",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    comment: "Tuyệt vời! Highly recommend 👏👏👏",
    date: "October 06, 2022",
  },
  {
    id: 6,
    name: "Bob Smith",
    avatar: "https://i.pravatar.cc/150?img=6",
    rating: 4.0,
    comment: "Hàng đúng mô tả, giao hàng nhanh.",
    date: "October 07, 2022",
  },
];

const Reviews = () => {
  const [page, setPage] = useState(1);
  const reviewsPerPage = 3;

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const paginatedReviews = reviews.slice(
    (page - 1) * reviewsPerPage,
    page * reviewsPerPage
  );

  return (
    <Box sx={{ bgcolor: "#f8f8f8" }}>
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, md: 0 },
          display: "flex",
          flexDirection: "column",
          gap: { xs: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            bgcolor: "#fff",
            p: { xs: 3, md: 4 },
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: { xs: 3, md: 2 },
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            Comments
          </Typography>

          {/* Review Stats */}
          <Stack spacing={2} sx={{ width: "100%" }}>
            {/* Điểm trung bình */}
            <Box sx={{ minWidth: 120 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h3" fontWeight={700}>
                  {reviewStats.average.toFixed(1)}
                </Typography>
                <Rating
                  value={reviewStats.average}
                  precision={0.5}
                  readOnly
                  icon={<StarRoundedIcon fontSize="inherit" />}
                  emptyIcon={<StarBorderRoundedIcon fontSize="inherit" />}
                  sx={{
                    color: "#FFC200",
                    fontSize: "1.2rem",
                    "& .MuiRating-iconEmpty": { color: "#d4d4d4" },
                  }}
                />
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                based on {reviewStats.total.toLocaleString()} ratings
              </Typography>
            </Box>

            {/* Phân bố sao */}
            <Box>
              {[5, 4, 3, 2, 1].map((star) => (
                <Stack
                  key={star}
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ mb: 0.5 }}
                >
                  <Rating
                    value={star}
                    max={5}
                    readOnly
                    precision={1}
                    icon={<StarRoundedIcon fontSize="inherit" />}
                    emptyIcon={<StarBorderRoundedIcon fontSize="inherit" />}
                    sx={{
                      color: "#FFC200",
                      "& .MuiRating-iconEmpty": { color: "#d4d4d4" },
                    }}
                  />
                  <Typography sx={{ minWidth: 40 }}>{reviewStats.distribution[star]}%</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={reviewStats.distribution[star]}
                    sx={{
                      flex: 1,
                      height: 8,
                      borderRadius: 5,
                      bgcolor: "#e5e5e5",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#FFC200",
                        borderRadius: 5,
                      },
                    }}
                  />
                </Stack>
              ))}
            </Box>
          </Stack>

          <Divider />

          {/* Reviews */}
          {paginatedReviews.map((r, index) => (
            <Box key={r.id}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src={r.avatar} alt={r.name} />
                  <Box>
                    <Typography fontWeight={600}>{r.name}</Typography>
                    <Rating
                      value={r.rating}
                      precision={0.5}
                      readOnly
                      icon={<StarRoundedIcon fontSize="inherit" />}
                      emptyIcon={<StarBorderRoundedIcon fontSize="inherit" />}
                      sx={{ fontSize: "1rem", color: "#FFC200" }}
                    />
                  </Box>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {r.date}
                </Typography>
              </Stack>

              <Box sx={{ ml: { xs: 0, md: 7 }, mt: 1 }}>
                <Typography>{r.comment}</Typography>
                <Button
                  startIcon={<ReplyIcon sx={{ transform: "scaleX(-1)" }} />}
                  variant="text"
                  size="small"
                  sx={{
                    mt: 1,
                    color: "text.secondary",
                    textTransform: "none",
                    p: 0,
                    minWidth: 0,
                  }}
                >
                  Reply
                </Button>
              </Box>

              {index < paginatedReviews.length - 1 && <Divider sx={{ my: 3 }} />}
            </Box>
          ))}

          {/* Pagination */}
          <Stack alignItems="center" mt={4}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, val) => setPage(val)}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  borderRadius: "50%",
                  minWidth: 36,
                  height: 36,
                },
                "& .MuiPaginationItem-page.Mui-selected": {
                  bgcolor: "#ff9800",
                  color: "#000",
                },
              }}
            />
          </Stack>

          {/* Leave Comment */}
          <LeaveComment />
        </Box>
      </Box>
    </Box>
  );
};

export default Reviews;
