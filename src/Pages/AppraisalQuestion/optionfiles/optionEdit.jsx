
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


import {
  useGetAppraisalRatingMutation,
  useGetHrAppraisalQuestionOptionMutation,
  useGetHrAppraisalQuestionOptionDetailMutation,
  useUpdateAppraisalQuestionOptionMutation,
} from "../../../api/constructionApi";

export default function UpdateOption() {
  const [rate, setRate] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");


const [ratings, setRatings] = useState([]);

  const [getAppraisalRating, { isLoading }] =
    useGetAppraisalRatingMutation();

    const [getHrAppraisalQuestionOption, { isLoading: optionLoading }] =
  useGetHrAppraisalQuestionOptionMutation();

const [updateAppraisalQuestionOption, { isLoading: saving }] =
  useUpdateAppraisalQuestionOptionMutation();

  const [getHrAppraisalQuestionOptionDetail] =
  useGetHrAppraisalQuestionOptionDetailMutation();
  
   useEffect(() => {
    loadRatings();
  }, []);
  
  const loadRatings = async () => {
    try {
      const payload = {
        userID: "171464700312440400",
        status: "Active",
        sortOrder: "",
        generalSearch: "",
        iDisplayStart: 0,
        iDisplayLength: -1,
      };
  
      const response = await getAppraisalRating(JSON.stringify(payload)).unwrap();
  
      console.log("Rating Response:", response);
  
      // Change according to your API response
      setRatings(response.data || []);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };
  

const location = useLocation();


const option = location.state?.option;

const appraisalQuestionID =
  option?.AppraisalQuestionID ||
  option?.appraisalQuestionID ||
  option?.appraisalID ||
  "";
  console.log("Appraisal Question ID :", appraisalQuestionID);

const optionID =
  option?.optionID ||
  option?.OptionID ||
  option?.id ||
  "";
  console.log("Option ID :", optionID);
const loadOptionDetail = async () => {
  try {
    const payload = {
      userID: "169548080048036100",
      optionID: String(optionID),
    };

    const response = await getHrAppraisalQuestionOptionDetail(
      JSON.stringify(payload)
    ).unwrap();

    console.log("Option Detail Response:", response);

    if (response.data && response.data.length > 0) {
      const data = response.data[0];

      console.log("Option Detail Data:", data);

      setDescription(data.description || data.rate_description || "");
      setStatus(data.status || "Active");
      setRate(String(data.rateID || data.rate_id || ""));
    }
  } catch (err) {
    console.log("Option Detail Error:", err);
  }
};


useEffect(() => {
  if (appraisalQuestionID) {
    loadQuestionOptions(appraisalQuestionID);
  }

  if (optionID) {
    loadOptionDetail();
  }
}, [appraisalQuestionID, optionID]);

console.log("OPTION OBJECT");
console.log(option);
console.table(option);



const handleSave = async () => {
  try {
    const payload = {
      userID: "169548080048036100",
      appraisalID: "",
      questionTitle: option?.questionTitle || "",
      description: description,
      displayOrder: option?.displayOrder || "",
      status: status,
      optionID: String(optionID),
      appraisalQuestionID: String(appraisalQuestionID),
      rateID: String(rate),
    };

    console.log("Update Payload:", payload);

    const response = await updateAppraisalQuestionOption(
      JSON.stringify(payload)
    ).unwrap();

    console.log("Update Response:", response);

    if (!response.error) {
      alert("Option Updated Successfully");
      navigate("/AppraisalQuestion/index");
    } else {
      alert(response.message || "Update Failed");
    }
  } catch (err) {
    console.log(err);
    alert("Update Failed");
  }
};
const loadQuestionOptions = async (id) => {
  try {
    const payload = {
      userID: "169548080048036100",
      appraisalQuestionID: String(id),
    };

    const response = await getHrAppraisalQuestionOption(
      JSON.stringify(payload)
    ).unwrap();

    console.log(response);
    console.log("First Row:", response.data?.[0]);
console.log("Option:", response.data?.[0]?.option);
  } catch (err) {
    console.log(err);
  }
};
  
    const navigate = useNavigate();
    
      const AppraisalQuestion = () => {
        navigate("/AppraisalQuestion/index");
      };

  return (
    <Box sx={{ background: "#f5f5f5", minHeight: "100vh", p: 2 }}>
      {/* Header */}
      <Toolbar sx={{ pl: 0 }}>
        <IconButton>
           <MenuOpenIcon sx={{ color: "#1976d2",  fontSize: 35 }} 
        onClick={AppraisalQuestion} 
        />
        </IconButton>

        <Typography
          variant="h6"
          fontWeight="600"
          sx={{ ml: 1 }}
        >
          Update Option
        </Typography>
      </Toolbar>

      {/* Card */}
      <Card
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: 1,
        }}
      >
        <Typography sx={{ mb: 3 }}>
          <span
            style={{
              color: "green",
              fontWeight: 700,
            }}
          >
            Question:
          </span>{" "}
          121 . 12
        </Typography>

        {/* Rate */}
<FormControl fullWidth sx={{ mb: 3 }}>
  <InputLabel id="rating-label">Rate *</InputLabel>

  <Select
    labelId="rating-label"
    value={String(rate)}
    label="Rate *"
    onChange={(e) => setRate(e.target.value)}
  >
    {ratings.map((item) => (
      <MenuItem
        key={item.rateID}
        value={String(item.rateID)}
      >
        {item.rate_name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

        {/* Editor */}
        <Box
          sx={{
            border: "1px solid #ddd",
            borderRadius: 1,
            overflow: "hidden",
            mb: 3,
          }}
        >
          {/* Toolbar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 1,
              background: "#fafafa",
            }}
          >
            <IconButton size="small">
              <FormatBoldIcon />
            </IconButton>

            <IconButton size="small">
              <FormatItalicIcon />
            </IconButton>

            <IconButton size="small">
              <FormatUnderlinedIcon />
            </IconButton>

            <Divider orientation="vertical" flexItem />

            <IconButton size="small">
              <FormatListBulletedIcon />
            </IconButton>

            <IconButton size="small">
              <FormatListNumberedIcon />
            </IconButton>

            <Divider orientation="vertical" flexItem />

            <IconButton size="small">
              <LinkIcon />
            </IconButton>

            <IconButton size="small">
              <LinkOffIcon />
            </IconButton>

            <Divider orientation="vertical" flexItem />

            <IconButton size="small">
              <UndoIcon />
            </IconButton>

            <IconButton size="small">
              <RedoIcon />
            </IconButton>
          </Box>

          <Divider />

          {/* Text Area */}
          <TextField
            multiline
            rows={8}
            fullWidth
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputProps={{
              disableUnderline: true,
              sx: {
                p: 2,
                alignItems: "flex-start",
              },
            }}
          />
        </Box>

        {/* Status */}
        <FormControl fullWidth>
          <InputLabel>Status *</InputLabel>

          <Select
            value={status}
            label="Status *"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>

        {/* Save */}
        <Box
          sx={{
            mt: 5,
            display: "flex",
            justifyContent: "center",
          }}
        >
          
          <Button
  variant="contained"
  onClick={handleSave}
  disabled={saving}
  sx={{
    width: 85,
    height: 42,
    textTransform: "uppercase",
    borderRadius: 1,
  }}
>
  {saving ? "Saving..." : "Save"}
</Button>
        </Box>
      </Card>
    </Box>
  );
}









