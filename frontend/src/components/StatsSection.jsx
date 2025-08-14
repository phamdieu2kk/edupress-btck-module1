import React from 'react';
import { Box, Typography, Container } from '@mui/material';

// Dữ liệu mẫu (thay thế bằng dữ liệu thực tế của bạn)
const statsData = [
  { value: '25K+', label: 'Active Students' },
  { value: '899', label: 'Total Courses' },
  { value: '158', label: 'Instructor' },
  { value: '100%', label: 'Satisfaction Rate' },
];

export default function StatsSection() {
  return (
    <Box sx={{  py: { xs: 4, md: 6 }, backgroundColor: '#F8FAFC' }}>
      <Container maxWidth="lg">
        {/* Box chứa các thẻ thống kê */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap', // Cho phép các item xuống dòng khi không đủ chỗ
            justifyContent: 'center', // Căn giữa các item
            gap: { xs: 2, md: 3 }, // Khoảng cách giữa các item, điều chỉnh tùy ý
            // Nếu bạn muốn các item có khoảng cách đều giữa chúng và căn lề trái/phải,
            // có thể dùng justifyContent: 'space-between' và điều chỉnh width con.
            // Ví dụ: width: { xs: 'calc(50% - 8px)', sm: 'calc(33.33% - 8px)', md: 'calc(25% - 8px)' }
            // nếu gap là 16px. Nhưng với '48%', '30%', '20%' thì 'center' hoặc 'space-around' là tốt.
          }}
        >
          {statsData.map((stat, index) => (
            <Box
  key={index}
  sx={{
    flex: {
      xs: '0 1 calc(50% - 8px)',
      sm: '0 1 calc(33.33% - 16px)',
      md: '0 1 calc(25% - 16px)',
    },
    maxWidth: {
      xs: 'calc(50% - 8px)',
      sm: 'calc(33.33% - 16px)',
      md: 'calc(20% - 16px)',
    },
                aspectRatio: '1.5 / 1', // Giữ tỷ lệ khung hình
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                backgroundColor: '#fff',
                border: '1px solid #e0e0e0',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)', // Box shadow nhẹ hơn để giống ảnh
                transition: '0.25s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)', // Box shadow nổi bật hơn khi hover
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <Typography
                variant="h4" // Sử dụng h4 hoặc h3 cho số lớn
                sx={{
                  fontWeight: 800,
                  color: '#FF7F43', // Màu cam của bạn
                  fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }, // Kích thước chữ responsive
                  mb: 0.5,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="body1" // Sử dụng body1 hoặc body2 cho text mô tả
                sx={{
                  color: '#666',
                  fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }, // Kích thước chữ responsive
                  textAlign: 'center',
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}