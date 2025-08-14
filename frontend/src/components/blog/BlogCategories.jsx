import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

const BlogCategories = ({ categories, onSelect }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="subtitle1">Danh mục</Typography>
    <Box sx={{ mt: 1 }}>
      {categories.map(c => (
        <Chip key={c.id} label={c.name} onClick={() => onSelect(c.id)} sx={{ mr: 1, mb: 1 }} />
      ))}
    </Box>
  </Box>
);

export default BlogCategories;
