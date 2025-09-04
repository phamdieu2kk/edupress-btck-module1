import React, { useState } from "react";
import { Stack, IconButton, InputBase, Button, Avatar, Menu, Box, Badge } from "@mui/material";
import { Search as SearchIcon, ShoppingCart as ShoppingCartIcon, Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function NavRight({ isTabletUp, isLaptopUp, cart, user, logout, navigate, setDrawerOpen }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleAvatarClick = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    navigate("/");
    handleMenuClose();
  };

  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      {/* Search, Cart, Auth chỉ hiển thị tablet trở lên */}
      {isTabletUp && (
        <>
          <IconButton onClick={() => setSearchOpen((prev) => !prev)} sx={{ border: "1px solid #eee", bgcolor: "#fafafa" }}>
            <SearchIcon />
          </IconButton>
          {searchOpen && (
            <InputBase
              placeholder="Search courses..."
              sx={{ border: "1px solid #ddd", borderRadius: "20px", px: 2, py: 0.7, ml: 1, width: 180, fontSize: "14px" }}
            />
          )}

          <IconButton component={Link} to="/cart-courses">
            <Badge badgeContent={cartCount} color="warning">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {!user ? (
            <Button component={Link} to="/auth" sx={{ backgroundColor: "#FF9800", color: "#fff", px: 3, py: 1, borderRadius: "30px" }}>
              Login / Register
            </Button>
          ) : (
            <>
              <IconButton onClick={handleAvatarClick}>
                <Avatar sx={{ bgcolor: "#FF9800" }}>{user.fullName?.charAt(0).toUpperCase()}</Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: { minWidth: 220, p: 0, borderRadius: 2, boxShadow: 3, overflow: "hidden", bgcolor: "background.paper" },
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 2, px: 2, bgcolor: "grey.100", textAlign: "center" }}>
                  <Box sx={{ fontWeight: 600 }}>{user.fullName}</Box>
                  {user.email && <Box sx={{ fontSize: 12, color: "text.secondary" }}>{user.email}</Box>}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", p: 1 }}>
                  <Button component={Link} to="/profile" onClick={handleMenuClose} fullWidth variant="outlined" sx={{ textTransform: "none", mb: 0.5 }}>
                    Profile
                  </Button>
                  <Button onClick={handleLogout} fullWidth variant="contained" color="warning" sx={{ textTransform: "none" }}>
                    Logout
                  </Button>
                </Box>
              </Menu>
            </>
          )}
        </>
      )}

      {/* Drawer menu icon chỉ hiện khi < laptop */}
      {!isLaptopUp && (
        <IconButton onClick={() => setDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>
      )}
    </Stack>
  );
}
