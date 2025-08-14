

import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  RadioGroup,
  Radio,
  Rating, // Import Rating component
} from "@mui/material";

const FilterSidebar = ({ filter, onFilterChange }) => { // Nhận props filter và onFilterChange
  return (
    <Box sx={{ border: "1px solid #ddd", p: 2, borderRadius: 2 }}>
      {/* Course Category */}
      <Typography variant="h6">Course Category</Typography>
      <FormGroup>
        {[
          "Commercial",
          "Office",
          "Shop",
          "Private", // Đổi "Educate" thành "Private" để khớp với hình ảnh
          "Academy",
          "Single family home",
          "Studio",
          "University",
        ].map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={filter.category.includes(item)}
                onChange={() => {
                  const newCategories = filter.category.includes(item)
                    ? filter.category.filter((cat) => cat !== item)
                    : [...filter.category, item];
                  onFilterChange("category", newCategories);
                }}
              />
            }
            label={item}
          />
        ))}
      </FormGroup>

      <Divider sx={{ my: 2 }} />

      {/* Instructors */}
      <Typography variant="h6">Instructors</Typography>
      <FormGroup>
        {["Thanh Nguyen", "Ngoc Mai" , "Lan Do" , "Minh Chau", "Trang Pham"].map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={filter.instructor.includes(item)}
                onChange={() => {
                  const newInstructors = filter.instructor.includes(item)
                    ? filter.instructor.filter((inst) => inst !== item)
                    : [...filter.instructor, item];
                  onFilterChange("instructor", newInstructors);
                }}
              />
            }
            label={item}
          />
        ))}
      </FormGroup>

      <Divider sx={{ my: 2 }} />

      {/* Price */}
      <Typography variant="h6">Price</Typography>
      <RadioGroup
        value={filter.price}
        onChange={(e) => onFilterChange("price", e.target.value)}
      >
        {["All", "Free", "Paid"].map((item) => (
          <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
        ))}
      </RadioGroup>

      <Divider sx={{ my: 2 }} />

   
      {/* Review */}
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
      label={
        stars === 0 ? (
          <Typography variant="body2">All</Typography>
        ) : (
          <Rating name={`rating-filter-${stars}`} value={stars} readOnly />
        )
      }
    />
  ))}
</RadioGroup>


      {/* Level */}
      <Typography variant="h6">Level</Typography>
      <RadioGroup
        value={filter.level}
        onChange={(e) => onFilterChange("level", e.target.value)}
      >
        {["All levels", "Beginner", "Intermediate", "Expert"].map((item) => (
          <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
        ))}
      </RadioGroup>
    </Box>
  );
};

export default FilterSidebar;