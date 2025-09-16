// import React, { useEffect, useState } from "react";
// import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
// import axios from "axios";

// const CategoryFilter = ({ filter, onFilterChange }) => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/courses?limit=100");
//         const courses = Array.isArray(res.data.courses) ? res.data.courses : [];

//         const catCountObj = {};
//         courses.forEach(course => {
//           if (course.category) catCountObj[course.category] = (catCountObj[course.category] || 0) + 1;
//         });

//         const catArray = Object.keys(catCountObj).map(cat => ({
//           title: cat,
//           count: catCountObj[cat],
//         }));

//         setCategories(catArray);
//       } catch (err) {
//         console.error(err);
//         setCategories([]);
//       }
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <Box>
//       {/* <Typography variant="h6" gutterBottom>Course Categories</Typography> */}
//       <FormGroup>
//         {categories.map(cat => (
//           <Box
//             key={cat.title}
//             sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
//           >
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={filter.category.includes(cat.title)}
//                   onChange={() => {
//                     const newCategories = filter.category.includes(cat.title)
//                       ? filter.category.filter(c => c !== cat.title)
//                       : [...filter.category, cat.title];
//                     onFilterChange("category", newCategories);
//                   }}
//                 />
//               }
//               label={cat.title}
//               sx={{ flexGrow: 1 }}
//             />
//             <Typography variant="body2" sx={{ color: "#6c757d" }}>{cat.count}</Typography>
//           </Box>
//         ))}
//       </FormGroup>
//     </Box>
//   );
// };

// export default CategoryFilter;


// src/components/CategoryFilter.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import axiosClient from "../../api/axiosClient";
const CategoryFilter = ({ filter, onFilterChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosClient.get("/courses", { params: { limit: 100 } });
        const courses = Array.isArray(res.data.courses) ? res.data.courses : [];

        const catCountObj = {};
        courses.forEach((course) => {
          if (course.category) {
            catCountObj[course.category] = (catCountObj[course.category] || 0) + 1;
          }
        });

        const catArray = Object.keys(catCountObj).map((cat) => ({
          title: cat,
          count: catCountObj[cat],
        }));

        setCategories(catArray);

        console.log("Categories fetched:", catArray);
        console.log("Current BaseURL:", axiosClient.defaults.baseURL);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Box>
      <FormGroup>
        {categories.map((cat) => (
          <Box
            key={cat.title}
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={filter.category.includes(cat.title)}
                  onChange={() => {
                    const newCategories = filter.category.includes(cat.title)
                      ? filter.category.filter((c) => c !== cat.title)
                      : [...filter.category, cat.title];
                    onFilterChange("category", newCategories);
                  }}
                />
              }
              label={cat.title}
              sx={{ flexGrow: 1 }}
            />
            <Typography variant="body2" sx={{ color: "#6c757d" }}>
              {cat.count}
            </Typography>
          </Box>
        ))}
      </FormGroup>
    </Box>
  );
};

export default CategoryFilter;
