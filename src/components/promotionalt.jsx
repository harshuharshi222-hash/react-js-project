// import React, { useState } from "react";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import {
  Box,
  Checkbox,
  ListItemText,
  Button,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Directions } from "@mui/icons-material";



import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";





const rows = [
  {
    id: 1,
    project: "",
    activity: "",
    fromDate: "",
    toDate: "",
    description: "",
    addedBy: "",
    addedOn: "",
    status: "Active",
  },
  {
    id: 2,
    project: "",
    activity: "",
    fromDate: "",
    toDate: "",
    description: "",
    addedBy: "",
    addedOn: "",
    status: "In-Active",
  },
  {
    id: 3,
    project: "",
    activity: "",
    fromDate: "",
    toDate: "",
    description: "",
    addedBy: "",
    addedOn: "",
    status: "",
  },
  {
    id: 4,
    project: "",
    activity: "",
    fromDate: "",
    toDate: "",
    description: "",
    addedBy: "",
    addedOn: "",
    status: "",
  },
   {
    id: 5,
    project: "",
    activity: "",
    fromDate: "",
    toDate: "",
    description: "",
    addedBy: "",
    addedOn: "",
    status: "",
  },
   {
    id: 6,
    project: "",
    activity: "",
    fromDate: "",
    toDate: "",
    description: "",
    addedBy: "",
    addedOn: "",
    status: "",
  },
];
import React, { useEffect, useState } from "react";

import {
  useGetConstructionLinkPaymentMutation,
} from "../api/constructionApi";




export default function PromotionalActivity() {

   const [tableData, setTableData] = useState([]);

  const [
    getConstructionLinkPayment,
    { isLoading, error },
  ] = useGetConstructionLinkPaymentMutation();

 

  const loadData = async () => {
    try {
      const payload = {
        // UserID: "171903551052335600",
        userID:"171903551052335600",milestoneName:"",status:"Active",generalSearch:"",sortOrder:"",iDisplayStart:0,iDisplayLength:10
        // CompanyID: "1",
      };

      const response =
        await getConstructionLinkPayment(payload).unwrap();

      console.log("API Response:", response);

      setTableData(response.data?.data || []);
      console.log("tableData after API:", response.data);
    } catch (err) {
      console.error("API Error:", err);
    }
  };
  // useEffect(() => {
  //   loadData();
  // }, []);
  useEffect(() => {
  console.log("Updated tableData:", tableData);
}, [tableData]);
   console.log(tableData,"tableData")
   console.log(tableData);
console.log(tableData[0]);

console.log("tableData =", tableData);
console.log("first row =", tableData[0]);
  // return (
  //   <div>
  //     <h2>Construction Payment List</h2>

  //     {isLoading && <p>Loading...</p>}

  //     {error && <p>Error Loading Data</p>}

  //     <table border="1">
  //       <thead>
  //         <tr>
  //           <th>ID</th>
  //           <th>Name</th>
  //           <th>Mobile</th>
  //         </tr>
  //       </thead>

  //       <tbody>
  //         {tableData.map((rows, index) => (
  //           <tr key={index}>
  //             <td>{rows.ID}</td>
  //             <td>{rows.Name}</td>
  //             <td>{rows.Mobile}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );


    const totalPages = 1;
     const navigate = useNavigate();
   const handlegotocreate = () => {
      navigate('/create')
   }

       const navigate1 = useNavigate();
   const handlegotodashboard = () => {
      navigate1('/dashboard')
   }

    const navigate2 = useNavigate();
        const handlegotoupdate = () => {
           navigate2('/update')
        }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const adornmentId = React.useId();
  const textFieldId = React.useId();
  const sxId = React.useId();


   const [selected, setSelected] = useState([]);

  const handleChange = (event) => {
    const value = event.target.value;
 
    setSelected(typeof value === "string" ? value.split(",") : value);
 };
 const columns = [
  "S.No",
  "Project Name",
  "Activity Title",
  "From Date",
  "To Date",
  "Description",
  "Added By",
  "Added On",
  "Status",
];

const [columnWidths, setColumnWidths] = useState({
  "S.No": 80,
  "Project Name": 180,
  "Activity Title": 180,
  "From Date": 140,
  "To Date": 140,
  "Description": 220,
  "Added By": 140,
  "Added On": 140,
  "Status": 120,  
});

const startResize = (e, column) => {
  e.preventDefault();

  const startX = e.clientX;
  const startWidth = columnWidths[column];

  const handleMouseMove = (moveEvent) => {
    const newWidth = startWidth + (moveEvent.clientX - startX);

    setColumnWidths((prev) => ({
      ...prev,
      [column]: Math.max(newWidth, 60),
    }));
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
};
  return (
    <Box sx={{ background: "#f5f5f5", minHeight: "100vh", p: 2 }}>    
      {/* Header */}
 
   <Box
    sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  }}
>
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
    }}
  >
    {/* Menu Open Icon */}
    <IconButton>
      <MenuOpenIcon
        sx={{
          color: "#555",
          fontSize: 30,
          mr: 1,
        }}
       onClick={handlegotodashboard}
      />
    </IconButton>

    {/* Title */}
    <Typography
      variant="h6"
      sx={{
        color: "black",
        fontWeight: 30,
        display: "flex",
        alignItems: "center",
      }}
    >
      Promotional Activity

      {/* Add Icon */}
      <IconButton>
        <AddCircleIcon
          sx={{
            color: "#6c4ce3",
            fontSize: 36,
            p: "5px",
            ml: 1,
          }}

        onClick={handlegotocreate}
        />
      </IconButton>
    </Typography>
  </Box>
        
                     


          <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      

      {/* Select Dropdown */}
     
      
  
     <div>
  <FormControl size="small">
    <Select
      multiple
      value={selected}
      onChange={handleChange}
      displayEmpty
      IconComponent={() => null}

      renderValue={() => (
        <FilterListIcon
          sx={{
            color: "#6c6868",
            fontSize: 26,
          }}
        />
      )}

      sx={{
        width: 45,
        height: 40,
        border: "1px solid #a5a8ad",
        borderRadius: "3px",
      

        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },

        "& .MuiSelect-select": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0px !important",
        },

        "&:hover": {
         
        },
      }}
    >
      <MenuItem value="SL No">
        <Checkbox checked={selected.indexOf("SL No") > -1} />
        <ListItemText primary="SL No" />
      </MenuItem>

      <MenuItem value="PRO">
        <Checkbox checked={selected.indexOf("PRO") > -1} />
        <ListItemText primary="PRO" />
      </MenuItem>

      <MenuItem value="ANi">
        <Checkbox checked={selected.indexOf("ANi") > -1} />
        <ListItemText primary="ANi" />
      </MenuItem>
    </Select>
  </FormControl>
</div>


          

                                      

          <FormControl size="small" sx={{ minWidth: 220 }}>
            <InputLabel>Project</InputLabel>
            <Select label="Project">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="1">ANIRVAN PHASE - 1</MenuItem>
              <MenuItem value="2">ANIRVAN PHASE - 4</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Status</InputLabel>
            <Select label="Status">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          {/* <TextField size="small" label="Search" /> */}
         
          <TextField
          
        id={`${textFieldId}-input`}
        label="Search"
        size="small"
       
       
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
               
              <SearchIcon/>

              </InputAdornment>
            ),
          },
        }}
        variant="standard"
      />
   

          <Button variant="contained" size="small">Search</Button>
        </Box>
      </Box>

      {/* Table */}


       <Paper
  sx={{
    width: "100%",
    overflow: "hidden",
    border: "1px solid #dcdcdc",
    borderRadius: 2,
  }}
>
  <TableContainer sx={{ overflowX: "auto" }}>
    <Table sx={{tableLayout:"fixed", width:"100%"}}>
        
      <TableHead>
  <TableRow sx={{ background: "#f1f1f1" }}>
    {columns?.map((head) => (
      <TableCell
        key={head}
        sx={{
          position: "relative",
          width: columnWidths[head],
          minWidth: columnWidths[head],
          maxWidth: columnWidths[head],
          borderBottom: "1px solid #dcdcdc",
          fontWeight: 700,
          background: "#f5f5f5",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {head}

        <Box
          onMouseDown={(e) => startResize(e, head)}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "8px",
            height: "100%",
            cursor: "col-resize",
            zIndex: 10,
             borderRight: "1px solid #e0e0e0",

            "&:hover": {
              // backgroundColor: "#16181a",
             
            },
          }}
        />
      </TableCell>
    ))}
  </TableRow>
</TableHead>

<TableBody>
  {isLoading ? (
    <TableRow>
      <TableCell colSpan={9} align="center">
        Loading...
      </TableCell>
    </TableRow>
  ) : error ? (
    <TableRow>
      <TableCell colSpan={9} align="center">
        Error Loading Data
      </TableCell>
    </TableRow>
  ) : tableData?.length > 0 ? (
    tableData?.map((rows, index) => (
      <TableRow key={index}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{rows.ProjectName}</TableCell>
        <TableCell>{rows.ActivityTitle}</TableCell>
        <TableCell>{rows.FromDate}</TableCell>
        <TableCell>{rows.ToDate}</TableCell>
        <TableCell>{rows.Description}</TableCell>
        <TableCell>{rows.AddedBy}</TableCell>
        <TableCell>{rows.AddedOn}</TableCell>
        <TableCell>{rows.Status}</TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={9} align="center">
        No Data Found
      </TableCell>
    </TableRow>
  )}
</TableBody>
    </Table>




  </TableContainer>

  {/* Pagination */}


     <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5",
        padding: "10px 20px",
        borderRadius: "4px",
      }}
    >
      {/* Previous Button */}
      <Button
        variant="contained"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        sx={{
          minWidth: "220px",
          backgroundColor: "#e0e0e0",
          color: "#9e9e9e",
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#d6d6d6",
            boxShadow: "none",
          },
        }}
      >
        Previous
      </Button>

      {/* Page Text */}
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 500,
        }}
      >
        Page {page} of {totalPages}
      </Typography>

      {/* Rows Dropdown */}
      <Select
        value={rowsPerPage}
        onChange={(e) => setRowsPerPage(e.target.value)}
        size="small"
        sx={{
          width: "140px",
          backgroundColor: "#fff",
        }}
      >
        <MenuItem value={5}>5 rows</MenuItem>
        <MenuItem value={10}>10 rows</MenuItem>
        <MenuItem value={25}>25 rows</MenuItem>
      </Select>

      {/* Next Button */}
      <Button
        variant="contained"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        sx={{
          minWidth: "220px",
          backgroundColor: "#e0e0e0",
          color: "#bdbdbd",
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#d6d6d6",
            boxShadow: "none",
          },
        }}
      >
        Next
      </Button>
    </Box>
  
</Paper> 



    </Box>
  );
}