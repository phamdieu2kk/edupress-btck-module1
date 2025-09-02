import React from "react";
import {
  Stack,
  IconButton,
  InputBase,
  Badge,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

function HeaderRight({
  theme,
  searchOpen,
  setSearchOpen,
  searchText,
  setSearchText,
  cartCount,
  isLoggedIn,
  user,
  handleOpenUser,
  handleCloseUser,
  anchorElUser,
  handleLogout,
}) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      {/* Search */}
      <IconButton
        onClick={() => setSearchOpen((prev) => !prev)}
        sx={{
          border: "1px solid #eee",
          bgcolor: "#fafafa",
          "&:hover": { bgcolor: "#f0f0f0" },
        }}
      >
        <SearchIcon sx={{ color: theme.palette.text.secondary }} />
      </IconButton>
      {searchOpen && (
        <InputBase
          placeholder="Search courses..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{
            border: "1px solid #ddd",
            borderRadius: "20px",
            px: 2,
            py: 0.7,
            ml: 1,
            width: 220,
            fontSize: "14px",
          }}
        />
      )}

      {/* Cart */}
      <IconButton
        component={Link}
        to="/cart-courses"
        sx={{
          position: "relative",
          "&:hover": { bgcolor: "#f5f5f5" },
        }}
      >
        <Badge badgeContent={cartCount} color="primary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      {!isLoggedIn ? (
        <Button
          component={Link}
          to="/auth"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "30px",
            px: 3,
            py: 1,
            fontFamily: "Inter, sans-serif",
            "&:hover": { backgroundColor: theme.palette.primary.dark },
          }}
        >
          Login / Register
        </Button>
      ) : (
        <>
          <IconButton onClick={handleOpenUser}>
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "#fff",
                width: 36,
                height: 36,
                fontSize: "1rem",
              }}
            >
              {user.fullName?.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUser}
          >
            <MenuItem disabled>{user.fullName}</MenuItem>
            <Divider />
            <MenuItem component={Link} to="/profile">
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </>
      )}
    </Stack>
  );
}

export default HeaderRight;
