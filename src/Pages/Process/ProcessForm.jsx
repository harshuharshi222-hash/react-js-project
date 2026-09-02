import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";
import { useFormik } from "formik";
import {
  Box,
  Button,
    InputLabel,
  FormControl,
  MenuItem,
  Select,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  TextField,
   Snackbar,
  Alert,
} from "@mui/material";


import {
  useGetUserMutation,
  useGetLiaisonProcessCategoryMutation,
    useCreateLiaisonProcessMutation,
} from "../../api/constructionApi";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function AddLiaisonProcess() {
  const navigate = useNavigate();
  const [ismandatory, setIsMandatory] = useState("");
const [category, setCategory] = useState("");
const [ownerName, setOwnername] = useState("");
const [successMessage, setSuccessMessage] = useState(false);
  const initialForm = {
    categoryName: "",
    ownerName: "",
    isMandatory: "",
    processName: "",
    completionType: "",
    executionType: "",
    taskPriority: "",
    processOrder: "",
  };

  const [formData, setFormData] = useState(initialForm);

  const [userList, setUserList] = useState([]);
const [categoryList, setCategoryList] = useState([]);

const [getUser] = useGetUserMutation();

const [getLiaisonProcessCategory] =
  useGetLiaisonProcessCategoryMutation();

const [createLiaisonProcess, { isLoading: isSaving }] =
  useCreateLiaisonProcessMutation();

  // Handle form changes
  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };


useEffect(() => {
  fetchUsers();
  fetchCategories();
}, []);

const fetchUsers = async () => {
  try {
    const payload = {
      userID: "169548080048036100",
      departmentID: "",
      generalSearch: "",
      sortOrder: "",
      iDisplayStart: 0,
      iDisplayLength: -1,
    };

    const response = await getUser(
      JSON.stringify(payload)
    ).unwrap();

    console.log("User API Response:", response);

    if (response?.data) {
      setUserList(response.data);
    } else if (response?.user) {
      setUserList(response.user);
    } else {
      setUserList([]);
    }
  } catch (error) {
    console.error("User API Error:", error);
    setUserList([]);
  }
};

const fetchCategories = async () => {
  try {
    const payload = {
      userID: "169548080048036100",
    };

    const response = await getLiaisonProcessCategory(
      JSON.stringify(payload)
    ).unwrap();

    console.log(
      "Liaison Process Category API Response:",
      response
    );

    if (response?.data) {
      setCategoryList(response.data);
    } else {
      setCategoryList([]);
    }
  } catch (error) {
    console.error(
      "Liaison Process Category API Error:",
      error
    );

    setCategoryList([]);
  } 
};
  
const [errors, setErrors] = useState({
  category: "",
  ownerName: "",
  ismandatory: "",
  processName: "",
  processOrder: "",
});


  // Reset form
  const handleReset = () => {
    setFormData(initialForm);
  };

  // Back to Process index
  const handleBack = () => {
    navigate("/LiaisonProcess/Process");
  };

  // Save form


const handleSave = async () => {
  const newErrors = {
    category: "",
    ownerName: "",
    ismandatory: "",
    processName: "",
    processOrder: "",
  };

  let isValid = true;

  // Category
  if (!category || category.trim() === "") {
    newErrors.category = "Category Name is required";
    isValid = false;
  }

  // Owner
  if (!ownerName || ownerName.trim() === "") {
    newErrors.ownerName = "Owner Name is required";
    isValid = false;
  }

  // Is Mandatory
  if (!ismandatory || ismandatory.trim() === "") {
    newErrors.ismandatory = "Is Mandatory is required";
    isValid = false;
  }

  // Process Name
  if (!formData.processName || formData.processName.trim() === "") {
    newErrors.processName = "Process Name is required";
    isValid = false;
  }

  // Process Order
  if (!formData.processOrder || formData.processOrder.trim() === "") {
    newErrors.processOrder = "Process Order is required";
    isValid = false;
  }

  setErrors(newErrors);

  // Stop if validation fails
  if (!isValid) {
    return;
  }

  // API Payload
  const payload = {
    userID: "169548080048036100",
    processName: formData.processName,
    processCategoryID: category,
    processOrder: Number(formData.processOrder),
    processOwnerID: ownerName,
    isMandatory:
      ismandatory === "default"
        ? "Default"
        : ismandatory === "legaloption"
        ? "LegalOption"
        : "LiaisonOption",
    completionType: formData.completionType,
    executionType: formData.executionType,
    taskPriority:
      formData.taskPriority === "Non Critical"
        ? "NonCritical"
        : "Critical",
  };

  console.log("Create Liaison Process Payload:", payload);

  try {
    const response = await createLiaisonProcess(
      JSON.stringify(payload)
    ).unwrap();

 console.log("Create Liaison Process Response:", response);

// Show success message
setSuccessMessage(true);

// Reset form
handleReset();

// Go back to process list after 1.5 seconds
setTimeout(() => {
  navigate("/LiaisonProcess/Process");
}, 1500);

  } catch (error) {
    console.error("Create Liaison Process API Error:", error);

    alert(
      error?.data?.message ||
      error?.data?.error ||
      "Failed to create Liaison Process"
    );
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f7f7f7",
      }}
    >
     
      <Box
        sx={{
          height: 60,
          display: "flex",
          alignItems: "center",
          px: 3,
          backgroundColor: "#fafafa",
        }}
      >
        <MenuOpenIcon
          onClick={handleBack}
          sx={{
            fontSize: 30,
            color: "#1976d2",
            mr: 2,
            cursor: "pointer",
          }}
        />

        <Snackbar
  open={successMessage}
  autoHideDuration={1500}
  onClose={() => setSuccessMessage(false)}
  anchorOrigin={{
    vertical: "top",
    horizontal: "right",
  }}
>
  <Alert
    onClose={() => setSuccessMessage(false)}
    severity="success"
    variant="filled"
    sx={{ width: "100%" }}
  >
    Liaison Process created successfully!
  </Alert>
</Snackbar>

        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#111",
          }}
        >
          Add Liaison Process
        </Typography>
      </Box>

    
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "14px",
          px: 3.5,
          py: 3,
          mx: 0,
        }}
      >
       
      




          <FormControl
  fullWidth
  size="small"
  sx={{ mb: 2 }}
  error={Boolean(errors.category)}
>
  <InputLabel>Category Name</InputLabel>

  <Select
    value={category}
    label="Category Name"
    onChange={(e) => {
      setCategory(e.target.value);

      if (e.target.value) {
        setErrors((prev) => ({
          ...prev,
          category: "",
        }));
      }
    }}
    endAdornment={
      category && (
        <InputAdornment position="end" sx={{ mr: 2 }}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setCategory("");
            }}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        </InputAdornment>
      )
    }
  >
    {categoryList.map((item) => (
      <MenuItem
        key={item.id}
        value={item.id}
      >
        {item.process_category_name}
      </MenuItem>
    ))}
  </Select>

  {errors.category && (
    <Typography
      sx={{
        color: "#d32f2f",
        fontSize: "12px",
        mt: 0.5,
        ml: 1.5,
      }}
    >
      {errors.category}
    </Typography>
  )}
</FormControl>

       


<FormControl
  fullWidth
  size="small"
  sx={{ mb: 2 }}
  error={Boolean(errors.ownerName)}
>
  <InputLabel>Owner Name</InputLabel>

  <Select
    value={ownerName}
    label="Owner Name"
    onChange={(e) => {
      setOwnername(e.target.value);

      if (e.target.value) {
        setErrors((prev) => ({
          ...prev,
          ownerName: "",
        }));
      }
    }}
    endAdornment={
      ownerName && (
        <InputAdornment position="end" sx={{ mr: 2 }}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setOwnername("");
            }}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        </InputAdornment>
      )
    }
  >
    {userList.map((item) => (
      <MenuItem
        key={item.user_id || item.id}
        value={item.user_id || item.id}
      >
        {item.user_name || item.name}
      </MenuItem>
    ))}
  </Select>

  {errors.ownerName && (
    <Typography
      sx={{
        color: "#d32f2f",
        fontSize: "12px",
        mt: 0.5,
        ml: 1.5,
      }}
    >
      {errors.ownerName}
    </Typography>
  )}
</FormControl>



                  <FormControl
  fullWidth
  size="small"
  sx={{ mb: 2 }}
  error={Boolean(errors.ismandatory)}
>
  <InputLabel>Is Mandatory</InputLabel>

  <Select
    value={ismandatory}
    label="Is Mandatory"
    onChange={(e) => {
      setIsMandatory(e.target.value);

      if (e.target.value) {
        setErrors((prev) => ({
          ...prev,
          ismandatory: "",
        }));
      }
    }}
  >
    <MenuItem value="default">Default</MenuItem>
    <MenuItem value="legaloption">LegalOption</MenuItem>
    <MenuItem value="liaisonoption">LiaisonOption</MenuItem>
  </Select>

  {errors.ismandatory && (
    <Typography
      sx={{
        color: "#d32f2f",
        fontSize: "12px",
        mt: 0.5,
        ml: 1.5,
      }}
    >
      {errors.ismandatory}
    </Typography>
  )}
</FormControl>

       

<TextField
  fullWidth
  size="small"
  label="Process Name"
  value={formData.processName}
  onChange={(e) => {
    handleChange("processName")(e);

    if (e.target.value.trim()) {
      setErrors((prev) => ({
        ...prev,
        processName: "",
      }));
    }
  }}
  error={Boolean(errors.processName)}
  helperText={errors.processName}
  InputProps={{
    endAdornment: formData.processName && (
      <InputAdornment position="end">
        <IconButton
          size="small"
          onClick={() =>
            handleChange("processName")({
              target: { value: "" },
            })
          }
          edge="end"
        >
          <ClearIcon fontSize="small" />
        </IconButton>
      </InputAdornment>
    ),
  }}
  sx={{
    mb: 2,

    "& .MuiOutlinedInput-root": {
      height: 40,
    },

    "& .MuiOutlinedInput-input": {
      fontSize: "16px",
      color: "#526477",
    },

    "& .MuiInputLabel-root": {
      fontSize: "14px",
    },
  }}
/>
       
        <Box sx={{ mb: 2 }}>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#526477",
              mb: 0.2,
            }}
          >
            Completion Type*
          </Typography>

          <RadioGroup
            row
            value={formData.completionType}
            onChange={handleChange("completionType")}
            sx={{
              mt: 0,
              gap: 1,
            }}
          >
            <FormControlLabel
              value="Project"
              control={
                <Radio
                  size="small"
                  sx={{
                    p: 1,
                    mr: 1,
                  }}
                />
              }
              label="Project *"
              sx={{
                mr: 1,

                "& .MuiFormControlLabel-label": {
                  fontSize: "16px",
                },
              }}
            />

            <FormControlLabel
              value="Survey Number *"
              control={
                <Radio
                  size="small"
                  sx={{
                    p: 0,
                    mr: 1,
                  }}
                />
              }
              label="Survey Number *"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "16px",
                },
              }}
            />
          </RadioGroup>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#526477",
              mb: 0.2,
            }}
          >
            Execution Type*
          </Typography>

          <RadioGroup
            row
            value={formData.executionType}
            onChange={handleChange("executionType")}
            sx={{
              mt: 0,
              gap: 1,
            }}
          >
            <FormControlLabel
              value="Single"
              control={
                <Radio
                  size="small"
                  sx={{
                    p: 1,
                    mr: 1,
                  }}
                />
              }
              label="Single*"
              sx={{
                mr: 1,

                "& .MuiFormControlLabel-label": {
                  fontSize: "16px",
                },
              }}
            />

            <FormControlLabel
              value="Multiple"
              control={
                <Radio
                  size="small"
                  sx={{
                    p: 0,
                    mr: 1,
                  }}
                />
              }
              label="Multiple *"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "16px",
                },
              }}
            />
          </RadioGroup>
        </Box>

       
        <Box sx={{ mb: 2 }}>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#526477",
              mb: 0.2,
            }}
          >
            Task Priority*
          </Typography>

          <RadioGroup
            row
            value={formData.taskPriority}
            onChange={handleChange("taskPriority")}
            sx={{
              mt: 0,
              gap: 1,
            }}
          >
            <FormControlLabel
              value="Non Critical"
              control={
                <Radio
                  size="small"
                  sx={{
                    p: 1,
                    mr: 1,
                  }}
                />
              }
              label="Non Critical*"
              sx={{
                mr: 1,

                "& .MuiFormControlLabel-label": {
                  fontSize: "16px",
                },
              }}
            />

            <FormControlLabel
              value="Critical"
              control={
                <Radio
                  size="small"
                  sx={{
                    p: 0,
                    mr: 1,
                  }}
                />
              }
              label="Critical *"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "16px",
                },
              }}
            />
          </RadioGroup>
        </Box>

      
     

 

  <TextField
  fullWidth
  size="small"
  label="Process Order"
  value={formData.processOrder}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");

    handleChange("processOrder")({
      target: { value },
    });

    if (value) {
      setErrors((prev) => ({
        ...prev,
        processOrder: "",
      }));
    }
  }}
  error={Boolean(errors.processOrder)}
  helperText={errors.processOrder}
  inputProps={{
    inputMode: "numeric",
    pattern: "[0-9]*",
  }}
  InputProps={{
    endAdornment: formData.processOrder && (
      <InputAdornment position="end">
        <IconButton
          size="small"
          onClick={() =>
            handleChange("processOrder")({
              target: { value: "" },
            })
          }
          edge="end"
        >
          <ClearIcon fontSize="small" />
        </IconButton>
      </InputAdornment>
    ),
  }}
  sx={{
    mt: 1,

    "& .MuiOutlinedInput-root": {
      height: 40,
    },

    "& .MuiOutlinedInput-input": {
      fontSize: "16px",
      color: "#526477",
    },

    "& .MuiInputLabel-root": {
      fontSize: "14px",
    },
  }}
/>

      </Box>

    
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          px: 2,
          py: 2,
        }}
      >
        {/* RESET */}
        <Button
          variant="contained"
          onClick={handleReset}
          sx={{
            backgroundColor: "#9c27b0",
            minWidth: 76,
            height: 38,
            fontSize: "14px",
            fontWeight: 600,
            borderRadius: "4px",

            "&:hover": {
              backgroundColor: "#7b1fa2",
            },
          }}
        >
          RESET
        </Button>

        {/* SAVE */}
        <Button
          variant="contained"
          onClick={handleSave}
           disabled={isSaving}
          sx={{
            backgroundColor: "#1976d2",
            minWidth: 70,
            height: 38,
            fontSize: "14px",
            fontWeight: 600,
            borderRadius: "4px",

            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          SAVE
        </Button>
      </Box>
    </Box>
  );
}