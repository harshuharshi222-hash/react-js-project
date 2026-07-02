import {
  Dialog,DialogTitle,DialogContent,Box,Typography,IconButton,
  FormControl,Select,MenuItem,Paper,Button,
  Table,TableHead,TableRow,TableCell,TableBody,TextField, TableContainer,
  InputLabel
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import UpdateOption from "../AppraisalQuestion/optionfiles/optionEdit"

import { useNavigate } from "react-router-dom";

import React, { useEffect, useRef, useState } from "react";
import {
  useGetAppraisalRatingMutation,
  useGetHrAppraisalQuestionOptionMutation,
} from "../../api/constructionApi";

export default function AddOption({open=true,onClose=()=>{}}){


  

    const [rate, setRate] = useState("");
const [ratings, setRatings] = useState([]);
const [text, setText] = useState("");


const [getAppraisalRating, { isLoading }] =
  useGetAppraisalRatingMutation();

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


//table option //

const [description, setDescription] = useState("");
const [getHrAppraisalQuestionOption] =
  useGetHrAppraisalQuestionOptionMutation();

const [rows, setRows] = useState([]);


// useEffect(() => {
//   if (open) {
//     setRows([]);
//     setRate("");
//     if (editorRef.current) {
//       editorRef.current.innerHTML = "";
//     }
//   }
// }, [open]);

useEffect(() => {
  if (open) {
    setRate("");

    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }

    loadQuestionOptions();
  }
}, [open]);

// const loadQuestionOptions = async () => {
//   try {
//     const payload = {
//       userID: "171464700312440400",
//       appraisalQuestionID: "120",
//     };

//     const response = await getHrAppraisalQuestionOption(JSON.stringify(payload)).unwrap();

//     console.log("Question Option Response:", response);

//     // Update according to your API response
//     setRows(response.data || []);
//   } catch (error) {
//     console.error("Error fetching question options:", error);
//   }
// };

const loadQuestionOptions = async () => {
  try {
    const payload = {
      userID: "171464700312440400",
      appraisalQuestionID: "120",
    };

    const response = await getHrAppraisalQuestionOption(
      JSON.stringify(payload)
    ).unwrap();

    console.log(response);

    setRows(response.data || []);
  } catch (err) {
    console.log(err);
  }
};



const editorRef = React.useRef(null);
const executeCommand = (command, value = null) => {
  editorRef.current.focus();
  document.execCommand(command, false, value);
};

const addLink = () => {
  const url = window.prompt("Enter URL");
  if (url) {
    executeCommand("createLink", url);
  }
};
      const navigate = useNavigate();
      
        const AppraisalQuestion = () => {
          navigate("/AppraisalQuestion/index");
        };

      
     const handleEdit = (row) => {
  navigate("/AppraisalQuestion/index/addOption/optionEdit", {
    state: {
      option: row,
    },
  });
};
   
    
const handleSubmit = () => {
  if (!rate) {
    alert("Please select Rate");
    return;
  }

  if (!description.trim()) {
    alert("Please enter Description");
    return;
  }

  const selectedRate = ratings.find((item) => item.rate === rate);

  const newRow = {
    rate_name: selectedRate?.rate_name || "",
    rate: selectedRate?.rate || "",
    rate_description: description,
    added_by: "Admin",
    added_on: new Date().toLocaleDateString(),
    status: "Active",
  };

  setRows((prev) => [...prev, newRow]);

  // Clear controls
  setRate("");
  setDescription("");

  if (editorRef.current) {
    editorRef.current.innerHTML = "";
  }
};



const Tool = ({ children, onClick }) => (
  <IconButton
    size="small"
    onClick={onClick}
    sx={{
      border: "1px solid #ccc",
      borderRadius: 0,
      width: 36,
      height: 36,
    }}
  >
    {children}
  </IconButton>
);


return(


<Dialog
  open={open}
  onClose={onClose}
  fullWidth
  maxWidth="lg"
  scroll="paper"
  PaperProps={{
    sx: {
      width: "80vw",
      maxWidth: "800px",
      height: "90vh",
      overflow: "hidden",
    },
  }}
>
  <DialogTitle sx={{display:"flex",justifyContent:"space-between",fontWeight:700,borderBottom:"1px solid #f9f2f2"}}>
   Add Option
   <IconButton onClick={AppraisalQuestion}><CloseIcon sx={{color:"red"}}/></IconButton>
  </DialogTitle>
  
 <DialogContent
  sx={{
    p: 3,
    overflowY: "auto",
    maxHeight: "75vh",
  }}
>
   <Typography sx={{mb:3,fontSize:18}}><b style={{color:"#10b510"}}>Question:</b> 121 . 12</Typography>
  
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel id="rating-label">Rate *</InputLabel>

      <Select
        labelId="rating-label"
        value={rate}
        label="Rate *"
        onChange={(e) => setRate(e.target.value)}
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
   
   <Paper variant="outlined">


    <Box
  sx={{
    display: "flex",
    gap: 0.5,
    p: 1,
    borderBottom: "1px solid #ddd",
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

  <Tool onClick={() => executeCommand("insertUnorderedList")}>
    <FormatListBulletedIcon fontSize="small" />
  </Tool>

  <Tool onClick={() => executeCommand("insertOrderedList")}>
    <FormatListNumberedIcon fontSize="small" />
  </Tool>

  <Tool onClick={addLink}>
    <LinkIcon fontSize="small" />
  </Tool>

  <Tool onClick={() => executeCommand("unlink")}>
    <LinkOffIcon fontSize="small" />
  </Tool>

  <Tool onClick={() => executeCommand("undo")}>
    <UndoIcon fontSize="small"  />
  </Tool>

  <Tool onClick={() => executeCommand("redo")}>
    <RedoIcon fontSize="small" />
  </Tool>
</Box>
 

<Box
  ref={editorRef}
  contentEditable
  suppressContentEditableWarning
  onInput={(e) => setDescription(e.currentTarget.innerHTML)}
  sx={{
    minHeight: 250,
    p: 2,
    fontSize: 15,
    outline: "none",
  }}
/>





   </Paper>
   

   <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    my: 3,
  }}
>
  <Button
    variant="contained"
    sx={{ px: 5 }}
    onClick={handleSubmit}
  >
    Submit
  </Button>
</Box>
   <Typography sx={{fontWeight:700,color:"#666",mb:2}}>Option History</Typography>

<Paper variant="outlined">
  <TableContainer >
    <Table >
      <TableHead>
        <TableRow>
          <TableCell sx={{ backgroundColor: "#E3F2FD", fontWeight: "bold" }}>
            Sl No
          </TableCell>
          <TableCell sx={{ backgroundColor: "#E3F2FD", fontWeight: "bold" }}>
            Rate Name
          </TableCell>
          <TableCell sx={{ backgroundColor: "#E3F2FD", fontWeight: "bold" }}>
            Rate
          </TableCell>
          <TableCell sx={{ backgroundColor: "#E3F2FD", fontWeight: "bold" }}>
            Description
          </TableCell>
          <TableCell sx={{ backgroundColor: "#E3F2FD", fontWeight: "bold" }}>
            Added By
          </TableCell>
          <TableCell sx={{ backgroundColor: "#E3F2FD", fontWeight: "bold" }}>
            Added On
          </TableCell>
          <TableCell sx={{ backgroundColor: "#E3F2FD", fontWeight: "bold" }}>
            Status
          </TableCell>
          <TableCell sx={{ backgroundColor: "#E3F2FD", fontWeight: "bold" }}>
            Edit
          </TableCell>
          
        </TableRow>
      </TableHead>

      <TableBody>
        {rows.map((r, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{r.rate_name}</TableCell>
            <TableCell>{r.rate}</TableCell>

            <TableCell>
              <div
                dangerouslySetInnerHTML={{
                  __html: r.rate_description,
                }}
              />
            </TableCell>

            <TableCell>{r.added_by}</TableCell>
            <TableCell>{r.added_on}</TableCell>
            <TableCell>{r.status}</TableCell>

            <TableCell>
              <EditIcon
  color="primary"
  sx={{ cursor: "pointer" }}
  onClick={() => handleEdit(r)}
/>
            </TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</Paper>
  </DialogContent>
 </Dialog>);
};