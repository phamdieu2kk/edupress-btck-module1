import React, { useState, useEffect } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Badge,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  ShoppingCart as ShoppingCartIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

export default function DrawerContent({ cart, user, logout, setDrawerOpen, pageLinks }) {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const [pageCollapseOpen, setPageCollapseOpen] = useState(false);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setDrawerOpen(false);
    setActivePath("/"); // reset active path after logout
  };

  const handleItemClick = (path) => {
    setActivePath(path);
    setDrawerOpen(false);
  };

  const listItemSx = (path) => ({
    color: activePath === path ? "#FF9800" : "#333",
    backgroundColor: activePath === path ? "rgba(255,152,0,0.1)" : "transparent",
    "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
    borderBottom: "1px solid rgba(0,0,0,0.05)",
    py: 2,
    px: 3,
  });

  const nestedItemSx = (path) => ({
    ...listItemSx(path),
    pl: 4,
  });

  return (
    <Box
      sx={{
        width: { xs: "85vw", sm: "70vw", md: "360px" },
        maxWidth: "100%",
        height: "100vh",
        bgcolor: "#FFEDD5",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <Box 
      component={Link}
      to="/" 
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          px: 3,
          py: 2,
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          bgcolor: "#FFDAB4",
        }}
      >
        <Box component="img" src="/src/assets/logo.png" alt="edupress" sx={{ objectFit: "contain", opacity: 0.5, height: 25 }} />
        <IconButton
          onClick={() => setDrawerOpen(false)}
          sx={{
            color: "#333",
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 32,
            
          }}
        >
          <CloseIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </Box>

      {/* Menu Items */}
      <List sx={{ flexGrow: 1, p: 3 }}>
        {/* Main pages */}
        {[{ label: "Home", path: "/" }, { label: "Courses", path: "/courses" }, { label: "Blog", path: "/blog" }].map(
          (item) => (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              onClick={() => handleItemClick(item.path)}
              sx={listItemSx(item.path)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          )
        )}

        {/* Collapse PageLinks */}
        <ListItemButton
          onClick={() => setPageCollapseOpen((prev) => !prev)}
          sx={{
            ...listItemSx("page"),
            backgroundColor: pageCollapseOpen ? "rgba(255,152,0,0.1)" : undefined,
          }}
        >
          <ListItemText primary="Page" />
          {pageCollapseOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={pageCollapseOpen}>
          {pageLinks.map((link) => (
            <ListItemButton
              key={link.path}
              component={Link}
              to={link.path}
              onClick={() => handleItemClick(link.path)}
              sx={nestedItemSx(link.path)}
            >
              <ListItemText primary={link.label} />
            </ListItemButton>
          ))}
        </Collapse>

        <Divider sx={{ my: 2, borderColor: "rgba(0,0,0,0.05)" }} />

        {/* Cart */}
        <ListItemButton
          component={Link}
          to="/cart-courses"
          onClick={() => handleItemClick("/cart-courses")}
          sx={listItemSx("/cart-courses")}
        >
          <Badge badgeContent={cartCount} color="warning" sx={{ mr: 2 }}>
            <ShoppingCartIcon sx={{ color: "#333" }} />
          </Badge>
          <ListItemText primary="Cart" />
        </ListItemButton>

        {/* Auth */}
        {!user ? (
          <ListItemButton
            component={Link}
            to="/auth"
            onClick={() => handleItemClick("/auth")}
            sx={listItemSx("/auth")}
          >
            <ListItemText primary="Login / Register" />
          </ListItemButton>
        ) : (
          <ListItemButton onClick={handleLogout} sx={listItemSx("/logout")}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        )}
      </List>

      {/* Messenger Icon */}
      <Box sx={{ position: "absolute", bottom: 16, right: 16, zIndex: 1300 }}>
        <IconButton
          sx={{
            bgcolor: "#FF8C42",
            "&:hover": { bgcolor: "#FF7A00" },
            width: 50,
            height: 50,
            borderRadius: "50%",
            boxShadow: 3,
            p: 0,
          }}
          onClick={() => window.open("https://m.me/yourfacebookpage", "_blank")}
        >
          <Box sx={{ width: 30, height: 30, borderRadius: "50%", bgcolor: "#fff" }} />
        </IconButton>
      </Box>
    </Box>
  );
}
