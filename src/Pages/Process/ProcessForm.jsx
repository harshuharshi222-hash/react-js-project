import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  TextField,
} from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function AddLiaisonProcess() {
  const navigate = useNavigate();

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

  // Handle form changes
  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
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
          <Select
            value={formData.categoryName}
            onChange={handleChange("categoryName")}
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
              <span>Category Name</span>
            </MenuItem>

            <MenuItem value="Category 1">Category 1</MenuItem>
            <MenuItem value="Category 2">Category 2</MenuItem>
            <MenuItem value="Category 3">Category 3</MenuItem>
          </Select>
        </FormControl>

       
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <Select
            value={formData.ownerName}
            onChange={handleChange("ownerName")}
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
              <span>Owner Name</span>
            </MenuItem>

            <MenuItem value="Owner 1">Owner 1</MenuItem>
            <MenuItem value="Owner 2">Owner 2</MenuItem>
            <MenuItem value="Owner 3">Owner 3</MenuItem>
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

            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
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