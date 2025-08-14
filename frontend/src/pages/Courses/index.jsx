import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  IconButton,
  Drawer,
  Button,
  Pagination,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import CourseCard from "@/components/courses/CourseCard";
import FilterSidebar from "@/components/courses/FilterSidebar";
import CourseTopbar from "@/components/courses/CourseTopbar";
import Breadcrumbs from "../../components/Breadcrumbs";
import Footer from "../Footer";
import courseList from "@/data/mock-data";

const CoursePage = () => {
  const [filter, setFilter] = useState({
    category: [],
    instructor: [],
    price: "",
    level: "",
    review: 0,
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("new");
  const [viewMode, setViewMode] = useState("grid");

  const itemsPerPage = 8;

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    setCurrentPage(1); // reset page khi filter thay đổi
  }, [filter, searchText]);

  const filteredCourses = courseList
    .filter((course) => {
      const { category, instructor, price, level, review } = filter;

      if (category.length && !category.includes(course.category)) return false;
      if (instructor.length && !instructor.includes(course.instructor)) return false;
      if (price === "Free" && course.price > 0) return false;
      if (price === "Paid" && course.price === 0) return false;
      if (level && level !== "All levels" && course.level !== level) return false;
      if (review > 0 && course.rating < review) return false;

      if (
        searchText &&
        !course.title.toLowerCase().includes(searchText.toLowerCase())
      )
        return false;

      return true;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "popular":
          return b.students - a.students;
        case "priceLowHigh":
          return a.price - b.price;
        case "priceHighLow":
          return b.price - a.price;
        case "new":
        default:
          return new Date(b.publishedAt) - new Date(a.publishedAt);
      }
    });

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Breadcrumbs
        paths={[
          { name: "Home", href: "/" },
          { name: "All Courses", href: "/courses" },
        ]}
      />

      <Box py={4}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box
            mb={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4" fontWeight="bold">
              All Courses
            </Typography>
            <IconButton
              sx={{ display: { md: "none" } }}
              onClick={toggleDrawer}
              aria-label="filter"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Layout */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
            }}
          >
            {/* Main content */}
            <Box sx={{ flex: { xs: "1 1 100%", md: "0 0 70%" } }}>
              <CourseTopbar
                viewMode={viewMode}
                setViewMode={setViewMode}
                sortOption={sortOption}
                setSortOption={setSortOption}
                searchText={searchText}
                setSearchText={setSearchText}
              />

              <Box mt={3}>
                {viewMode === "grid" ? (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                      },
                      gap: 3,
                    }}
                  >
                    {currentCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </Box>
                ) : (
                  <Box display="flex" flexDirection="column" gap={2}>
                    {currentCourses.map((course) => (
                      <CourseCard key={course.id} course={course} variant="list" />
                    ))}
                  </Box>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <Box display="flex" justifyContent="center" mt={4}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                    />
                  </Box>
                )}
              </Box>
            </Box>

            {/* Sidebar Filter */}
            <Box
              sx={{
                flex: { xs: "0 0 100%", md: "0 0 30%" },
                display: { xs: "none", md: "block" },
                position: "sticky",
                top: 100,
                height: "fit-content",
              }}
            >
              <FilterSidebar filter={filter} onFilterChange={handleFilterChange} />
            </Box>
          </Box>

          {/* Mobile Drawer Filter */}
          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={toggleDrawer}
            sx={{ display: { md: "none" } }}
          >
            <Box width={300} p={2}>
              <FilterSidebar filter={filter} onFilterChange={handleFilterChange} />
              <Button
                fullWidth
                onClick={toggleDrawer}
                variant="contained"
                sx={{ mt: 2 }}
              >
                Apply
              </Button>
            </Box>
          </Drawer>
        </Container>
      </Box>

      <Footer />
    </div>
  );
};

export default CoursePage;
