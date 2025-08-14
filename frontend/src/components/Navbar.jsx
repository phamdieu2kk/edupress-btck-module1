// src/components/Navbar.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Stack,
  Menu,
  MenuItem,
  Typography,
  TextField,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Search as SearchIcon,
  Brightness4 as Brightness4Icon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const location = useLocation();
  const theme = useTheme();
  const isTabletUp = useMediaQuery(theme.breakpoints.up("sm")); // ≥600px
  const isLaptopUp = useMediaQuery(theme.breakpoints.up("md")); // ≥900px

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [anchorElPage, setAnchorElPage] = React.useState(null);
  const [searchText, setSearchText] = React.useState("");

  const handleOpen = (setter) => (event) => setter(event.currentTarget);
  const handleClose = (setter) => () => setter(null);
  const isActive = (path) => location.pathname === path;

  const navLinkStyle = (active) => ({
    color: active ? "#ff6e00" : "#555",
    backgroundColor: active ? "#f0f0f0" : "transparent",
    fontWeight: 600,
    fontFamily: "sans-serif",
    textTransform: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    fontSize: "15px",
    "&:hover": { backgroundColor: "#f0f0f0" },
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  const drawerLinks = [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/courses" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
    { label: "Faq", path: "/faqs" },
  ];

  const pageLinks = [
    { label: "Contact", path: "/contact" },
    { label: "Faq", path: "/faqs" },
    { label: "Error", path: "/error" },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid #e0e0e0", backgroundColor: "#fff" }}
      >
        <Toolbar
          sx={{
            maxWidth: "1200px",
            width: "100%",
            mx: "auto",
            py: { xs: 1, sm: 1.2, md: 1.5 },
            px: { xs: 1.5, sm: 2, md: 2 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", mr: { xs: 2, md: 4 } }}>
            <Link to="/">
              <img
                src={logo}
                alt="EduPress Logo"
                style={{
                  width: isLaptopUp ? 150 : isTabletUp ? 120 : 100,
                }}
              />
            </Link>
          </Box>

          {/* Desktop Menu */}
          {isTabletUp && (
            <Box
              sx={{
                display: "flex",
                gap: { xs: 1, sm: 2, md: 3 },
                alignItems: "center",
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              <Button component={Link} to="/" sx={navLinkStyle(isActive("/"))}>
                Home
              </Button>
              <Button component={Link} to="/courses" sx={navLinkStyle(location.pathname.startsWith("/courses"))}>
                Courses
              </Button>
              <Button component={Link} to="/blog" sx={navLinkStyle(isActive("/blog"))}>
                Blog
              </Button>
              <Button onClick={handleOpen(setAnchorElPage)} endIcon={<ArrowDropDownIcon />} sx={navLinkStyle(location.pathname.startsWith("/page"))}>
                Page
              </Button>
              <Menu anchorEl={anchorElPage} open={Boolean(anchorElPage)} onClose={handleClose(setAnchorElPage)}>
                {pageLinks.map((link) => (
                  <MenuItem key={link.path} component={Link} to={link.path} onClick={handleClose(setAnchorElPage)}>
                    {link.label}
                  </MenuItem>
                ))}
              </Menu>
              <Button component={Link} to="/premium-themes" sx={navLinkStyle(isActive("/premium-themes"))}>
                Premium Theme
              </Button>
            </Box>
          )}

          {/* Desktop Auth + Search + DarkMode */}
          {isTabletUp && (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <IconButton sx={{ border: "1px solid #e0e0e0", borderRadius: "50%", p: "8px", color: "#800080" }}>
                <Brightness4Icon />
              </IconButton>

              <TextField
                size="small"
                variant="outlined"
                placeholder="Search courses..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                sx={{ width: 200 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />

              {!isLoggedIn ? (
                <Button
                  component={Link}
                  to="/auth"
                  sx={{
                    color: "#555",
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: "20px",
                    border: "1px solid #e0e0e0",
                    px: 2,
                    py: 1,
                    fontFamily: "sans-serif",
                    "&:hover": { backgroundColor: "#f0f0f0", border: "1px solid #e0e0e0" },
                  }}
                >
                  Login / Register
                </Button>
              ) : (
                <>
                  <Typography sx={{ fontWeight: 600, mr: 2 }}>{user.name}</Typography>
                  <Button
                    onClick={handleLogout}
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      fontWeight: 500,
                      fontFamily: "sans-serif",
                      color: "#555",
                      borderColor: "#e0e0e0",
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}
            </Stack>
          )}

          {/* Mobile Menu Icon */}
          {!isTabletUp && (
            <IconButton edge="end" onClick={() => setOpenDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
          <Box sx={{ width: 260, p: 2 }}>
            {/* Dark/Light Toggle */}
            <Box sx={{ mb: 2 }}>
              <Button fullWidth variant="outlined" startIcon={<Brightness4Icon />}>
                Dark/Light
              </Button>
            </Box>

            {/* Search */}
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Search courses..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <List>
              {drawerLinks.map((link) => (
                <ListItem key={link.path} button component={Link} to={link.path} onClick={() => setOpenDrawer(false)}>
                  <ListItemText primary={link.label} />
                </ListItem>
              ))}

              {/* Page Dropdown Mobile */}
              {pageLinks.map((link) => (
                <ListItem key={link.path} button component={Link} to={link.path} onClick={() => setOpenDrawer(false)}>
                  <ListItemText primary={link.label} sx={{ pl: 2 }} />
                </ListItem>
              ))}

              {!isLoggedIn ? (
                <ListItem button component={Link} to="/auth" onClick={() => setOpenDrawer(false)}>
                  <ListItemText primary="Login / Register" />
                </ListItem>
              ) : (
                <>
                  <ListItem button component={Link} to="/profile" onClick={() => setOpenDrawer(false)}>
                    <ListItemText primary="Profile" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => {
                      handleLogout();
                      setOpenDrawer(false);
                    }}
                  >
                    <ListItemText primary="Logout" />
                  </ListItem>
                </>
              )}
            </List>
          </Box>
        </Drawer>
      </AppBar>
    </Box>
  );
}
