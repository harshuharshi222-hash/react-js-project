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
    
  )
   .required("Required*"),
  

  displayOrder: Yup.string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "only letters and numbers are allowed"
    )
    .required("Required*"),
}),
// onSubmit: (values) => {
//   const existingData =
//     JSON.parse(localStorage.getItem("clpMilestones")) || [];

//   const newMilestone = {
//     milestone_name: values.milestoneName,
//     display_order: values.displayOrder,
//     percentage: values.percentage,
//     updated_user_name: "Admin",
//     added_on: new Date().toLocaleDateString(),
//     status: "Active",
    
//     description: values.description,
    
//   };

//   existingData.unshift(newMilestone);

//   localStorage.setItem(
//     "clpMilestones",
//     JSON.stringify(existingData)
//   );

//   navigate("/promotionalt");
// },
// });
//   onSubmit: async (values) => {
//   const payload = {
//     userID: "171903551052335600",
//     milestoneName: values.milestoneName,
//     percentage: Number(values.percentage),
//     displayOrder: Number(values.displayOrder),
//     description: values.description,
//   };

//   try {
//     const response = await fetch(
//       "https://knsonline.in/test/RestAPI_V1/crm/v2/createConstructionLinkPayment",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify(payload),
//       }
//     );

//     const result = await response.json();

//     console.log("Response:", result);

//     if (response.ok) {
//       alert("Record Created Successfully");
//       navigate("/promotionalt");
//     } else {
//       alert(result.message || "Failed");
//     }
//   } catch (error) {
//     console.error("API Error:", error);
//     alert("Something went wrong");
//   }
// },
//   });

// onSubmit: async (values) => {
//   const formData = new URLSearchParams();

//   formData.append("userID", "171903551052335600");
//   formData.append("milestoneName", values.milestoneName);
//   formData.append("percentage", values.percentage);
//   formData.append("displayOrder", values.displayOrder);
//   formData.append("description", values.description);

//   try {
//     const response = await fetch(
//       "https://knsonline.in/test/RestAPI_V1/crm/v2/createConstructionLinkPayment",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: formData,
//       }
//     );

//     const result = await response.json();

//     console.log(result);

//     if (response.ok) {
//       alert("Record Created Successfully");
//       navigate("/promotionalt");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// },
onSubmit: async (values) => {
  const formData = new URLSearchParams();

  formData.append("userID", "171903551052335600");
  formData.append("milestoneName", values.milestoneName);
  formData.append("percentage", values.percentage);
  formData.append("displayOrder", values.displayOrder);
  formData.append("description", values.description);

  try {
    const response = await fetch(
      "https://knsonline.in/test/RestAPI_V1/crm/v2/createConstructionLinkPayment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      }
    );

    const text = await response.text();

    console.log("Status:", response.status);
    console.log("Response:", text);

    if (response.ok) {
      alert("Record Created Successfully");
      navigate("/promotionalt");
    } else {
      alert(`API Error ${response.status}`);
    }
  } catch (error) {
    console.error("API Error:", error);
  }
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
              {/* <pre>
       {JSON.stringify(formik.errors, null, 2)}
    </pre> */}
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