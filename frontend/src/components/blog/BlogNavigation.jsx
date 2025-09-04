// import React, { useState, useEffect } from "react";
// import { Box, Stack, Typography, Button } from "@mui/material";
// import blogPosts from "@/data/blogPosts"; // Đường dẫn đúng với nơi bạn lưu dữ liệu bài viết
// import CommentSection from "./CommentSection"; // Đường dẫn đúng nơi bạn đặt component comment

// const BlogNavigation = ({ currentPostId }) => {
//   const [postIndex, setPostIndex] = useState(0);

//   useEffect(() => {
//     const index = blogPosts.findIndex((post) => post.id === currentPostId);
//     if (index !== -1) {
//       setPostIndex(index);
//     }
//   }, [currentPostId]);

//   const handlePrev = () => {
//     if (postIndex > 0) setPostIndex((prev) => prev - 1);
//   };

//   const handleNext = () => {
//     if (postIndex < blogPosts.length - 1) setPostIndex((prev) => prev + 1);
//   };

//   const prevPost = blogPosts[postIndex - 1];
//   const nextPost = blogPosts[postIndex + 1];

//   const handleCommentSubmit = (text) => {
//     console.log("Đã gửi bình luận:", text);
//     // Thêm logic xử lý lưu comment vào backend hoặc localState
//   };

//   return (
//     <Box
//       sx={{
//         mt: 6,
//         p: 3,
//         border: "1px solid #ddd",
//         borderRadius: 2,
//         bgcolor: "#fff",
//       }}
//     >
//       <Stack
//         direction="row"
//         justifyContent="space-between"
//         alignItems="flex-start"
//       >
//         {/* Prev Article */}
//         <Box textAlign="left" width="45%">
//           <Button
//             variant="outlined"
//             onClick={handlePrev}
//             disabled={postIndex === 0}
//           >
//             ← Prev Articles
//           </Button>
//           {prevPost && (
//             <Typography variant="body2" mt={1} color="text.secondary">
//               {prevPost.title}
//             </Typography>
//           )}
//         </Box>

//         {/* Next Article */}
//         <Box textAlign="right" width="45%">
//           <Button
//             variant="outlined"
//             onClick={handleNext}
//             disabled={postIndex === blogPosts.length - 1}
//           >
//             Next Articles →
//           </Button>
//           {nextPost && (
//             <Typography variant="body2" mt={1} color="text.secondary">
//               {nextPost.title}
//             </Typography>
//           )}
//         </Box>
//       </Stack>

//       {/* Comment Section */}
//       <CommentSection onSubmit={handleCommentSubmit} />
//     </Box>
//   );
// };

// export default BlogNavigation;



import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BlogNavigation = ({ prevPost, nextPost }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mt: 4,
        mb: 4,
      }}
    >
      {prevPost ? (
        <Button
          variant="outlined"
          onClick={() => navigate(`/blog/${prevPost.id}`)}
        >
          ← {prevPost.title}
        </Button>
      ) : (
        <Box />
      )}

      {nextPost ? (
        <Button
          variant="outlined"
          onClick={() => navigate(`/blog/${nextPost.id}`)}
        >
          {nextPost.title} →
        </Button>
      ) : (
        <Box />
      )}
    </Box>
  );
};

export default BlogNavigation;
