// 
import React from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { TextField, Button ,
   Box ,
   Typography ,
   Paper , 
   FormControl , 
    InputLabel , 
    Select , 
    MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { Margin, WidthFull } from "@mui/icons-material";
import {
  useUpdateConstructionLinkPaymentMutation,
} from "../api/constructionApi";



export default function Update() {
  const navigate = useNavigate();
  const location = useLocation();

  const rowData = location.state || {};
   console.log(rowData,"rowdatadata");
  const [updateConstructionLinkPayment] =
  useUpdateConstructionLinkPaymentMutation();

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      
    
      

      milestoneName: rowData.milestone_name || "",
      percentage: rowData.percentage || "",
      displayOrder: rowData.display_order || "",
      description: rowData.description || "",
      status: rowData.status || "",
    },

    validationSchema: Yup.object({
      status: Yup.string().required("Required"),
    }),

    // onSubmit: (values) => {
    //   const milestones =
    //     JSON.parse(localStorage.getItem("clpMilestones")) || [];

    //   const updatedData = milestones.map((item) => {
    //     if (
    //       item.milestone_name === rowData.milestone_name
    //     ) {
    //       return {
    //         ...item,
    //         status: values.status,
    //       };
    //     }
    //     return item;
    //   });

    //   localStorage.setItem(
    //     "clpMilestones",
    //     JSON.stringify(updatedData)
    //   );

    //   navigate("/promotionalt");
    // },
    onSubmit: async (values) => {
  try {
    const payload = {
      userID: "171903551052335600",
      clpID: rowData.id || rowData.id,
      milestoneName: values.milestoneName,
      percentage: values.percentage,
      displayOrder: values.displayOrder,
      description: values.description,
      status: values.status,
    };

    console.log("Update Payload:", payload);

    const response =
      await updateConstructionLinkPayment(payload).unwrap();

    console.log("Update Response:", response);

    alert("Updated Successfully");

    navigate("/promotionalt");
  } catch (error) {
    console.error("Update Error:", error);
    alert("Update Failed");
  }
},
  });

  const handlegotopromotionalt = () => {
    navigate("/promotionalt");
  };



  return (
    <>
      


<Box
  sx={{
    minHeight: "100vh",
    background: "#f5f5f5",
    p: 3,
  }}
>
  {/* Header */}
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      mb: 4,
    }}
  >
    <IconButton onClick={handlegotopromotionalt}>
      <MenuOpenIcon  sx={{
                  color: "#555",
                  fontSize: 30,
                  mr: 1,
                }} />
    </IconButton>

    <Typography
      variant="h4"
      sx={{
        ml: 2,
        fontWeight: 700,
      }}
    >
      Update CLP Milestone
    </Typography>
  </Box>

  <form onSubmit={formik.handleSubmit}>
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        background: "#fafafa",

      }}
    >
      <TextField
        fullWidth
        label="Milestone Name"
        value={formik.values.milestoneName}
        InputProps={{ readOnly: true }}
        sx={{ mb: 3 }}
  //         InputProps={{
  //   readOnly: true,
  // }}
      />

      <TextField
        fullWidth
        label="Percentage"
        value={formik.values.percentage}
        InputProps={{ readOnly: true }}
        sx={{ mb: 3 }}
  //         InputProps={{
  //   readOnly: true,
  // }}
      />

      <TextField
        fullWidth
        label="Display Order"
        value={formik.values.displayOrder}
        InputProps={{ readOnly: true }}
        sx={{ mb: 3 }}
   
      />

      <TextField
        fullWidth
        multiline
        rows={5}
        label="Description"
        value={formik.values.description}
        // InputProps={{ readOnly: true }}
        sx={{ mb: 3 }}
      />

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Status</InputLabel>

        <Select
          name="status"
          value={formik.values.status}
          label="Status"
          onChange={formik.handleChange}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="inActive">In-Active</MenuItem>
        </Select>
      </FormControl>
    </Paper>

    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        mt: 3,
      }}
    >
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{
          minWidth: 120,
          height: 50,
          fontWeight: 600,
        }}
      >
        SAVE
      </Button>
    </Box>
  </form>
</Box>
  </>
  );

}