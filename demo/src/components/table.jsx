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
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#f1f1f1" }}>
                <TableCell><b>S.No</b></TableCell>
                <TableCell><b>Project Name</b></TableCell>
                <TableCell><b>Activity Title</b></TableCell>
                <TableCell><b>From Date</b></TableCell>
                <TableCell><b>To Date</b></TableCell>
                <TableCell><b>Description</b></TableCell>
                <TableCell><b>Added By</b></TableCell>
                <TableCell><b>Added On</b></TableCell>
                <TableCell><b>Status</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.project}</TableCell>
                    <TableCell>{row.activity}</TableCell>
                    <TableCell>{row.fromDate}</TableCell>
                    <TableCell>{row.toDate}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.addedBy}</TableCell>
                    <TableCell>{row.addedOn}</TableCell>
                    <TableCell>
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
        />
      </Paper>
    </Box>
  );
}