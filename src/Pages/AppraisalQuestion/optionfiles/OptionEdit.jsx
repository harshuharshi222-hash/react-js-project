
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useLocation } from "react-router-dom";


import {
  useGetAppraisalRatingMutation,
  useGetHrAppraisalQuestionOptionDetailMutation,
   useGetHrAppraisalQuestionOptionMutation,
     useUpdateAppraisalQuestionOptionMutation,
} from "../../../api/constructionApi";

export default function  UpdateOption(){

     const navigate = useNavigate();
    
      const AppraisalQuestion = () => {
    navigate("/AppraisalQuestion/index");
  };


 const [rates,setRates] = useState([]);

const [rate, setRate] = useState("");
const [status, setStatus] = useState("");
const [editorValue, setEditorValue] = useState("");

  const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success",
});

const handleCloseSnackbar = (_, reason) => {
  if (reason === "clickaway") return;

  setSnackbar((prev) => ({
    ...prev,
    open: false,
  }));
};
 
const location = useLocation();

const question = location.state?.question || {};
const optionID = location.state?.optionID; // pass this while navigating

  const editorRef = useRef(null);

 

const exec = (command, value = null) => {
  if (!editorRef.current) return;

  editorRef.current.focus();

  document.execCommand(command, false, value);

  setEditorValue(
    editorRef.current.innerHTML
  );
};


const createLink = () => {
  const url = window.prompt("Enter URL");

  if (url) {
    exec("createLink", url);
  }
};

const removeLink = () => {
  exec("unlink");
};


const handleInput = () => {
  setEditorValue(editorRef.current.innerHTML);
};

const [getAppraisalRating] =
  useGetAppraisalRatingMutation();

const [getHrAppraisalQuestionOptionDetail] =
  useGetHrAppraisalQuestionOptionDetailMutation();

  const [getHrAppraisalQuestionOption] =
  useGetHrAppraisalQuestionOptionMutation();

  const [updateAppraisalQuestionOption] =
  useUpdateAppraisalQuestionOptionMutation();

  const fetchOption = async () => {
  try {
    const payload = {
      userID: "171464700312440400",
      appraisalQuestionID: String(question?.id), // or "120"
    };

    console.log("Option Payload:", payload);

    const response = await getHrAppraisalQuestionOption(
      JSON.stringify(payload)
    ).unwrap();

    console.log("Option Response:", response);

    if (response?.data?.length > 0) {
      const data = response.data[0]; // first option

      setRate(String(data.rate_id || data.rate));

      setStatus(data.status || "");

      setEditorValue(data.rate_description || "");

      if (editorRef.current) {
        editorRef.current.innerHTML =
          data.rate_description || "";
      }
    }
  } catch (error) {
    console.error("Option API Error:", error);
  }
};

console.log("Location State:", location.state);
console.log("optionID:", optionID);

useEffect(() => {
  if (question?.id) {
    fetchOption(); // history
  }

  if (optionID) {
    fetchOptionDetail(); // selected option
  }

  fetchRates();
}, [question?.id, optionID]);







const fetchOptionDetail = async () => {
  try {
    const payload = {
      userID: "169548080048036100",
      optionID: String(optionID),
    };

    console.log("Payload:", payload);

    const response = await getHrAppraisalQuestionOptionDetail(
      JSON.stringify(payload)
    ).unwrap();

    console.log("Response:", response);

    if (response?.data) {
      const data = response.data;

      setRate(String(data.rate_id));
      setStatus(data.status);
      setEditorValue(data.description || "");

      if (editorRef.current) {
        editorRef.current.innerHTML = data.description || "";
      }
    }
  } catch (error) {
    console.log("Error:", error);
  }
};


const fetchRates = async () => {
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

    setRates(response?.data || []);
  } catch (error) {
    console.log(error);
    setRates([]);
  }
};


const saveData = async () => {
  try {
    const payload = {
      userID: "169548080048036100",
      appraisalID: "",
      questionTitle: question?.question_title || "",
      description: editorValue,
      displayOrder: "",
      status: status,
      optionID: String(optionID),
      appraisalQuestionID: String(question?.id),
      rateID: String(rate),
    };

    console.log("Update Payload:", payload);

    const response = await updateAppraisalQuestionOption(
      JSON.stringify(payload)
    ).unwrap();

    console.log("Update Response:", response);

    if (response?.success || response?.status === true) {
      setSnackbar({
        open: true,
        message: response?.message || "Option updated successfully.",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/AppraisalQuestion/index");
      }, 1500);
    } else {
      setSnackbar({
        open: true,
        message: response?.message || "Update failed.",
        severity: "error",
      });
    }
  } catch (error) {
    console.error(error);

    setSnackbar({
      open: true,
      message: "Something went wrong.",
      severity: "error",
    });
  }
};

return (

<Box
sx={{
background:"#f7f7f7",
minHeight:"100vh",
padding:"20px"
}}
>


{/* Header */}

    <Box
 
  sx={{
    display: "flex",
    alignItems: "center",
    mb: 3,
    color: "#3392df",
    fontSize: "28px",
    fontWeight: 500,
    cursor: "pointer",
  }}
>

<MenuOpenIcon sx={{ mr: 1 , fontSize:30,}}
        onClick={AppraisalQuestion} 
        />




Update Option




</Box>





<Paper
sx={{
padding:3,
borderRadius:3
}}
>


{/* Question */}


<Box mb={5}>
          <Typography
            component="span"
            sx={{
              color: "green",
              fontWeight: 700,
              mr: 1,
            }}
          >
            Question:
          </Typography>

          <Typography component="span" fontSize={24}>
           {question?.id}
          </Typography>

          <Typography
            component="span"
            sx={{
              mx: 1,
              fontWeight: 600,
            }}
          >
            
           .
          </Typography>

          <Typography component="span" fontSize={24}>
            {question?.question_title}
          </Typography>
        </Box>




{/* Rate */}

<FormControl fullWidth sx={{ mb: 3 , mt:2}}>
          <InputLabel>Rate *</InputLabel>

          <Select
            value={rate}
            label="Rate *"
            onChange={(e) => setRate(e.target.value)}
          >
         {
 rates.map((item)=>(

<MenuItem
 key={item.id}
 value={item.id}
>
 {item.rate_name}
</MenuItem>

))
}
          </Select>
        </FormControl>

        <Paper
          variant="outlined"
          sx={{
            minHeight: 280,
            borderRadius: 1,
          }}
        >
         <Box
sx={{
 display:"flex",
 gap:1,
 p:1,
 borderBottom:"1px solid #ddd",
 flexWrap:"wrap"
}}
>

<IconButton
  size="small"
  sx={{
    p: 0.5,
    border: "1px solid #ddd",
    borderRadius: 0,
  }}
  onClick={()=>exec("bold")}
>
  <FormatBoldIcon sx={{ fontSize: 18 }} />
</IconButton>

<IconButton
  size="small"
  sx={{ p: 0.5, 
    border: "1px solid #ddd",
    borderRadius: 0, }}
  onClick={()=>exec("italic")}
>
  <FormatItalicIcon sx={{ fontSize: 18 }} />
</IconButton>


<IconButton
  size="small"
  sx={{ p: 0.5 ,
     border: "1px solid #ddd",
    borderRadius: 1,
  }}
  onClick={()=>exec("underline")}
>
  <FormatUnderlinedIcon sx={{ fontSize: 18 }} />
</IconButton>


<IconButton
  size="small"
  sx={{ p: 0.5,
     border: "1px solid #ddd",
    borderRadius: 1,
   }}
  onClick={()=>exec("insertUnorderedList")}
>
  <FormatListBulletedIcon sx={{ fontSize: 18 }} />
</IconButton>


<IconButton
  size="small"
  sx={{ p: 0.5,
     border: "1px solid #ddd",
    borderRadius: 1,
   }}
  onClick={()=>exec("insertOrderedList")}
>
  <FormatListNumberedIcon sx={{ fontSize: 18 }} />
</IconButton>


<IconButton
  size="small"
  sx={{ p: 0.5 ,
     border: "1px solid #ddd",
    borderRadius: 1,
  }}
  onClick={createLink}
>
  <LinkIcon sx={{ fontSize: 18 }} />
</IconButton>


<IconButton
  size="small"
  sx={{ p: 0.5,
     border: "1px solid #ddd",
    borderRadius: 1,
   }}
  onClick={removeLink}
>
  <LinkOffIcon sx={{ fontSize: 18 }} />
</IconButton>


<IconButton
  size="small"
  sx={{ p: 0.5,
     border: "1px solid #ddd",
    borderRadius: 1,
   }}
  onClick={()=>exec("undo")}
>
  <UndoIcon sx={{ fontSize: 18 }} />
</IconButton>


<IconButton
  size="small"
  sx={{ p: 0.5,
     border: "1px solid #ddd",
    borderRadius: 1,
   }}
  onClick={()=>exec("redo")}
>
  <RedoIcon sx={{ fontSize: 18 }} />
</IconButton>






</Box>
          <Box
ref={editorRef}
contentEditable
suppressContentEditableWarning
onInput={handleInput}
sx={{
 minHeight:170,
 p:2,
 outline:"none",
 fontSize:15,
 "&:empty:before":{
  //  content:'"Enter description..."',
   color:"#999"
 }
}}
/>
        </Paper>





{/* Status */}


<FormControl
fullWidth
size="small"
sx={{
mt:2
}}
>


<InputLabel>
Status *
</InputLabel>


<Select

value={status}

label="Status *"

onChange={(e)=>setStatus(e.target.value)}

>


<MenuItem value="Active">
Active
</MenuItem>


<MenuItem value="Inactive">
In Active
</MenuItem>


</Select>


</FormControl>



</Paper>





{/* Save Button */}


<Box sx={{ mt: 6 }}>
  <Button
    variant="contained"
    onClick={saveData}
    sx={{
      background: "#1976d2",
      px: 4,
      py: 1.2,
    }}
  >
    SAVE
  </Button>
</Box>
<Snackbar
  open={snackbar.open}
  autoHideDuration={3000}
  onClose={handleCloseSnackbar}
  anchorOrigin={{
    vertical: "top",
    horizontal: "right",
  }}
>
  <Alert
    onClose={handleCloseSnackbar}
    severity={snackbar.severity}
    variant="filled"
    sx={{ width: "100%" }}
  >
    {snackbar.message}
  </Alert>
</Snackbar>


</Box>

);

}


