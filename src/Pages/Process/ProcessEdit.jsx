import React, { useState, useEffect } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useLocation, useNavigate } from "react-router-dom";
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



import {
  useGetLiaisonProcessCategory1Mutation,
   useGetUserMutation,
     useGetLiaisonProcessDetailMutation,
      useUpdateLiaisonProcessMutation,
} from "../../api/constructionApi";

export default function UpdateLiaisonProcess() {
const [formData, setFormData] = useState({
  categoryName: "",
  ownerName: "",
  isMandatory: "",
  processName: "",
  completionType: "",
  executionType: "",
  taskPriority: "",
  processOrder: "",
  status: "",
});


const location = useLocation();
const navigate = useNavigate();

const liaisonProcessID = location.state?.liaisonProcessID;

  const [statusError, setStatusError] = useState(false);

const [categoryList, setCategoryList] = useState([]);

const [getLiaisonProcessCategory1] =
  useGetLiaisonProcessCategory1Mutation();

const [updateLiaisonProcess, { isLoading: isUpdating }] =
  useUpdateLiaisonProcessMutation();

useEffect(() => {
  if (liaisonProcessID) {
    fetchCategory();
    fetchOwner();
    fetchProcessDetail();
  }
}, [liaisonProcessID]);

const fetchCategory = async () => {
  try {
    const payload = {
      userID: "169548080048036100",
    };

    const response = await getLiaisonProcessCategory1(
      JSON.stringify(payload)
    ).unwrap();

    console.log("CATEGORY RESPONSE:", response);

    const categories = Array.isArray(response?.data)
      ? response.data
      : [];

    console.log("CATEGORY LIST:", categories);

    setCategoryList(categories);
  } catch (error) {
    console.error("CATEGORY API ERROR:", error);
    setCategoryList([]);
  }
};


const [ownerList, setOwnerList] = useState([]);

const [getUser] = useGetUserMutation();

useEffect(() => {
  fetchOwner();
}, []);

const fetchOwner = async () => {
  try {
    const payload = {
      userID: "169548080048036100",
      departmentID: "",
      generalSearch: "",
      sortOrder: "",
      iDisplayStart: 0,
      iDisplayLength: -1,
    };

    console.log("OWNER PAYLOAD:", payload);

    const response = await getUser(
      JSON.stringify(payload)
    ).unwrap();

    console.log("OWNER FULL RESPONSE:", response);

    const users = Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response?.user)
      ? response.user
      : [];

    console.log("FINAL OWNER LIST:", users);

    setOwnerList(users);
  } catch (error) {
    console.error("OWNER API ERROR:", error);
    setOwnerList([]);
  }
};

const normalizeCompletionType = (value) => {
  if (!value) return "";

  const normalized = String(value)
    .trim()
    .toLowerCase()
    .replace(/[\s_-]/g, "");

  if (normalized === "project") {
    return "Project";
  }

  if (
    normalized === "surveynumber" ||
    normalized === "survey"
  ) {
    return "Survey Number";
  }

  return "";
};

const normalizeTaskPriority = (value) => {
  if (!value) return "";

  const normalized = String(value)
    .trim()
    .toLowerCase()
    .replace(/[\s_-]/g, "");

  if (normalized === "critical") {
    return "Critical";
  }

  if (
    normalized === "noncritical" ||
    normalized === "noncriticaltask"
  ) {
    return "Non Critical";
  }

  return "";
};


const [getLiaisonProcessDetail] =
  useGetLiaisonProcessDetailMutation();

useEffect(() => {
  fetchProcessDetail();
}, []);

const fetchProcessDetail = async () => {
  try {
    if (!liaisonProcessID) {
      console.error("Liaison Process ID is missing");
      return;
    }

    const payload = {
      userID: "169548080048036100",
      liaisonProcessID: String(liaisonProcessID),
    };

    console.log("=================================");
    console.log("PROCESS DETAIL PAYLOAD:", payload);
    console.log("EDITING PROCESS ID:", liaisonProcessID);
    console.log("=================================");

    const response = await getLiaisonProcessDetail(
      JSON.stringify(payload)
    ).unwrap();

    console.log("PROCESS DETAIL FULL RESPONSE:", response);
    console.log("PROCESS DETAIL DATA:", response?.data);

    const detail = Array.isArray(response?.data)
      ? response.data[0]
      : response?.data;

    console.log("PROCESS DETAIL OBJECT:", detail);

    if (!detail) {
      console.error("No process detail found");
      return;
    }

    setFormData({
      categoryName:
        detail.process_category_name ||
        detail.category_name ||
        "",

      ownerName:
        detail.owner_name ||
        "",

      isMandatory:
        detail.is_mandatory ||
        detail.isMandatory ||
        "",

      processName:
        detail.process_name ||
        detail.liaison_process_name ||
        "",

     completionType: normalizeCompletionType(
  detail.completion_type
),

executionType:
  detail.execution_type || "",

taskPriority: normalizeTaskPriority(
  detail.task_priority
),

      processOrder:
        detail.process_order ||
        "",

      status:
        detail.process_status
 ||
        "",
    });
  } catch (error) {
    console.error(
      "PROCESS DETAIL API ERROR:",
      error
    );
  }
};

  const mandatoryOptions = [
    
    "Default",
    "LegalOption",
    "LiaisonOption",
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

// const handleSave = async () => {
//   if (!formData.status) {
//     setStatusError(true);
//     return;
//   }

//   try {
//     // Find selected category object
//     const selectedCategory = categoryList.find(
//       (item) =>
//         item.process_category_name === formData.categoryName
//     );

//     // Find selected owner object
//     const selectedOwner = ownerList.find(
//       (item) =>
//         item.user_name === formData.ownerName
//     );

//     console.log("SELECTED CATEGORY:", selectedCategory);
//     console.log("SELECTED OWNER:", selectedOwner);

//     if (!selectedCategory) {
//       alert("Please select a valid Category Name");
//       return;
//     }

//     if (!selectedOwner) {
//       alert("Please select a valid Owner Name");
//       return;
//     }

//     const payload = {
//       userID: "169548080048036100",

//       liaisonProcessID: String(liaisonProcessID),

//       processName: formData.processName,

//       processCategoryID: String(
//         selectedCategory.process_category_id ||
//         selectedCategory.id ||
//         ""
//       ),

//       processOrder: String(formData.processOrder),

//       processOwnerID: String(
//         selectedOwner.user_id
//       ),

//       isMandatory: formData.isMandatory,

//       completionType: formData.completionType,

//       executionType: formData.executionType,

//       taskPriority: formData.taskPriority,

//       processStatus: formData.status,
//     };

//     console.log("UPDATE PAYLOAD:", payload);

//     const response = await updateLiaisonProcess(
//       JSON.stringify(payload)
//     ).unwrap();

//     console.log("UPDATE RESPONSE:", response);

//     alert("Liaison Process updated successfully!");

//   } catch (error) {
//     console.error(
//       "UPDATE LIAISON PROCESS API ERROR:",
//       error
//     );

//     alert(
//       error?.data?.message ||
//       error?.message ||
//       "Failed to update Liaison Process"
//     );
//   }
// };

const handleSave = async () => {
  if (!formData.status) {
    setStatusError(true);
    return;
  }

  try {
    // Find selected category object
    const selectedCategory = categoryList.find(
      (item) =>
        item.process_category_name === formData.categoryName
    );

    // Find selected owner object
    const selectedOwner = ownerList.find(
      (item) =>
        item.user_name === formData.ownerName
    );

    console.log("SELECTED CATEGORY:", selectedCategory);
    console.log("SELECTED OWNER:", selectedOwner);

    if (!selectedCategory) {
      alert("Please select a valid Category Name");
      return;
    }

    if (!selectedOwner) {
      alert("Please select a valid Owner Name");
      return;
    }

    const payload = {
      userID: "169548080048036100",

      liaisonProcessID: String(liaisonProcessID),

      processName: formData.processName,

      processCategoryID: String(
        selectedCategory.process_category_id ||
        selectedCategory.id ||
        ""
      ),

      processOrder: String(formData.processOrder),

      processOwnerID: String(
        selectedOwner.user_id
      ),

      isMandatory: formData.isMandatory,

      completionType: formData.completionType,

      executionType: formData.executionType,

      taskPriority: formData.taskPriority,

      processStatus: formData.status,
    };

    console.log("UPDATE PAYLOAD:", payload);

    const response = await updateLiaisonProcess(
      JSON.stringify(payload)
    ).unwrap();

    console.log("UPDATE RESPONSE:", response);

    // Store success message for Index page
sessionStorage.setItem(
  "liaisonProcessUpdateSuccess",
  "Liaison Process updated successfully!"
);

// Go back to Index page
window.history.back();

  } catch (error) {
    console.error(
      "UPDATE LIAISON PROCESS API ERROR:",
      error
    );

    alert(
      error?.data?.message ||
      error?.message ||
      "Failed to update Liaison Process"
    );
  }
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
    {categoryList.map((item) => (
      <MenuItem
        key={item.id}
        value={item.process_category_name}
      >
        {item.process_category_name}
      </MenuItem>
    ))}
  </Select>
</FormControl>


<FormControl
  fullWidth
  size="small"
  sx={{ mb: 2 }}
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
    {ownerList.map((item, index) => (
      <MenuItem
        key={item.user_id }
        value={item.user_name }
      >
        {item.user_name}
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