import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Paper,
  Button,
  InputLabel,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
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

import {
  useCreateAppraisalQuestionOptionMutation,
  useGetHrAppraisalQuestionOptionMutation,
   useGetAppraisalRatingMutation,
} from "../../../api/constructionApi";


export default function AddOption() {

  const location = useLocation();
  const navigate = useNavigate();
 const UpdateOption = () => {
        navigate('/AppraisalQuestion/index/addOption/optionEdit')
     }

  const question = location.state?.question || {};
  const optionID = location.state?.optionID || "";

  const open = true;

  const onClose = () => {
    navigate(-1);
  };


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


  const editorRef = useRef(null);
const [rate, setRate] = useState("");

const [editorValue, setEditorValue] = useState("");

const [history, setHistory] = useState([]);

const [rates,setRates] = useState([]);

const [getHrAppraisalQuestionOption] =
  useGetHrAppraisalQuestionOptionMutation();

const [createAppraisalQuestionOption] =
  useCreateAppraisalQuestionOptionMutation();
  const [getAppraisalRating] =
  useGetAppraisalRatingMutation();


const fetchRates = async () => {

  try {

    const payload = {
      userID: "171464700312440400",
      status: "Active",
      sortOrder: "",
      generalSearch: "",
      iDisplayStart: 0,
      iDisplayLength: -1,
    };


    console.log(
      "Appraisal Rating Payload:",
      payload
    );


    const response =
      await getAppraisalRating(JSON.stringify(payload)).unwrap();


    console.log(
      "Appraisal Rating Response:",
      response
    );


    setRates(
      response?.data || []
    );


  } catch(error){

    console.error(
      "Appraisal Rating Error:",
      error
    );


    setRates([]);

  }

};


  const fetchHistory = async () => {
  try {

    const payload = {
      userID: "171464700312440400",
      appraisalQuestionID: String(question?.id),
    };


    console.log(
      "History API Payload:",
      payload
    );


    const response =
      await getHrAppraisalQuestionOption(
        JSON.stringify(payload)
      ).unwrap();


    console.log(
      "History API Response:",
      response
    );


    setHistory(
      response?.data || []
    );


  } catch (error) {

    console.error(
      "History API Error:",
      error
    );


    setHistory([]);

  }
};

const appraisalQuestionID =
  question?.appraisal_question_id ||
  question?.appraisalQuestionID ||
  question?.id ||
  "";

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

useEffect(() => {
  if (!appraisalQuestionID) return;

  fetchRates();
  fetchHistory();
}, [appraisalQuestionID]);


const handleSubmit = async () => {
  if (!rate) {
    setSnackbar({
      open: true,
      message: "Please select Rate",
      severity: "warning",
    });
    return;
  }

  if (!editorValue.trim()) {
    setSnackbar({
      open: true,
      message: "Please enter Description",
      severity: "warning",
    });
    return;
  }

  const payload = {
    userID: "169548080048036100",
    displayOrder: "",
    appraisalQuestionID: String(question?.id),
    rateID: String(rate),
    description: editorValue,
   
  };

  console.log("Request Payload:", payload);

  try {
  
    const response = await createAppraisalQuestionOption(  JSON.stringify(payload)).unwrap();

    console.log("Create Response:", response);

    if (
      response?.status === true ||
      response?.success === true ||
      response?.statusCode === 200
    ) {
      setSnackbar({
        open: true,
        message: response.message || "Option created successfully.",
        severity: "success",
      });


      setEditorValue("");

      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }

      fetchHistory();
    } else {
      setSnackbar({
        open: true,
        message: response.message || "Unable to save option.",
        severity: "error",
      });
    }
  } catch (error) {
    console.error("Create API Error:", error);

    setSnackbar({
      open: true,
      message:
        error?.data?.message ||
        error?.error ||
        "Something went wrong.",
      severity: "error",
    });
  }
};

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xl"
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Add Option

        <IconButton onClick={onClose}>
    <CloseIcon sx={{ color: "red" }} />
</IconButton>
      </DialogTitle>

      <DialogContent>

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

        <Box
          display="flex"
          justifyContent="flex-end"
          mt={3}
        >
          <Button
            variant="contained"
            disabled={!rate || editorValue.trim() === ""}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>

            <Typography
          variant="h6"
          sx={{
            mt: 5,
            mb: 2,
            fontWeight: 700,
          }}
        >
          Option History
        </Typography>

        <TableContainer component={Paper} variant="outlined">
          <Table
  sx={{
    "& .MuiTableCell-root": {
      border: "1px solid #dcdcdc",
    },
  }}
>
          <TableHead>
  <TableRow sx={{ backgroundColor: "#EEF5FC" }}>
    <TableCell sx={{ fontWeight: 700 }}>Sl No</TableCell>
    <TableCell sx={{ fontWeight: 700 }}>Rate Name</TableCell>
    <TableCell sx={{ fontWeight: 700 }}>Rate</TableCell>
    <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
    <TableCell sx={{ fontWeight: 700 }}>Added By</TableCell>
    <TableCell sx={{ fontWeight: 700 }}>Added On</TableCell>
    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
    <TableCell align="center" sx={{ fontWeight: 700 }}>
      Action
    </TableCell>
  </TableRow>
</TableHead>

            <TableBody>
              {history.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    align="center"
                    sx={{
                      py: 4,
                      color: "#777",
                    }}
                  >
                    No Records Found
                  </TableCell>
                </TableRow>
              ) : (
                history.map((item, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>{item.rate_name}</TableCell>

                    <TableCell>{item.rate}</TableCell>

                    <TableCell>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.rate_description,
                        }}
                      />
                    </TableCell>

                    <TableCell>{item.added_user_name}</TableCell>

                    <TableCell>{item.added_on}</TableCell>

                    <TableCell>{item.status}</TableCell>

                    <TableCell align="center">
<IconButton
  onClick={() => { 
    console.log("Selected Item:", item);
console.log("item.option_id =", item.option_id);
console.log("item.id =", item.id);

    navigate("/AppraisalQuestion/index/addOption/optionEdit", {
      state: {
        question,
        optionID: item.option_id,
      },
    });
  }} 
>
  <EditIcon />
</IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

      </DialogContent>
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
    </Dialog>
  );
}
