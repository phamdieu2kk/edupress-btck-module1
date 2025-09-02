// src/components/Navbar.jsx
import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Stack,
  Avatar,
  Divider,
  InputBase,
  Badge,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Header from "./Header";
function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const isTabletUp = useMediaQuery(theme.breakpoints.up("sm"));
  const isLaptopUp = useMediaQuery(theme.breakpoints.up("md"));

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pageCollapseOpen, setPageCollapseOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const isLoggedIn = !!user;

  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const pageLinks = [
    { label: "Contact", path: "/contact" },
    { label: "FAQ", path: "/faqs" },
    { label: "Error", path: "/error" },
  ];

  const navLinkStyle = (active) => ({
    position: "relative",
    color: active ? theme.palette.primary.main : theme.palette.text.primary,
    fontWeight: 600,
    fontFamily: "Inter, sans-serif",
    textTransform: "none",
    borderRadius: 0,
    padding: "20px 18px",
    fontSize: "15px",
    transition: "color 0.3s ease",
    "&::after": {
      content: '""',
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      bottom: 10,
      width: active ? "50%" : "0%",
      height: "2px",
      backgroundColor: theme.palette.primary.main,
      transition: "width 0.3s ease",
    },
    "&:hover": {
      color: theme.palette.primary.main,
    },
    "&:hover::after": {
      width: "50%",
    },
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: "1px solid #eee", backgroundColor: "#fff" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 1.5, sm: 3 },
            py: 1,
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                style={{ width: isLaptopUp ? 150 : 120, cursor: "pointer" }}
              />
            </Link>
          </Box>

          {/* Center Menu Laptop+ */}
          {isLaptopUp && (
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Header navLinkStyle={navLinkStyle} pageLinks={pageLinks} />
            </Box>
          )}

          {/* Right icons */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            {isTabletUp && (
              <>
                {/* Search */}
                <IconButton
                  onClick={() => setSearchOpen((prev) => !prev)}
                  sx={{
                    border: "1px solid #eee",
                    bgcolor: "#fafafa",
                    "&:hover": { bgcolor: "#f0f0f0" },
                  }}
                >
                  <SearchIcon />
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
                      width: 180,
                      fontSize: "14px",
                      transition: "width 0.3s ease",
                    }}
                  />
                )}

                {/* Cart */}
                <IconButton component={Link} to="/cart-courses">
                  <Badge badgeContent={cartCount} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>

                {/* Auth */}
                {!isLoggedIn ? (
                  <Button
                    component={Link}
                    to="/auth"
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: "#fff",
                      textTransform: "none",
                      px: 3,
                      py: 1,
                      borderRadius: "30px",
                      "&:hover": { backgroundColor: theme.palette.primary.dark },
                    }}
                  >
                    Login / Register
                  </Button>
                ) : (
                  <>
                    <IconButton onClick={(e) => {}}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        {user.fullName?.charAt(0).toUpperCase()}
                      </Avatar>
                    </IconButton>
                  </>
                )}

                {/* MenuIcon tablet */}
                {!isLaptopUp && isTabletUp && (
                  <IconButton onClick={() => setDrawerOpen(true)} sx={{ ml: 1 }}>
                    <MenuIcon />
                  </IconButton>
                )}
              </>
            )}

            {/* Mobile: only MenuIcon */}
            {!isTabletUp && (
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 260 } }}
      >
        <List>
          {/* Tablet drawer: only header center menu */}
          {isTabletUp && !isLaptopUp ? (
            <Header navLinkStyle={navLinkStyle} pageLinks={pageLinks} />
          ) : (
            // Mobile drawer: full menu + cart + auth + search
            <>
              {/* Home */}
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/" onClick={() => setDrawerOpen(false)}>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/courses" onClick={() => setDrawerOpen(false)}>
                  <ListItemText primary="Courses" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/blog" onClick={() => setDrawerOpen(false)}>
                  <ListItemText primary="Blog" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setPageCollapseOpen(!pageCollapseOpen)}>
                  <ListItemText primary="Page" />
                  {pageCollapseOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={pageCollapseOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  {pageLinks.map((link) => (
                    <ListItemButton
                      key={link.path}
                      component={Link}
                      to={link.path}
                      onClick={() => setDrawerOpen(false)}
                    >
                      <ListItemText primary={link.label} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/premium-themes" onClick={() => setDrawerOpen(false)}>
                  <ListItemText primary="Premium Theme" />
                </ListItemButton>
              </ListItem>

              <Divider sx={{ my: 1 }} />

              {/* Cart */}
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/cart-courses" onClick={() => setDrawerOpen(false)}>
                  <Badge badgeContent={cartCount} color="primary" sx={{ mr: 2 }}>
                    <ShoppingCartIcon />
                  </Badge>
                </ListItemButton>
              </ListItem>

              <Divider sx={{ my: 1 }} />

              {/* Auth */}
              {!isLoggedIn ? (
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/auth" onClick={() => setDrawerOpen(false)}>
                    <ListItemText primary="Login / Register" />
                  </ListItemButton>
                </ListItem>
              ) : (
                <>
                  <ListItem disablePadding>
                    <ListItemButton component={Link} to="/profile" onClick={() => setDrawerOpen(false)}>
                      <ListItemText primary="Profile" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => { handleLogout(); setDrawerOpen(false); }}>
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                  </ListItem>
                </>
              )}
            </>
          )}
        </List>
      </Drawer>
    </Box>
  );
}

export default Navbar;
