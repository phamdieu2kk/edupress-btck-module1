// src/components/Header.jsx
import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

function Header({ navLinkStyle, pageLinks }) {
  const location = useLocation();
  const [anchorElPage, setAnchorElPage] = useState(null);

  const handleOpen = (setter) => (event) => setter(event.currentTarget);
  const handleClose = (setter) => () => setter(null);
  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <>
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
    </>
  );
}

export default Header;
