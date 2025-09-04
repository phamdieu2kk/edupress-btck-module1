// // src/components/Navbar.jsx
// import React, { useState, useContext, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Button,
//   Box,
//   IconButton,
//   Stack,
//   Avatar,
//   InputBase,
//   Badge,
//   useMediaQuery,
//   useTheme,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Collapse,
//   Menu,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   ShoppingCart as ShoppingCartIcon,
//   Menu as MenuIcon,
//   ExpandLess,
//   ExpandMore,
// } from "@mui/icons-material";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";
// import { AuthContext } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";
// import Header from "./Header";

// function Navbar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const theme = useTheme();

//   const isTabletUp = useMediaQuery(theme.breakpoints.up("sm"));
//   const isLaptopUp = useMediaQuery(theme.breakpoints.up("md"));

//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [pageCollapseOpen, setPageCollapseOpen] = useState(false);
//   const [selectedDrawerItem, setSelectedDrawerItem] = useState(location.pathname);

//   // Avatar dropdown menu
//   const [anchorEl, setAnchorEl] = useState(null);
//   const openMenu = Boolean(anchorEl);
//   const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);

//   useEffect(() => {
//     setSelectedDrawerItem(location.pathname);
//   }, [location.pathname]);

//   const { user, logout } = useContext(AuthContext);
//   const isLoggedIn = !!user;

//   const { cart } = useCart();
//   const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//     handleMenuClose();
//   };

//   const pageLinks = [
//     { label: "Contact", path: "/contact" },
//     { label: "FAQ", path: "/faqs" },
//     { label: "Error", path: "/error" },
//   ];

//   const navLinkStyle = (active) => ({
//     position: "relative",
//     color: active ? "#FF9800" : "#222",
//     fontWeight: 500,
//     fontFamily: "Inter, sans-serif",
//     textTransform: "none",
//     fontSize: "15px",
//     marginX: 1.5,
//     transition: "color 0.3s ease",
//     "&::after": {
//       content: '""',
//       position: "absolute",
//       left: 0,
//       bottom: -2,
//       width: active ? "100%" : 0,
//       height: "2px",
//       backgroundColor: "#FF9800",
//       transition: "width 0.3s ease",
//     },
//     "&:hover": {
//       color: "#FF9800",
//     },
//     "&:hover::after": {
//       width: "100%",
//     },
//   });

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar
//         position="sticky"
//         color="inherit"
//         elevation={0}
//         sx={{ borderBottom: "1px solid #eee", backgroundColor: "#fff" }}
//       >
//         <Toolbar
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             px: { xs: 1.5, sm: 3 },
//             py: 1,
//           }}
//         >
//           {/* Logo */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Link to="/">
//               <img
//                 src={logo}
//                 alt="Logo"
//                 style={{ width: isLaptopUp ? 150 : 120, cursor: "pointer" }}
//               />
//             </Link>
//           </Box>

//           {/* Center Menu Laptop+ */}
//           {isLaptopUp && (
//             <Box
//               sx={{
//                 display: "flex",
//                 gap: 2,
//                 flexGrow: 1,
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Header navLinkStyle={navLinkStyle} pageLinks={pageLinks} />
//             </Box>
//           )}

//           {/* Right icons */}
//           <Stack direction="row" spacing={1.5} alignItems="center">
//             {isTabletUp && (
//               <>
//                 {/* Search */}
//                 <IconButton
//                   onClick={() => setSearchOpen((prev) => !prev)}
//                   sx={{
//                     border: "1px solid #eee",
//                     bgcolor: "#fafafa",
//                     "&:hover": { bgcolor: "#f0f0f0" },
//                   }}
//                 >
//                   <SearchIcon />
//                 </IconButton>
//                 {searchOpen && (
//                   <InputBase
//                     placeholder="Search courses..."
//                     value={searchText}
//                     onChange={(e) => setSearchText(e.target.value)}
//                     sx={{
//                       border: "1px solid #ddd",
//                       borderRadius: "20px",
//                       px: 2,
//                       py: 0.7,
//                       ml: 1,
//                       width: 180,
//                       fontSize: "14px",
//                       transition: "width 0.3s ease",
//                     }}
//                   />
//                 )}

//                 {/* Cart icon luôn hiện trên tablet */}
//                 <IconButton component={Link} to="/cart-courses">
//                   <Badge badgeContent={cartCount} color="warning">
//                     <ShoppingCartIcon />
//                   </Badge>
//                 </IconButton>

//                 {/* Auth / Avatar */}
//                 {!isLoggedIn ? (
//                   <Button
//                     component={Link}
//                     to="/auth"
//                     sx={{
//                       backgroundColor: "#FF9800",
//                       color: "#fff",
//                       textTransform: "none",
//                       px: 3,
//                       py: 1,
//                       borderRadius: "30px",
//                       "&:hover": { backgroundColor: "#FB8C00" },
//                     }}
//                   >
//                     Login / Register
//                   </Button>
//                 ) : (
//                   <>
//                     <IconButton onClick={handleAvatarClick}>
//                       <Avatar sx={{ bgcolor: "#FF9800" }}>
//                         {user.fullName?.charAt(0).toUpperCase()}
//                       </Avatar>
//                     </IconButton>
//                     <Menu
//                       anchorEl={anchorEl}
//                       open={openMenu}
//                       onClose={handleMenuClose}
//                       anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                       transformOrigin={{ vertical: "top", horizontal: "right" }}
//                       PaperProps={{
//                         sx: {
//                           minWidth: 220,
//                           p: 0,
//                           borderRadius: 2,
//                           boxShadow: 3,
//                           overflow: "hidden",
//                           bgcolor: "background.paper",
//                         },
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           display: "flex",
//                           alignItems: "center",
//                           flexDirection: "column",
//                           py: 2,
//                           px: 2,
//                           bgcolor: "grey.100",
//                           textAlign: "center",
//                         }}
//                       >
//                         <Box sx={{ fontWeight: 600 }}>{user.fullName}</Box>
//                         {user.email && (
//                           <Box sx={{ fontSize: 12, color: "text.secondary" }}>
//                             {user.email}
//                           </Box>
//                         )}
//                       </Box>
//                       <Box sx={{ display: "flex", flexDirection: "column", p: 1 }}>
//                         <Button
//                           component={Link}
//                           to="/profile"
//                           onClick={handleMenuClose}
//                           fullWidth
//                           variant="outlined"
//                           sx={{ textTransform: "none", mb: 0.5, justifyContent: "center" }}
//                         >
//                           Profile
//                         </Button>
//                         <Button
//                           onClick={handleLogout}
//                           fullWidth
//                           variant="contained"
//                           color="warning"
//                           sx={{ textTransform: "none" }}
//                         >
//                           Logout
//                         </Button>
//                       </Box>
//                     </Menu>
//                   </>
//                 )}

//                 {/* Tablet + Mobile Drawer Icon */}
//                 <IconButton onClick={() => setDrawerOpen(true)} sx={{ ml: 1 }}>
//                   <MenuIcon />
//                 </IconButton>
//               </>
//             )}

//             {/* Mobile MenuIcon only */}
//             {!isTabletUp && (
//               <IconButton onClick={() => setDrawerOpen(true)}>
//                 <MenuIcon />
//               </IconButton>
//             )}
//           </Stack>
//         </Toolbar>
//       </AppBar>

//       {/* Drawer chung Tablet + Mobile */}
//       <Drawer
//         anchor="left"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         PaperProps={{
//           sx: {
//             width: 260,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "flex-start",
//             height: "100%",
//             overflowY: "auto",
//           },
//         }}
//       >
//         <List sx={{ flexDirection: "column", p: 2 }}>
//           {[
//             { label: "Home", path: "/" },
//             { label: "Courses", path: "/courses" },
//             { label: "Blog", path: "/blog" },
//           ].map((item) => (
//             <ListItem key={item.path} disablePadding>
//               <ListItemButton
//                 component={Link}
//                 to={item.path}
//                 onClick={() => setDrawerOpen(false)}
//                 sx={{
//                   color: selectedDrawerItem === item.path ? "#FF9800" : "inherit",
//                   "&:hover": { color: "#FF9800", backgroundColor: "rgba(255,152,0,0.1)" },
//                 }}
//               >
//                 <ListItemText primary={item.label} />
//               </ListItemButton>
//             </ListItem>
//           ))}

//           {/* Page collapse */}
//           <ListItem disablePadding>
//             <ListItemButton
//               onClick={() => setPageCollapseOpen(!pageCollapseOpen)}
//               sx={{
//                 color: pageLinks.some((link) => selectedDrawerItem === link.path)
//                   ? "#FF9800"
//                   : "inherit",
//                 "&:hover": { color: "#FF9800", backgroundColor: "rgba(255,152,0,0.1)" },
//               }}
//             >
//               <ListItemText primary="Page" />
//               {pageCollapseOpen ? <ExpandLess /> : <ExpandMore />}
//             </ListItemButton>
//           </ListItem>

//           <Collapse in={pageCollapseOpen} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding sx={{ pl: 4 }}>
//               {pageLinks.map((link) => (
//                 <ListItemButton
//                   key={link.path}
//                   component={Link}
//                   to={link.path}
//                   onClick={() => setDrawerOpen(false)}
//                   sx={{
//                     color: selectedDrawerItem === link.path ? "#FF9800" : "inherit",
//                     "&:hover": { color: "#FF9800", backgroundColor: "rgba(255,152,0,0.1)" },
//                   }}
//                 >
//                   <ListItemText primary={link.label} />
//                 </ListItemButton>
//               ))}
//             </List>
//           </Collapse>

//           <ListItem disablePadding>
//             <ListItemButton
//               component={Link}
//               to="/premium-themes"
//               onClick={() => setDrawerOpen(false)}
//               sx={{
//                 color: selectedDrawerItem === "/premium-themes" ? "#FF9800" : "inherit",
//                 "&:hover": { color: "#FF9800", backgroundColor: "rgba(255,152,0,0.1)" },
//               }}
//             >
//               <ListItemText primary="Premium Theme" />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding>
//             <ListItemButton
//               component={Link}
//               to="/cart-courses"
//               onClick={() => setDrawerOpen(false)}
//               sx={{
//                 color: selectedDrawerItem === "/cart-courses" ? "#FF9800" : "inherit",
//                 "&:hover": { color: "#FF9800", backgroundColor: "rgba(255,152,0,0.1)" },
//               }}
//             >
//               <Badge badgeContent={cartCount} color="warning" sx={{ mr: 2 }}>
//                 <ShoppingCartIcon />
//               </Badge>
//               <ListItemText primary="Cart" />
//             </ListItemButton>
//           </ListItem>

//           {!isLoggedIn ? (
//             <ListItem disablePadding>
//               <ListItemButton
//                 component={Link}
//                 to="/auth"
//                 onClick={() => setDrawerOpen(false)}
//                 sx={{
//                   color: selectedDrawerItem === "/auth" ? "#FF9800" : "inherit",
//                   "&:hover": { color: "#FF9800", backgroundColor: "rgba(255,152,0,0.1)" },
//                 }}
//               >
//                 <ListItemText primary="Login / Register" />
//               </ListItemButton>
//             </ListItem>
//           ) : (
//             <ListItem disablePadding>
//               <ListItemButton
//                 onClick={() => {
//                   handleLogout();
//                   setDrawerOpen(false);
//                 }}
//                 sx={{ "&:hover": { color: "#FF9800", backgroundColor: "rgba(255,152,0,0.1)" } }}
//               >
//                 <ListItemText primary="Logout" />
//               </ListItemButton>
//             </ListItem>
//           )}
//         </List>
//       </Drawer>
//     </Box>
//   );
// }

// export default Navbar;



import React, { useState, useContext, useEffect } from "react";
import { AppBar, Toolbar, Box, useMediaQuery, useTheme, Drawer } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Header from "./Header";
import NavRight from "./NavBars.jsx/NavRight";
import DrawerContent from "./NavBars.jsx/DrawerContent";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const isTabletUp = useMediaQuery(theme.breakpoints.up("sm"));
  const isLaptopUp = useMediaQuery(theme.breakpoints.up("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastDrawerState, setLastDrawerState] = useState(false); // lưu trạng thái trước khi resize

  const { cart } = useCart();
  const { user, logout } = useContext(AuthContext);

  // Tự động đóng Drawer khi resize ≥ laptop nhưng vẫn nhớ trạng thái trước đó
  useEffect(() => {
    if (isLaptopUp && drawerOpen) {
      setLastDrawerState(true); // nhớ trước khi đóng
      setDrawerOpen(false);
    } else if (!isLaptopUp && lastDrawerState) {
      // resize xuống < laptop, tự mở lại nếu trước đó mở
      setDrawerOpen(true);
    }
  }, [isLaptopUp]);

  const navLinkStyle = (active) => ({
    position: "relative",
    color: active ? "#FF9800" : "#222",
    fontWeight: 500,
    fontFamily: "Inter, sans-serif",
    textTransform: "none",
    fontSize: "15px",
    marginX: 1.5,
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: -2,
      width: active ? "100%" : 0,
      height: "2px",
      backgroundColor: "#FF9800",
      transition: "width 0.3s ease",
    },
    "&:hover": { color: "#FF9800", "&::after": { width: "100%" } },
  });

  const pageLinks = [
    { label: "Contact", path: "/contact" },
    { label: "FAQ", path: "/faqs" },
    { label: "Error", path: "/error" },
  ];

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
              <img src={logo} alt="Logo" style={{ width: isLaptopUp ? 150 : 120, cursor: "pointer" }} />
            </Link>
          </Box>

          {/* Center Menu Laptop+ */}
          {isLaptopUp && (
            <Box sx={{ display: "flex", gap: 2, flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
              <Header navLinkStyle={navLinkStyle} pageLinks={pageLinks} />
            </Box>
          )}

          {/* Right icons */}
          <NavRight
            isTabletUp={isTabletUp}
            isLaptopUp={isLaptopUp}
            cart={cart}
            user={user}
            logout={logout}
            navigate={navigate}
            setDrawerOpen={setDrawerOpen}
          />
        </Toolbar>
      </AppBar>

      {/* Drawer chỉ hiện khi < laptop */}
      {!isLaptopUp && (
        <Drawer anchor="left" open={drawerOpen} onClose={() => { setDrawerOpen(false); setLastDrawerState(false); }}>
          <DrawerContent
            cart={cart}
            user={user}
            logout={logout}
            setDrawerOpen={setDrawerOpen}
            pageLinks={pageLinks}
          />
        </Drawer>
      )}
    </Box>
  );
}

export default Navbar;
