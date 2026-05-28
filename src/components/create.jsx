import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function CreateCL() {
  const navigate = useNavigate();

  const handlegotopromotionalt = () => {
    navigate("/promotionalt");
  };

  const formik = useFormik({
    initialValues: {
      userID: "",
      milestoneName: "",
      percentage: "",
      displayOrder: "",
      description: "",
    },

    validationSchema: Yup.object({
      userID: Yup.number()
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

            <h1 className="title" style={{ color: "black" }}>
              Create Construction Link Payment
            </h1>
          </div>

          <div className="formDataContainer">
            <select name="project" className="selectE1">
              <option>Create Construction Payment Link</option>
              <option>others</option>
            </select>

            <TextField
              fullWidth
              label="User ID"
              name="userID"
              sx={{ mb: 2 }}
              size="small"
              value={formik.values.userID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.userID &&
                Boolean(formik.errors.userID)
              }
              helperText={
                formik.touched.userID &&
                formik.errors.userID
              }
            />

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
        </div>
      </form>
    </>
  );
}