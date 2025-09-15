import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { user, logout } = useContext(AuthContext); // ✅ lấy user từ context
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/login");
  };

  // ✅ lấy chữ cái đầu của tên user
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "#fffefdff",
          color: "#FB8C00",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 2, sm: 4 },
          }}
        >
          {/* Logo bên trái */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://edupress.thimpress.com/learnpress/wp-content/uploads/sites/2/2024/01/logo-png.png"
              alt="EduPress Logo"
              style={{ height: 36 }}
            />
          </Box>

          {/* Search Bar + Action icons + Avatar */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "#FFF3E0",
                  px: 2,
                  py: 0.5,
                  borderRadius: "25px",
                  minWidth: 220,
                }}
              >
                <SearchIcon fontSize="small" sx={{ mr: 1, color: "#FB8C00" }} />
                <InputBase
                  placeholder="Search..."
                  sx={{ flex: 1, fontSize: "0.9rem", color: "#333" }}
                />
              </Box>
            )}

            {isMobile && (
              <IconButton
                size="small"
                color="inherit"
                onClick={() => setSearchOpen(true)}
              >
                <SearchIcon />
              </IconButton>
            )}

            {/* Action icons */}
            <IconButton size="small" color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton size="small" color="inherit">
              <SettingsIcon />
            </IconButton>
            <IconButton size="small" color="inherit">
              <HelpOutlineIcon />
            </IconButton>

            {/* Avatar theo user */}
            <IconButton onClick={handleMenuOpen} size="small">
              <Avatar
                alt={user?.name || "User"}
                src={user?.avatar || ""}
                sx={{ width: 36, height: 36, bgcolor: "#FB8C00" }}
              >
                {!user?.avatar && getInitials(user?.name)} {/* Nếu ko có avatar thì hiển thị initials */}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Dialog Search cho mobile */}
      <Dialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          Search
          <IconButton onClick={() => setSearchOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#FFF3E0",
              px: 2,
              py: 0.8,
              borderRadius: "25px",
            }}
          >
            <SearchIcon fontSize="small" sx={{ mr: 1, color: "#FB8C00" }} />
            <InputBase
              autoFocus
              placeholder="Search..."
              sx={{ flex: 1, fontSize: "0.9rem", color: "#333" }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header; 