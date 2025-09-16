// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Stack,
//   Box,
//   Chip,
//   Button,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import {
//   AccessTime as AccessTimeIcon,
//   People as PeopleIcon,
//   SignalCellularAlt as SignalCellularAltIcon,
//   MenuBook as MenuBookIcon,
//   Share as ShareIcon,
// } from "@mui/icons-material";
// import axios from "axios";
// import { useCart } from "../../context/CartContext"; // ✅ import cart context
// import useCourseLessons from "../../hook/useCourseLessons";

// const SidebarCourseCard = ({ course }) => {
//   const [loadingAdd, setLoadingAdd] = useState(false);
//   const [openSnack, setOpenSnack] = useState(false);
//   const [snackMsg, setSnackMsg] = useState("");
//   const { sections, loading } = useCourseLessons(course._id);
//   const { cart, setCart } = useCart(); // ✅ lấy context cart

//   const totalLessons = sections.reduce(
//     (total, s) => total + (s.subLessons?.length || 0),
//     0
//   );

//   const infoList = [
//     { icon: <PeopleIcon />, label: "Student", value: `${course.students || 0} Students` },
//     { icon: <MenuBookIcon />, label: "Lesson", value: loading ? "..." : `${totalLessons} Lessons` },
//     { icon: <AccessTimeIcon />, label: "Duration", value: course.duration ? `${course.duration} Weeks` : "0 Weeks" },
//     { icon: <SignalCellularAltIcon />, label: "Level", value: course.level || "All levels" },
//   ];

//   const renderPrice = () => {
//     if (course.price === 0) return <Typography sx={{ fontWeight: 600, color: "#4CAF50" }}>Free</Typography>;
//     if (course.originalPrice && course.originalPrice > course.price) {
//       return (
//         <>
//           <Typography sx={{ textDecoration: "line-through", color: "#999" }}>
//             ${course.originalPrice.toLocaleString()}
//           </Typography>
//           <Typography sx={{ fontWeight: 600, color: "#E53935" }}>
//             ${course.price.toLocaleString()}
//           </Typography>
//         </>
//       );
//     }
//     return <Typography sx={{ fontWeight: 600, color: "#E53935" }}>${course.price.toLocaleString()}</Typography>;
//   };

//   const handleAddToCart = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setSnackMsg("Bạn cần đăng nhập để thêm vào giỏ hàng");
//       setOpenSnack(true);
//       return;
//     }

//     setLoadingAdd(true);
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/cart",
//         { courseId: course._id, quantity: 1 },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // ✅ Cập nhật trực tiếp context cart để Navbar + CartCourses realtime
//       const existingItem = cart.find((item) => item.course._id === course._id);
//       if (existingItem) {
//         setCart((prev) =>
//           prev.map((item) =>
//             item.course._id === course._id
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           )
//         );
//       } else {
//         setCart((prev) => [...prev, { course, quantity: 1 }]);
//       }

//       setSnackMsg("Thêm vào giỏ hàng thành công!");
//       setOpenSnack(true);
//     } catch (err) {
//       console.error(err);
//       setSnackMsg(err.response?.data?.message || "Lỗi khi thêm vào giỏ hàng");
//       setOpenSnack(true);
//     } finally {
//       setLoadingAdd(false);
//     }
//   };

//   return (
//     <>
//       <Card
//         sx={{
//           borderRadius: 2,
//           overflow: "hidden",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//           mb: 2,
//           border: "1px solid #e0e0e0",
//         }}
//       >
//         <Box sx={{ position: "relative" }}>
//           <CardMedia
//             component="img"
//             image={course.image || "https://edupress.thimpress.com/wp-content/uploads/2024/01/create-an-lms-website-with-learnpress-5-1-800x488.jpg"}
//             alt={course.title}
//             sx={{ height: 180, objectFit: "cover" }}
//           />
//           {course.category && (
//             <Box sx={{ position: "absolute", top: 8, left: 8 }}>
//               <Chip label={course.category} size="small" sx={{ backgroundColor: "black", color: "white", fontWeight: "bold" }} />
//             </Box>
//           )}
//         </Box>

//         <CardContent sx={{ p: 2 }}>
//           <Stack spacing={1.5} mb={3}>
//             {infoList.map((item, idx) => (
//               <Stack key={idx} direction="row" spacing={1.5} alignItems="center">
//                 <Box sx={{ color: "#FF6B00", minWidth: 24 }}>{item.icon}</Box>
//                 <Typography variant="body1" color="text.primary">
//                   {item.label}: <span style={{ fontWeight: 600 }}>{item.value}</span>
//                 </Typography>
//               </Stack>
//             ))}
//           </Stack>

//           <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" mb={2}>
//             {renderPrice()}

//             <Button
//   onClick={handleAddToCart}
//   variant="contained"
//   disabled={loadingAdd} // vẫn disable khi đang gửi request
//   sx={{
//     bgcolor: "#FF6B00",
//     "&:hover": { bgcolor: "#e55d00" },
//     fontWeight: 600,
//     textTransform: "none",
//     py: 1.2,
//     px: 3,
//     borderRadius: "50px",
//     minWidth: "auto",
//     boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
//   }}
// >
//   Start Now
// </Button>

//           </Stack>

//           <Box display="flex" justifyContent="flex-end">
//             <Button
//               startIcon={<ShareIcon />}
//               sx={{
//                 color: "text.secondary",
//                 textTransform: "none",
//                 fontWeight: 600,
//                 fontSize: "0.8rem",
//                 minWidth: "auto",
//                 p: 0.5,
//               }}
//             >
//               Share
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>

//      <Snackbar
//   open={openSnack}
//   autoHideDuration={3000}
//   onClose={() => setOpenSnack(false)}
//   anchorOrigin={{ vertical: "top", horizontal: "right" }}
//   sx={{ mt: '64px' }} // đẩy xuống dưới header 64px
// >
//   <Alert severity="success" sx={{ width: "100%" }}>
//     {snackMsg}
//   </Alert>
// </Snackbar>



//     </>
//   );
// };

// export default SidebarCourseCard;

// src/components/course/SidebarCourseCard.jsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Box,
  Chip,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  People as PeopleIcon,
  SignalCellularAlt as SignalCellularAltIcon,
  MenuBook as MenuBookIcon,
  Share as ShareIcon,
} from "@mui/icons-material";

import { useCart } from "@/context/CartContext";
import useCourseLessons from "@/hook/useCourseLessons";
import axiosClient from "@/api/axiosClient";

const SidebarCourseCard = ({ course }) => {
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackType, setSnackType] = useState("success");

  const { sections, loading } = useCourseLessons(course._id);
  const { cart, setCart } = useCart();

  // tổng số lessons
  const totalLessons = sections.reduce(
    (total, s) => total + (s.subLessons?.length || 0),
    0
  );

  // danh sách thông tin hiển thị
  const infoList = [
    {
      icon: <PeopleIcon />,
      label: "Student",
      value: `${course.students || 0} Students`,
    },
    {
      icon: <MenuBookIcon />,
      label: "Lesson",
      value: loading ? "..." : `${totalLessons} Lessons`,
    },
    {
      icon: <AccessTimeIcon />,
      label: "Duration",
      value: course.duration ? `${course.duration} Weeks` : "0 Weeks",
    },
    {
      icon: <SignalCellularAltIcon />,
      label: "Level",
      value: course.level || "All levels",
    },
  ];

  // render giá
  const renderPrice = () => {
    if (course.price === 0) {
      return (
        <Typography sx={{ fontWeight: 600, color: "#4CAF50" }}>Free</Typography>
      );
    }
    if (course.originalPrice && course.originalPrice > course.price) {
      return (
        <>
          <Typography sx={{ textDecoration: "line-through", color: "#999" }}>
            ${course.originalPrice.toLocaleString()}
          </Typography>
          <Typography sx={{ fontWeight: 600, color: "#E53935" }}>
            ${course.price.toLocaleString()}
          </Typography>
        </>
      );
    }
    return (
      <Typography sx={{ fontWeight: 600, color: "#E53935" }}>
        ${course.price.toLocaleString()}
      </Typography>
    );
  };

  // thêm vào giỏ hàng
  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSnackMsg("Bạn cần đăng nhập để thêm vào giỏ hàng");
      setSnackType("error");
      setOpenSnack(true);
      return;
    }

    setLoadingAdd(true);
    try {
      await axiosClient.post(
        "/cart",
        { courseId: course._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // cập nhật cart context
      const existingItem = cart.find((item) => item.course._id === course._id);
      if (existingItem) {
        setCart((prev) =>
          prev.map((item) =>
            item.course._id === course._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCart((prev) => [...prev, { course, quantity: 1 }]);
      }

      setSnackMsg("Thêm vào giỏ hàng thành công!");
      setSnackType("success");
      setOpenSnack(true);
    } catch (err) {
      console.error("Lỗi khi thêm vào giỏ hàng:", err);
      setSnackMsg(err.response?.data?.message || "Lỗi khi thêm vào giỏ hàng");
      setSnackType("error");
      setOpenSnack(true);
    } finally {
      setLoadingAdd(false);
    }
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          mb: 2,
          border: "1px solid #e0e0e0",
        }}
      >
        {/* Thumbnail */}
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            image={
              course.image ||
              "https://edupress.thimpress.com/wp-content/uploads/2024/01/create-an-lms-website-with-learnpress-5-1-800x488.jpg"
            }
            alt={course.title}
            sx={{ height: 180, objectFit: "cover" }}
          />
          {course.category && (
            <Box sx={{ position: "absolute", top: 8, left: 8 }}>
              <Chip
                label={course.category}
                size="small"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            </Box>
          )}
        </Box>

        {/* Thông tin */}
        <CardContent sx={{ p: 2 }}>
          <Stack spacing={1.5} mb={3}>
            {infoList.map((item, idx) => (
              <Stack
                key={idx}
                direction="row"
                spacing={1.5}
                alignItems="center"
              >
                <Box sx={{ color: "#FF6B00", minWidth: 24 }}>{item.icon}</Box>
                <Typography variant="body1" color="text.primary">
                  {item.label}:{" "}
                  <span style={{ fontWeight: 600 }}>{item.value}</span>
                </Typography>
              </Stack>
            ))}
          </Stack>

          {/* Giá + nút thêm giỏ */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            mb={2}
          >
            {renderPrice()}
            <Button
              onClick={handleAddToCart}
              variant="contained"
              disabled={loadingAdd}
              sx={{
                bgcolor: "#FF6B00",
                "&:hover": { bgcolor: "#e55d00" },
                fontWeight: 600,
                textTransform: "none",
                py: 1.2,
                px: 3,
                borderRadius: "50px",
                minWidth: "auto",
                boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
              }}
            >
              Start Now
            </Button>
          </Stack>

          {/* Nút share */}
          <Box display="flex" justifyContent="flex-end">
            <Button
              startIcon={<ShareIcon />}
              sx={{
                color: "text.secondary",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.8rem",
                minWidth: "auto",
                p: 0.5,
              }}
            >
              Share
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Snackbar thông báo */}
      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={() => setOpenSnack(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: "64px" }}
      >
        <Alert severity={snackType} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SidebarCourseCard;
