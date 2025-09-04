// src/components/Sidebar.jsx
import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ClassIcon from "@mui/icons-material/Class";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BarChartIcon from "@mui/icons-material/BarChart";
import ReviewsIcon from "@mui/icons-material/Reviews";
import LogoutIcon from "@mui/icons-material/Logout";
import ArticleIcon from "@mui/icons-material/Article"; // <-- icon cho Blog

const drawerWidth = 200;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
  { text: "Courses", icon: <ClassIcon />, path: "/admin/courses" },
  { text: "Blog", icon: <ArticleIcon />, path: "/admin/blog" }, // <-- thêm menu Blog
  // { text: "Lessons", icon: <MenuBookIcon />, path: "/admin/lessons" },

  { text: "Reports", icon: <BarChartIcon />, path: "/admin/reports" },
  { text: "Reviews", icon: <ReviewsIcon />, path: "/admin/reviews" },
];

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Logo */}
      <Typography
        variant="h6"
        sx={{
          my: 2,
          fontWeight: "bold",
          color: "primary.main",
          textAlign: "center",
        }}
      >
        EduPress Admin
      </Typography>

      {/* Menu items */}
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={{
                color: "inherit",
                transition: "all 0.3s ease",
                "&.active": {
                  bgcolor: "rgba(255,165,0,0.15)", // background màu cam nhạt
                  color: "orange",
                  "& .MuiListItemIcon-root": { color: "orange" },
                },
                "&:hover": {
                  bgcolor: "rgba(255,165,0,0.1)",
                  color: "orange",
                  "& .MuiListItemIcon-root": { color: "orange" },
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Logout */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/logout"
            sx={{
              color: "inherit",
              transition: "all 0.3s ease",
              "&.active": {
                bgcolor: "rgba(255,165,0,0.15)", // background màu cam nhạt
                color: "orange",
                "& .MuiListItemIcon-root": { color: "orange" },
              },
              "&:hover": {
                bgcolor: "rgba(255,165,0,0.1)",
                color: "orange",
                "& .MuiListItemIcon-root": { color: "orange" },
              },
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* Mobile menu icon */}
      {isMobile && (
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ m: 1 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
