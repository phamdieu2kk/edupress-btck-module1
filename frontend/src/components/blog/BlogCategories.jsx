import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

const BlogCategories = ({ categories, selectedCategory, onSelect }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="subtitle1" fontWeight="bold">Danh mục</Typography>
    <Box sx={{ mt: 1 }}>
      {categories.map((c) => {
        const id = c.id || c.name;
        const name = c.name || c;
        const count = c.count || 0; // nếu có số lượng bài
        const selected = selectedCategory === id;

        return (
          <Chip
            key={id}
            label={count ? `${name} (${count})` : name}
            onClick={() => onSelect(id)}
            color={selected ? "primary" : "default"}
            variant={selected ? "filled" : "outlined"}
            sx={{ mr: 1, mb: 1 }}
          />
        );
      })}
    </Box>
  </Box>
);

export default BlogCategories;
