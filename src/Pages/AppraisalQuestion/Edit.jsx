import React, { useState, useEffect } from "react";
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
  Snackbar,
  Alert,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";

import {
  useUpdateAppraisalQuestionMutation,
  useGetAppraisalCategoryMutation,
} from "../../api/constructionApi"; // use your actual path



export default function UpdateAppraisalQuestion() {

  const [isUpdating, setIsUpdating] = useState(false);

  const [categoryList, setCategoryList] = useState([]);

const [getAppraisalCategory] =
  useGetAppraisalCategoryMutation();

  useEffect(() => {
  fetchCategory();
}, []);

const fetchCategory = async () => {
  try {
    const payload = {
      userID: "171464700312440400",
      status: "Active",
      generalSearch: "",
      sortOrder: "",
      iDisplayStart: 0,
      iDisplayLength: "-1",
    };

    const response = await getAppraisalCategory (JSON.stringify(payload)).unwrap();

    console.log("Category Response:", response);

    if (response?.data) {
      setCategoryList(response.data);
    }
  } catch (error) {
    console.log(error);
  }
};

   const navigate = useNavigate();
  
    const AppraisalQuestion = () => {
      navigate("/AppraisalQuestion/index");
    };
  

  const location = useLocation();

  const question = location.state?.question;

  const [formData, setFormData] = useState({
    categoryID: question?.category_id || "",
    questionTitle: question?.question_title || "",
    description: question?.description || "",
    displayOrder: question?.display_order || "",
    status: question?.status || "",
  });

  const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success",
});

const handleCloseSnackbar = (_, reason) => {
  if (reason === "clickaway") return;

  setSnackbar((prev) => ({
    ...prev,
    open: false,
  }));
};

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  
//   const handleUpdate = async () => {
//   try {
//     const payload = {
//       userID: "171464700312440400",
//       appraisalID: question?.id || "", 
//       questionTitle: formData.questionTitle,
//       description: formData.description,
//       displayOrder: formData.displayOrder,
//       status: formData.status,
//       categoryID: formData.categoryID,
//     };

//     console.log("Update Payload:", payload);

//     const response = await updateAppraisalQuestion(
//       JSON.stringify(payload)
//     ).unwrap();

//     console.log("Update Response:", response);

//     if (response.status) {
//       setSnackbar({
//         open: true,
//         message: "Updated Successfully",
//         severity: "success",
//       });

//       // Optional: Navigate after 1.5 seconds
//       setTimeout(() => {
//         navigate("/AppraisalQuestion/index");
//       }, 1500);
//     } else {
//       setSnackbar({
//         open: true,
//         message: response.message || "Update Failed",
//         severity: "error",
//       });
//     }
//   } catch (error) {
//     console.log(error);

//     setSnackbar({
//       open: true,
//       message: "Update Failed",
//       severity: "error",
//     });
//   }
// };


const handleUpdate = async () => {
  if (isUpdating) return;

  setIsUpdating(true);

  try {
    const payload = {
      userID: "171464700312440400",
      appraisalID: question?.id || "",
      questionTitle: formData.questionTitle,
      description: formData.description,
      displayOrder: formData.displayOrder,
      status: formData.status,
      categoryID: formData.categoryID,
    };

    const response = await updateAppraisalQuestion(
      JSON.stringify(payload)
    ).unwrap();

  console.log("Response:", response);
console.log("Status:", response.status);


  if (response.status) {
  console.log("Update Success");

  setSnackbar({
    open: true,
    message: "Updated Successfully",
    severity: "success",
  });

  setTimeout(() => {
    console.log("Navigating to table...");
    navigate("/AppraisalQuestion/index");
  }, 1000);



    } else {
      setSnackbar({
        open: true,
        message: response.message || "Update Failed",
        severity: "error",
      });
      setIsUpdating(false);
    }
  } catch (error) {
    console.log(error);

    setSnackbar({
      open: true,
      message: "Update Failed",
      severity: "error",
    });

    setIsUpdating(false);
  }
};

  const [updateAppraisalQuestion] =
  useUpdateAppraisalQuestionMutation();



  return (
       <Box sx={{ p: 3, background: "#fffcfc", minHeight: "100vh" }}>
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
              <MenuOpenIcon sx={{ mr:-1 , fontSize:30,}}
              onClick={AppraisalQuestion} 
              />
          <h1 className="title" style={{ color: "black", fontSize:"25px" }}>  
         Update Appraisal Question
         </h1>  
        </Box>
      
           
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
    {categoryList.map((item) => (
      <MenuItem
        key={item.id}
        value={item.id}
      >
        {item.category_name}
      </MenuItem>
    ))}
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
  disabled={isUpdating}
  sx={{
    px: 5,
    py: 1,
    fontWeight: "bold",
    borderRadius: 1,
  }}
>
  {isUpdating ? "UPDATING..." : "UPDATE"}
</Button>
<Snackbar
  open={snackbar.open}
  autoHideDuration={3000}
  onClose={handleCloseSnackbar}
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
>
  <Alert
    onClose={handleCloseSnackbar}
    severity={snackbar.severity}
    variant="filled"
    sx={{ width: "100%" }}
  >
    {snackbar.message}
  </Alert>
</Snackbar>
      </Box>
    </Box>
  );
};

