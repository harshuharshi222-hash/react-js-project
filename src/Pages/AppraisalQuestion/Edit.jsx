import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";

// export  default  function UpdateAppraisalQuestion(){

// const UpdateAppraisalQuestion = () => {


//   const location = useLocation();

// const question = location.state?.question;

//   // const [formData, setFormData] = useState({
//   //   categoryID: "1",
//   //   questionTitle: "12",
//   //   description: "123",
//   //   displayOrder: "1",
//   //   status: "Active",
//   // });
// const [formData, setFormData] = useState({
//   categoryID: question?.category_id || "",
//   questionTitle: question?.question_title || "",
//   description: question?.description || "",
//   displayOrder: question?.display_order || "",
//   status: question?.status || "",
// });
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleUpdate = () => {
//     console.log(formData);

//     // Call your API here
//   };


export default function UpdateAppraisalQuestion() {

  const location = useLocation();

  const question = location.state?.question;

  const [formData, setFormData] = useState({
    categoryID: question?.category_id || "",
    questionTitle: question?.question_title || "",
    description: question?.description || "",
    displayOrder: question?.display_order || "",
    status: question?.status || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    console.log(formData);
  };



  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Header */}
      <Toolbar sx={{ bgcolor: "#fff", boxShadow: 1 }}>
        <IconButton>
          <MenuOpenIcon color="primary" />
        </IconButton>

        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ ml: 2 }}
        >
          Update Appraisal Question
        </Typography>
      </Toolbar>

      {/* Form Card */}
      <Card
        sx={{
          m: 3,
          p: 3,
          borderRadius: 3,
        }}
      >
        {/* Category */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Category Name*</InputLabel>

          <Select
            label="Category Name*"
            name="categoryID"
            value={formData.categoryID}
            onChange={handleChange}
          >
           
          </Select>
        </FormControl>

        {/* Question */}
        <TextField
          fullWidth
          margin="normal"
          label="Question Title*"
          name="questionTitle"
          value={formData.questionTitle}
          onChange={handleChange}
        />

        {/* Description */}
        <TextField
          fullWidth
          margin="normal"
          multiline
          rows={5}
          label="Description*"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        {/* Display Order */}
        <TextField
          fullWidth
          margin="normal"
          label="Display Order*"
          name="displayOrder"
          value={formData.displayOrder}
          onChange={handleChange}
        />

        {/* Status */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Status*</InputLabel>

          <Select
            label="Status*"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Card>

      {/* Update Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Button
          variant="contained"
          onClick={handleUpdate}
          sx={{
            px: 5,
            py: 1,
            fontWeight: "bold",
            borderRadius: 1,
          }}
        >
          UPDATE
        </Button>
      </Box>
    </Box>
  );
};

