

import React, { useMemo, useState } from "react";
import Tooltip from '@mui/material/Tooltip';

import { useNavigate } from "react-router-dom";

import ClearIcon from "@mui/icons-material/Clear";

import { useLocation } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";



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



import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { useEffect } from "react";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";
import InputAdornment from '@mui/material/InputAdornment';





import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";


// new //

import { useGetLiaisonProcessMutation } from "../../api/constructionApi";
import {
  useGetLiaisonProcessCategoryMutation,
} from "../../api/constructionApi";
import { useGetUserMutation } from "../../api/constructionApi";

export default function LiaisonProcess() {

const [totalRecords, setTotalRecords] = useState(0);

  const [searchText, setSearchText] = useState("");


  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Active");


const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);

const [getUser] = useGetUserMutation();

const [userList, setUserList] = useState([]);
const [user, setUser] = useState("");
const [ismandatory, setIsMandatory] = useState("");

const [getLiaisonProcessApi] = useGetLiaisonProcessMutation();




const [pagination, setPagination] = useState({
  pageIndex: 0,
  pageSize: 10,
});

const getLiaisonProcess = async (
  pageIndex = pagination.pageIndex,
  pageSize = pagination.pageSize
) => {
  try {
    setLoading(true);

    const payload = {
      userID: "169548080048036100",
      processStatus: status,
      processCategory: category,
     processOwner: user,
      isMandatory: "",
      completionType: "",
      executionType: "",
      generalSearch: searchText,
      sortOrder: "",
      iDisplayStart: pageIndex * pageSize,
      iDisplayLength: pageSize,
    };

    const response = await getLiaisonProcessApi(JSON.stringify(payload)).unwrap();

    console.log("LIAISON API RESPONSE:", response);
console.log("FIRST ROW:", response?.data?.[0]);

setData(response.data || []);

    console.log(response);

    setData(response.data || []);
    setTotalRecords(response.totalCount || response.totalRecords || 0);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  getLiaisonProcess(
    pagination.pageIndex,
    pagination.pageSize
  );
}, [
  pagination.pageIndex,
  pagination.pageSize,
  status,
  category,
  user,
  ismandatory,
]);

// cat//

const [getLiaisonProcessCategory] =
  useGetLiaisonProcessCategoryMutation();

const [categoryList, setCategoryList] = useState([]);

useEffect(() => {
  fetchCategory();
}, []);

const fetchCategory = async () => {
  try {
    const payload = {
      userID: "169548080048036100",
    };

    const response = await getLiaisonProcessCategory(
      JSON.stringify(payload)
    ).unwrap();

    console.log("Category Response:", response);

    if (response?.data) {
      setCategoryList(response.data);
    } else {
      setCategoryList([]);
    }
  } catch (error) {
    console.log("Category API Error:", error);
    setCategoryList([]);
  }
};

// user//


useEffect(() => {
  fetchUsers();
}, []);

const fetchUsers = async () => {
  try {
    const payload = {
      userID: "169548080048036100",
      departmentID: "",
      generalSearch: "",
      sortOrder: "",
      iDisplayStart: 0,
      iDisplayLength: -1,
    };

    const response = await getUser(JSON.stringify(payload)).unwrap();

    console.log("User Response", response);

    if (response?.user) {
      setUserList(response?.user);
    } else {
      setUserList([]);
    }
  } catch (err) {
    console.log(err);
    setUserList([]);
  }
};



console.log("userList",userList)



  // category//


  const allColumns = [
    "SL/No",
    "Category Name",
    "Process Name", 
    "Order",
    "Process Load Time ",
    "Owner",
    "Execution Type",
    "Is Mandatory",
    "Completion Type",
    "Priority ",
    "Planning Authority",
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
    "Process Name", 
    "Order",
    "Process Load Time ",
    "Owner",
    "Execution Type",
    "Is Mandatory",
    "Completion Type",
    "Priority ",
    "Planning Authority",
    "Added By",
    "Added On",
    "Status",
  ];

};
  



const [selected, setSelected] = useState(allColumns);

const [columnVisibility, setColumnVisibility] = useState({
  slNo: true,
  process_category_name: true,
  process_name: true,
  process_order: true,
  process_lead_time: true,
  owner_name: true,
  execution_type: true,
  is_mandatory: true,
  completion_type: true,
  task_priority: true,
  planning_authority: true,
  user_name: true,
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
    process_category_name: value.includes("Category Name"),
    process_name: value.includes("Process Name"),
    process_order: value.includes("Order"),
    process_lead_time: value.includes("Process Load Time"),
    owner_name: value.includes("Owner"),
    execution_type: value.includes("Execution Type"),
    is_mandatory: value.includes("Is Mandatory"),
    completion_type: value.includes("Completion Type"),
    task_priority: value.includes("Priority"),
    planning_authority: value.includes("Planning Authority"),
    user_name: value.includes("Added By"),
    added_on: value.includes("Added On"),
    status: value.includes("Status"),
  });
};




const columns = useMemo(
  () => [
  {
  id: "slNo",
  header: "SL/No",
  size: 50,
  cell: ({ row }) =>
    pagination.pageIndex * pagination.pageSize + row.index + 1,
},
   {
  accessorKey: "process_category_name",
  header: "Category Name",
  size:100,
},
{
  accessorKey: "process_name",
  header: "Process Name",
  size:100,
},
{
  accessorKey: "process_order",
  header: "Order",
  size:100,
},
{
  accessorKey: "process_lead_time",
  header: "Process Load Time",
  size:100,
},
{
  accessorKey: "owner_name",
  header: "Owner",
  size:100,
},
{
  accessorKey: "execution_type",
  header: "Execution Type",
  size:100,
},
{
  accessorKey: "is_mandatory",
  header: "Is Mandatory",
  size:100,
},
{
  accessorKey: "completion_type",
  header: "Completion Type",
  size:100,
},
{
  accessorKey: "task_priority",
  header: "Priority",
  size:100,
},


{
  accessorKey: "planning_authority",
  header: "Planning Authority",
  size: 150,

  cell: ({ row }) => {
    const authorityList = row?.original?.planningAuthority || [];  
  console.log("list",authorityList)

    const firstAuthority =
      authorityList.length > 0
        ? authorityList[0].authority_name?.replace(/<[^>]*>/g, "")
        : "";

    
    const authorityShortName = firstAuthority
  ? firstAuthority.trim().split(/\s+/)[0]
  : "";

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* Authority Short Name */}
        <Tooltip title={firstAuthority || "-"} arrow>
          <Typography
            fontSize={13}
            fontWeight={500}
            sx={{
              maxWidth: 70,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              cursor: "pointer",
            }}
          >
            {authorityShortName || "-"}
          </Typography>
        </Tooltip>

        {/* Count */}
        {authorityList.length > 1 && (
          <Typography
            fontSize={12}
            fontWeight={600}
            color="black"
          >
            +({authorityList.length - 1})
          </Typography>
        )}

        {/* Edit Icon */}
        <Tooltip >
          <EditIcon
            sx={{
              color: "#1976d2",
              fontSize: 18,
              cursor: "pointer",
              ml: 0.5,
              "&:hover": {
                color: "#0d47a1",
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row.original);
            }}
          />
        </Tooltip>
      </Box>
    );
  },
},




{
  accessorKey: "user_name",
  header: "Added By",
  size:100,
},
{
  accessorKey: "added_on",
  header: "Added On",
  size:100,
},



{
  accessorKey: "status",
  id: "status",
  header: "Status",
  size: 100,

  cell: ({ row }) => {
    const rowStatus =
      row.original.status ||
      row.original.processStatus ||
      row.original.process_status ||
      "";

    const normalizedStatus = String(rowStatus).toLowerCase();

    const isActive = normalizedStatus === "active";

    return (
      <Chip
        label={rowStatus || "-"}
        onClick={() => handleEdit(row.original)}
        sx={{
          width: 90,
          fontWeight: "bold",
          color: "#fff",
          cursor: "pointer",

          backgroundColor: isActive
            ? "#74BFD0"
            : "#6C63FF",

          "&:hover": {
            backgroundColor: isActive
              ? "#74BFD0"
              : "#6C63FF",
          },

          "&.MuiChip-clickable:hover": {
            backgroundColor: isActive
              ? "#74BFD0"
              : "#6C63FF",
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
   
     
    

const handleAddLiaisonProcess = () => {
  navigate("/LiaisonProcess/Process/ProcessForm");
};

     const handleEdit = (rowData) => {
  navigate("/AppraisalQuestion/index/Edit", {
    state: {
      question: rowData,
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
  }}
>
  {allColumns.map((column) => (
    <MenuItem key={column} value={column}>
      <Checkbox checked={selected.includes(column)} />
      <ListItemText primary={column} />
    </MenuItem>
  ))}
</Select>


            </FormControl>
          </div>



<FormControl size="small" sx={{ width: 180 }}>
  <InputLabel>Category</InputLabel>

  <Select
    value={category}
    label="Category"
    onChange={(e) => {
      setCategory(e.target.value);

      setPagination((prev) => ({
        ...prev,
        pageIndex: 0,
      }));
    }}
    endAdornment={
      category && (
        <InputAdornment position="end" sx={{ mr: 2 }}>
          <ClearIcon
            fontSize="small"
            sx={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              setCategory("");
            }}
          />
        </InputAdornment>
      )
    }
  >
  

    {categoryList.map((item) => (
      <MenuItem
        key={item.process_category_id}
        value={item.process_category_id}
      >
        {item.process_category_name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

<FormControl size="small" sx={{ width: 180 }}>
  <InputLabel>User</InputLabel>

  <Select
    value={user}
    label="User"
    onChange={(e) => {
      setUser(e.target.value);

      setPagination((prev) => ({
        ...prev,
        pageIndex: 0,
      }));
    }}
    endAdornment={
      user && (
        <InputAdornment position="end">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setUser("");
            }}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        </InputAdornment>
      )
    }
  >
    

    {userList.map((item) => (
      <MenuItem
        key={item.user_id}
        value={item.user_id}
      >
        {item.user_name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

   <FormControl size="small" sx={{ width: 180 }}>
  <InputLabel>Is mandatory</InputLabel>
  <Select
    value={ismandatory}
    label="Is Mandatory"
    onChange={(e) => setIsMandatory(e.target.value)}
  >
    <MenuItem value="default">Default</MenuItem>
    <MenuItem value="legaloption">LegalOption</MenuItem>
    <MenuItem value="liasonoption">LiasonOption</MenuItem>
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
  onClick={() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));

    getLiaisonProcess(0, pagination.pageSize);
  }}
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
            Process
          </Typography>
             <Tooltip title="Add">
  <IconButton onClick={handleAddLiaisonProcess}>
    <AddCircleIcon
      sx={{
        color: "#7a5af8",
        fontSize: 30,
      }}
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