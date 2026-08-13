import React, { useState } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function UpdateLiaisonProcess() {
  const [formData, setFormData] = useState({
    categoryName: "Amalgamation/ Bifurcation of Sites",
    ownerName: "ABHINANDAN KM",
    isMandatory: "LiaisonOption",
    processName: "BDA-AMALGAMATION",
    completionType: "Survey Number",
    executionType: "Single",
    taskPriority: "Non Critical",
    processOrder: "1",
    status: "",
  });

  const [statusError, setStatusError] = useState(false);

  const categoryOptions = [
    "Amalgamation/ Bifurcation of Sites",
    "Building Plan Approval",
    "Land Conversion",
    "Layout Approval",
  ];

  const ownerOptions = [
    "ABHINANDAN KM",
    "ANAND KUMAR",
    "RAJESH KUMAR",
  ];

  const mandatoryOptions = [
    "LiaisonOption",
    "Mandatory",
    "Non Mandatory",
  ];

  const statusOptions = ["Active", "Inactive"];

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });

    if (field === "status") {
      setStatusError(false);
    }
  };

  const handleSave = () => {
    if (!formData.status) {
      setStatusError(true);
      return;
    }

    console.log("Form Data:", formData);

    alert("Liaison Process updated successfully!");
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8f8f8",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          height: "56px",
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1,
          backgroundColor: "#fafafa",
        }}
      >
        <IconButton
          onClick={handleBack}
          sx={{
            width: "64px",
            height: "38px",
            borderRadius: "4px",
            backgroundColor: "#f1f5f8",
            color: "#0075d9",
            "&:hover": {
              backgroundColor: "#e8eef3",
            },
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
        </IconButton>

        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#111",
          }}
        >
          Update Liaison Process
        </Typography>
      </Box>

      {/* Main Form */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "14px",
          backgroundColor: "#fff",
          px: 3.4,
          pt: 2.8,
          pb: 3,
        }}
      >
        {/* Category Name */}
        <FormControl
          fullWidth
          size="small"
          sx={{
            mb: 2,
          }}
        >
          <InputLabel
            shrink
            sx={{
              backgroundColor: "#fff",
              px: 0.5,
              color: "#555",
            }}
          >
            Category Name
          </InputLabel>

          <Select
            value={formData.categoryName}
            onChange={handleChange("categoryName")}
            label="Category Name"
            sx={{
              height: "41px",
              "& .MuiSelect-select": {
                padding: "9px 13px",
                fontSize: "16px",
              },
            }}
          >
            {categoryOptions.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Owner Name */}
        <FormControl
          fullWidth
          size="small"
          sx={{
            mb: 2,
          }}
        >
          <InputLabel
            shrink
            sx={{
              backgroundColor: "#fff",
              px: 0.5,
              color: "#555",
            }}
          >
            Owner Name
          </InputLabel>

          <Select
            value={formData.ownerName}
            onChange={handleChange("ownerName")}
            label="Owner Name"
            sx={{
              height: "41px",
              "& .MuiSelect-select": {
                padding: "9px 13px",
                fontSize: "16px",
              },
            }}
          >
            {ownerOptions.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Is Mandatory */}
        <FormControl
          fullWidth
          size="small"
          sx={{
            mb: 2,
          }}
        >
          <InputLabel
            shrink
            sx={{
              backgroundColor: "#fff",
              px: 0.5,
              color: "#555",
            }}
          >
            Is Mandatory
          </InputLabel>

          <Select
            value={formData.isMandatory}
            onChange={handleChange("isMandatory")}
            label="Is Mandatory"
            sx={{
              height: "41px",
              "& .MuiSelect-select": {
                padding: "9px 13px",
                fontSize: "16px",
              },
            }}
          >
            {mandatoryOptions.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Process Name */}
        <TextField
          fullWidth
          size="small"
          label="Process Name"
          value={formData.processName}
          onChange={handleChange("processName")}
          sx={{
            mb: 2,
            "& .MuiInputBase-root": {
              height: "41px",
              fontSize: "16px",
            },
          }}
        />

        {/* Completion Type */}
        <Box sx={{ mb: 2.8 }}>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#555",
              mb: 0.5,
            }}
          >
            Completion Type*
          </Typography>

          <RadioGroup
            row
            value={formData.completionType}
            onChange={handleChange("completionType")}
          >
            <FormControlLabel
              value="Project"
              control={
                <Radio
                  size="small"
                  sx={{
                    p: 0.8,
                  }}
                />
              }
              label="Project *"
              sx={{
                mr: 1.5,
                "& .MuiFormControlLabel-label": {
                  fontSize: "16px",
                },
              }}
            />

            <FormControlLabel
              value="Survey Number"
              control={
                <Radio
                  size="small"
                  sx={{
                    p: 0.8,
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

        {/* Execution Type */}
        <Box sx={{ mb: 2.8 }}>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#555",
              mb: 0.5,
            }}
          >
            Execution Type*
          </Typography>

          <RadioGroup
            row
            value={formData.executionType}
            onChange={handleChange("executionType")}
          >
            <FormControlLabel
              value="Single"
              control={
                <Radio
                  size="small"
                  sx={{
                    p: 0.8,
                  }}
                />
              }
              label="Single *"
              sx={{
                mr: 1.5,
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
                    p: 0.8,
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

        {/* Task Priority */}
        <Box sx={{ mb: 2.8 }}>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#555",
              mb: 0.5,
            }}
          >
            Task Priority*
          </Typography>

          <RadioGroup
            row
            value={formData.taskPriority}
            onChange={handleChange("taskPriority")}
          >
            <FormControlLabel
              value="Non Critical"
              control={
                <Radio
                  size="small"
                  sx={{
                    p: 0.8,
                  }}
                />
              }
              label="Non Critical *"
              sx={{
                mr: 1.5,
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
                    p: 0.8,
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

        {/* Process Order */}
        <TextField
          fullWidth
          size="small"
          label="Process Order"
          value={formData.processOrder}
          onChange={handleChange("processOrder")}
          type="number"
          sx={{
            mb: 2,
            "& .MuiInputBase-root": {
              height: "41px",
              fontSize: "16px",
            },
          }}
        />

        {/* Status */}
        <FormControl
          fullWidth
          size="small"
          error={statusError}
          sx={{
            mb: 0,
          }}
        >
          <InputLabel
            shrink={false}
            sx={{
              color: "#666",
            }}
          >
            {formData.status ? "" : "Status"}
          </InputLabel>

          <Select
            value={formData.status}
            onChange={handleChange("status")}
            displayEmpty
            sx={{
              height: "41px",
              "& .MuiSelect-select": {
                padding: "9px 13px",
                fontSize: "16px",
              },
            }}
          >
            <MenuItem value="">
              
            </MenuItem>

            {statusOptions.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>

          {statusError && (
            <Typography
              sx={{
                fontSize: "12px",
                color: "#d32f2f",
                mt: 0.5,
                ml: 1.5,
              }}
            >
              Status is required
            </Typography>
          )}
        </FormControl>
      </Paper>

      {/* Save Button Area */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          px: 2.5,
          py: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            minWidth: "69px",
            height: "36px",
            textTransform: "uppercase",
            fontSize: "14px",
            fontWeight: 600,
            borderRadius: "4px",
            backgroundColor: "#1976d2",
            boxShadow: "0 2px 5px rgba(0,0,0,0.25)",
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