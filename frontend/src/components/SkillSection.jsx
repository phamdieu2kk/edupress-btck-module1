import React from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
<<<<<<< HEAD
  useTheme,
  useMediaQuery,
=======
>>>>>>> 6016b22a4f722684f02e99cf3f5371caf5aed30b
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function SkillSection() {
<<<<<<< HEAD
  const theme = useTheme();
  const isTabletUp = useMediaQuery(theme.breakpoints.up('sm')); // ≥600px
  const isLaptopUp = useMediaQuery(theme.breakpoints.up('md')); // ≥900px

  const features = ['Certification', 'Free Courses', 'Premium Class', 'Emails Notification'];

  return (
    <Box sx={{ py: { xs: 4, sm: 5, md: 8 }, backgroundColor: '#F8FAFC' }}>
=======
  return (
    <Box sx={{  py: { xs: 4, md: 6 }, backgroundColor: '#F8FAFC' }}> {/* Đã bỏ py */}
>>>>>>> 6016b22a4f722684f02e99cf3f5371caf5aed30b
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: 6, md: 10 },
          }}
        >
<<<<<<< HEAD
          {/* Image */}
=======
          {/* Image Section */}
>>>>>>> 6016b22a4f722684f02e99cf3f5371caf5aed30b
          <Box
            sx={{
              width: { xs: '100%', md: '48%' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              px: { xs: 2, md: 0 },
            }}
          >
            <Box
              component="img"
              src="https://edupress.thimpress.com/wp-content/uploads/2023/01/your-skill.png"
              alt="Skill growth"
              sx={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: 2,
                display: 'block',
              }}
            />
          </Box>

<<<<<<< HEAD
          {/* Text */}
          <Box
            sx={{
              width: { xs: '100%', md: '52%' },
              textAlign: { xs: 'center', md: 'left' },
=======
          {/* Text Section */}
          <Box
            sx={{
              width: { xs: '100%', md: '52%' },
              textAlign: 'left',
>>>>>>> 6016b22a4f722684f02e99cf3f5371caf5aed30b
              px: { xs: 2, md: 0 },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 2,
                fontWeight: 700,
<<<<<<< HEAD
                fontSize: { xs: '1.6rem', sm: '1.9rem', md: '2.25rem' },
=======
                fontSize: { xs: '1.75rem', md: '2.25rem' },
>>>>>>> 6016b22a4f722684f02e99cf3f5371caf5aed30b
                lineHeight: 1.3,
                color: '#2D2E32',
              }}
            >
              Grow your skill with LearnPress LMS
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 3,
<<<<<<< HEAD
                fontSize: { xs: '0.95rem', sm: '1rem' },
                lineHeight: 1.7,
                color: '#6A6A6A',
                maxWidth: { md: '540px' },
                mx: { xs: 'auto', md: 0 },
=======
                fontSize: '1rem',
                lineHeight: 1.7,
                color: '#6A6A6A',
                maxWidth: { md: '540px' },
>>>>>>> 6016b22a4f722684f02e99cf3f5371caf5aed30b
              }}
            >
              We denounce with righteous indignation and dislike men who are so beguiled and demoralized that cannot trouble.
            </Typography>

            <List disablePadding sx={{ mb: 3 }}>
<<<<<<< HEAD
              {features.map((text, i) => (
                <ListItem key={i} disableGutters sx={{ py: 0.6 }}>
                  <ListItemIcon sx={{ minWidth: 35 }}>
                    <CheckCircleIcon sx={{ color: '#FF7F43', fontSize: { xs: '1rem', md: '1.2rem' } }} />
=======
              {[
                'Certification',
                'Free Courses',
                'Premium Class',
                'Emails Notification',
              ].map((text, i) => (
                <ListItem key={i} disableGutters sx={{ py: 0.6 }}>
                  <ListItemIcon sx={{ minWidth: 35 }}>
                    <CheckCircleIcon sx={{ color: '#FF7F43', fontSize: '1.2rem' }} />
>>>>>>> 6016b22a4f722684f02e99cf3f5371caf5aed30b
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      sx: {
<<<<<<< HEAD
                        fontSize: { xs: '0.95rem', md: '1rem' },
=======
                        fontSize: '1rem',
>>>>>>> 6016b22a4f722684f02e99cf3f5371caf5aed30b
                        color: '#2D2E32',
                        fontWeight: 500,
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>

<<<<<<< HEAD
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' }, mt: 3 }}>
=======
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 3 }}>
>>>>>>> 6016b22a4f722684f02e99cf3f5371caf5aed30b
              <Button
                variant="contained"
                href="#"
                target="_blank"
                sx={{
                  backgroundColor: '#FF7F43',
                  '&:hover': { backgroundColor: '#E56D32' },
                  borderRadius: 6,
                  py: 1.2,
<<<<<<< HEAD
                  px: { xs: 2.5, md: 3 },
                  fontSize: { xs: '0.85rem', sm: '0.95rem' },
=======
                  px: 3,
                  fontSize: '0.95rem',
>>>>>>> 6016b22a4f722684f02e99cf3f5371caf5aed30b
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0 4px 10px rgba(255, 127, 67, 0.3)',
                }}
              >
                Explore Premium Theme
              </Button>

              <Button
                variant="contained"
                href="#"
                target="_blank"
                sx={{
                  backgroundColor: '#1dc007ff',
                  '&:hover': { backgroundColor: '#1ea60cff' },
                  borderRadius: 6,
                  py: 1.2,
<<<<<<< HEAD
                  px: { xs: 2.5, md: 3 },
                  fontSize: { xs: '0.85rem', sm: '0.95rem' },
=======
                  px: 3,
                  fontSize: '0.95rem',
>>>>>>> 6016b22a4f722684f02e99cf3f5371caf5aed30b
                  fontWeight: 600,
                  textTransform: 'none',
                }}
              >
                EduPress Free Download
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
