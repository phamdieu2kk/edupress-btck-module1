// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
//   Divider,
//   RadioGroup,
//   Radio,
//   Rating,
// } from "@mui/material";
// import axios from "axios";
// import CategoryFilter from "./CategoryFilter";

// const FilterSidebar = ({ filter, onFilterChange }) => {
//   const [categories, setCategories] = useState([]);
//   const [priceCount, setPriceCount] = useState({ Free: 0, Paid: 0 });
//   const [instructors, setInstructors] = useState([]);
//   const [levels, setLevels] = useState([]); // ✅ thêm state cho level

//   useEffect(() => {
//     const fetchCounts = async () => {
//       try {
//         // lấy course để tính price + categories + levels
//         const res = await axios.get("http://localhost:5000/api/courses?limit=200");
//         const courses = Array.isArray(res.data.courses) ? res.data.courses : [];

//         // Category count
//         const catCountObj = {};
//         const priceCountObj = { Free: 0, Paid: 0 };
//         const levelCountObj = {};

//         courses.forEach((course) => {
//           // category
//           if (course.category) {
//             catCountObj[course.category] = (catCountObj[course.category] || 0) + 1;
//           }
//           // price
//           if (course.price === 0) priceCountObj.Free++;
//           else priceCountObj.Paid++;
//           // level
//           if (course.level) {
//             levelCountObj[course.level] = (levelCountObj[course.level] || 0) + 1;
//           }
//         });

//         setCategories(
//           Object.keys(catCountObj).map((cat) => ({
//             title: cat,
//             count: catCountObj[cat],
//           }))
//         );
//         setPriceCount(priceCountObj);

//         // Level: thêm All levels (tổng)
//         const total = courses.length;
//         setLevels([
//           { name: "All levels", count: total },
//           ...Object.keys(levelCountObj).map((lvl) => ({
//             name: lvl,
//             count: levelCountObj[lvl],
//           })),
//         ]);

//         // lấy instructor từ API backend mới
//         const instRes = await axios.get("http://localhost:5000/api/instructors");
//         setInstructors(Array.isArray(instRes.data) ? instRes.data : []);
//       } catch (err) {
//         console.error(err);
//         setCategories([]);
//         setPriceCount({ Free: 0, Paid: 0 });
//         setInstructors([]);
//         setLevels([]);
//       }
//     };

//     fetchCounts();
//   }, []);

//   return (
//     <Box
//       sx={{
//         border: "1px solid #ddd",
//         p: 3,
//         borderRadius: 2,
//         bgcolor: "#fafafa",
//       }}
//     >
//       {/* Price Filter */}
//       <Typography variant="h6" gutterBottom>
//         Price
//       </Typography>
//       <RadioGroup
//         value={filter.price}
//         onChange={(e) => onFilterChange("price", e.target.value)}
//       >
//         {["All", "Free", "Paid"].map((item) => (
//           <Box
//             key={item}
//             sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
//           >
//             <FormControlLabel
//               value={item}
//               control={<Radio />}
//               label={item}
//               sx={{ flexGrow: 1 }}
//             />
//             {item !== "All" && (
//               <Typography variant="body2" sx={{ color: "#6c757d" }}>
//                 {priceCount[item]}
//               </Typography>
//             )}
//           </Box>
//         ))}
//       </RadioGroup>

//       {/* Category Filter */}
//       <Divider sx={{ my: 2 }} />
//       <Typography variant="h6" gutterBottom>
//         Course Categories
//       </Typography>
//       <CategoryFilter filter={filter} onFilterChange={onFilterChange} />

//       {/* Instructor Filter */}
//       <Divider sx={{ my: 2 }} />
//       <Typography variant="h6">Instructors</Typography>
//       <Box
//         sx={{
//           maxHeight: 220, // ~5 items
//           overflowY: "auto",
//           pr: 1,
//           scrollbarWidth: "none", // Firefox
//           msOverflowStyle: "none", // IE/Edge
//           "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari
//         }}
//       >
//         <FormGroup>
//           {instructors.map((inst) => (
//             <Box
//               key={inst.name}
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={filter.instructor.includes(inst.name)}
//                     onChange={() => {
//                       const newInst = filter.instructor.includes(inst.name)
//                         ? filter.instructor.filter((i) => i !== inst.name)
//                         : [...filter.instructor, inst.name];
//                       onFilterChange("instructor", newInst);
//                     }}
//                   />
//                 }
//                 label={inst.name}
//                 sx={{ flexGrow: 1 }}
//               />
//               <Typography variant="body2" sx={{ color: "#6c757d" }}>
//                 {inst.count}
//               </Typography>
//             </Box>
//           ))}
//         </FormGroup>
//       </Box>

//       {/* Review Filter */}
//       <Divider sx={{ my: 2 }} />
//       <Typography variant="h6">Review</Typography>
//       <RadioGroup
//         value={filter.review}
//         onChange={(e) => onFilterChange("review", parseInt(e.target.value))}
//       >
//         {[5, 4, 3, 2, 1, 0].map((stars) => (
//           <FormControlLabel
//             key={stars}
//             value={stars}
//             control={<Radio />}
//             label={stars === 0 ? "All" : <Rating value={stars} readOnly />}
//           />
//         ))}
//       </RadioGroup>

//       {/* Level Filter */}
//       <Divider sx={{ my: 2 }} />
//       <Typography variant="h6">Level</Typography>
//       <RadioGroup
//         value={filter.level}
//         onChange={(e) => onFilterChange("level", e.target.value)}
//       >
//         {levels.map((lvl) => (
//           <Box
//             key={lvl.name}
//             sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
//           >
//             <FormControlLabel
//               value={lvl.name}
//               control={<Radio />}
//               label={lvl.name}
//               sx={{ flexGrow: 1 }}
//             />
//             <Typography variant="body2" sx={{ color: "#6c757d" }}>
//               {lvl.count}
//             </Typography>
//           </Box>
//         ))}
//       </RadioGroup>
//     </Box>
//   );
// };

// export default FilterSidebar;

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  RadioGroup,
  Radio,
  Rating,
} from "@mui/material";
import CategoryFilter from "./CategoryFilter";
import axiosClient from "../../api/axiosClient"; // ✅ dùng axiosClient

const FilterSidebar = ({ filter, onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [priceCount, setPriceCount] = useState({ Free: 0, Paid: 0 });
  const [instructors, setInstructors] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // ✅ lấy course qua axiosClient
        const res = await axiosClient.get("/courses?limit=200");
        const courses = Array.isArray(res.data.courses) ? res.data.courses : [];

        // Category count
        const catCountObj = {};
        const priceCountObj = { Free: 0, Paid: 0 };
        const levelCountObj = {};

        courses.forEach((course) => {
          // category
          if (course.category) {
            catCountObj[course.category] =
              (catCountObj[course.category] || 0) + 1;
          }
          // price
          if (course.price === 0) priceCountObj.Free++;
          else priceCountObj.Paid++;
          // level
          if (course.level) {
            levelCountObj[course.level] =
              (levelCountObj[course.level] || 0) + 1;
          }
        });

        setCategories(
          Object.keys(catCountObj).map((cat) => ({
            title: cat,
            count: catCountObj[cat],
          }))
        );
        setPriceCount(priceCountObj);

        // Level: thêm All levels
        const total = courses.length;
        setLevels([
          { name: "All levels", count: total },
          ...Object.keys(levelCountObj).map((lvl) => ({
            name: lvl,
            count: levelCountObj[lvl],
          })),
        ]);

        // ✅ instructors API
        const instRes = await axiosClient.get("/instructors");
        setInstructors(Array.isArray(instRes.data) ? instRes.data : []);
      } catch (err) {
        console.error("❌ FilterSidebar error:", err);
        setCategories([]);
        setPriceCount({ Free: 0, Paid: 0 });
        setInstructors([]);
        setLevels([]);
      }
    };

    fetchCounts();
  }, []);

  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        p: 3,
        borderRadius: 2,
        bgcolor: "#fafafa",
      }}
    >
      {/* Price Filter */}
      <Typography variant="h6" gutterBottom>
        Price
      </Typography>
      <RadioGroup
        value={filter.price}
        onChange={(e) => onFilterChange("price", e.target.value)}
      >
        {["All", "Free", "Paid"].map((item) => (
          <Box
            key={item}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              value={item}
              control={<Radio />}
              label={item}
              sx={{ flexGrow: 1 }}
            />
            {item !== "All" && (
              <Typography variant="body2" sx={{ color: "#6c757d" }}>
                {priceCount[item]}
              </Typography>
            )}
          </Box>
        ))}
      </RadioGroup>

      {/* Category Filter */}
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" gutterBottom>
        Course Categories
      </Typography>
      <CategoryFilter filter={filter} onFilterChange={onFilterChange} />

      {/* Instructor Filter */}
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Instructors</Typography>
      <Box
        sx={{
          maxHeight: 220,
          overflowY: "auto",
          pr: 1,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <FormGroup>
          {instructors.map((inst) => (
            <Box
              key={inst.name}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.instructor.includes(inst.name)}
                    onChange={() => {
                      const newInst = filter.instructor.includes(inst.name)
                        ? filter.instructor.filter((i) => i !== inst.name)
                        : [...filter.instructor, inst.name];
                      onFilterChange("instructor", newInst);
                    }}
                  />
                }
                label={inst.name}
                sx={{ flexGrow: 1 }}
              />
              <Typography variant="body2" sx={{ color: "#6c757d" }}>
                {inst.count}
              </Typography>
            </Box>
          ))}
        </FormGroup>
      </Box>

      {/* Review Filter */}
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Review</Typography>
      <RadioGroup
        value={filter.review}
        onChange={(e) => onFilterChange("review", parseInt(e.target.value))}
      >
        {[5, 4, 3, 2, 1, 0].map((stars) => (
          <FormControlLabel
            key={stars}
            value={stars}
            control={<Radio />}
            label={stars === 0 ? "All" : <Rating value={stars} readOnly />}
          />
        ))}
      </RadioGroup>

      {/* Level Filter */}
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Level</Typography>
      <RadioGroup
        value={filter.level}
        onChange={(e) => onFilterChange("level", e.target.value)}
      >
        {levels.map((lvl) => (
          <Box
            key={lvl.name}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              value={lvl.name}
              control={<Radio />}
              label={lvl.name}
              sx={{ flexGrow: 1 }}
            />
            <Typography variant="body2" sx={{ color: "#6c757d" }}>
              {lvl.count}
            </Typography>
          </Box>
        ))}
      </RadioGroup>
    </Box>
  );
};

export default FilterSidebar;
