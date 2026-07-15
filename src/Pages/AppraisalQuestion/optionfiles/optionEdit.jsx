import React, { useEffect, useRef, useState } from "react";
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
  Toolbar,
  Typography,
  Snackbar,
  Alert,
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

import { useNavigate, useLocation } from "react-router-dom";

import {
  useGetAppraisalRatingMutation,
  useGetHrAppraisalQuestionOptionDetailMutation,
  useUpdateAppraisalQuestionMutation,
  useGetHrAppraisalQuestionOptionMutation,
} from "../../../api/constructionApi";

export default function UpdateOption() {
  const navigate = useNavigate();
  const location = useLocation();

  const option = location.state?.option;

  const editorRef = useRef(null);

  const [rate, setRate] = useState("");
  const [status, setStatus] = useState("Active");
  const [description, setDescription] = useState("");
  const [ratings, setRatings] = useState([]);
  const [questionData, setQuestionData] = useState({});

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const [getAppraisalRating] =
    useGetAppraisalRatingMutation();
  const [
    getHrAppraisalQuestionOption,
    { isLoading: optionLoading },
  ] = useGetHrAppraisalQuestionOptionMutation();

  const [
    getHrAppraisalQuestionOptionDetail,
    { isLoading: detailLoading },
  ] = useGetHrAppraisalQuestionOptionDetailMutation();

  const [
    updateAppraisalQuestion,
    { isLoading: saving },
  ] = useUpdateAppraisalQuestionMutation();

  useEffect(() => {
    loadRatings();
  }, []);

  const loadRatings = async () => {
    try {
      const payload = {
        userID: "169548080048036100",
        status: "Active",
        sortOrder: "",
        generalSearch: "",
        iDisplayStart: 0,
        iDisplayLength: -1,
      };

      const response = await getAppraisalRating(
        JSON.stringify(payload)
      ).unwrap();

      console.log("Rating API:", response);

      if (response?.data) {
        setRatings(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadQuestionOption = async () => {
    try {
      const payload = {
        userID: "169548080048036100",
        appraisalQuestionID: option?.appraisal_question_id,
      };

      const response = await getHrAppraisalQuestionOption(
        JSON.stringify(payload)
      ).unwrap();

     const optionData = response.data.find(
    (item) => item.option_id === option.option_id
);
if(optionData){

   setRate(optionData.rate || "");

    setStatus(optionData.status);

    setDescription(optionData.rate_description);

    if(editorRef.current){
        editorRef.current.innerHTML =
            optionData.rate_description || "";
    }

}


      console.log("Payload:", payload);


      console.log("Option Response:", response);

      
    } catch (err) {
      console.log("Option API Error:", err);
    }
  };


  useEffect(() => {
    loadQuestionOption();
  }, []);

const optionID = async (e) => {
    const selectedRate = e.target.value;

    setRate(selectedRate);

    const selected = ratings.find(
        (item) => item.rate === selectedRate
    );

    if (!selected) return;

    try {

        const payload = {
            userID: "169548080048036100",
            optionID: String(selected.id),
        };

        const response =
            await getHrAppraisalQuestionOptionDetail(
                JSON.stringify(payload)
            ).unwrap();

        const data = Array.isArray(response.data)
            ? response.data[0]
            : response.data;

        setStatus(data.status);

        setDescription(data.rate_description || "");

        if (editorRef.current) {
            editorRef.current.innerHTML =
                data.rate_description || "";
        }

    } catch (err) {
        console.log(err);
    }
};

  const executeCommand = (command, value = null) => {
    if (!editorRef.current) return;

    editorRef.current.focus();

    document.execCommand(command, false, value);
  };

  const addLink = () => {
    const url = prompt("Enter URL");

    if (url) {
      executeCommand("createLink", url);
    }
  };

  const Tool = ({ children, onClick }) => (
    <IconButton
      size="small"
      onClick={onClick}
      sx={{
        border: "1px solid #ccc",
        width: 36,
        height: 36,
        borderRadius: 0,
      }}
    >
      {children}
    </IconButton>
  );

  const handleSave = async () => {
    try {
      const payload = {
        userID: "169548080048036100",
        appraisalID: option?.otion_id || "",
        questionTitle: option?.question_title  || "",
        description: "",
        appraisalQuestionID: option ?.appraisal_question_id
          || "",
        displayOrder: option?.display_order || "",
        status,
        categoryID: option?.category_id || "",
      };
      console.log("Save Payload", payload);

      const response =
        await updateAppraisalQuestion(
          JSON.stringify(payload)
        ).unwrap();

      console.log(response);

      setSnackbar({
        open: true,
        severity: "success",
        message: "Updated Successfully",
      });

      setTimeout(() => {
        navigate("/AppraisalQuestion/index");
      }, 1000);
    } catch (err) {
      console.log(err);

      setSnackbar({
        open: true,
        severity: "error",
        message: "Update Failed",
      });
    }
  };

  const AppraisalQuestion = () => {
    navigate("/AppraisalQuestion/index");
  };


  return (
    <Box sx={{ background: "#f5f5f5", minHeight: "100vh", p: 2 }}>
      {/* Header */}
      <Toolbar sx={{ pl: 0 }}>
        <IconButton onClick={AppraisalQuestion}>
          <MenuOpenIcon
            sx={{
              color: "#1976d2",
              fontSize: 35,
            }}
          />
        </IconButton>

        <Typography
          variant="h6"
          fontWeight={600}
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
          boxShadow: 2,
        }}
      >
        {/* Question */}
        <Typography sx={{ mb: 3 }}>
          <span
            style={{
              color: "green",
              fontWeight: 700,
            }}
          >
            Question :
          </span>{" "}
          {option?.questionTitle || ""}
        </Typography>

        {/* Rate */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="rating-label">
            Rate *
          </InputLabel>

        <Select
    value={rate ?? ""}
    label="Rate *"
    onChange={optionID}
>
    {ratings.map((item) => (
        <MenuItem
            key={item.id}
            value={item.rate}
        >
            {item.rate_name}
        </MenuItem>
    ))}
</Select>


        </FormControl>

        {/* Rich Text Editor */}
        <Box
          sx={{
            border: "1px solid #d9d9d9",
            borderRadius: 1,
            overflow: "hidden",
            mb: 3,
          }}
        >
          {/* Toolbar */}
          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              p: 1,
              borderBottom: "1px solid #d9d9d9",
              background: "#fafafa",
            }}
          >
            <Tool onClick={() => executeCommand("bold")}>
              <FormatBoldIcon fontSize="small" />
            </Tool>

            <Tool onClick={() => executeCommand("italic")}>
              <FormatItalicIcon fontSize="small" />
            </Tool>

            <Tool onClick={() => executeCommand("underline")}>
              <FormatUnderlinedIcon fontSize="small" />
            </Tool>

            <Tool
              onClick={() =>
                executeCommand("insertUnorderedList")
              }
            >
              <FormatListBulletedIcon fontSize="small" />
            </Tool>

            <Tool
              onClick={() =>
                executeCommand("insertOrderedList")
              }
            >
              <FormatListNumberedIcon fontSize="small" />
            </Tool>

            <Tool onClick={addLink}>
              <LinkIcon fontSize="small" />
            </Tool>

            <Tool
              onClick={() => executeCommand("unlink")}
            >
              <LinkOffIcon fontSize="small" />
            </Tool>

            <Tool
              onClick={() => executeCommand("undo")}
            >
              <UndoIcon fontSize="small" />
            </Tool>

            <Tool
              onClick={() => executeCommand("redo")}
            >
              <RedoIcon fontSize="small" />
            </Tool>
          </Box>

          <Divider />

          {/* Editor */}
          <Box
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) =>
              setDescription(
                e.currentTarget.innerHTML
              )
            }
            sx={{
              minHeight: 220,
              p: 2,
              outline: "none",
              fontSize: 16,
              background: "#fff",
            }}
          />
        </Box>

        {/* Status */}
        <FormControl fullWidth>
          <InputLabel>Status *</InputLabel>

          <Select
            value={status}
            label="Status *"
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <MenuItem value="Active">
              Active
            </MenuItem>

            <MenuItem value="Inactive">
              Inactive
            </MenuItem>
          </Select>
        </FormControl>

        {/* Buttons */}
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
              width: 110,
              height: 42,
              borderRadius: 1,
              textTransform: "uppercase",
            }}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </Box>
      </Card>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() =>
            setSnackbar({
              ...snackbar,
              open: false,
            })
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}