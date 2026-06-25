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
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

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
  sortOrder: "",
  iDisplayStart: 0,
  iDisplayLength: 10,
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
  
  const [selected, setSelected] = useState(allColumns);
  
  
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
      accessorKey: "slNo",
      header: "SL/No",
    },
    {
      accessorKey: "category_name",
      header: "Category Name",
    },
    {
      accessorKey: "question_title",
      header: "Title",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "designation",
      header: "Designation",
    },
    {
      accessorKey: "option",
      header: "Option",
    },
    {
      accessorKey: "added_by",
      header: "Added By",
    },
    {
      accessorKey: "added_on",
      header: "Added On",
    },
    {
      accessorKey: "status",
      header: "Status",
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

  const table = useReactTable({
    data,
    columns,
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
          {/* <Button
            variant="outlined"
            sx={{
              minWidth: 70,
              height: 42,
            }}
          >
            <FilterListIcon />
          </Button> */}

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
            <Select
              value={department}
              displayEmpty
              onChange={(e) => setDepartment(e.target.value)}
            >
              <MenuItem value="">Department</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ width: 150 }}>
            <Select
              value={designation}
              displayEmpty
              onChange={(e) => setDesignation(e.target.value)}
            >
              <MenuItem value="">Designation</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ width: 150 }}>
            <Select
              value={category}
              displayEmpty
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">Category</MenuItem>
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
  onClick={getAppraisalQuestion}
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
              <IconButton >
            <SystemUpdateAltIcon
              sx={{
                color: "#6C63FF",
                fontSize: 30,
                 ml: -1,
              }}
            />
            </IconButton>
                  </Tooltip>
              <Tooltip title="print">
          <IconButton>
            <PictureAsPdfIcon sx={{ color: "#1976d2" }} />
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
        }}
      >
        <TableContainer
          sx={{
            maxHeight: 620,
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {table.getHeaderGroups()[0].headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      fontWeight: 700,
                      background: "#fff",
                      color: "#1c1c1c",
                      borderBottom: "1px solid #ddd",
                      whiteSpace: "nowrap",
                      fontFamily: "Times New Roman",
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
  {loading ? (
    <TableRow>
      <TableCell
        colSpan={columns.length}
        align="center"
      >
        Loading...
      </TableCell>
    </TableRow>
  ) : table.getRowModel().rows.length > 0 ? (
    table.getRowModel().rows.map((row) => (
      <TableRow key={row.id} hover>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(
              cell.column.columnDef.cell,
              cell.getContext()
            )}
          </TableCell>
        ))}
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell
        colSpan={columns.length}
        align="center"
      >
        No Data Found
      </TableCell>
    </TableRow>
  )}
</TableBody>
          </Table>
        </TableContainer>

        {/* FOOTER */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1,
            borderTop: "1px solid #ddd",
            background: "#fff",
          }}
        >
          <Button
            variant="contained"
            disabled
            sx={{
              width: 250,
            }}
          >
            Previous
          </Button>

          <Typography
            sx={{
              fontSize: 30,
              fontFamily: "Times New Roman",
            }}
          >
            Page 1 
          </Typography>

          <Select size="small" value={10}>
            <MenuItem value={10}>10 rows</MenuItem>
          </Select>

          <Button
            variant="contained"
            sx={{
              width: 250,
            }}
          >
            Next
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}