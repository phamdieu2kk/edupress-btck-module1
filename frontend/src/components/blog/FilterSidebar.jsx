// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Stack,
//   Chip,
//   ButtonBase,
//   CircularProgress,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/blogs";

// const FilterSidebar = ({ selectedCategory, onCategoryChange, selectedTag, onTagChange }) => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await axios.get(BASE_URL);
//         const allBlogs = res.data.blogs || [];
//         setBlogs(allBlogs);
//       } catch (err) {
//         console.error("❌ Lỗi fetch blogs:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" p={2}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   // Lấy tất cả category và đếm số bài
//   const categoryMap = {};
//   blogs.forEach((post) => {
//     if (post.categories?.length) {
//       post.categories.forEach((cat) => {
//         categoryMap[cat] = (categoryMap[cat] || 0) + 1;
//       });
//     }
//   });
//   const categories = Object.keys(categoryMap);

//   // Lấy tất cả tag
//   const tagSet = new Set();
//   blogs.forEach((post) => post.tags?.forEach((t) => tagSet.add(t)));
//   const tags = Array.from(tagSet);

//   // Recent Posts (mới nhất 3)
//   const recentPosts = [...blogs]
//     .sort((a, b) => new Date(b.date) - new Date(a.date))
//     .slice(0, 3);

//   return (
//     <Paper elevation={0} sx={{ p: 2 }}>
//       <Stack spacing={4}>
//         {/* Category */}
//         {categories.length > 0 && (
//           <Box>
//             <Typography variant="h6" fontWeight="bold" gutterBottom>
//               Category
//             </Typography>
//             <Stack spacing={1}>
//               {categories.map((cat) => (
//                 <ButtonBase
//                   key={cat}
//                   onClick={() => onCategoryChange(cat)}
//                   sx={{
//                     justifyContent: "space-between",
//                     width: "100%",
//                     textAlign: "left",
//                     px: 1,
//                     py: 0.5,
//                     borderRadius: 1,
//                     color: selectedCategory === cat ? "primary.main" : "text.primary",
//                     fontWeight: selectedCategory === cat ? 600 : 400,
//                     "&:hover": {
//                       bgcolor: "action.hover",
//                     },
//                   }}
//                 >
//                   <Typography variant="body2">{cat}</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {categoryMap[cat]}
//                   </Typography>
//                 </ButtonBase>
//               ))}
//             </Stack>
//           </Box>
//         )}

//         {/* Recent Posts */}
//         <Box>
//           <Typography variant="h6" fontWeight="bold" gutterBottom>
//             Recent Posts
//           </Typography>
//           <Stack spacing={2}>
//             {recentPosts.map((post) => (
//               <Box key={post._id} display="flex" gap={1.5}>
//                 <Box
//                   component="img"
//                   src={post.image || "/placeholder.jpg"}
//                   alt={post.title}
//                   sx={{
//                     width: 60,
//                     height: 60,
//                     borderRadius: 1,
//                     objectFit: "cover",
//                     flexShrink: 0,
//                   }}
//                 />
//                 <Box>
//                   <Link to={`/blog/${post._id}`} style={{ textDecoration: "none" }}>
//                     <Typography
//                       variant="subtitle2"
//                       fontWeight={600}
//                       color="text.primary"
//                       sx={{
//                         lineHeight: 1.4,
//                         display: "-webkit-box",
//                         WebkitLineClamp: 2,
//                         WebkitBoxOrient: "vertical",
//                         overflow: "hidden",
//                         "&:hover": { color: "primary.main" },
//                       }}
//                     >
//                       {post.title}
//                     </Typography>
//                   </Link>
//                 </Box>
//               </Box>
//             ))}
//           </Stack>
//         </Box>

//         {/* Tags */}
//         {tags.length > 0 && (
//           <Box>
//             <Typography variant="h6" fontWeight="bold" gutterBottom>
//               Tags
//             </Typography>
//             <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//               {tags.map((tag) => (
//                 <Chip
//                   key={tag}
//                   label={tag}
//                   variant={selectedTag === tag ? "filled" : "outlined"}
//                   clickable
//                   color={selectedTag === tag ? "primary" : "default"}
//                   onClick={() => onTagChange(selectedTag === tag ? null : tag)}
//                   sx={{ borderRadius: "6px", fontSize: "0.75rem" }}
//                 />
//               ))}
//             </Box>
//           </Box>
//         )}
//       </Stack>
//     </Paper>
//   );
// };

// export default FilterSidebar;



// src/components/blog/FilterSidebar.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Stack, ButtonBase, Chip, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/blogs";

const FilterSidebar = ({ selectedCategory, onCategoryChange, selectedTag, onTagChange }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}?page=1&limit=1000`); // fetch all
      setBlogs(res.data.blogs || []);
    } catch (err) {
      console.error("Lỗi fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchBlogs();
}, []);


  if (loading) return <Box display="flex" justifyContent="center" p={2}><CircularProgress /></Box>;

  // Categories
  const categoryMap = {};
  blogs.forEach(post => {
    const cats = Array.isArray(post.category) ? post.category : [post.category].filter(Boolean);
    cats.forEach(cat => {
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });
  });
  const categories = Object.entries(categoryMap).map(([name, count]) => ({ name, count }));

  // Tags
  const tagSet = new Set();
  blogs.forEach(post => post.tags?.forEach(t => tagSet.add(t)));
  const tags = Array.from(tagSet);

  // Recent Posts
  const recentPosts = [...blogs].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,3);

  return (
    <Paper elevation={0} sx={{ p:2 }}>
      <Stack spacing={4}>
        {/* Categories */}
        {categories.length>0 && (
          <Box>
            <Typography variant="h6" fontWeight={700} gutterBottom>Categories</Typography>
            <Stack spacing={1}>
              {categories.map(cat=>(
                <ButtonBase key={cat.name} onClick={()=>onCategoryChange(cat.name)}
                  sx={{
                    display:"flex", justifyContent:"space-between", alignItems:"center", width:"100%",
                    px:2, py:1, borderRadius:2,
                    bgcolor:selectedCategory===cat.name?"primary.lighter":"background.paper",
                    color:selectedCategory===cat.name?"primary.main":"text.primary",
                    fontWeight:selectedCategory===cat.name?600:400,
                    "&:hover":{bgcolor:selectedCategory===cat.name?"primary.light":"action.hover"},
                    transition:"all 0.2s"
                  }}
                >
                  <Typography variant="body2">{cat.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{cat.count}</Typography>
                </ButtonBase>
              ))}
            </Stack>
          </Box>
        )}

        {/* Recent Posts */}
        {recentPosts.length>0 && (
          <Box>
            <Typography variant="h6" fontWeight={700} gutterBottom>Recent Posts</Typography>
            <Stack spacing={2}>
              {recentPosts.map(post=>(
                <Box key={post._id} display="flex" gap={1.5}>
                  <Box component="img" src={post.image||"/placeholder.jpg"} alt={post.title} 
                    sx={{width:60,height:60,borderRadius:1,objectFit:"cover",flexShrink:0}}/>
                  <Box>
                    <Link to={`/blog/${post._id}`} style={{textDecoration:"none"}}>
                      <Typography variant="subtitle2" fontWeight={600} color="text.primary"
                        sx={{lineHeight:1.4, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden","&:hover":{color:"primary.main"}}}>
                        {post.title}
                      </Typography>
                    </Link>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        )}

        {/* Tags */}
        {tags.length>0 && (
          <Box>
            <Typography variant="h6" fontWeight={700} gutterBottom>Tags</Typography>
            <Box sx={{display:"flex", flexWrap:"wrap", gap:1}}>
              {tags.map(tag=>(
                <Chip key={tag} label={tag} clickable variant={selectedTag===tag?"filled":"outlined"}
                  color={selectedTag===tag?"primary":"default"}
                  onClick={()=>onTagChange(selectedTag===tag?null:tag)}
                  sx={{borderRadius:"6px", fontSize:"0.75rem"}}
                />
              ))}
            </Box>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

export default FilterSidebar;
