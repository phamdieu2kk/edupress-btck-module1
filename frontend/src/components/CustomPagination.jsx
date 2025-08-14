// components/CustomPagination.jsx
import React from 'react';
import { Box, Pagination } from '@mui/material';

export default function CustomPagination({ totalPages, currentPage, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onChange}
        color="primary"
      />
    </Box>
  );
}
