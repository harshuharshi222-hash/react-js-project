import React, { useMemo, useState } from "react";
import Tooltip from '@mui/material/Tooltip';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { useNavigate } from "react-router-dom";
import AddAppraisalQuestion from '../AppraisalQuestion/Form';
import {
  Box,
  Button,
  Chip,
  Checkbox,
  ListItemText ,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,

  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";


import axios from "axios";
import { useEffect } from "react";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";
import InputAdornment from '@mui/material/InputAdornment';

import { useGetAppraisalQuestionMutation } from "../../api/constructionApi";
import { useGetAppraisalQuestionDepartmentFilterMutation } from "../../api/constructionApi";
import { useGetAppraisalQuestionDesignationFilterMutation } from "../../api/constructionApi";
import { useGetAppraisalQuestionCategoryFilterMutation } from "../../api/constructionApi";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function AppraisalQuestion() {
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Active");

const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);

const [getAppraisalQuestionApi] = useGetAppraisalQuestionMutation();


const getAppraisalQuestion = async () => {
  try {
   const payload = {
  userID: "169548080048036100",
  status:"Active",
  generalSearch: "",
  sortOrder: "Desc",
  iDisplayStart: 0,
  iDisplayLength: 150,
  processID: "",
  authorityID: "",
  departmentID: "",
  designationID: "",
  categoryID: "",
};

const response = await getAppraisalQuestionApi(JSON.stringify(payload)).unwrap();

    console.log("API Response", response);
    console.log(response);
console.log(response.data);

    setData(response.data || []);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};


useEffect(() => {
  getAppraisalQuestion();
}, []);



//department//

const [getDepartmentFilter] =
  useGetAppraisalQuestionDepartmentFilterMutation();

  const [departmentList, setDepartmentList] = useState([]);


useEffect(() => {
  loadDepartments();
}, []);

const loadDepartments = async () => {
  try {
    const payload = {
      userID: "169548080048036100",
      categoryID: "",
      departmentID: "",
      designationID: "",
      status: "Active",
    };

    const response = await getDepartmentFilter(JSON.stringify(payload)).unwrap();

    console.log("Department Response", response);
    console.log(response);

    // Adjust according to your API response
    setDepartmentList(response.data || response.result || []);
  } catch (error) {
    console.error("Department Error:", error);
  }
};

// designation //

const [getDesignation] =
  useGetAppraisalQuestionDesignationFilterMutation();
const [designationList, setDesignationList] = useState([]);

useEffect(() => {
  fetchDesignation();
}, []);

const fetchDesignation = async () => {
  try {
    const payload = {
      userID: "169548080048036100",
      categoryID: "",
      departmentID: "",
      designationID: "",
      status: "Active",
    };

    const response = await getDesignation(JSON.stringify(payload)).unwrap();

    console.log("Designation Response:", response);

    if (response?.data) {
      setDesignationList(response.data);
    } else if (response?.result) {
      setDesignationList(response.result);
    } else {
      setDesignationList([]);
    }
  } catch (error) {
    console.error("Designation API Error:", error);
  }
};



  // category//
const [getCategoryFilter] =
  useGetAppraisalQuestionCategoryFilterMutation();
const [categoryList, setCategoryList] = useState([]);

useEffect(() => {
  const fetchCategory = async () => {
    try {
      const payload = {
        userID: "169548080048036100",
        categoryID: "",
        departmentID: "",
        designationID: "",
        status: "Active",
      };

      const response = await getCategoryFilter(JSON.stringify(payload)).unwrap();

      console.log("Category Response:", response);

      if (response?.data) {
        setCategoryList(response.data);
      } else {
        setCategoryList([]);
      }
    } catch (error) {
      console.error("Category API Error:", error);
    }
  };

  fetchCategory();
}, []);

  const allColumns = [
    "SL/No",
    "Category Name",
    "Title",
    "Description",
    "Designation",
    "Option",
    "Added By",
    "Added On",
    "Status",
  ];





  const handlePrint = () => {
  const printContents = document.getElementById("printTable").innerHTML;
  const printWindow = window.open("", "", "width=1200,height=800");

  printWindow.document.write(`
    <html>
      <head>
        <title>Appraisal Question</title>
        <style>
          body{
            font-family: Arial, sans-serif;
            padding:20px;
          }

          table{
            width:100%;
            border-collapse:collapse;
          }

          th,td{
            border:1px solid #000;
            padding:8px;
            text-align:left;
          }

          th{
            background:#f2f2f2;
          }
        </style>
      </head>
      <body>
        ${printContents}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
};








  const handleDownload = () => {
  if (!data || data.length === 0) {
    alert("No data available");
    return;
  }

  const headers = [
    "SL/No",
    "Category Name",
    "Title",
    "Description",
    "Designation",
    "Option",
    "Added By",
    "Added On",
    "Status",
  ];

  const rows = data.map((item, index) => [
    index + 1,
    item.category_name,
    item.question_title,
    item.description,
    item.designation,
    item.option,
    item.added_by,
    item.added_on,
    item.status,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((value) => `"${value ?? ""}"`).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "AppraisalQuestion.csv");

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
  
  const [selected, setSelected] = useState(allColumns);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f8f9fb",
    color: "#080808",
    fontWeight: 700,
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#fafafa",
  },
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
  
  
  const visibleColumns = [
    selected.includes("SL/No") && "S.No",
    selected.includes("Category Name") && "Category Name",
    selected.includes("Title") && "Title",
    selected.includes("Description") && "Description",
    selected.includes("Designation") && "Designation",
    selected.includes("Option") && "Option",
    selected.includes("Added By") && "Added By",
    selected.includes("Added On") && "Added On",
    selected.includes("Status") && "Status",
  ].filter(Boolean);
  
    const handleChange = (event) => {
      const value = event.target.value;
   
      setSelected(typeof value === "string" ? value.split(",") : value);
   };
   
  
  const [columnWidths, setColumnWidths] = useState({
    "SL/No": 80,
    "Category Name": 220,
    "Title":200,
    "Description":120,
    "Designation":170,
    "Option":100,
    "Added By": 180,
    "Added On": 180,
    "Status": 140,
  });
  

const columns = useMemo(
  () => [
    {
      // accessorKey: "slNo",
      // header: "SL/No",
      id: "slNo",
      header: "SL/No",
         size: 70,
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "category_name",
      header: "Category Name",
      size: 200,
      width: 10,
    },
    {
      accessorKey: "question_title",
      header: "Title",
       size: 200,
       
    },
    {
      accessorKey: "description",
      header: "Description",
       size: 200,
    },
   
  {
  accessorKey: "designation",
  header: "Designation",
  size: 200,
  cell: ({ row }) => (
    <InfoIcon
      sx={{
        color: "#1976d2",
        fontSize: 18,
        cursor: "pointer",
      }}
      onClick={() => handleDesignationInfo(row)}
    />
  ),
},
    {
      accessorKey: "option",
      header: "Option",
         size: 200,
       cell: ({ row }) => (
    <InfoIcon
      sx={{
        color: "#1976d2",
        fontSize: 18,
        cursor: "pointer",
      }}
      onClick={() => handleOptionInfo(row)}
    />
  ),
    },
    {
      accessorKey: "added_by",
      header: "Added By",
      size: 200,
    },
    {
      accessorKey: "added_on",
      header: "Added On",
       size: 180,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 120,
      cell: ({ row }) => (
        <Chip
          label={row.original.status}
          color={
            row.original.status === "Active"
              ? "success"
              : "error"
          }
        />
      ),
    },
  ],
  []
);

  console.log("Table Data", data);

const [pagination, setPagination] = useState({
  pageIndex: 0,
  pageSize: 10,
});

const table = useReactTable({
  data,
  columns,
  state: {
    pagination,
  },
  onPaginationChange: setPagination,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});

    const navigate = useNavigate();
     const AddAppraisalQuestion = () => {
        navigate('/AppraisalQuestion/index/Form')
     }

       const AppraisalQuestion = () => {
        navigate('/AppraisalQuestion/index')
     }

     const handleDesignationInfo = (row) => {
  navigate("/AppraisalQuestion/index/AddDesignation", {
    state: {
      question: row.original,
    },
  });
};  

     const handleOptionInfo = (row) => {
  navigate("/AppraisalQuestion/index/AddOption", {
    state: {
      question: row.original,
    },
  });
}; 





  return (
    <Box
      sx={{
        background: "#f5f5f5",
        minHeight: "100vh",
        p: 2,
      }}
    >
      {/* TOP BAR */}

      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: -2,
          borderRadius: 3,
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >


        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
            
          }}
        >
          

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
                <MenuItem value="SL/No">
                  <Checkbox checked={selected.indexOf("SL/No") > -1} />
                  <ListItemText primary="SL/No" />
                </MenuItem>
          
                <MenuItem value="Category Name">
                  <Checkbox checked={selected.indexOf("Category Name") > -1} />
                  <ListItemText primary="Category Name" />
                </MenuItem>
          
                <MenuItem value="Title">
                  <Checkbox checked={selected.indexOf("Title") > -1} />
                  <ListItemText primary="Title" />
                </MenuItem>
          
                <MenuItem value="Description">
                  <Checkbox checked={selected.indexOf("Description") > -1} />
                  <ListItemText primary="Description" />
                </MenuItem>

                 <MenuItem value="Designation">
                  <Checkbox checked={selected.indexOf("Designation") > -1} />
                  <ListItemText primary="Designation" />
                </MenuItem>

                 <MenuItem value="Option">
                  <Checkbox checked={selected.indexOf("Option") > -1} />
                  <ListItemText primary="Option" />
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

    <FormControl size="small" sx={{ width: 150 }}>
  <InputLabel>Department</InputLabel>

  <Select
    value={department}
    label="Department"
    onChange={(e) => setDepartment(e.target.value)}
  >
    {departmentList.map((item) => (
      <MenuItem
        key={item.department_id}
        value={item.department_id}
      >
        {item.department_name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

          <FormControl size="small" sx={{ width: 150 }}>
            <InputLabel>Designation</InputLabel>
  <Select
    value={designation}
    displayEmpty
    onChange={(e) => setDesignation(e.target.value)}
  >
    

    {designationList.map((item) => (
      <MenuItem
        key={item.designation_id || item.id}
        value={item.designation_id || item.id}
      >
        {item.designation_name || item.designation}
      </MenuItem>
    ))}
  </Select>
</FormControl>

          <FormControl size="small" sx={{ width: 150 }}>
            <InputLabel>Category</InputLabel>
  <Select
    value={category}
    displayEmpty
    onChange={(e) => setCategory(e.target.value)}
  >
    

    {categoryList.map((item) => (
      <MenuItem
        key={item.category_id}
        value={item.category_id}
      >
        {item.category_name}
      </MenuItem>
    ))}
  </Select>
</FormControl>
                
                    {/* status */}

          <FormControl size="small" sx={{ width: 180 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="inActive">In-Active</MenuItem>
            </Select>
          </FormControl>

          <TextField
            size="small"
            label="Search"
      
            variant="standard"
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
  onClick={getAppraisalQuestion }
>
  Search
</Button>
        </Box>
            </Paper>



              <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 3,
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <MenuOpenIcon sx={{ color: "#1976d2",  fontSize: 35 }} />

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 20,
              fontFamily: "Times New Roman",
            }}
          >
            Appraisal Question
          </Typography>
              <Tooltip title="Add">
          <IconButton>
            <AddCircleIcon sx={{ color: "#7a5af8" ,  fontSize:30,}} 
            onClick={AddAppraisalQuestion}
            />
          </IconButton>
          </Tooltip>


          <Tooltip title="Export">
  <IconButton onClick={handleDownload}>
    <SystemUpdateAltIcon
      sx={{
        color: "#6C63FF",
        fontSize: 30,
        ml: -1,
      }}
    />
  </IconButton>
</Tooltip>
                  
             <Tooltip title="Print">
  <IconButton onClick={handlePrint}>
    <PictureAsPdfIcon
      sx={{
        color: "#1976d2",
        fontSize: 30,
      }}
    />
  </IconButton>
</Tooltip>
        </Box>
        </Paper>

        
      

      {/* TABLE */}

      <Paper
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid #dcdcdc",
           overflowY: "auto",
        }}
      >
        <div id="printTable">
        <TableContainer
        component={Paper}
          sx={{
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

          }}
        >


<Table
  stickyHeader
  sx={{
    width: table.getTotalSize(),
    tableLayout: "fixed",
    borderCollapse: "collapse",
  }}
>
         

            <TableHead>
  {table.getHeaderGroups().map((headerGroup) => (
    <TableRow key={headerGroup.id}>
      {headerGroup.headers.map((header) => (
        <StyledTableCell
          key={header.id}
          sx={{
            width: header.getSize(),
            minWidth: header.getSize(),
            maxWidth: header.getSize(),
            position: "relative",
            borderRight: "1px solid #e0e0e0",
            whiteSpace: "nowrap",
          }}
        >
          {flexRender(
            header.column.columnDef.header,
            header.getContext()
          )}

          <Box
            onMouseDown={header.getResizeHandler()}
            onTouchStart={header.getResizeHandler()}
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              width: "5px",
              cursor: "col-resize",
              userSelect: "none",
              touchAction: "none",
              "&:hover": {
                backgroundColor: "#fefef7",
              },
            }}
          />
        </StyledTableCell>
      ))}
    </TableRow>
  ))}
</TableHead>



<TableBody>
  {loading ? (
    <TableRow>
      <TableCell colSpan={columns.length} align="center">
        Loading...
      </TableCell>
    </TableRow>
  ) : table.getRowModel().rows.length > 0 ? (
    // table.getRowModel().rows.map((row) => (
      table.getPaginationRowModel().rows.map((row) => (
      <StyledTableRow key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <StyledTableCell
            key={cell.id}
            sx={{
              width: cell.column.getSize(),
              minWidth: cell.column.getSize(),
              maxWidth: cell.column.getSize(),
              borderRight: "1px solid #f0f0f0",
              whiteSpace: "normal",
              wordBreak: "break-word",
            }}
          >
            {flexRender(
              cell.column.columnDef.cell,
              cell.getContext()
            )}
          </StyledTableCell>
        ))}
      </StyledTableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={columns.length} align="center">
        No Data Found
      </TableCell>
    </TableRow>
  )}
</TableBody>
          </Table>
        </TableContainer>
        </div>

        {/* FOOTER */}


        <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    p: 2,
    borderTop: "1px solid #ddd",
    bgcolor: "#fff",
    flexWrap: "wrap",
    gap: 2,
  }}
>
  {/* Left Side */}
  <Typography variant="body2">
    Showing{" "}
    {pagination.pageIndex * pagination.pageSize + 1}
    {" - "}
    {Math.min(
      (pagination.pageIndex + 1) * pagination.pageSize,
      data.length
    )}
    {" of "}
    {data.length} records
  </Typography>

  {/* Center */}
  

  {/* Right Side */}
  <FormControl size="small">
    <Select
      value={pagination.pageSize}
      onChange={(e) => table.setPageSize(Number(e.target.value))}
    >
      <MenuItem value={10}>10 Rows</MenuItem>
      <MenuItem value={20}>20 Rows</MenuItem>
      <MenuItem value={30}>30 Rows</MenuItem>
      <MenuItem value={40}>40 Rows</MenuItem>
      <MenuItem value={50}>50 Rows</MenuItem>
      <MenuItem value={150}>150 Rows</MenuItem>
    </Select>
  </FormControl>
</Box>
      </Paper>
    </Box>
  );
}