import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Pagination,
  Drawer,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  InputAdornment,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SearchIcon from "@mui/icons-material/Search";
import CourseCard from "./CourseCard";
import FilterSidebar from "./FilterSidebar";
import Breadcrumbs from "../Breadcrumbs";
import Footer from "../../pages/Footer";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [filter, setFilter] = useState({
    category: [],
    instructor: [],
    price: "All",
    review: 0,
    level: "All levels",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const itemsPerPage = 8;

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const handleViewChange = (e, val) => {
    if (val) setViewMode(val);
  };

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get("category");
    if (categoryFromUrl) {
      setFilter((prev) => ({ ...prev, category: [decodeURIComponent(categoryFromUrl)] }));
      setCurrentPage(1);
    }
  }, [location.search]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
      };

      if (searchText) params.search = searchText;
      if (filter.category.length) params.category = filter.category.join(",");
      if (filter.instructor.length) params.instructor = filter.instructor.join(",");
      if (filter.price !== "All") params.price = filter.price;
      if (filter.review) params.review = filter.review;
      if (filter.level !== "All levels") params.level = filter.level;

      const res = await axios.get("http://localhost:5000/api/courses", { params });

      const courseData = Array.isArray(res.data.courses) ? res.data.courses : [];
      setCourses(courseData);

      setTotalPages(res.data.pagination?.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError("Cannot load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentPage, filter, searchText]);

  const handleCategoryClick = (category) => {
    navigate(`/courses?category=${encodeURIComponent(category)}`);
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );

  return (
    <>
      <Breadcrumbs paths={[{ name: "Home", href: "/" }, { name: "Courses", href: "/courses" }]} />

      <Box sx={{ bgcolor: "#fafafa", py: 6 }}>
        <Container>
          <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
            {/* MAIN CONTENT */}
            <Box flex={3}>
              {/* Top bar */}
              <Box
                mb={3}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
              >
                <Typography variant="h4" fontWeight="bold">
                  All Courses
                </Typography>

                <Box display="flex" alignItems="center" gap={1.5}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search courses..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "25px" } }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <ToggleButtonGroup
                    size="small"
                    value={viewMode}
                    exclusive
                    onChange={handleViewChange}
                    aria-label="view mode"
                    sx={{
                      backgroundColor: "#f7f7f7",
                      border: "1px solid #ddd",
                      borderRadius: 6,
                      "& .MuiToggleButtonGroup-grouped": {
                        border: "none",
                        borderRadius: "6px !important",
                        margin: "0 2px",
                      },
                    }}
                  >
                    <ToggleButton value="grid" aria-label="grid view">
                      <GridViewIcon fontSize="small" />
                    </ToggleButton>
                    <ToggleButton value="list" aria-label="list view">
                      <FormatListBulletedIcon fontSize="small" />
                    </ToggleButton>
                  </ToggleButtonGroup>

                  <IconButton onClick={toggleDrawer} sx={{ display: { md: "none" }, ml: 1 }}>
                    <MenuIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Courses */}
              {courses.length === 0 ? (
                <Typography variant="body1">No courses found.</Typography>
              ) : viewMode === "grid" ? (
                // SỬ DỤNG FLEXBOX KẾT HỢP WIDTH ĐỂ CHỈ HIỂN THỊ 2 CỘT
                <Box
                  display="flex"
                  flexWrap="wrap"
                  gap={3}
                  justifyContent="flex-start" // Căn lề trái để card lẻ không bị giãn
                >
                  {courses.map((course) => (
                    <Box
                      key={course._id}
                      sx={{
                        // Chiều rộng card responsive
                        width: {
                          xs: "100%", // Mobile: 1 cột
                          sm: "calc(50% - 12px)", // Tablet và Desktop: 2 cột
                          md: "calc(50% - 12px)", // Thêm md để đảm bảo trên desktop cũng 2 cột
                        },
                        flexGrow: 0, // Quan trọng: Ngăn card giãn ra
                        flexShrink: 0,
                        flexBasis: "auto",
                      }}
                    >
                      <CourseCard course={course} variant="grid" />
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box display="flex" flexDirection="column" gap={3}>
                  {courses.map((course) => (
                    <CourseCard key={course._id} course={course} variant="list" />
                  ))}
                </Box>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <Box mt={5} display="flex" justifyContent="center">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, val) => setCurrentPage(val)}
                    color="primary"
                  />
                </Box>
              )}
            </Box>

            {/* Sidebar desktop */}
            <Box flex={1} minWidth={240} display={{ xs: "none", md: "block" }}>
              <FilterSidebar filter={filter} onFilterChange={handleFilterChange} />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Sidebar mobile drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <Box width={280} p={2}>
          <FilterSidebar
            filter={filter}
            onFilterChange={(key, value) => {
              handleFilterChange(key, value);
              toggleDrawer();
            }}
          />
        </Box>
      </Drawer>

      <Footer />
    </>
  );
};

export default CourseList;