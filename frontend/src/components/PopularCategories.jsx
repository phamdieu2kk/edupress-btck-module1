import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Brush, Code, Chat, Videocam, PhotoCamera,
  Campaign, Create, AttachMoney, Science, NetworkWifi
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import CustomPagination from './CustomPagination';

const categories = [
  { title: "Art & Design", icon: <Brush fontSize="large" />, count: "2 Courses" },
  { title: "Communication", icon: <Chat fontSize="large" />, count: "1 Course" },
  { title: "Content Writing", icon: <Create fontSize="large" />, count: "1 Course" },
  { title: "Development", icon: <Code fontSize="large" />, count: "1 Course" },
  { title: "Finance & Bank", icon: <AttachMoney fontSize="large" />, count: "1 Course" },
  { title: "Marketing", icon: <Campaign fontSize="large" />, count: "2 Courses" },
  { title: "Network", icon: <NetworkWifi fontSize="large" />, count: "1 Course" },
  { title: "Photography", icon: <PhotoCamera fontSize="large" />, count: "1 Course" },
  { title: "Videography", icon: <Videocam fontSize="large" />, count: "1 Course" },
  { title: "Science", icon: <Science fontSize="large" />, count: "1 Course" },
];

export default function PopularCategories() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // <600px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600-900px
  const isLaptop = useMediaQuery(theme.breakpoints.up('md')); // ≥900px

  const getItemsPerPage = () => {
    if (isMobile) return 4;
    if (isTablet) return 6;
    return 10; // full laptop
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    setItemsPerPage(getItemsPerPage());
    setCurrentPage(1);
  }, [isMobile, isTablet, isLaptop]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: "#FAFAFA" }}>
      <Container maxWidth="lg">
        {/* Title + All Categories Button */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            mb: 6,
            gap: { xs: 2, sm: 0 }
          }}
        >
          <Box sx={{ flex: 1, minWidth: 260 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Top Categories
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#6c757d', fontSize: '1.1rem' }}>
              Explore our most popular learning topics
            </Typography>
          </Box>

          <Box sx={{ minWidth: 'auto' }}>
            {isMobile ? (
              <IconButton
                component={Link}
                to="/categories"
                sx={{
                  color: '#1976d2',
                  border: '1px solid #1976d2',
                  borderRadius: 2,
                  p: 1,
                }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Link to="/categories" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    border: "1px solid",
                    borderColor: "primary.main",
                    borderRadius: 2,
                    px: 2,
                    py: 0.5,
                    color: "primary.main",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "#fff",
                    },
                  }}
                >
                  All Categories
                </Button>
              </Link>
            )}
          </Box>
        </Box>

        {/* Category Cards */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 2, sm: 2.5, md: 3 },
            justifyContent: { xs: 'center', sm: 'space-around', md: 'space-between' },
          }}
        >
          {currentItems.map((cat, index) => (
            <Button
              key={index}
              variant="outlined"
              disableElevation
              sx={{
                width: {
                  xs: '44%', // 2 per row mobile
                  sm: '30%', // 3 per row tablet
                  md: '18%', // 5 per row laptop
                },
                aspectRatio: '1',
                textTransform: 'none',
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                px: 1,
                py: 3,
                boxShadow: 0,
                border: '1px solid #e0e0e0',
                backgroundColor: '#fff',
                transition: '0.25s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                  backgroundColor: '#f5f5f5',
                }
              }}
            >
              <Box sx={{ color: '#ed6910ff', mb: 1 }}>{cat.icon}</Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                align="center"
                sx={{ fontSize: '1.1rem', color: '#333' }}
              >
                {cat.title}
              </Typography>
              <Typography
                variant="body2"
                align="center"
                sx={{ fontSize: '0.9rem', color: '#666' }}
              >
                {cat.count}
              </Typography>
            </Button>
          ))}
        </Box>

        {/* Pagination */}
        <CustomPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChange={(e, page) => setCurrentPage(page)}
        />
      </Container>
    </Box>
  );
}
