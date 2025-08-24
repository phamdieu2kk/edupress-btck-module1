// src/components/Navbar.jsx
import React, { useState, useContext } from "react";
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
  ListItemButton,
  Collapse,
  Stack,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  InputBase,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Search as SearchIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  // Breakpoints
  const isTabletUp = useMediaQuery(theme.breakpoints.up("sm"));
  const isLaptopUp = useMediaQuery(theme.breakpoints.up("md"));
  const isLargePcUp = useMediaQuery(theme.breakpoints.up("lg"));
  const isXxlUp = useMediaQuery(theme.breakpoints.up("xxl"));

  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorElPage, setAnchorElPage] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [openPageDrawer, setOpenPageDrawer] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const isLoggedIn = !!user;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleOpen = (setter) => (event) => setter(event.currentTarget);
  const handleClose = (setter) => () => setter(null);
  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const pageLinks = [
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "FAQ", path: "/faq" },
  ];

  const drawerLinks = [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/courses" },
    { label: "Blog", path: "/blog" },
    { label: "Premium Theme", path: "/premium-themes" },
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
            maxWidth: isXxlUp ? "1600px" : "1320px",
            width: "100%",
            mx: "auto",
            py: { xs: 1, sm: 1.5 },
            px: { xs: 1.5, sm: 3 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to="/">
              <img
                src={logo}
                alt="EduPress Logo"
                style={{
                  width: isLargePcUp
                    ? 170
                    : isLaptopUp
                    ? 150
                    : isTabletUp
                    ? 120
                    : 100,
                  cursor: "pointer",
                }}
              />
            </Link>
          </Box>

          {/* Full Menu Laptop+ */}
          {isLaptopUp && (
            <Box
              sx={{
                display: "flex",
                gap: { xs: 0.5, sm: 1.5, md: 2 },
                alignItems: "center",
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              <Button component={Link} to="/" sx={navLinkStyle(isActive("/"))}>
                Home
              </Button>
              <Button
                component={Link}
                to="/courses"
                sx={navLinkStyle(isActive("/courses"))}
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
                sx={navLinkStyle(pageLinks.some((p) => isActive(p.path)))}
              >
                Page
              </Button>
              <Menu
                anchorEl={anchorElPage}
                open={Boolean(anchorElPage)}
                onClose={handleClose(setAnchorElPage)}
              >
                {pageLinks.map((link) => (
                  <MenuItem
                    key={link.path}
                    component={Link}
                    to={link.path}
                    onClick={handleClose(setAnchorElPage)}
                  >
                    {link.label}
                  </MenuItem>
                ))}
              </Menu>
              <Button
                component={Link}
                to="/premium-themes"
                sx={navLinkStyle(isActive("/premium-themes"))}
              >
                Premium Theme
              </Button>
            </Box>
          )}

          {/* Desktop Auth + Search */}
          {isLaptopUp && (
            <Stack direction="row" spacing={1.5} alignItems="center">
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
                  <IconButton onClick={handleOpen(setAnchorElUser)}>
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
                    onClose={handleClose(setAnchorElUser)}
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
          )}

          {/* Mobile / Tablet */}
          {!isLaptopUp && (
            <Stack direction="row" alignItems="center" spacing={1} sx={{ pr: { xs: 1, sm: 5 } }}>
              {/* Avatar luôn hiển thị nếu logged in */}
              {isLoggedIn && (
                <IconButton onClick={handleOpen(setAnchorElUser)}>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      color: "#fff",
                      width: 32,
                      height: 32,
                      fontSize: "0.9rem",
                    }}
                  >
                    {user.fullName?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              )}

              {!isLoggedIn && (
                <Button
                  component={Link}
                  to="/auth"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: "30px",
                    px: 2,
                    py: 0.7,
                    fontSize: "0.85rem",
                    "&:hover": { backgroundColor: theme.palette.primary.dark },
                  }}
                >
                  Login / Register
                </Button>
              )}

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

              {/* Drawer icon */}
              <IconButton onClick={() => setOpenDrawer(true)}>
                <MenuIcon sx={{ fontSize: 28 }} />
              </IconButton>

              {/* Mobile Avatar Dropdown Menu */}
              {isLoggedIn && (
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleClose(setAnchorElUser)}
                >
                  <MenuItem disabled>{user.fullName}</MenuItem>
                  <Divider />
                  <MenuItem component={Link} to="/profile" onClick={handleClose(setAnchorElUser)}>
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleLogout();
                      handleClose(setAnchorElUser)();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              )}
            </Stack>
          )}
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
          <Box sx={{ width: 260, p: 2 }}>
            <List>
              {isLoggedIn && (
                <ListItem>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      color: "#fff",
                      width: 32,
                      height: 32,
                      mr: 1,
                      fontSize: "0.9rem",
                    }}
                  >
                    {user.fullName?.charAt(0).toUpperCase()}
                  </Avatar>
                  <ListItemText primary={user.fullName} />
                </ListItem>
              )}

              {/* Drawer main links */}
              {drawerLinks.map((link) => (
                <ListItem
                  key={link.path}
                  component={Link}
                  to={link.path}
                  onClick={() => setOpenDrawer(false)}
                  sx={{
                    cursor: "pointer",
                    color: isActive(link.path)
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                    borderBottom: isActive(link.path)
                      ? `3px solid ${theme.palette.primary.main}`
                      : "3px solid transparent",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      borderBottom: `3px solid ${theme.palette.primary.main}`,
                    },
                  }}
                >
                  <ListItemText primary={link.label} />
                </ListItem>
              ))}

              {/* Page dropdown in drawer */}
              <ListItemButton
                onClick={() => setOpenPageDrawer((prev) => !prev)}
                sx={{
                  pl: 2,
                  color: pageLinks.some((p) => isActive(p.path))
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                }}
              >
                <ListItemText primary="Page" />
                {openPageDrawer ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openPageDrawer} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {pageLinks.map((link) => (
                    <ListItem
                      key={link.path}
                      component={Link}
                      to={link.path}
                      onClick={() => setOpenDrawer(false)}
                      sx={{
                        pl: 4,
                        cursor: "pointer",
                        color: isActive(link.path)
                          ? theme.palette.primary.main
                          : theme.palette.text.secondary,
                        "&:hover": { color: theme.palette.primary.main },
                      }}
                    >
                      <ListItemText primary={link.label} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>

              {/* Auth */}
              {!isLoggedIn ? (
                <ListItem
                  component={Link}
                  to="/auth"
                  onClick={() => setOpenDrawer(false)}
                  sx={{ cursor: "pointer" }}
                >
                  <ListItemText primary="Login / Register" />
                </ListItem>
              ) : (
                <>
                  <ListItem
                    component={Link}
                    to="/profile"
                    onClick={() => setOpenDrawer(false)}
                    sx={{ cursor: "pointer" }}
                  >
                    <ListItemText primary="Profile" />
                  </ListItem>
                  <ListItem
                    onClick={() => {
                      handleLogout();
                      setOpenDrawer(false);
                    }}
                    sx={{ cursor: "pointer" }}
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
