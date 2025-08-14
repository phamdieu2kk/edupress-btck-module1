<<<<<<< HEAD
// src/components/Navbar.jsx
=======
>>>>>>> 6016b22a4f722684f02e99cf3f5371caf5aed30b
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
<<<<<<< HEAD
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
=======
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import logo from "../assets/logo.png";

export default function Navbar({ isLoggedIn, onLogout }) {
  const location = useLocation();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [anchorElPage, setAnchorElPage] = React.useState(null);

  const handleOpen = (setter) => (event) => setter(event.currentTarget);
  const handleClose = (setter) => () => setter(null);

  const isActive = (path) => location.pathname === path;

  const navLinkStyle = (active) => ({
    color: active ? "#1976d2" : "#555",
    fontWeight: 600,
    fontFamily: "Roboto, sans-serif",
    textTransform: "none",
    borderBottom: active ? "2px solid #1976d2" : "2px solid transparent",
    borderRadius: 0,
    transition: "border-bottom 0.2s ease-in-out",
    fontSize: "15px",
  });

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar
        sx={{
          maxWidth: "1200px",
          width: "100%",
          mx: "auto",
          py: 1.5,
          px: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", mr: 6 }}>
          <Link to="/">
            <img src={logo} alt="EduPress Logo" style={{ width: 150 }} />
          </Link>
        </Box>

        {/* Desktop Menu */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2,
            alignItems: "center",
          }}
        >
          <Button component={Link} to="/" sx={navLinkStyle(isActive("/"))}>
            Home
          </Button>
          <Button
            component={Link}
            to="/courses"
            sx={navLinkStyle(location.pathname.startsWith("/courses"))}
          >
            Courses
          </Button>
          <Button
            component={Link}
            to="/blog"
            sx={navLinkStyle(isActive("/blog"))}
          >
            Blog
          </Button>

          <Button
            onClick={handleOpen(setAnchorElPage)}
            endIcon={<ArrowDropDownIcon />}
            sx={navLinkStyle(location.pathname.startsWith("/page"))}
          >
            Page
          </Button>
          <Menu
            anchorEl={anchorElPage}
            open={Boolean(anchorElPage)}
            onClose={handleClose(setAnchorElPage)}
          >
            <MenuItem
              component={Link}
              to="/contact"
              onClick={handleClose(setAnchorElPage)}
            >
              Contact Us
            </MenuItem>
            <MenuItem
              component={Link}
              to="/faqs"
              onClick={handleClose(setAnchorElPage)}
            >
              Faqs
            </MenuItem>
            <MenuItem
              component={Link}
              to="/error"
              onClick={handleClose(setAnchorElPage)}
            >
              Error
            </MenuItem>
          </Menu>

          <Button
            component={Link}
            to="/learnpress-addons"
            sx={navLinkStyle(isActive("/learnpress-addons"))}
          >
            LearnPress Add-On
          </Button>
          <Button
            component={Link}
            to="/premium-themes"
            sx={navLinkStyle(isActive("/premium-themes"))}
          >
            Premium Theme
          </Button>
        </Box>

        {/* Auth Buttons */}
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            ml: 4,
          }}
        >
          {!isLoggedIn ? (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{
                  backgroundColor: "#F28B82",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  minWidth: 100,
                  fontFamily: "Roboto, sans-serif",
                  "&:hover": { backgroundColor: "#e57373" },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                sx={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  minWidth: 100,
                  fontFamily: "Roboto, sans-serif",
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/profile"
                variant="text"
                color="primary"
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  fontFamily: "Roboto, sans-serif",
                }}
              >
                Profile
              </Button>
              <Button
                onClick={onLogout}
                variant="outlined"
                color="secondary"
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  fontFamily: "Roboto, sans-serif",
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Stack>

        {/* Mobile Icon */}
        <IconButton
          edge="end"
          onClick={() => setOpenDrawer(true)}
          sx={{ display: { xs: "inline-flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List sx={{ width: 240 }}>
          {[
            { title: "Home", path: "/" },
            { title: "Courses", path: "/courses" },
            { title: "Blog", path: "/blog" },
            { title: "Contact Us", path: "/contact" },
            { title: "Faqs", path: "/faqs" },
            { title: "Error", path: "/error" },
            { title: "LearnPress Add-On", path: "/learnpress-addons" },
            { title: "Premium Theme", path: "/premium-themes" },
          ].map((item) => (
            <ListItem
              key={item.title}
              button
              component={Link}
              to={item.path}
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemText primary={item.title} />
            </ListItem>
          ))}

          {!isLoggedIn ? (
            <>
              <ListItem
                button
                component={Link}
                to="/login"
                onClick={() => setOpenDrawer(false)}
              >
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/register"
                onClick={() => setOpenDrawer(false)}
              >
                <ListItemText primary="Register" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem
                button
                component={Link}
                to="/profile"
                onClick={() => setOpenDrawer(false)}
              >
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  onLogout();
                  setOpenDrawer(false);
                }}
              >
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
>>>>>>> 6016b22a4f722684f02e99cf3f5371caf5aed30b
  );
}
