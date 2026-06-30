
import React from "react";
import {
  Dialog,DialogTitle,DialogContent,Box,Typography,IconButton,
  FormControl,Select,MenuItem,Paper,Button,
  Table,TableHead,TableRow,TableCell,TableBody,TextField,
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

import { useNavigate } from "react-router-dom";

export default function AddOption({open=true,onClose=()=>{}}){



      const navigate = useNavigate();
      
        const AppraisalQuestion = () => {
          navigate("/AppraisalQuestion/index");
        };
    
 const [rate,setRate]=React.useState("");
 const [text,setText]=React.useState("");
 const rows=[{id:1,rateName:"Unsatisfactory",rate:"1",description:"king is",addedBy:"Admin",addedOn:"25-06-2026 03:41:44 pm",status:"Active"}];
 const Tool=({children})=><IconButton size="small" sx={{border:"1px solid #ccc",borderRadius:0,width:36,height:36}}>{children}</IconButton>;
 return(
 <Dialog open={open} maxWidth={false} PaperProps={{sx:{width:"100%",maxWidth:2000,borderRadius:2}}}>
  <DialogTitle sx={{display:"flex",justifyContent:"space-between",fontWeight:700,borderBottom:"1px solid #f9f2f2"}}>
   Add Option
   <IconButton onClick={AppraisalQuestion}><CloseIcon sx={{color:"red"}}/></IconButton>
  </DialogTitle>
  <DialogContent sx={{p:3}}>
   <Typography sx={{mb:3,fontSize:18}}><b style={{color:"#10b510"}}>Question:</b> 120 . rr</Typography>
   <FormControl fullWidth sx={{mb:3}}>
    <Select displayEmpty value={rate} onChange={e=>setRate(e.target.value)}>
      <InputLabel value="" disabled>Rate *</InputLabel>
   
    </Select>
   </FormControl>
   <Paper variant="outlined">
    <Box sx={{display:"flex",gap:.5,p:1,borderBottom:"1px solid #ddd"}}>
      <Tool><FormatBoldIcon fontSize="small"/></Tool><Tool><FormatItalicIcon fontSize="small"/></Tool>
      <Tool><FormatUnderlinedIcon fontSize="small"/></Tool><Tool><FormatListBulletedIcon fontSize="small"/></Tool>
      <Tool><FormatListNumberedIcon fontSize="small"/></Tool><Tool><LinkIcon fontSize="small"/></Tool>
      <Tool><LinkOffIcon fontSize="small"/></Tool><Tool><UndoIcon fontSize="small"/></Tool><Tool><RedoIcon fontSize="small"/></Tool>
    </Box>
    <TextField multiline rows={10} fullWidth variant="standard" value={text} onChange={e=>setText(e.target.value)}
      InputProps={{disableUnderline:true,sx:{p:2}}}/>
   </Paper>
   <Box sx={{display:"flex",justifyContent:"flex-end",my:3}}>
    <Button variant="contained" sx={{px:4}}>SUBMIT</Button>
   </Box>
   <Typography sx={{fontWeight:700,color:"#666",mb:2}}>Option History</Typography>
   <Paper variant="outlined">
   <Table>
    <TableHead>
      <TableRow sx={{background:"#eaf2fb"}}>
       <TableCell><b>Sl No</b></TableCell><TableCell><b>Rate Name</b></TableCell>
       <TableCell><b>Rate</b></TableCell><TableCell><b>Description</b></TableCell>
       <TableCell><b>Added By</b></TableCell><TableCell><b>Added On</b></TableCell>
       <TableCell><b>Status</b></TableCell><TableCell><b>Edit</b></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {rows.map(r=><TableRow key={r.id}>
      <TableCell>{r.id}</TableCell><TableCell>{r.rateName}</TableCell><TableCell>{r.rate}</TableCell>
      <TableCell>{r.description}</TableCell><TableCell>{r.addedBy}</TableCell><TableCell>{r.addedOn}</TableCell>
      <TableCell>{r.status}</TableCell><TableCell><EditIcon color="primary"/></TableCell>
    </TableRow>)}
    </TableBody>
   </Table>
   </Paper>
  </DialogContent>
 </Dialog>);
}
