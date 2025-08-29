import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const LeaveComment = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      comment: "",
      saveInfo: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter your name"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter your email"),
      comment: Yup.string().required("Please enter a comment"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Form submitted:", values);
      alert("Thanks for your comment!");
      resetForm();
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      p={3}
      bgcolor="#ffffff"
      borderRadius={2}
      boxShadow="0px 2px 10px rgba(0,0,0,0.05)"
    >
      <Typography variant="h6" gutterBottom>
        Leave A Comment
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Your email address will not be published. Required fields are marked *
      </Typography>

      <Stack spacing={2} mt={2}>
  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
    <TextField
      label="Name*"
      name="name"
      fullWidth
      variant="outlined"
      value={formik.values.name}
      onChange={formik.handleChange}
      error={formik.touched.name && Boolean(formik.errors.name)}
      helperText={formik.touched.name && formik.errors.name}
    />

    <TextField
      label="Email*"
      name="email"
      fullWidth
      variant="outlined"
      value={formik.values.email}
      onChange={formik.handleChange}
      error={formik.touched.email && Boolean(formik.errors.email)}
      helperText={formik.touched.email && formik.errors.email}
    />
  </Stack>

  <TextField
    label="Comment*"
    name="comment"
    fullWidth
    variant="outlined"
    multiline
    rows={4}
    value={formik.values.comment}
    onChange={formik.handleChange}
    error={formik.touched.comment && Boolean(formik.errors.comment)}
    helperText={formik.touched.comment && formik.errors.comment}
  />
</Stack>


      <FormControlLabel
        control={
          <Checkbox
            name="saveInfo"
            checked={formik.values.saveInfo}
            onChange={formik.handleChange}
          />
        }
        label="Save my name, email in this browser for the next time I comment"
        sx={{ mt: 2 }}
      />

      <Button
        type="submit"
        variant="contained"
        color="warning"
        sx={{ mt: 2 }}
      >
        Post Comment
      </Button>
    </Box>
  );
};

export default LeaveComment;
