// // src/pages/Blogs.jsx
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   IconButton,
//   Stack,
//   CircularProgress,
//   TableContainer,
//   Paper,
//   TablePagination,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import { Delete, Edit } from "@mui/icons-material";
// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/blogs";

// const Blogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(6);
//   const [total, setTotal] = useState(0);

//   const fetchBlogs = async (pageNumber = 0, limit = 6) => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${BASE_URL}?page=${pageNumber + 1}&limit=${limit}`);
//       // backend returns: { blogs: [...], total: number }
//       setBlogs(res.data.blogs || []);
//       setTotal(res.data.total || res.data.totalDocs || 0);
//     } catch (err) {
//       console.error("❌ Error fetching blogs:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs(page, pageSize);
//   }, [page, pageSize]);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this blog?")) return;
//     try {
//       await axios.delete(`${BASE_URL}/${id}`);
//       fetchBlogs(page, pageSize); // refresh list
//     } catch (err) {
//       console.error("❌ Error deleting blog:", err);
//     }
//   };

//   const handleChangePage = (_, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setPageSize(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   if (loading) {
//     return (
//       <Box p={3} display="flex" justifyContent="center">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box p={3}>
//       <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
//         <Typography variant="h5" fontWeight={700}>
//           Blog Management
//         </Typography>
//         <Button
//           sx={{
//             backgroundColor: "#FB8C00",
//             "&:hover": { backgroundColor: "#FF9800" },
//             fontSize: "0.8rem",
//           }}
//           variant="contained"
//           component={Link}
//           to="/admin/blogs/create"
//         >
//           + Create New Blog
//         </Button>
//       </Stack>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead sx={{ bgcolor: "#FFF3E0" }}>
//             <TableRow>
//     <TableCell sx={{ color: "#FB8C00", fontWeight: 600 }}>No.</TableCell>
//     <TableCell sx={{ color: "#FB8C00", fontWeight: 600 }}>Image</TableCell>
//     <TableCell sx={{ color: "#FB8C00", fontWeight: 600 }}>Title</TableCell>
//     <TableCell sx={{ color: "#FB8C00", fontWeight: 600 }}>Author</TableCell>
//     <TableCell sx={{ color: "#FB8C00", fontWeight: 600 }}>Date</TableCell>
//     <TableCell sx={{ color: "#FB8C00", fontWeight: 600 }}>Tags</TableCell>
//     <TableCell align="center" sx={{ color: "#FB8C00", fontWeight: 600 }}>
//       Actions
//     </TableCell>
//   </TableRow>
//           </TableHead>

//           <TableBody>
//             {blogs.length > 0 ? (
//               blogs.map((blog, index) => (
//                 <TableRow key={blog._id}>
//                   <TableCell>{page * pageSize + index + 1}</TableCell>
//                   <TableCell>
//                     {blog.image && (
//                       <img
//                         src={blog.image}
//                         alt={blog.title}
//                         style={{ width: 60, borderRadius: 4 }}
//                       />
//                     )}
//                   </TableCell>
//                   <TableCell>{blog.title}</TableCell>
//                   <TableCell>{blog.author}</TableCell>
//                   <TableCell>
//                     {new Date(blog.date || blog.createdAt).toLocaleDateString("en-GB")}
//                   </TableCell>
//                   <TableCell>{blog.tags?.join(", ")}</TableCell>
//                   <TableCell align="center">
//                     <Stack direction="row" spacing={1} justifyContent="center">
//                       <IconButton
//                         component={Link}
//                         to={`/admin/blogs/edit/${blog._id}`}
//                         size="small"
//                         color="primary"
//                       >
//                         <Edit />
//                       </IconButton>
//                       <IconButton
//                         onClick={() => handleDelete(blog._id)}
//                         size="small"
//                         color="error"
//                       >
//                         <Delete />
//                       </IconButton>
//                     </Stack>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={7} align="center">
//                   No blogs available
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         component="div"
//         count={total}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={pageSize}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         rowsPerPageOptions={[6, 10, 20, 50]}
//         labelRowsPerPage="Rows per page:"
//       />
//     </Box>
//   );
// };

// export default Blogs;

// src/pages/Blogs.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Stack,
  CircularProgress,
  TableContainer,
  Paper,
  TablePagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import axiosClient from "../api/axiosClient"; // <- import axiosClient

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [total, setTotal] = useState(0);

  const fetchBlogs = async (pageNumber = 0, limit = 6) => {
    try {
      setLoading(true);
      const res = await axiosClient.get(`/blogs?page=${pageNumber + 1}&limit=${limit}`);
      // backend trả về: { blogs: [...], total: number }
      setBlogs(res.data.blogs || []);
      setTotal(res.data.total || res.data.totalDocs || 0);
    } catch (err) {
      console.error("❌ Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(page, pageSize);
  }, [page, pageSize]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axiosClient.delete(`/blogs/${id}`);
      fetchBlogs(page, pageSize); // refresh list
    } catch (err) {
      console.error("❌ Error deleting blog:", err);
    }
  };

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>
          Blog Management
        </Typography>
        <Button
          sx={{
            backgroundColor: "#FB8C00",
            "&:hover": { backgroundColor: "#FF9800" },
            fontSize: "0.8rem",
          }}
          variant="contained"
          component={Link}
          to="/admin/blogs/create"
        >
          + Create New Blog
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#FFF3E0" }}>
            <TableRow>
              <TableCell sx={{ color: "#FB8C00", fontWeight: 600 }}>No.</TableCell>
              <TableCell sx={{ color: "#FB8C00", fontWeight: 600 }}>Image</TableCell>
              <TableCell sx={{ color: "#FB8C00", fontWeight: 600 }}>Title</TableCell>
              <TableCell sx={{ color: "#FB8C00", fontWeight: 600 }}>Author</TableCell>
              <TableCell sx={{ color: "#FB8C00", fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ color: "#FB8C00", fontWeight: 600 }}>Tags</TableCell>
              <TableCell align="center" sx={{ color: "#FB8C00", fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <TableRow key={blog._id}>
                  <TableCell>{page * pageSize + index + 1}</TableCell>
                  <TableCell>
                    {blog.image && (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        style={{ width: 60, borderRadius: 4 }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.author}</TableCell>
                  <TableCell>
                    {new Date(blog.date || blog.createdAt).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell>{blog.tags?.join(", ")}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <IconButton
                        component={Link}
                        to={`/admin/blogs/edit/${blog._id}`}
                        size="small"
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(blog._id)}
                        size="small"
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No blogs available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[6, 10, 20, 50]}
        labelRowsPerPage="Rows per page:"
      />
    </Box>
  );
};

export default Blogs;
