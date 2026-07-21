import React, { useState, useRef } from "react";
import AddOption from "../optionfiles/Option";
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
} from "@mui/material";

import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  Link,
  LinkOff,
  Undo,
  Redo,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function  UpdateOption(){

     const navigate = useNavigate();
    
      




    


  const editorRef = useRef(null);


  const [rate, setRate] = useState("5");

  const [status, setStatus] = useState("Active");


  const [content, setContent] = useState("kok");


  const ratings = [
    {
      value:"1",
      label:"Poor (1)"
    },
    {
      value:"2",
      label:"Average (2)"
    },
    {
      value:"3",
      label:"Good (3)"
    },
    {
      value:"4",
      label:"Excellent (4)"
    },
    {
      value:"5",
      label:"Rock star (5)"
    }
  ];



  const execCommand = (command)=>{

    document.execCommand(command,false,null);

    setContent(editorRef.current.innerHTML);

  }



  const saveData = ()=>{


    const payload = {

      questionId:144,

      rate:rate,

      description:editorRef.current.innerHTML,

      status:status

    };


    console.log(payload);

  }



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
display:"flex",
alignItems:"center",
mb:2
}}
>

<Typography
fontSize="20px"
fontWeight="600"
>

☰

</Typography>


<Typography
sx={{
ml:3
}}
fontSize="20px"
fontWeight="600"
>

Update Option

</Typography>


</Box>





<Paper
sx={{
padding:3,
borderRadius:3
}}
>


{/* Question */}


<Typography
sx={{
mb:2
}}
>


<span
style={{
color:"green",
fontWeight:"600"
}}
>
Question:
</span>


&nbsp;

144


&nbsp; |1 test


</Typography>





{/* Rate */}


<FormControl
fullWidth
size="small"
sx={{
mb:2
}}
>


<InputLabel>
Rate *
</InputLabel>


<Select

value={rate}

label="Rate *"

onChange={(e)=>setRate(e.target.value)}

>


{
ratings.map((item)=>(

<MenuItem
key={item.value}
value={item.value}
>

{item.label}

</MenuItem>

))
}


</Select>


</FormControl>






{/* Rich Text Editor */}



<Box

sx={{

border:"1px solid #ccc",

borderRadius:1,

height:"225px"

}}

>


{/* Toolbar */}


<Box
sx={{
display:"flex",
padding:"8px",
borderBottom:"1px solid #ddd"
}}
>


<IconButton
onClick={()=>execCommand("bold")}
>
<FormatBold/>
</IconButton>


<IconButton
onClick={()=>execCommand("italic")}
>
<FormatItalic/>
</IconButton>


<IconButton
onClick={()=>execCommand("underline")}
>
<FormatUnderlined/>
</IconButton>



<IconButton
onClick={()=>execCommand("insertUnorderedList")}
>
<FormatListBulleted/>
</IconButton>


<IconButton
onClick={()=>execCommand("insertOrderedList")}
>
<FormatListNumbered/>
</IconButton>


<IconButton
onClick={()=>execCommand("createLink")}
>
<Link/>
</IconButton>



<IconButton
onClick={()=>execCommand("unlink")}
>
<LinkOff/>
</IconButton>



<IconButton
onClick={()=>execCommand("undo")}
>
<Undo/>
</IconButton>


<IconButton
onClick={()=>execCommand("redo")}
>
<Redo/>
</IconButton>



</Box>





<Box

ref={editorRef}

contentEditable

suppressContentEditableWarning

onInput={(e)=>
setContent(e.currentTarget.innerHTML)
}

sx={{

padding:"12px",

height:"160px",

outline:"none",

fontSize:"18px"

}}

dangerouslySetInnerHTML={{
__html:content
}}


/>


</Box>







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
Inactive
</MenuItem>


</Select>


</FormControl>



</Paper>





{/* Save Button */}


<Box
textAlign="center"
mt={3}
>


<Button

variant="contained"

onClick={saveData}

sx={{

background:"#1976d2",

padding:"10px 35px"

}}

>

SAVE

</Button>


</Box>




</Box>

);

}


