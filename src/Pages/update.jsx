// 
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import {  Button ,
   Box ,
   Typography ,
   Paper , 
   FormControl , 
    InputLabel , 
    Select , 
    MenuItem } from "@mui/material";
    import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import React, { useState } from "react";

import { Autocomplete, TextField } from "@mui/material";
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

const rowData = location?.state || {};

console.log("Location State:", location?.state);
console.log("Row Data:", rowData);

const [updateConstructionLinkPayment] =
  useUpdateConstructionLinkPaymentMutation();

const statusOptions = [
  { label: "Active" },
  { label: "InActive" },
];

const [openSnackbar, setOpenSnackbar] = useState(false);

const handleCloseSnackbar = () => {
  setOpenSnackbar(false);
};

  if (!location?.state) {
    return (
      <Box p={3}>
        <Typography color="error">
          No record selected. Please go back and select a row.
        </Typography>
      </Box>
    );
  }

console.log("Received Data:", location.state);
console.log("Received CLP ID:", location.state?.clpID);


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

   
//     onSubmit: async (values) => {
//   try {
//     const payload = {
//       userID: "171903551052335600",
//       clpID: rowData?.clpID ,
//       milestoneName: values.milestoneName,
//       percentage: values.percentage,
//       displayOrder: values.displayOrder,
//       description: values.description,
//       status: values.status,
//     };

//     console.log("Update Payload:", payload);

//     const response =
//       await updateConstructionLinkPayment(payload).unwrap();

//     console.log("Update Response:", response);

//     alert("Updated Successfully");

//     navigate("/dashboard/table");
//   } catch (error) {
//     console.error("Update Error:", error);
//     alert("Update Failed");
//   }
// },

onSubmit: async (values) => {
  try {
    const payload = {
      userID: "171903551052335600",
      clpID: rowData?.clpID,
      milestoneName: values.milestoneName,
      percentage: values.percentage,
      displayOrder: values.displayOrder,
      description: values.description,
      status: values.status,
    };

    await updateConstructionLinkPayment(payload).unwrap();

    setOpenSnackbar(true);

    setTimeout(() => {
      navigate("/dashboard/table");
    }, 2000);

  } catch (error) {
    console.error("Update Error:", error);
    alert("Update Failed");
  }
}
  });

  const handlegototable = () => {
    navigate("/dashboard/table");
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
    <IconButton onClick={handlegototable}>
      <MenuOpenIcon  sx={{
                  color: "#1273ea",
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
        // InputProps={{ readOnly: true }}
        disabled
        sx={{ mb: 3 }}

      />

      <TextField
        fullWidth
        label="Percentage"
        value={formik.values.percentage}
        // InputProps={{ readOnly: true }}
        disabled
        sx={{ mb: 3 }}

      />

      <TextField
        fullWidth
        label="Display Order"
        value={formik.values.displayOrder}
        // InputProps={{ readOnly: true }}
        disabled
        sx={{ mb: 3 }}
   
      />

      
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    sx={{ mb: 2 }}
                    multiline
                    rows={3}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />

      <FormControl fullWidth sx={{ mb: 3 }}>
        {/* <InputLabel>Status</InputLabel> */}

        {/* <Select
          name="status"
          value={formik.values.status}
          label="Status"
          onChange={formik.handleChange}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="inActive">In-Active</MenuItem>
        </Select> */}
        <Snackbar
  open={openSnackbar}
  autoHideDuration={3000}
  onClose={handleCloseSnackbar}
  anchorOrigin={{
    vertical: "top",
    horizontal: "right",
  }}
>
  <Alert
    onClose={handleCloseSnackbar}
    severity="success"
    variant="filled"
    sx={{ width: "100%" }}
  >
    Updated Successfully
  </Alert>
</Snackbar>
<Autocomplete
  options={statusOptions}
  getOptionLabel={(option) => option.label}
  value={
    statusOptions.find(
      (item) => item.label === formik.values.status
    ) || null
  }
  onChange={(event, newValue) => {
    formik.setFieldValue(
      "status",
      newValue ? newValue.label : ""
    );
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Status"
      fullWidth
    />
  )}
/>
   
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