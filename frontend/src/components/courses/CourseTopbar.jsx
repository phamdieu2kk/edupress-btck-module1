import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewIcon from "@mui/icons-material/GridView";

const CourseTopbar = ({
  viewMode,
  setViewMode,
  searchText,
  setSearchText,
}) => {
  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      {/* Nhóm Search + Toggle View */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 1.5,
          ml: { sm: "auto" },
        }}
      >
        {/* Thanh tìm kiếm */}
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search courses..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
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

        {/* Chuyển chế độ Grid/List */}
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
        backgroundColor: "#f7f7f7", // giữ nguyên màu nền trắng
        color: "inherit",        // không đổi màu icon
      },
      "&:hover": {
        backgroundColor: "action.hover",
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
