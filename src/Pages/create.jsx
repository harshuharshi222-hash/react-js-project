import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { useFormik } from "formik";
import './create.css';
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  useCreateConstructionLinkPaymentMutation,
} from "../api/constructionApi";

export default function CreateCL() {
  const navigate = useNavigate();

  const handlegototable = () => {
    navigate("/dashboard/table");
  };
   
const [createConstructionLinkPayment] =
  useCreateConstructionLinkPaymentMutation();

  const formik = useFormik({
    initialValues: {
      userID: "",
      milestoneName: "",
      percentage: "",
      displayOrder: "",
      description: "",
    },

   

  validationSchema: Yup.object({
  milestoneName: Yup.string()
    .matches(
      /^[a-z A-Z 0-9 ]+$/,
      "only letters and numbers are allowed"
    )
    .required("Required*"),

  // percentage: Yup.number().test(
  //   "Invalid len",
  //   "must be less than or equal to 3 digits",
   
  //   (val) => !val || val.toString().length <= 3
    
  // )
  //  .required("Required*"),
  percentage: Yup.number()
  .test(
    "Invalid len",
    "Must be less than or equal to 3 digits",
    (val) => !val || val.toString().length <= 3
  )
  .max(100, "Percentage cannot be greater than 100")
  .required("Required*"),

  displayOrder: Yup.string()
    .matches(
      /^[ 0-9 ]+$/,
      "only numbers are allowed"
    )
    .required("Required*"),


  // description : Yup.string()
  //   .matches(
  //     /^[a-z A-Z 0-9 ]+$/,
  //     "only letters and numbers are allowed"
  //   )
  //   .required("Required*"),
  //   }),

  displayOrder: Yup.number()
  .typeError("Only numbers are allowed")
  .integer("Only whole numbers are allowed")
  .positive("Must be greater than 0")
  .required("Required*"),
  }),

onSubmit: async (values) => {
  try {
    await createConstructionLinkPayment({
      userID: "171903551052335600",
      milestoneName: values.milestoneName,
      percentage: values.percentage,
      displayOrder: values.displayOrder,
      description: values.description,
    }).unwrap();
//mui
    alert("Created Successfully");
    navigate("/dashboard/table");
  } catch (err) {
    console.log(err);
  }
}
});
  
return (
    <>
      {/* CONNECT FORM WITH FORMIK */}
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <div className="formComponentContainer">
          <div className="menuopenIconandComponentTitleContainer">
            <IconButton>
              <MenuOpenIcon
                sx={{
                  color: "#1273ea",
                  fontSize: 30,
                  mr: 1,
                }}
                onClick={handlegototable}
              />
            </IconButton>

            <h1 className="title" style={{ color: "black", fontSize:"30px" }}>
             Create CLP Milestone
            </h1>
          </div>

          
            <TextField
              fullWidth
              label="Milestone Name"
              name="milestoneName"
              sx={{ mb: 2 }}
              value={formik.values.milestoneName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.milestoneName &&
                Boolean(formik.errors.milestoneName)
              }
              helperText={
                formik.touched.milestoneName &&
                formik.errors.milestoneName
              }
            />
            

            <TextField
              fullWidth
              label="Percentage"
              name="percentage"
              sx={{ mb: 2 }}
              value={formik.values.percentage}
               onChange={(e) => {
    const value = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(value)) {
      formik.setFieldValue("percentage", value);
    }
  }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.percentage &&
                Boolean(formik.errors.percentage)
              }
              helperText={
                formik.touched.percentage &&
                formik.errors.percentage
              }
            />
      
          <TextField
            fullWidth
            label="Display Order"
            name="displayOrder"
            sx={{ mb: 2 }}
            value={formik.values.displayOrder}
            onChange={(e) => {
              const value = e.target.value;

              // Allow only numbers
              if (/^\d*$/.test(value)) {
                formik.setFieldValue("displayOrder", value);
              }
            }}
            onBlur={formik.handleBlur}
            error={
              formik.touched.displayOrder &&
              Boolean(formik.errors.displayOrder)
            }
            helperText={
              formik.touched.displayOrder &&
              formik.errors.displayOrder
            }
          />
           

            <TextField
              fullWidth
              className="inputElt"
              label="Description"
              name="description"
              sx={{ mb: 2 }}
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.displayOrder &&
                Boolean(formik.errors.displayOrder)
              }
              helperText={
                formik.touched.displayOrder &&
                formik.errors.displayOrder
              }
            />
          </div>
      
          <div className="buttonsAlignment">
            {/* RESET BUTTON */}
            <button className="buttonStyle" type="reset">
              Reset
            </button>

            {/* SAVE BUTTON */}
            <button className="buttonStyle" type="submit">
              Save
            </button>
          </div>
        
      </form>
    </>
  );
}