import React from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  MenuItem,
 Autocomplete,
  Snackbar,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useNavigate } from "react-router-dom";

import { useCreateAppraisalQuestionMutation } from "../../api/constructionApi";



export default function AddAppraisalQuestion() {


  const [openSnackbar, setOpenSnackbar] = React.useState(false);

const handleCloseSnackbar = () => {
  setOpenSnackbar(false);
};

    const [createAppraisalQuestion, { isLoading }] =
  useCreateAppraisalQuestionMutation();


  const categoryOptions = [
  {
    id: "1",
    label: "WORK EFFICIENCY",
  },
  {
    id: "2",
    label: "WORK FACTORS",
  },
];

  const formik = useFormik({
    initialValues: {
      categoryName: "",
      questionTitle: "",
      description: "",
      displayOrder: "",
    },

    validationSchema: Yup.object({
      categoryName: Yup.string().required("Required"),
      questionTitle: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),

    onSubmit: async (values, { resetForm }) => {
  try {
    const payload = {
      userID: "171464700312440400",
      displayOrder: values.displayOrder,
      questionTitle: values.questionTitle,
      description: values.description,
      categoryID: values.categoryName,
    };

    const response = await createAppraisalQuestion(JSON.stringify(payload)).unwrap();

    console.log("Success:", response);

  setOpenSnackbar(true);
  resetForm();

  } catch (error) {
    console.log("Full Error:", error);
    console.log("Error Data:", error?.data);
    console.log("Error Status:", error?.status);
  }
  },
  });

  const handleReset = () => {
    formik.resetForm();
  };

  const navigate = useNavigate();

  const AppraisalQuestion = () => {
    navigate("/AppraisalQuestion/index");
  };

 

  return (
    <Box sx={{ p: 3, background: "#f4f4f4", minHeight: "100vh" }}>
      {/* Header */}
      <Box
  onClick={AppraisalQuestion}
  sx={{
    display: "flex",
    alignItems: "center",
    mb: 3,
    color: "#3392df",
    fontSize: "28px",
    fontWeight: 500,
    cursor: "pointer",
  }}
>
        <MenuOpenIcon sx={{ mr: 1 , fontSize:30,}}
        onClick={AppraisalQuestion} 
        />
        ADD APPRAISAL QUESTION
        
      </Box>

      {/* Form Card */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          backgroundColor: "#f7f7f7",
        }}
      >
        <form onSubmit={formik.handleSubmit}>

          <Snackbar
  open={openSnackbar}
  autoHideDuration={3000}
  onClose={handleCloseSnackbar}
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
>
  <Alert
    onClose={handleCloseSnackbar}
    severity="success"
    variant="filled"
    sx={{ width: "100%" }}
  >
    Created Successfully
  </Alert>
</Snackbar>
         

              <Autocomplete
  fullWidth
  options={categoryOptions}
  getOptionLabel={(option) => option.label}
  value={
    categoryOptions.find(
      (option) => option.id === formik.values.categoryName
    ) || null
  }
  onChange={(event, newValue) => {
    formik.setFieldValue(
      "categoryName",
      newValue ? newValue.id : ""
    );
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Category Name*"
      margin="normal"
      error={
        formik.touched.categoryName &&
        Boolean(formik.errors.categoryName)
      }
      helperText={
        formik.touched.categoryName &&
        formik.errors.categoryName
      }
    />
  )}
/>

          {/* Question Title */}
          <TextField
            fullWidth
            name="questionTitle"
            label="Question Title"
            value={formik.values.questionTitle}
            onChange={formik.handleChange}
            margin="normal"
          />

          {/* Description */}
          <TextField
            fullWidth
            multiline
            rows={6}
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            margin="normal"
          />

          {/* Display Order */}
          <TextField
            fullWidth
            type="number"
            name="displayOrder"
            label="Display Order"
            value={formik.values.displayOrder}
            onChange={formik.handleChange}
            margin="normal"
          />

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              mt: 5,
            }}
          >
            <Button
              variant="contained"
              onClick={handleReset}
              sx={{
                px: 5,
                py: 1.5,
                bgcolor: "#9c27b0",
                fontSize: "20px",
                "&:hover": {
                  bgcolor: "#8e24aa",
                },
              }}
            >
              RESET
            </Button>

            <Button
  type="submit"
  variant="contained"
  disabled={isLoading}
  sx={{
    px: 5,
    py: 1.5,
    fontSize: "20px",
  }}
>
  {isLoading ? "Saving..." : "ADD"}
</Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
