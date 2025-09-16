
// // src/components/CourseCard.jsx
// import React, { useState } from "react";
// import {
//   Card,
//   Divider,
//   CardContent,
//   CardMedia,
//   Typography,
//   Stack,
//   Box,
//   Chip,
//   Button,
//   Tooltip,
//   IconButton,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import PeopleIcon from "@mui/icons-material/People";
// import { Link } from "react-router-dom";
// import useCourseLessons from "../../hook/useCourseLessons";
// import { useCart } from "../../context/CartContext";
// import axios from "axios";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import { formatCurrencyDisplay } from "../../utils/helpers"; // ✅ Import helper function

// const CourseCard = ({ course, variant = "grid" }) => {
//   const isList = variant === "list";
//   const cardLink = `/courses/${course._id}`;
//   const { cart, setCart } = useCart();
//   const [openSnack, setOpenSnack] = useState(false);
//   const [snackMsg, setSnackMsg] = useState("");
//   const [loadingAdd, setLoadingAdd] = useState(false);

//   // Lessons count
//   const { sections, loading } = useCourseLessons(course._id);
//   const totalLessons = sections.reduce(
//     (total, s) => total + (s.subLessons?.length || 0),
//     0
//   );

//   // === Add to Cart ===
//   const handleAddToCart = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setSnackMsg("Please login to add to cart");
//       setOpenSnack(true);
//       return;
//     }

//     setLoadingAdd(true);
//     try {
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

//       await axios.post(
//         "http://localhost:5000/api/cart",
//         { courseId: course._id, quantity: 1 },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setSnackMsg("Added to cart successfully!");
//       setOpenSnack(true);
//     } catch (err) {
//       console.error(err);
//       setSnackMsg(err.response?.data?.message || "Error while adding to cart");
//       setOpenSnack(true);
//     } finally {
//       setLoadingAdd(false);
//     }
//   };

//   // === Render list view info ===
//   const renderListInfoIcons = () => (
//     <Stack direction="row" spacing={1.5} flexWrap="wrap" mb={1}>
//       <Stack direction="row" spacing={0.5} alignItems="center">
//         <AccessTimeIcon fontSize="small" sx={{ color: "warning.main" }} />
//         <Typography variant="caption" color="text.primary">
//           {course.duration ? `${course.duration} Weeks` : "0 Weeks"}
//         </Typography>
//       </Stack>
//       <Stack direction="row" spacing={0.5} alignItems="center">
//         <PeopleIcon fontSize="small" sx={{ color: "warning.main" }} />
//         <Typography variant="caption" color="text.primary">
//           {course.students || 0} Students
//         </Typography>
//       </Stack>
//       <Stack direction="row" spacing={0.5} alignItems="center">
//         <SignalCellularAltIcon fontSize="small" sx={{ color: "warning.main" }} />
//         <Typography variant="caption" color="text.primary">
//           {course.level || "All levels"}
//         </Typography>
//       </Stack>
//       <Stack direction="row" spacing={0.5} alignItems="center">
//         <MenuBookIcon fontSize="small" sx={{ color: "warning.main" }} />
//         <Typography variant="caption" color="text.primary">
//           {loading ? "..." : totalLessons} Lessons
//         </Typography>
//       </Stack>
//     </Stack>
//   );

//   // === Render grid view info ===
//   const renderGridInfoIcons = () => (
//     <Stack direction="row" spacing={1.5} flexWrap="wrap" mb={1} mt={1}>
//       <Stack direction="row" spacing={0.5} alignItems="center">
//         <AccessTimeIcon fontSize="small" sx={{ color: "warning.main" }} />
//         <Typography variant="caption" color="text.primary">
//           {course.duration ? `${course.duration} Weeks` : "0 Weeks"}
//         </Typography>
//       </Stack>
//       <Stack direction="row" spacing={0.5} alignItems="center">
//         <PeopleIcon fontSize="small" sx={{ color: "warning.main" }} />
//         <Typography variant="caption" color="text.primary">
//           {course.students || 0} Students
//         </Typography>
//       </Stack>
//     </Stack>
//   );

//   return (
//     <>
//       <Card
//         sx={{
//           display: "flex",
//           flexDirection: isList ? { xs: "column", sm: "row" } : "column",
//           height: "100%",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//           borderRadius: 2,
//           overflow: "hidden",
//           "&:hover": {
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//             transform: "translateY(-2px)",
//             transition: "0.2s",
//           },
//         }}
//       >
//         <Box
//           sx={{
//             position: "relative",
//             width: isList ? { xs: "100%", sm: 320 } : "100%",
//             flexShrink: 0,
//           }}
//         >
//           <CardMedia
//             component="img"
//             image={
//               course.image ||
//               "https://edupress.thimpress.com/wp-content/uploads/2024/01/create-an-lms-website-with-learnpress-5-1-800x488.jpg"
//             }
//             alt={course.title}
//             sx={{
//               height: isList ? 200 : 200,
//               width: "100%",
//               objectFit: "cover",
//               borderRight: isList ? { xs: "none", sm: "1px solid #eee" } : "none",
//             }}
//           />
//           {course.category && (
//             <Box sx={{ position: "absolute", top: 8, left: 8 }}>
//               <Chip
//                 label={course.category}
//                 size="small"
//                 sx={{
//                   backgroundColor: "black",
//                   color: "white",
//                   fontWeight: "bold",
//                 }}
//               />
//             </Box>
//           )}
//         </Box>

//         <CardContent
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             flexGrow: 1,
//             justifyContent: "space-between",
//             p: 2,
//           }}
//         >
//           <Box>
//             <Typography variant="body2" color="text.secondary" mb={0.5}>
//               By {course.instructor || "Unknown"}
//             </Typography>
//             <Tooltip title={course.title}>
//               <Typography
//                 variant="h6"
//                 sx={{
//                   fontWeight: 600,
//                   lineHeight: 1.4,
//                   display: "-webkit-box",
//                   WebkitLineClamp: isList ? 2 : 3,
//                   WebkitBoxOrient: "vertical",
//                   overflow: "hidden",
//                   mb: 1,
//                 }}
//               >
//                 {course.title}
//               </Typography>
//             </Tooltip>

//             {isList ? renderListInfoIcons() : renderGridInfoIcons()}
//           </Box>

//           <Box mt={2}>
//             <Divider sx={{ mb: 1 }} />
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", sm: "row" },
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 flexWrap: "wrap",
//                 gap: 1,
//               }}
//             >
//               {/* === Price === */}
//               <Box sx={{ flexGrow: 1 }}>
//                 <Stack direction="row" spacing={1} alignItems="baseline">
//                   {course.originalPrice &&
//                   course.originalPrice > course.price ? (
//                     course.price === 0 ? (
//                       <Typography
//                         variant="h6"
//                         sx={{ fontWeight: 700, color: "success.light" }}
//                       >
//                         Free
//                       </Typography>
//                     ) : (
//                       <>
//                         <Typography
//                           variant="body2"
//                           sx={{
//                             textDecoration: "line-through",
//                             color: "text.secondary",
//                             mr: 1,
//                           }}
//                         >
//                           {formatCurrencyDisplay(course.originalPrice)}
//                         </Typography>
//                         <Typography
//                           variant="h6"
//                           sx={{ fontWeight: 700, color: "error.main" }}
//                         >
//                           {formatCurrencyDisplay(course.price)}
//                         </Typography>
//                       </>
//                     )
//                   ) : course.price === 0 ? (
//                     <Typography
//                       variant="h6"
//                       sx={{ fontWeight: 700, color: "success.light" }}
//                     >
//                       Free
//                     </Typography>
//                   ) : (
//                     <Typography
//                       variant="h6"
//                       sx={{ fontWeight: 700, color: "text.secondary" }}
//                     >
//                       {formatCurrencyDisplay(course.price)}
//                     </Typography>
//                   )}
//                 </Stack>
//               </Box>

//               {/* === Actions === */}
//               <Stack direction="row" spacing={1} alignItems="center">
//                 <IconButton
//                   onClick={handleAddToCart}
//                   disabled={loadingAdd}
//                   sx={{
//                     color: "#FF6B00",
//                     borderRadius: 0,
//                     transition: "0.2s",
//                     "&:hover": {
//                       bgcolor: "#FFE8D6",
//                       color: "#e55d00",
//                       borderRadius: 0,
//                     },
//                   }}
//                 >
//                   <ShoppingCartOutlinedIcon fontSize="small" />
//                 </IconButton>

//                 <Button
//                   component={Link}
//                   to={cardLink}
//                   size="small"
//                   variant="outlined"
//                   sx={{
//                     textTransform: "none",
//                     fontWeight: 700,
//                     border: "none",
//                     color: "black",
//                   }}
//                 >
//                   View More
//                 </Button>
//               </Stack>
//             </Box>
//           </Box>
//         </CardContent>
//       </Card>

//       {/* Snackbar */}
//       <Snackbar
//         open={openSnack}
//         autoHideDuration={3000}
//         onClose={() => setOpenSnack(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert severity="success" sx={{ width: "100%" }}>
//           {snackMsg}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default CourseCard;
import React, { useState } from "react";
import {
  Card,
  Divider,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Box,
  Chip,
  Button,
  Tooltip,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";
import useCourseLessons from "../../hook/useCourseLessons";
import { useCart } from "../../context/CartContext";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { formatCurrencyDisplay } from "../../utils/helpers"; 
import axiosClient from "../../api/axiosClient"; // ✅ import axiosClient thay vì axios thường

const CourseCard = ({ course, variant = "grid" }) => {
  const isList = variant === "list";
  const cardLink = `/courses/${course._id}`;
  const { cart, setCart } = useCart();
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [loadingAdd, setLoadingAdd] = useState(false);

  // Lessons count
  const { sections, loading } = useCourseLessons(course._id);
  const totalLessons = sections.reduce(
    (total, s) => total + (s.subLessons?.length || 0),
    0
  );

  // === Add to Cart ===
  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSnackMsg("Please login to add to cart");
      setOpenSnack(true);
      return;
    }

    setLoadingAdd(true);
    try {
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

      // ✅ Dùng axiosClient (lấy baseURL từ .env)
      await axiosClient.post(
        "/cart",
        { courseId: course._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSnackMsg("Added to cart successfully!");
      setOpenSnack(true);
    } catch (err) {
      console.error(err);
      setSnackMsg(err.response?.data?.message || "Error while adding to cart");
      setOpenSnack(true);
    } finally {
      setLoadingAdd(false);
    }
  };

  // === Render list view info ===
  const renderListInfoIcons = () => (
    <Stack direction="row" spacing={1.5} flexWrap="wrap" mb={1}>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <AccessTimeIcon fontSize="small" sx={{ color: "warning.main" }} />
        <Typography variant="caption" color="text.primary">
          {course.duration ? `${course.duration} Weeks` : "0 Weeks"}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <PeopleIcon fontSize="small" sx={{ color: "warning.main" }} />
        <Typography variant="caption" color="text.primary">
          {course.students || 0} Students
        </Typography>
      </Stack>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <SignalCellularAltIcon fontSize="small" sx={{ color: "warning.main" }} />
        <Typography variant="caption" color="text.primary">
          {course.level || "All levels"}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <MenuBookIcon fontSize="small" sx={{ color: "warning.main" }} />
        <Typography variant="caption" color="text.primary">
          {loading ? "..." : totalLessons} Lessons
        </Typography>
      </Stack>
    </Stack>
  );

  // === Render grid view info ===
  const renderGridInfoIcons = () => (
    <Stack direction="row" spacing={1.5} flexWrap="wrap" mb={1} mt={1}>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <AccessTimeIcon fontSize="small" sx={{ color: "warning.main" }} />
        <Typography variant="caption" color="text.primary">
          {course.duration ? `${course.duration} Weeks` : "0 Weeks"}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <PeopleIcon fontSize="small" sx={{ color: "warning.main" }} />
        <Typography variant="caption" color="text.primary">
          {course.students || 0} Students
        </Typography>
      </Stack>
    </Stack>
  );

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: isList ? { xs: "column", sm: "row" } : "column",
          height: "100%",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          borderRadius: 2,
          overflow: "hidden",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transform: "translateY(-2px)",
            transition: "0.2s",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: isList ? { xs: "100%", sm: 320 } : "100%",
            flexShrink: 0,
          }}
        >
          <CardMedia
            component="img"
            image={
              course.image ||
              "https://edupress.thimpress.com/wp-content/uploads/2024/01/create-an-lms-website-with-learnpress-5-1-800x488.jpg"
            }
            alt={course.title}
            sx={{
              height: isList ? 200 : 200,
              width: "100%",
              objectFit: "cover",
              borderRight: isList ? { xs: "none", sm: "1px solid #eee" } : "none",
            }}
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

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              By {course.instructor || "Unknown"}
            </Typography>
            <Tooltip title={course.title}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  lineHeight: 1.4,
                  display: "-webkit-box",
                  WebkitLineClamp: isList ? 2 : 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  mb: 1,
                }}
              >
                {course.title}
              </Typography>
            </Tooltip>

            {isList ? renderListInfoIcons() : renderGridInfoIcons()}
          </Box>

          <Box mt={2}>
            <Divider sx={{ mb: 1 }} />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {/* === Price === */}
              <Box sx={{ flexGrow: 1 }}>
                <Stack direction="row" spacing={1} alignItems="baseline">
                  {course.originalPrice &&
                  course.originalPrice > course.price ? (
                    course.price === 0 ? (
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: "success.light" }}
                      >
                        Free
                      </Typography>
                    ) : (
                      <>
                        <Typography
                          variant="body2"
                          sx={{
                            textDecoration: "line-through",
                            color: "text.secondary",
                            mr: 1,
                          }}
                        >
                          {formatCurrencyDisplay(course.originalPrice)}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 700, color: "error.main" }}
                        >
                          {formatCurrencyDisplay(course.price)}
                        </Typography>
                      </>
                    )
                  ) : course.price === 0 ? (
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: "success.light" }}
                    >
                      Free
                    </Typography>
                  ) : (
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: "text.secondary" }}
                    >
                      {formatCurrencyDisplay(course.price)}
                    </Typography>
                  )}
                </Stack>
              </Box>

              {/* === Actions === */}
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton
                  onClick={handleAddToCart}
                  disabled={loadingAdd}
                  sx={{
                    color: "#FF6B00",
                    borderRadius: 0,
                    transition: "0.2s",
                    "&:hover": {
                      bgcolor: "#FFE8D6",
                      color: "#e55d00",
                      borderRadius: 0,
                    },
                  }}
                >
                  <ShoppingCartOutlinedIcon fontSize="small" />
                </IconButton>

                <Button
                  component={Link}
                  to={cardLink}
                  size="small"
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    border: "none",
                    color: "black",
                  }}
                >
                  View More
                </Button>
              </Stack>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Snackbar */}
      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={() => setOpenSnack(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CourseCard;
