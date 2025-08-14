import React from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Container,
} from '@mui/material';
import AddonImage from '../assets/addon.jpg'; // Đảm bảo đường dẫn đúng

export default function BannerWithTextAndImage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: '#F8FAFC' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            borderRadius: 4,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            px: { xs: 3, sm: 6, md: 8 },
            py: { xs: 3, sm: 4, md: 5 }, // ✅ Giảm padding để thấp nền
            background: 'linear-gradient(to right, #92eed1ff, #ebb395ff)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
            minHeight: { xs: 'auto', md: '300px' }, // ✅ Giảm chiều cao tối thiểu
          }}
        >
          {/* Left Text Section */}
          <Box
            sx={{
              width: { xs: '100%', md: '45%' },
              textAlign: 'left',
              zIndex: 2,
              mb: { xs: 4, md: 0 },
              position: 'relative',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.8rem', md: '1rem' },
                fontWeight: 600,
                color: '#555',
                mb: 1,
              }}
            >
              GET MORE POWER FROM
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.6rem', sm: '2.2rem', md: '2.8rem' },
                color: '#2D2E32',
                lineHeight: 1.2,
                mb: 2,
              }}
            >
              LearnPress Add-Ons
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.85rem', md: '1rem' },
                lineHeight: 1.6,
                color: '#666',
                mb: 3,
                maxWidth: '420px',
              }}
            >
              The next level of LearnPress - LMS WordPress Plugin. More Powerful,
              Flexible and Magical Inside.
            </Typography>

            <Button
              variant="contained"
              sx={{
                backgroundColor: '#FF7F43',
                color: '#fff',
                fontSize: { xs: '0.85rem', md: '1rem' },
                fontWeight: 600,
                textTransform: 'none',
                px: { xs: 3, md: 4 },
                py: { xs: 1, md: 1.2 },
                borderRadius: 2,
                boxShadow: '0 4px 10px rgba(255, 127, 67, 0.3)',
                '&:hover': {
                  backgroundColor: '#E56D32',
                  boxShadow: '0 6px 15px rgba(255, 127, 67, 0.4)',
                },
              }}
            >
              Explore Course
            </Button>
          </Box>

          {/* Right Image Section */}
          <Box
            sx={{
              position: 'absolute',
              right: { xs: '-30%', sm: '-15%', md: '-5%' },
              top: '50%',
              transform: 'translateY(-50%)',
              width: { xs: '120%', sm: '100%', md: '80%' },
              height: 'auto',
              zIndex: 0,
              display: 'flex',
              justifyContent: 'flex-end',
              pointerEvents: 'none',
            }}
          >
            <img
              src={AddonImage}
              alt="Add-ons"
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain',
                opacity: 0.75,
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
