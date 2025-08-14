import React from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Container,
} from '@mui/material';
import bannerThemeImage from '../assets/banner-theme.jpg'; // Đảm bảo ảnh nằm đúng vị trí

export default function FeatureBanner() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: '#F8FAFC' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            position: 'relative',
            borderRadius: 4,
            
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
            minHeight: { md: '300px' },
            overflow: 'hidden',
            zIndex: 1,

            // Background image overlay
            '&::before': {
  content: '""',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `url(${bannerThemeImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  zIndex: 0,
  filter: 'none', // Không làm mờ ảnh
  opacity: 1,     // Hiển thị rõ ảnh
},

          }}
        >
          {/* Centered Content */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              maxWidth: 600,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#555',
                mb: 1,
                fontSize: { xs: '0.9rem', md: '1rem' },
              }}
            >
              PROVIDING AMAZING
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: '1.8rem',
                color: '#2D2E32',
                lineHeight: 1.2,
                mb: 2,
              }}
            >
              Education WordPress Theme
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: '0.9rem',
                color: '#555',
                lineHeight: 1.6,
                mb: 3,
              }}
            >
              The next level of LMS WordPress Theme. Learn anytime and anywhere.
            </Typography>

            <Button
              variant="contained"
              sx={{
                backgroundColor: '#FF7F43',
                color: '#fff',
                fontWeight: 600,
                textTransform: 'none',
                px: { xs: 3, md: 4 },
                py: { xs: 1.2, md: 1.4 },
               
                fontSize: { xs: '0.85rem', md: '1rem' },
                borderRadius: 6,
                boxShadow: '0 4px 10px rgba(255, 127, 67, 0.3)',
                '&:hover': {
                  backgroundColor: '#E56D32',
                  boxShadow: '0 6px 15px rgba(255, 127, 67, 0.4)',
               
                },
              }}
            >
              Explore Now
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
