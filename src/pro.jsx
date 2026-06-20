import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  Paper,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GavelIcon from "@mui/icons-material/Gavel";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const drawerWidth = 300;

const rows = [
  {
    id: 1,
    project: "",
    category: "",
    title: "",
    description: "",
  },
];

export default function DashboardUI() {
  const [user, setUser] = useState("Sadanand");

  return (
    <Box sx={{ display: "flex", bgcolor: "#f4f4f4", minHeight: "100vh" }}>
      
      {/* TOPBAR */}
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          bgcolor: "white",
          color: "black",
          zIndex: 1201,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          
          {/* LEFT */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton>
              <MenuIcon sx={{ fontSize: 35 }} />
            </IconButton>

            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#1f2347" }}
            >
              KNS
            </Typography>
          </Box>

          {/* RIGHT */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Badge badgeContent="99+" color="secondary">
              <NotificationsIcon />
            </Badge>

            <Typography variant="h6">Sadanand</Typography>

            <Avatar />

            <Typography
              sx={{ color: "green", fontWeight: "bold", fontSize: 28 }}
            >
              TEST
            </Typography>

            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: "#9be28c",
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#171d47",
            color: "white",
            mt: "64px",
          },
        }}
      >
        <List>
          <ListItem button sx={{ py: 3 }}>
            <ListItemIcon sx={{ color: "white" }}>
              <GavelIcon />
            </ListItemIcon>

            <ListItemText
              primary="Legal"
              primaryTypographyProps={{ fontSize: 20 }}
            />

            <KeyboardArrowDownIcon />
          </ListItem>

          <ListItem button sx={{ py: 3 }}>
            <ListItemIcon sx={{ color: "white" }}>
              <AdminPanelSettingsIcon />
            </ListItemIcon>

            <ListItemText
              primary="Admin"
              primaryTypographyProps={{ fontSize: 20 }}
            />

            <KeyboardArrowDownIcon />
          </ListItem>

          <ListItem button sx={{ py: 3 }}>
            <ListItemIcon sx={{ color: "white" }}>
              <FormatAlignLeftIcon />
            </ListItemIcon>

            <ListItemText
              primary="Master"
              primaryTypographyProps={{ fontSize: 20 }}
            />

            <KeyboardArrowDownIcon />
          </ListItem>
        </List>
      </Drawer>

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: "64px",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4">Welcome</Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl sx={{ minWidth: 400 }} size="small">
              <InputLabel>User</InputLabel>

              <Select
                value={user}
                label="User"
                onChange={(e) => setUser(e.target.value)}
              >
                <MenuItem value="Sadanand">Sadanand</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              sx={{
                bgcolor: "#1976d2",
                px: 4,
              }}
            >
              SEARCH
            </Button>
          </Box>
        </Box>

        {/* EMPTY BAR */}
        <Box
          sx={{
            height: 45,
            bgcolor: "#efefef",
            borderRadius: 5,
            mb: 4,
          }}
        />

        {/* CARD */}
        <Card
          sx={{
            p: 3,
            borderRadius: 3,
            boxShadow: 2,
          }}
        >
          {/* TITLE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              To Do
            </Typography>

            <AddCircleIcon
              sx={{
                color: "#7d5fff",
                fontSize: 35,
              }}
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* CONTENT */}
          <Box sx={{ display: "flex", gap: 3 }}>
            
            {/* TABLE */}
            <TableContainer
              component={Paper}
              sx={{
                flex: 1,
                maxHeight: 500,
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {[
                      "Sl.No",
                      "Project",
                      "Category",
                      "Title",
                      "Description",
                    ].map((head) => (
                      <TableCell
                        key={head}
                        sx={{
                          fontWeight: "bold",
                          bgcolor: "#f7f7f7",
                          fontSize: 18,
                        }}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.project}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* MESSAGE */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 250,
                }}
              >
                <Typography
                  sx={{
                    bgcolor: "#efefef",
                    px: 4,
                    py: 2,
                    borderRadius: 1,
                    fontSize: 28,
                    color: "gray",
                  }}
                >
                  You don't have permission to view the data
                </Typography>
              </Box>
            </TableContainer>

            {/* CALENDAR */}
            <Paper
              sx={{
                width: 320,
                p: 3,
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  mb: 4,
                }}
              >
                May 2026
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7,1fr)",
                  gap: 3,
                  textAlign: "center",
                }}
              >
                {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                  <Typography key={day} fontWeight="bold">
                    {day}
                  </Typography>
                ))}

                {Array.from({ length: 31 }, (_, i) => (
                  <Typography
                    key={i}
                    sx={{
                      p: 1,
                      borderRadius: "50%",
                      border:
                        i + 1 === 25 ? "1px solid black" : "none",
                    }}
                  >
                    {i + 1}
                  </Typography>
                ))}
              </Box>
            </Paper>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}



////table 


import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";


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






import React, { useEffect, useState } from "react";

import {
  useGetConstructionLinkPaymentMutation,
} from "../api/constructionApi";

import {
  useUpdateConstructionLinkPaymentMutation,
} from "../api/constructionApi";


export default function PromotionalActivity() {

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#dcdcdc",
    color: "#060606",
    borderRight: "1px solid #dcdcdc",
     borderBottom: "1px solid #dcdcdc",
    fontWeight: 700,
    border: "1px solid #b6aeae",
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: "1px solid #dcdcdc",
    textAlign: "center",
       borderRight: "1px solid #dcdcdc",
    borderBottom: "1px solid #dcdcdc",
  },
  "&:last-child": {
    borderRight: "1px solid #dcdcdc", // last column line
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f9f9f9",
  },
  "&:hover": {
    backgroundColor: "#f1f1f1",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
 
const [debouncedSearch, setDebouncedSearch] = useState("");

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchText);
  }, 500); // API after 500ms stop typing

  return () => clearTimeout(timer);
}, [searchText]);

// const [searchText, setSearchText] = useState("");
const [searchText, setSearchText] = useState(
  localStorage.getItem("clpSearchText") || ""
);

useEffect(() => {
  localStorage.setItem("clpSearchText", searchText);
}, [searchText]);
const [tableData, setTableData] = useState([]);
const [status, setStatus] = useState("Active");

const [data,setData] = useState([])

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
  
//  useEffect(() => {
//     loadData();
//    }, []);
   
useEffect(() => {
  loadData();
}, [status, searchText ]);

 



const loadData = async () => {
  try {
    const payload = {
      userID: "171903551052335600",
      milestoneName: "",
      status: status,
      // generalSearch: searchText,
      generalSearch: debouncedSearch,
      sortOrder: "",
      iDisplayStart: 0,
      iDisplayLength: 50,
    };

    const response =
      await getConstructionLinkPayment(payload).unwrap();

    setData(response);

    const apiData =
      response?.data ||
      response?.result ||
      response?.records ||
      response?.data?.records ||
      [];

    const formattedData = apiData.map((item) => ({
      clpID:  item.id,
      milestone_name:
        item.milestone_name || item.milestoneName,
      display_order:
        item.display_order || item.displayOrder,
      percentage: item.percentage,
      description: item.description,
      status: item.status || "Active",
      updated_user_name:
        item.updated_user_name ||
        item.updatedUserName ||
        "",
      added_on:
        item.added_on ||
        item.addedOn ||
        "",
    }));

    const localData =
      JSON.parse(
        localStorage.getItem("clpMilestones")
      ) || [];

    setTableData([...localData, ...formattedData]);
  } catch (err) {
    console.error("LoadData Error:", err);
  }
};

console.log("response Data",data)


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

const [columnWidths, setColumnWidths] = useState({
  "S.No": 80,
  "Milestone Name": 220,
  "Display Order": 150,
  "Percentage": 120,
  "Added By": 180,
  "Added On": 180,
  "Status": 140,
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

const totalPages = Math.ceil(
  filteredData.length / rowsPerPage
);
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
          color: "#1273ea",
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
  // onChange={handleStatusChange}
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
    // overflowX: "auto",
    border: "1px solid #dcdcdc",
    display:"flex",
     maxHeight: "500px", 
       overflowY: "auto",
    overflowX: "auto",

    "&::-webkit-scrollbar": {
      height: "8px",
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#bdbdbd",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f1f1f1",
    },
    // backgroundColor: "#dcdcdc",
    
  }}
>
 
  <Table
  stickyHeader
  sx={{
    minWidth: 1200, // table expands
    borderCollapse: "collapse",
    // whiteSpace: "nowrap",
    tableLayout: "fixed",
     
  }}
>
    <TableHead>
  
  <TableRow>
    {visibleColumns.map((head) => (
      <StyledTableCell
        key={head}
        sx={{
          position: "relative",
           width: `${columnWidths[head]}px`,
          minWidth: `${columnWidths[head]}px`,
          maxWidth: `${columnWidths[head]}px`,
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
    width: "6px",
    height: "100%",
    cursor: "col-resize",
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor: "#b8babd",
    },
  }}
        />
      </StyledTableCell>
    ))}
  </TableRow>
</TableHead>

    <TableBody>
  {filteredData.length > 0 ? (
    filteredData
      .slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
      .map((row, index) => (
        <StyledTableRow key={index}>
          {selected.includes("SL No") && (
            <StyledTableCell>
              {page * rowsPerPage + index + 1}
            </StyledTableCell>
          )}

          {selected.includes("Milestone") && (
            <StyledTableCell>
              {row.milestone_name}
            </StyledTableCell>
          )}

          {selected.includes("Display Order") && (
            <StyledTableCell>
              {row.display_order}
            </StyledTableCell>
          )}

          {selected.includes("Percentage") && (
            <StyledTableCell>
              {row.percentage}
            </StyledTableCell>
          )}

          {selected.includes("Added By") && (
            <StyledTableCell>
              {row.updated_user_name}
            </StyledTableCell>
          )}

          {selected.includes("Added On") && (
            <StyledTableCell>
              {row.added_on}
            </StyledTableCell>
          )}

          {selected.includes("Status") && (
            <StyledTableCell align="center">
              
              <Button
  variant="contained"
  sx={{
    minWidth: "85px",
    height: "35px",
    borderRadius: "20px",
    textTransform: "none",
    

    backgroundColor:
      row.status?.toLowerCase() === "active"
        ? "#74BFD0" // Active = skyblue
        : "#6C63FF", // Inactive = purpal

    color: "#fff",

    "&:hover": {
      backgroundColor:
        row.status?.toLowerCase() === "active"
          ? "#74BFD0"
          : "#6C63FF",
    },
  }}
  onClick={() => handlegotoupdate(row)}
>
  {row.status}
</Button>
            </StyledTableCell>
          )}
        </StyledTableRow>
      ))
  ) : (
    <StyledTableRow>
      <StyledTableCell
        colSpan={visibleColumns.length}
        align="center"
      >
        No Data Found
      </StyledTableCell>
    </StyledTableRow>
  )}
</TableBody>
  </Table>
</TableContainer> 






  {/* Pagination */}


  <Box
  sx={{
    position: "sticky",
    bottom: 0,
    zIndex: 100,
    backgroundColor: "#fff",
    borderTop: "1px solid #dcdcdc",

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    p: 2,
  }}
>
  <Button
    variant="contained"
    disabled={page === 0}
    onClick={() => setPage((prev) => prev - 1)}
  >
    Previous
  </Button>

  <Typography>
    Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
  </Typography>

  <Select
    value={rowsPerPage}
    size="small"
    onChange={(e) => {
      setRowsPerPage(Number(e.target.value));
      setPage(0);
    }}
  >
    <MenuItem value={5}>5 rows</MenuItem>
    <MenuItem value={10}>10 rows</MenuItem>
    <MenuItem value={25}>25 rows</MenuItem>
    <MenuItem value={50}>50 rows</MenuItem>
    <MenuItem value={data?.totalCount}>{data?.totalCount} rows</MenuItem>

  </Select>

  

<Button
  variant="contained"
  disabled={page >= totalPages - 1}
  onClick={() => setPage((prev) => prev + 1)}
  sx={{
    minWidth: 120,
  }}
>
  Next
</Button>
</Box>
  
</Paper> 



    </Box>
  );
}

////    update 

// 
import React from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { TextField, Button ,
   Box ,
   Typography ,
   Paper , 
   FormControl , 
    InputLabel , 
    Select , 
    MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { Margin, WidthFull } from "@mui/icons-material";
import {
  useUpdateConstructionLinkPaymentMutation,
} from "../api/constructionApi";





export default function Update() {
//   const navigate = useNavigate();


//   const rowData = location.state || {};
//    console.log(rowData,"rowdatadata");
//   const [updateConstructionLinkPayment] =
//   useUpdateConstructionLinkPaymentMutation();


  
// const location = useLocation();

const navigate = useNavigate();

const location = useLocation();

const rowData = location?.state || {};

console.log("Location State:", location?.state);
console.log("Row Data:", rowData);

const [updateConstructionLinkPayment] =
  useUpdateConstructionLinkPaymentMutation();

  if (!location?.state) {
    return (
      <Box p={3}>
        <Typography color="error">
          No record selected. Please go back and select a row.
        </Typography>
      </Box>
    );
  }

console.log("Received Data:", location.state);
console.log("Received CLP ID:", location.state?.clpID);


  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      
    
      

      milestoneName: rowData.milestone_name || "",
      percentage: rowData.percentage || "",
      displayOrder: rowData.display_order || "",
      description: rowData.description || "",
      status: rowData.status || "",
    },

    validationSchema: Yup.object({
      status: Yup.string().required("Required"),
    }),

   
    onSubmit: async (values) => {
  try {
    const payload = {
      userID: "171903551052335600",
      clpID: rowData.id || rowData.id,
      milestoneName: values.milestoneName,
      percentage: values.percentage,
      displayOrder: values.displayOrder,
      description: values.description,
      status: values.status,
    };

    console.log("Update Payload:", payload);

    const response =
      await updateConstructionLinkPayment(payload).unwrap();

    console.log("Update Response:", response);

    alert("Updated Successfully");

    navigate("/dashboard/table");
  } catch (error) {
    console.error("Update Error:", error);
    alert("Update Failed");
  }
},
  });

  const handlegototable = () => {
    navigate("/dashboard/table");
  };



  return (
    <>
      


<Box
  sx={{
    minHeight: "100vh",
    background: "#f5f5f5",
    p: 3,
  }}
>
  {/* Header */}
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      mb: 4,
    }}
  >
    <IconButton onClick={handlegototable}>
      <MenuOpenIcon  sx={{
                  color: "#1273ea",
                  fontSize: 30,
                  mr: 1,
                }} />
    </IconButton>

    <Typography
      variant="h4"
      sx={{
        ml: 2,
        fontWeight: 700,
      }}
    >
      Update CLP Milestone
    </Typography>
  </Box>

  <form onSubmit={formik.handleSubmit}>
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        background: "#fafafa",

      }}
    >
      <TextField
        fullWidth
        label="Milestone Name"
        value={formik.values.milestoneName}
        // InputProps={{ readOnly: true }}
        disabled
        sx={{ mb: 3 }}

      />

      <TextField
        fullWidth
        label="Percentage"
        value={formik.values.percentage}
        // InputProps={{ readOnly: true }}
        disabled
        sx={{ mb: 3 }}

      />

      <TextField
        fullWidth
        label="Display Order"
        value={formik.values.displayOrder}
        // InputProps={{ readOnly: true }}
        disabled
        sx={{ mb: 3 }}
   
      />

      
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    sx={{ mb: 2 }}
                    multiline
                    rows={3}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Status</InputLabel>

        <Select
          name="status"
          value={formik.values.status}
          label="Status"
          onChange={formik.handleChange}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="inActive">In-Active</MenuItem>
        </Select>
      </FormControl>
    </Paper>

    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        mt: 3,
      }}
    >
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{
          minWidth: 120,
          height: 50,
          fontWeight: 600,
        }}
      >
        SAVE
      </Button>
    </Box>
  </form>
</Box>
  </>
  );

}