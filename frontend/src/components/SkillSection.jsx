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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function SkillSection() {
  const theme = useTheme();
  const features = ['Certification', 'Free Courses', 'Premium Class', 'Emails Notification'];

  return (
    <Box sx={{ py: { xs: 4, sm: 5, md: 8 }, backgroundColor: '#F8FAFC' }}>
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
          {/* Image */}
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

          {/* Text */}
          <Box
            sx={{
              width: { xs: '100%', md: '52%' },
              textAlign: { xs: 'center', md: 'left' },
              px: { xs: 2, md: 0 },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 2,
                fontWeight: 700,
                fontSize: { xs: '1.6rem', sm: '1.9rem', md: '2.25rem' },
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
                fontSize: { xs: '0.95rem', sm: '1rem' },
                lineHeight: 1.7,
                color: '#6A6A6A',
                maxWidth: { md: '540px' },
                mx: { xs: 'auto', md: 0 },
              }}
            >
              We denounce with righteous indignation and dislike men who are so beguiled and demoralized that cannot trouble.
            </Typography>

            <List disablePadding sx={{ mb: 3 }}>
              {features.map((text, i) => (
                <ListItem key={i} disableGutters sx={{ py: 0.6 }}>
                  <ListItemIcon sx={{ minWidth: 35 }}>
                    <CheckCircleIcon sx={{ color: '#FF7F43', fontSize: { xs: '1rem', md: '1.2rem' } }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: { xs: '0.95rem', md: '1rem' },
                        color: '#2D2E32',
                        fontWeight: 500,
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' }, mt: 3 }}>
              <Button
                variant="contained"
                href="#"
                sx={{
                  backgroundColor: '#FF7F43',
                  '&:hover': { backgroundColor: '#E56D32' },
                  borderRadius: 6,
                  py: 1.2,
                  px: { xs: 2.5, md: 3 },
                  fontSize: { xs: '0.85rem', sm: '0.95rem' },
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
                sx={{
                  backgroundColor: '#1dc007ff',
                  '&:hover': { backgroundColor: '#1ea60cff' },
                  borderRadius: 6,
                  py: 1.2,
                  px: { xs: 2.5, md: 3 },
                  fontSize: { xs: '0.85rem', sm: '0.95rem' },
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
