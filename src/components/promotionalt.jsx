import React, { useState } from "react";
import {
  Box,
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
const rows = [
  {
    id: 1,
    project: "ANIRVAN PHASE - 1",
    activity: "test",
    fromDate: "",
    toDate: "",
    description: "test",
    addedBy: "",
    addedOn: "",
    status: "Active",
  },
  {
    id: 2,
    project: "test ",
    activity: "test",
    fromDate: "",
    toDate: "",
    description: "",
    addedBy: "",
    addedOn: "",
    status: "",
  },
  {
    id: 3,
    project: "test2",
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


export default function PromotionalActivity() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
        <Typography variant="h6" sx={{fontWeight:700}}>
          Promotional Activity
          <IconButton>
                                   <AddCircleIcon
                                     sx={{
                                       color: "#6c4ce3",
                                       fontSize: 36,
                                       padding:"5px",
                                       margin:"5px",
                                      
                                     }}
                                   />
                                 </IconButton>
        </Typography>
        
                     
                                
                                 {/* <Divider sx={{mb:3}}/> */}
        <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 20   }}>
           <InputLabel><FilterListIcon></FilterListIcon></InputLabel>
            <Select label="Project" >
              <MenuItem value="">SL No</MenuItem>
              <MenuItem value="1">PRO</MenuItem>
              <MenuItem value="2">ANi</MenuItem>
            </Select>
          </FormControl>



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

          <TextField size="small" label="Search" />

          <Button variant="contained">Search</Button>
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
  <TableContainer>
    <Table>
      
      <TableHead>
        <TableRow sx={{ background: "#f1f1f1" }}>
          {[
            "S.No",
            "Project Name",
            "Activity Title",
            "From Date",
            "To Date",
            "Description",
            "Added By",
            "Added On",
            "Status",
          ].map((head) => (
            <TableCell
              key={head}
              sx={{
                borderRight: "1px solid #dcdcdc",
                borderBottom: "1px solid #dcdcdc",
                fontWeight: 700,
                background: "#f5f5f5",
                whiteSpace: "nowrap",
              }}
            >
              {head}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {rows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => (
            <TableRow hover key={row.id}>
              <TableCell
                sx={{
                  borderRight: "1px solid #e0e0e0",
                  borderBottom: "1px solid #e0e0e0",
                 
                }}
              >
                {row.id}
              </TableCell>

              <TableCell
                sx={{
                  borderRight: "1px solid #e0e0e0",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                {row.project}
              </TableCell>

              <TableCell
                sx={{
                  borderRight: "1px solid #e0e0e0",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                {row.activity}
              </TableCell>

              <TableCell
                sx={{
                  borderRight: "1px solid #e0e0e0",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                {row.fromDate}
              </TableCell>

              <TableCell
                sx={{
                  borderRight: "1px solid #e0e0e0",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                {row.toDate}
              </TableCell>

              <TableCell
                sx={{
                  borderRight: "1px solid #e0e0e0",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                {row.description}
              </TableCell>

              <TableCell
                sx={{
                  borderRight: "1px solid #e0e0e0",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                {row.addedBy}
              </TableCell>

              <TableCell
                sx={{
                  borderRight: "1px solid #e0e0e0",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                {row.addedOn}
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                <Chip
                  label={row.status}
                  color="info"
                  sx={{
                    borderRadius: "20px",
                    color: "#fff",
                    minWidth: "80px",
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>


{/* 
    <Table
  stickyHeader
  sx={{
    minWidth: 1000,
    border: "1px solid #dcdcdc",
  }}
>
  <TableHead>
    <TableRow>
      {[
        "S1.No",
        "Project",
        "Category",
        "Title",
        "Description",
        "Targeted Date",
        "Task Status",
      ].map((head) => (
        <TableCell
          key={head}
          sx={{
            borderRight: "1px solid #dcdcdc",
            borderBottom: "1px solid #dcdcdc",
            background: "#f5f5f5",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          {head}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>

  <TableBody>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((row) => (
      <TableRow hover key={row}>
        <TableCell
          sx={{
            borderRight: "1px solid #e0e0e0",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          {row}
        </TableCell>

        <TableCell
          sx={{
            borderRight: "1px solid #e0e0e0",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          Project {row}
        </TableCell>

        <TableCell
          sx={{
            borderRight: "1px solid #e0e0e0",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          UI
        </TableCell>

        <TableCell
          sx={{
            borderRight: "1px solid #e0e0e0",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          Dashboard
        </TableCell>

        <TableCell
          sx={{
            borderRight: "1px solid #e0e0e0",
            borderBottom: "1px solid #e0e0e0",
            minWidth: 250,
          }}
        >
          Task Description
        </TableCell>

        <TableCell
          sx={{
            borderRight: "1px solid #e0e0e0",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          15-05-2026
        </TableCell>

        <TableCell
          sx={{
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          Pending
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table> */}
{/* table chat */}

  </TableContainer>

  {/* Pagination */}
   <TablePagination
    rowsPerPageOptions={[5, 10, 25]}
    component="div"
    count={rows.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    sx={{
      borderTop: "1px solid #dcdcdc",
    }}
  />
</Paper> 



    </Box>
  );
}