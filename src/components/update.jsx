import MenuOpenIcon  from "@mui/icons-material/MenuOpen";
import { TextField } from "@mui/material";
import "./create.css";
import React from "react";
import IconButton from "@mui/material/IconButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { InputLabel,  Select, MenuItem } from "@mui/material";

export default function Update() {
  const navigate = useNavigate();

  const handlegotopromotionalt = () => {
    navigate("/promotionalt");
  };

  const formik = useFormik({
    initialValues: {
      userID: "",
      clpID: "",
      milestoneName: "",
      percentage: "",
      displayOrder: "",
      description: "",
      status: "",
    },

    validationSchema: Yup.object({
      userID: Yup.number()
        .typeError("Must be a number")
        .integer("Must be a whole number")
        .required("Required*"),

      clpID: Yup.number()
        .typeError("Must be a number")
        .integer("Must be a whole number")
        .required("Required*"),

      milestoneName: Yup.string()
        .matches(
          /^[a-zA-Z0-9]+$/,
          "only letters and numbers are allowed"
        )
        .required("Required*"),

      percentage: Yup.number().test(
        "Invalid len",
        "must be less than or equal to 3 digits",
        (val) => !val || val.toString().length <= 3
      ),

      displayOrder: Yup.string()
        .matches(
          /^[a-zA-Z0-9]+$/,
          "only letters and numbers are allowed"
        )
        .required("Required*"),
    }),

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
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
                  color: "#555",
                  fontSize: 30,
                  mr: 1,
                }}
                onClick={handlegotopromotionalt}
              />
            </IconButton>

            <h1 className="title" style={{ color: "black", fontSize:"25px" }}>
             Update CLP Milestone
            </h1>
          </div>

          <div className="formDataContainer">
          
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
              onChange={formik.handleChange}
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
              onChange={formik.handleChange}
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
            
            />

                      <select
              name="status"
              className="selectE1"
              value={formik.values.status}
              onChange={formik.handleChange}>
                         <option value="Active">Active</option>
                          <option value="Inactive">In-Active</option>
                   </select>
                
          </div>

          <div className="buttonsAlignment">
            {/* SUBMIT BUTTON */}
            <button className="buttonStyle" type="submit">
              Save
            </button>

            
          </div>
        </div>
      </form>
    </>
  );
}



