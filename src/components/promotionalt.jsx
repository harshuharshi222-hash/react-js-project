// import React, { useState } from "react";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
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
import ClearIcon from "@mui/icons-material/Clear";
import Tooltip from '@mui/material/Tooltip';


import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";





const rows = [
  {
    id: 1,
    project: "",
    activity: "",
    addedOn: "",
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

import {
  useUpdateConstructionLinkPaymentMutation,
} from "../api/constructionApi";


export default function PromotionalActivity() {


  
const [searchText, setSearchText] = useState("");
const [tableData, setTableData] = useState([]);
const [status, setStatus] = useState("Active");

const handleDownload = () => {
  if (!tableData || tableData.length === 0) {
    alert("No data available");
    return;
  }

  const headers = Object.keys(tableData[0]).join(",");
  const rows = tableData.map((row) =>
    Object.values(row).join(",")
  );

  const csvContent = [headers, ...rows].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "table_data.csv");

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

   

  const [
    getConstructionLinkPayment,
    { isLoading, error },
  ] = useGetConstructionLinkPaymentMutation();

  const [updateConstructionLinkPayment] =
  useUpdateConstructionLinkPaymentMutation();
  
 useEffect(() => {
    loadData();
   }, []);
   


 
  const loadData = async () => {
  try {
    const payload = {
      userID: "171903551052335600",
      milestoneName: searchText,
      status: status,
      generalSearch: searchText,
      sortOrder: "",
      iDisplayStart: 0,
      iDisplayLength: 10,
    };

    const response = await getConstructionLinkPayment(payload).unwrap();

    console.log("Full Response:", response);

    // Check actual API structure here
   
    
    
  const apiData =
  response?.data ||
  response?.result ||
  response?.records ||
  [];

const formattedData = apiData.map((item) => ({
  milestone_name:
    item.milestone_name || item.milestoneName,

  display_order:
    item.display_order || item.displayOrder,

  percentage: item.percentage,

  updated_user_name:
    item.updated_user_name ||
    item.updatedUserName ||
    "",

  added_on:
    item.added_on ||
    item.addedOn ||
    "",

  status:
    item.status || "Active",
}));

const updatedData = apiData.map((item) => ({
  clpID: item.clpID || item.clp_id,

  milestone_name:
    item.milestone_name || item.milestoneName,

  display_order:
    item.display_order || item.displayOrder,

  percentage: item.percentage,

  description: item.description,

  status: item.status,

  updated_user_name:
    item.updated_user_name ||
    item.updatedUserName,

  added_on:
    item.added_on ||
    item.addedOn,
}));

setTableData(updatedData);

setTableData(formattedData);
    // setTableData(data);

     const localData =
      JSON.parse(localStorage.getItem("clpMilestones")) || [];

    console.log("API Data", apiData);
    console.log("Local Data", localData);

     const mergedData = [...localData, ...apiData];

    console.log("Merged Data:", mergedData);
   s;
    setTableData([...localData, ...apiData]);
  } catch (err) {
    console.error(err);
  }
};
  
  useEffect(() => {
  console.log("Updated tableData:", tableData);
}, [tableData]);
   console.log(tableData,"tableData")
  console.log("tableData =", tableData);
  console.log("first row =", tableData?.[0]);


console.log("tableData =", tableData);
console.log("first row =", tableData[0]);



const filteredData = tableData.filter((row) => {
  const matchesSearch =
    row.milestone_name
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

  const matchesStatus =
    !status ||
    row.status?.toLowerCase() === status.toLowerCase();

  return matchesSearch && matchesStatus;
});




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
        // const handlegotoupdate = () => {
        //    navigate2('/update')
        // }

        const handlegotoupdate = (row) => {
  navigate2("/update", {
    state: row,
  });
};

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


  //  const [selected, setSelected] = useState([]);

  //  const [status, setStatus] = useState("Active");
  const allColumns = [
  "SL No",
  "Milestone",
  "Display Order",
  "Percentage",
  "Added By",
  "Added On",
  "Status",
];

const [selected, setSelected] = useState(allColumns);


const visibleColumns = [
  selected.includes("SL No") && "S.No",
  selected.includes("Milestone") && "Milestone Name",
  selected.includes("Display Order") && "Display Order",
  selected.includes("Percentage") && "Percentage",
  selected.includes("Added By") && "Added By",
  selected.includes("Added On") && "Added On",
  selected.includes("Status") && "Status",
].filter(Boolean);

  const handleChange = (event) => {
    const value = event.target.value;
 
    setSelected(typeof value === "string" ? value.split(",") : value);
 };
 const columns = [
  "S.No",
  "Milestone Name",
  "Display Order",
  "Percentage",
  "Added By",
  "Added On ",
  "Status",
];

const [columnWidths, setColumnWidths] = useState({
  "S.No": 80,
  "Project Id":80,
  "Project Name": 180,
  "Activity Title": 180,
  "Added On": 140,
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
console.log("tableData =", tableData);
console.log("First Row =", tableData?.[0]);
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
      CLP Milestone

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
    <Tooltip title="Export">
    <IconButton onClick={handleDownload}>
  <SystemUpdateAltIcon
    sx={{
      color: "#6C63FF",
      fontSize: 30,
       ml: -2,
    }}
  />
      </IconButton>
      </Tooltip>
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

      <MenuItem value="Milestone">
        <Checkbox checked={selected.indexOf("Milestone") > -1} />
        <ListItemText primary="Milestone Name" />
      </MenuItem>

      <MenuItem value="Display Order">
        <Checkbox checked={selected.indexOf("Display Order") > -1} />
        <ListItemText primary="Display Order" />
      </MenuItem>

      <MenuItem value="Percentage">
        <Checkbox checked={selected.indexOf("Percentage") > -1} />
        <ListItemText primary="Percentage" />
      </MenuItem>

      <MenuItem value="Added By">
        <Checkbox checked={selected.indexOf("Added By") > -1} />
        <ListItemText primary="Added By" />
      </MenuItem>
      
      <MenuItem value="Added On">
        <Checkbox checked={selected.indexOf("Added On") > -1} />
        <ListItemText primary="Added On" />
      </MenuItem>
      
       <MenuItem value="Status">
        <Checkbox checked={selected.indexOf("Status") > -1} />
        <ListItemText primary="Status" />
      </MenuItem>

      
    </Select>
  </FormControl>
</div>


        
          <FormControl size="small" sx={{ minWidth: 160 }}>
  <InputLabel>Status</InputLabel>
  <Select
    value={status}
    label="Status"
    onChange={(e) => setStatus(e.target.value)}
  >
    <MenuItem value="Active">Active</MenuItem>
    <MenuItem value="inActive">In-Active</MenuItem>
  </Select>
</FormControl>

       
         

    <TextField
  label="Search"
  size="small"
  variant="standard"
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
  slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    },
  }}
/>

          <Button
  variant="contained"
  size="small"
  onClick={loadData}
>
  Search
</Button>


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

  <TableContainer
  component={Paper}
  sx={{
    overflowX: "auto",
    border: "1px solid #dcdcdc",
    
  }}
>
  <Table
    sx={{
      tableLayout: "auto",
      width: "100%",
      borderCollapse: "collapse",
      whiteSpace: "nowrap",
      textAlign: "center",
    }}
  >
    <TableHead>
      <TableRow sx={{ background: "#f1f1f1" }}>
      
          {visibleColumns.map((head) => (
          <TableCell
            key={head}
            sx={{
              position: "relative",
              width: columnWidths[head],
              minWidth: columnWidths[head],
              maxWidth: columnWidths[head],
              fontWeight: 700,
              background: "#f5f5f5",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textAlign: "center",
              border: "1px solid #dcdcdc", // Header border
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
                textAlign: "center",
              }}
            />
          </TableCell>
        ))}
      </TableRow>
    </TableHead>

    <TableBody>
      {filteredData.length > 0 ? (
        filteredData.map((row, index) => (
        
          <TableRow key={index}>
  {selected.includes("SL No") && (
    <TableCell sx={{ border: "1px solid #dcdcdc", textAlign: "center" }}>
      {index + 1}
    </TableCell>
  )}

  {selected.includes("Milestone") && (
    <TableCell sx={{ border: "1px solid #dcdcdc", textAlign: "center" }}>
      {row.milestone_name}
    </TableCell>
  )}

  {selected.includes("Display Order") && (
    <TableCell sx={{ border: "1px solid #dcdcdc", textAlign: "center" }}>
      {row.display_order}
    </TableCell>
  )}

  {selected.includes("Percentage") && (
    <TableCell sx={{ border: "1px solid #dcdcdc", textAlign: "center" }}>
      {row.percentage}
    </TableCell>
  )}

  {selected.includes("Added By") && (
    <TableCell sx={{ border: "1px solid #dcdcdc", textAlign: "center" }}>
      {row.updated_user_name}
    </TableCell>
  )}

  {selected.includes("Added On") && (
    <TableCell sx={{ border: "1px solid #dcdcdc", textAlign: "center" }}>
      {row.added_on}
    </TableCell>
  )}

  {selected.includes("Status") && (
    <TableCell align="center" sx={{ border: "1px solid #dcdcdc" }}>
      <Button
        variant="contained"
        sx={{
          minWidth: "85px",
          height: "35px",
          borderRadius: "20px",
          textTransform: "none",
          backgroundColor: "#74BFD0",
        }}
        onClick={() => handlegotoupdate(row)}
      >
        {row.status}
      </Button>
    </TableCell>
  )}
</TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={9}
            align="center"
            sx={{ border: "1px solid #dcdcdc",   tableLayout: "auto", }}
          >
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