import React, { useMemo, useState } from "react";
import Tooltip from '@mui/material/Tooltip';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { useNavigate } from "react-router-dom";

import ClearIcon from "@mui/icons-material/Clear";
import AddOption from "../AppraisalQuestion/optionfiles/Option";
import { useLocation } from "react-router-dom";



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




import { useEffect } from "react";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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

  const [optionOpen, setOptionOpen] = useState(false);
const [selectedQuestion, setSelectedQuestion] = useState(null);

const [totalRecords, setTotalRecords] = useState(0);

  const [searchText, setSearchText] = useState("");

  const [department, setDepartment] = useState("");
  
  const [designation, setDesignation] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Active");
  const [tableData, setTableData] = useState([]);

const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);

const [getAppraisalQuestionApi] = useGetAppraisalQuestionMutation();




const [pagination, setPagination] = useState({
  pageIndex: 0,
  pageSize: 10,
});

   const getAppraisalQuestion = async (
  pageIndex = pagination.pageIndex,
  pageSize = pagination.pageSize
) => {
  try {
    setLoading(true);

    const payload = {
      userID: "169548080048036100",

      status: status,
      generalSearch: searchText,

      sortOrder: "Desc",

      iDisplayStart: pageIndex * pageSize,
      iDisplayLength: pageSize,

      processID: "",
      authorityID: "",

      departmentID: department,
      designationID: designation,
      categoryID: category,
    };

    const response = await getAppraisalQuestionApi(
      JSON.stringify(payload)
    ).unwrap();

console.log("Response JSON:", JSON.stringify(response, null, 2));
      console.log("Complete Response:", response);
    console.log("API Response:", response);
console.log("Total Records:", response.totalRecords);
console.log("Data Length:", response.data?.length);

    setData(response.data || []);
console.log(response);
setTotalRecords(response.totalCount || 0);

    setData(response.data || []);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};


useEffect(() => {
  getAppraisalQuestion(
    pagination.pageIndex,
    pagination.pageSize
  );
}, [
  pagination.pageIndex,
  pagination.pageSize,
  searchText,
  department,
  designation,
  category,
  status,
]);


//department//


  const [getAppraisalQuestionDepartmentFilter] =
  useGetAppraisalQuestionDepartmentFilterMutation();

  useEffect(() => {
  fetchDepartments();
}, []);

const fetchDepartments = async () => {
  try {
    const payload = {
      userID: "169548080048036100",
      categoryID: "",
      departmentID: "",
      designationID: "",
      status: "Active",
    };

    const response = await getAppraisalQuestionDepartmentFilter(
      JSON.stringify(payload)
    ).unwrap();

    console.log("Department Response:", response);

    if (response?.data) {
      setDepartmentList(response.data);
    }
  } catch (error) {
    console.log("Department API Error:", error);
  }
};

  const [departmentList, setDepartmentList] = useState([]);



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
  fetchCategory();
}, []);

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

    console.log("Category API Response:", response);

    if (response?.data) {
      setCategoryList(response.data);
    } else {
      setCategoryList([]);
    }
  } catch (error) {
    console.log("Category Error:", error);
  }
};

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

const [columnVisibility, setColumnVisibility] = useState({
  slNo: true,
  category_name: true,
  question_title: true,
  description: true,
  designation: true,
  option: true,
  added_by: true,
  added_on: true,
  status: true,
});
//table important//




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    backgroundColor: "#f8f9fb",
    color: "#080808",
    fontWeight: 700,
    fontSize: 13,
    padding: "10px 12px",
    whiteSpace: "nowrap",
    borderBottom: "1px solid #ddd",
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
    padding: "8px 12px",
    height: 42,
    maxHeight: 42,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));



const StyledTableRow = styled(TableRow)(() => ({
  height: 42,

  "& td": {
    height: 42,
    paddingTop: 8,
    paddingBottom: 8,
  },

  "&:nth-of-type(odd)": {
    backgroundColor: "#fafafa",
  },

  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
}));
  


   const handleChange = (event) => {
  const value =
    typeof event.target.value === "string"
      ? event.target.value.split(",")
      : event.target.value;

  setSelected(value);

  setColumnVisibility({
    slNo: value.includes("SL/No"),
    category_name: value.includes("Category Name"),
    question_title: value.includes("Title"),
    description: value.includes("Description"),
    designation: value.includes("Designation"),
    option: value.includes("Option"),
    added_by: value.includes("Added By"),
    added_on: value.includes("Added On"),
    status: value.includes("Status"),
  });
};
  


const columns = useMemo(
  () => [
  {
  id: "slNo",
  header: "SL/No",
  size: 70,
  cell: ({ row }) =>
    pagination.pageIndex * pagination.pageSize + row.index + 1,
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
  size: 180,

  cell: ({ row }) => {
    const designationList = row.original.designation || [];

    const firstDesignation =
      designationList.length > 0
        ? designationList[0].designation_name
        : "";

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Tooltip title={firstDesignation} arrow>
          <Typography
            fontSize={13}
            sx={{
              maxWidth: 120,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              cursor: "pointer",
            }}
          >
            {firstDesignation}
          </Typography>
        </Tooltip>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <InfoIcon
            sx={{
              color: "#1976d2",
              cursor: "pointer",
              fontSize: 18,
            }}
            onClick={() => handleDesignationInfo(row)}
          />

          {designationList.length > 0 && (
            <Typography
              fontSize={12}
              fontWeight={600}
              color="black"
            >
              +({designationList.length})
            </Typography>
          )}
        </Box>
      </Box>
    );
  },
},







{
  accessorKey: "option",
  header: "Option",
  size: 200,

  cell: ({ row }) => {
    const optionList = row.original.option || [];

    const firstOption =
      optionList.length > 0
        ? optionList[0].rate_name.replace(/<[^>]*>/g, "")
        : "";

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Tooltip title={firstOption} arrow>
          <Typography
            fontSize={13}
            sx={{
              maxWidth: 120,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {firstOption}
          </Typography>
        </Tooltip>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <InfoIcon
            sx={{
              color: "#1976d2",
              fontSize: 18,
              cursor: "pointer",
            }}
            onClick={() => handleOptionInfo(row)}
          />

          {optionList.length > 0 && (
            <Typography
              fontSize={12}
              fontWeight={600}
              color="black"
            >+
              ({optionList.length})
            </Typography>
          )}
        </Box>
      </Box>
    );
  },
},

{
  accessorKey: "added_by",
  header: "Added By",
  size: 180,
  cell: ({ row }) => {
    return (
      row.original.added_by?.added_user_name ||
      row.original.added_by?.user_name ||
      row.original.added_user_name ||
      row.original.added_by ||
      "-"
    );
  },
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
  cell: ({ row }) => {
    const rowStatus = row.original.status;

    return (
    



<Chip
  label={rowStatus}

  onClick={() => handleEdit(row.original)}
  sx={{
    width: 90,
    fontWeight: "bold",
    color: "#fff",
    cursor: "pointer",
    backgroundColor: rowStatus === "Active" ? "#74BFD0" : "#6C63FF",

    "&:hover": {
      backgroundColor: rowStatus === "Active" ? "#74BFD0" : "#6C63FF",
    },

    "&.MuiChip-clickable:hover": {
      backgroundColor: rowStatus === "Active" ? "#74BFD0" : "#6C63FF",
    },
  }}
/>
    );
  },
},


  ],
  [pagination.pageIndex, pagination.pageSize]);

  console.log("Table Data", data);

const totalPages = Math.max(
  1,
  Math.ceil((totalRecords || 0) / pagination.pageSize)
);

const table = useReactTable({
  data,
  columns,

  state: {
    pagination,
    columnVisibility,
  },

  manualPagination: true,

pageCount: Math.ceil((totalRecords || 0) / pagination.pageSize),

  onPaginationChange: setPagination,
  onColumnVisibilityChange: setColumnVisibility,

  getCoreRowModel: getCoreRowModel(),
});

    const navigate = useNavigate();
     const AddAppraisalQuestion = () => {
        navigate('/AppraisalQuestion/index/Form')
     }
    

     const handleEdit = (rowData) => {
  navigate("/AppraisalQuestion/index/Edit", {
    state: {
      question: rowData,
    },
  });
};


     const handleDesignationInfo = (row) => {
  navigate("/AppraisalQuestion/index/AddDesignation", {
    state: {
      question: row.original,
    },
  });
};  
  const handleOptionInfo = (row) => {
  navigate("/AppraisalQuestion/index/Option", {
    state: {
      question: row.original,
    },
  });
};  




const handlegotodashboard = () => {
      navigate('/dashboard')
   }





  return (
    <Box
      sx={{
        background: "#ffffff",
        minHeight: "100vh",
        p: 2,
      }}
    >
      {/* TOP BAR */}

      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: -7,
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
    // onChange={(e) => setDepartment(e.target.value)}
 onChange={(e) => {
  setDepartment(e.target.value);

  setPagination((prev) => ({
    ...prev,
    pageIndex: 0,
  }));
}}
    endAdornment={
      department && (
        <InputAdornment position="end" sx={{ mr: 2 }}>
          <ClearIcon
            fontSize="small"
            sx={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent Select from opening
              setDepartment("");
            }}
          />
        </InputAdornment>
      )
    }
    MenuProps={{
      PaperProps: {
        sx: {
          width: 70,
          maxHeight: 150,
        },
      },
    }}
  >
    {departmentList.map((item) => (
      <MenuItem
        key={item.department_id}
        value={item.department_id}
        sx={{
          width: 120,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "13px",
        }}
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
   
    label="Designation"
    onChange={(e) => setDesignation(e.target.value)}
     endAdornment={
      designation && (
        <InputAdornment position="end" sx={{ mr: 2 }}>
          <ClearIcon
            fontSize="small"
            sx={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent Select from opening
              setDesignation("");
            }}
          />
        </InputAdornment>
      )
    }
    MenuProps={{
      PaperProps: {
        sx: {
          width: 70,      // Popup width
          maxHeight: 150,  // Optional
        },
      },
    }}
  >
    

    {designationList.map((item) => (
      <MenuItem
        key={item.designation_id || item.id}
        value={item.designation_id || item.id}
         sx={{
    width: 120,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "13px",
  }}
        
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
    label="Category"
    onChange={(e) => setCategory(e.target.value)}
    endAdornment={
      category && (
        <InputAdornment position="end" sx={{ mr: 2 }}>
          <ClearIcon
            fontSize="small"
            sx={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent Select from opening
              setCategory("");
            }}
          />
        </InputAdornment>
      )
    }
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
    label="Status"
    onChange={(e) => setStatus(e.target.value)}
  >
    <MenuItem value="Active">Active</MenuItem>
    <MenuItem value="inActive">In-Active</MenuItem>
  </Select>
</FormControl>

       
<TextField
  size="small"
  label="Search"
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
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
          <MenuOpenIcon sx={{ color: "#1976d2",  fontSize: 35 }} onClick={handlegotodashboard} />
          
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
          border: "25px solid #ffffff",
           overflowY: "auto",
        }}
      >
        <div id="printTable">
        
 <TableContainer
  component={Paper}
  sx={{
    height: "500px", /////height gixed////
    
    border: "1px solid #d0d7de", 
 
    overflowY: "auto",
    overflowX: "auto",
    

    "&::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#fdfdfd",
      borderRadius: "10px",
    },
  }}
>
      <Table
  stickyHeader
  sx={{
    tableLayout: "fixed",
    width: "100%",
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
    padding: "8px 10px",
    height: 42,
    tableLayout:"fixed",
  }}
>
  {header.isPlaceholder
    ? null
    : flexRender(
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
        backgroundColor: "#f0f3f7",
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
  {["category_name", "added_on", "status"].includes(cell.column.id) ? (
    <Box
      sx={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {flexRender(
        cell.column.columnDef.cell,
        cell.getContext()
      )}
    </Box>
  ) : (
 
    <Tooltip
  title={
    cell.column.id === "added_by"
      ? (
          row.original.added_by?.added_user_name ||
          row.original.added_by?.user_name ||
          row.original.added_user_name ||
          row.original.added_by ||
          "-"
        )
      : typeof cell.getValue() === "string"
      ? cell.getValue()
      : ""
  }
  arrow
>
      <Box
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          cursor: "pointer",
        }}
      >
        {flexRender(
          cell.column.columnDef.cell,
          cell.getContext()
        )}
      </Box>
    </Tooltip>
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
  }}
>
  {/* Previous Button */}


<Button
  variant="outlined"
  size="small"
  disabled={pagination.pageIndex === 0}
  onClick={() =>
    setPagination((prev) => ({
      ...prev,
      pageIndex: prev.pageIndex - 1,
    }))
  }

  disabled={!table.getCanPreviousPage()}
  sx={{
    minWidth: 60,
    width: 400,
    height: 50,
    textTransform: "none",
    fontSize: "13px",
    px: 1,
  }}
>
  Previous
</Button>






  {/* Center */}
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
    }}
  >
   
<Typography variant="body2" sx={{ fontWeight: 600 }}>
Page {pagination.pageIndex + 1} of {totalPages}
</Typography>

    <FormControl size="small" sx={{ minWidth: 120 }}>
      <Select
  value={pagination.pageSize}
  onChange={(e) => {
    setPagination({
      pageIndex: 0,
      pageSize: Number(e.target.value),
    });
  }}
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

  {/* Next Button */}


<Button
  variant="outlined"
  size="small"
  disabled={pagination.pageIndex >= totalPages - 1}
  onClick={() =>
    setPagination((prev) => ({
      ...prev,
      pageIndex: prev.pageIndex + 1,
    }))
}
   
  sx={{
    minWidth: 80,
    width: 400,
    height: 60,
    textTransform: "none",
    fontSize: "13px",
    px: 1,
    
  }}
>
  Next
</Button>

</Box>

      </Paper>
    </Box>
  );
}