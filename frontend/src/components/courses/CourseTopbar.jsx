import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";

const CourseTopbar = ({
  viewMode,
  setViewMode,
  searchText,
  setSearchText,
  sortOption,
  setSortOption,
  courseCount,
}) => {
  return (
    <Box
      sx={{
        mb: 2,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        gap: 2,
      }}
    >
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
          Hiển thị {courseCount} khóa học
        </Typography>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            sx={{ borderRadius: '25px', backgroundColor: '#f7f7f7', '& fieldset': { border: 'none' } }}
          >
            <MenuItem value="new">Mới nhất</MenuItem>
            <MenuItem value="popular">Phổ biến</MenuItem>
            <MenuItem value="priceLowHigh">Giá: Thấp - Cao</MenuItem>
            <MenuItem value="priceHighLow">Giá: Cao - Thấp</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 1.5,
          ml: { sm: "auto" },
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search courses..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
              padding: "4px 8px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <ToggleButtonGroup
          size="small"
          value={viewMode}
          exclusive
          onChange={(e, newValue) => {
            if (newValue !== null) setViewMode(newValue);
          }}
          aria-label="view mode"
          sx={{
            backgroundColor: "#f7f7f7",
            border: "1px solid #ddd",
            borderRadius: 6,
            padding: "2px",
            "& .MuiToggleButtonGroup-grouped": {
              border: "none",
              borderRadius: "6px !important",
              margin: "0 2px",
              "&.Mui-selected": {
                backgroundColor: "#fff",
                color: "primary.main",
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                "&:hover": {
                  backgroundColor: "#fff",
                },
              },
            },
          }}
        >
          <ToggleButton value="grid" aria-label="grid view">
            <GridViewIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list view">
            <FormatListBulletedIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};

export default CourseTopbar;