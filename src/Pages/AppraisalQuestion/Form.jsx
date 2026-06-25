import React from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useNavigate } from "react-router-dom";

import { useCreateAppraisalQuestionOptionMutation } from "../../api/constructionApi";



export default function AddAppraisalQuestion() {

  const [createAppraisalQuestionOption, { isLoading }] =
    useCreateAppraisalQuestionOptionMutation();

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

    onSubmit: async (values) => {
      try {
        const payload = {
          userID: "171464700312440400",
          displayOrder: values.displayOrder,
          appraisalQuestionID: "120",
          rateID: "5",
          description: values.description,
        };

        const response = await createAppraisalQuestionOption(JSON.stringify(payload)).unwrap();

     
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
          {/* Category */}
          <TextField
  select
  fullWidth
  name="categoryName"
  value={formik.values.categoryName}
  onChange={formik.handleChange}
  margin="normal"
  label="Category Name*"
>
 
  <MenuItem value="WORK EFFICIENCY">WORK EFFICIENCY</MenuItem>
  <MenuItem value="WORK FACTORS">WORK FACTORS</MenuItem>
</TextField>

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

            {/* <Button
              type="submit"
              variant="contained"
              sx={{
                px: 5,
                py: 1.5,
                fontSize: "20px",
              }}
            >
              ADD
            </Button> */}
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
