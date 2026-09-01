import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";
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
} from "@mui/material";


import {
  useGetUserMutation,
  useGetLiaisonProcessCategoryMutation,
} from "../../api/constructionApi";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function AddLiaisonProcess() {
  const navigate = useNavigate();
const [category, setCategory] = useState("");
const [ownerName, setOwnername] = useState("");
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
  



  // Reset form
  const handleReset = () => {
    setFormData(initialForm);
  };

  // Back to Process index
  const handleBack = () => {
    navigate("/LiaisonProcess/Process");
  };

  // Save form
  const handleSave = () => {
    console.log("Form Data:", formData);

    // API call can be added here
    // createLiaisonProcess(formData);
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
       
      


<FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>
              Category
            </InputLabel>

            <Select
              value={category}
              label="Category"
            
              onChange={(e) => {
  setCategory(e.target.value);
}}
              endAdornment={
                category && (
                  <InputAdornment
                    position="end"
                    sx={{
                      mr: 2,
                    }}
                  >
                    <IconButton
                      fontSize="small"
                      
                      onClick={(
                        e
                      ) => {
                        e.stopPropagation();

                        setCategory(
                          ""
                        );

                        
                      }}
                    >
                       <ClearIcon
                        fontSize="small"
                      />
                      </IconButton>
                  </InputAdornment>
                )
              }
            >
              {categoryList.map(
                (item) => (
                  <MenuItem
                    key={
                      item.id
                    }
                    value={
                      item.id
                    }
                  >
                    {
                      item.process_category_name
                    }
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

       
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
 <InputLabel>
             Owner Name
            </InputLabel>
 <Select
    value={ownerName}
    label="Owner Name"
     onChange={(e) => {
  setOwnername(e.target.value);}}

   endAdornment={
                ownerName && (
                  <InputAdornment
                    position="end"
                    sx={{
                      mr: 2,
                    }}
                  >
                    <IconButton
                      fontSize="small"
                      
                      onClick={(
                        e
                      ) => {
                        e.stopPropagation();

                        setOwnername(
                          ""
                        );

                        
                      }}
                    >
                       <ClearIcon
                        fontSize="small"
                      />
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
</FormControl>

       
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <Select
            value={formData.isMandatory}
            
            onChange={handleChange("isMandatory")}
            displayEmpty
            sx={{
              height: 40,
              fontSize: "16px",
              color: "#526477",

              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#c7c7c7",
              },

              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#999",
              },
            }}
          >
            <MenuItem value="">
              <span>Is Mandatory</span>
            </MenuItem>
            <MenuItem value="">
              <span>Is Mandatory</span>
            </MenuItem>
            <MenuItem value="">
              <span>Is Mandatory</span>
            </MenuItem>
            
          </Select>
        </FormControl>

       
        <TextField
          fullWidth
          size="small"
          placeholder="Process Name"
          value={formData.processName}
          onChange={handleChange("processName")}
          sx={{
            mb: 2,

            "& .MuiOutlinedInput-root": {
              height: 40,
            },

            "& .MuiOutlinedInput-input": {
              fontSize: "16px",
              color: "#526477",
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
          placeholder="Process Order"
          value={formData.processOrder}
          onChange={handleChange("processOrder")}
          sx={{
            mt: 1,

            "& .MuiOutlinedInput-root": {
              height: 40,
            },

            "& .MuiOutlinedInput-input": {
              fontSize: "16px",
              color: "#526477",
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