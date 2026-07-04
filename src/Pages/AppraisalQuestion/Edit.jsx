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
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useGetAppraisalCategoryMutation } from "../../api/constructionApi";



export default function UpdateAppraisalQuestion() {

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

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };
const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const handleUpdate = () => {
    console.log(formData);
  };



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

