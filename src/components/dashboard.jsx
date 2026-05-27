import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
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
  Typography,
} from "@mui/material";
import TablePagination from '@mui/material/TablePagination';

import AddCircleIcon from "@mui/icons-material/AddCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Dashboard = () => {
  const [user, setUser] = useState("Sadanand");

  const calendarDays = [
    ["", "", "", "", "", "1", "2"],
    ["3", "4", "5", "6", "7", "8", "9"],
    ["10", "11", "12", "13", "14", "15", "16"],
    ["17", "18", "19", "20", "21", "22", "23"],
    ["24", "25", "26", "27", "28", "29", "30"],
    ["31", "", "", "", "", "", ""],
  ];

  return (
    <Box sx={{ background: "#f5f5f5", minHeight: "80vh", p: 2 }}>
      {/* Top Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Welcome
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <FormControl sx={{ minWidth: 300 }}>
            <InputLabel>User</InputLabel>
            <Select
              value={user}
              label="User"
              onChange={(e) => setUser(e.target.value)}
              IconComponent={KeyboardArrowDownIcon}
            >
              <MenuItem value="Sadanand">Anand</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            sx={{
              height: "56px",
              px: 4,
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            SEARCH
          </Button>
        </Box>
      </Box>

      {/* Search Bar Placeholder */}
      <Paper
        elevation={0}
        sx={{
          height: 45,
          borderRadius: 10,
          background: "#fafafa",
          mb: 4,
        }}
      />

      {/* Main Card */}
      <Card sx={{ borderRadius: 2 }}>
        <CardContent>
          {/* Card Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              To Do
            </Typography>

            <IconButton>
              <AddCircleIcon
                sx={{
                  color: "#6c4ce3",
                  fontSize: 36,
                  padding:"5px",
                }}
              />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Content Section */}
          <Box sx={{ display: "flex", gap: 5 }}>
            {/* Table Section */}
            <TableContainer
              component={Paper}
              sx={{
                flex: 1,
                maxHeight: 500,
                overflow: "auto",
                boxShadow: "none",
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>S1.No</TableCell>
                    <TableCell>Project</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Targeted Date</TableCell>
                    <TableCell>Task Status</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((row) => (
                    <TableRow key={row}>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>&nbsp;</TableCell>
                    </TableRow>
                    
                  ))}
                </TableBody>
              </Table>

              {/* Permission Message */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 5,
                 
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    px: 6,
                    py: 3,
                    background: "#f3f3f3",
                    
                  }}
                >
                  <Typography
                    sx={{
                      color: "#777",
                      fontSize: "18px",
                      
                      
                      
                      
                    
                    }}
                  >
                    you dont have permission to view tha data
                  </Typography>
                </Paper>
              </Box>
            </TableContainer>

            {/* Calendar Section */}
            <Paper
              sx={{
                width: 360,
                p: 2,
                borderRadius: 3,
                boxShadow: "none",
              }}
            >
              {/* Calendar Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <IconButton>
                  <ChevronLeftIcon />
                </IconButton>

                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  May 2026
                </Typography>

                <IconButton>
                  <ChevronRightIcon />
                </IconButton>
              </Box>

              {/* Days */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  textAlign: "center",
                  mb: 2,
                  color: "#666",
                  fontSize: "20px",
                }}
              >
                {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                  <Box key={day}>{day}</Box>
                ))}
              </Box>

              {/* Dates */}
              {calendarDays.map((week, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    textAlign: "center",
                    mb: 1.5,
                  }}
                >
                  {week.map((date, i) => (
                    <Box
                      key={i}
                      sx={{
                        height: 45,
                        width: 45,
                        lineHeight: "45px",
                        margin: "auto",
                        borderRadius: "50%",
                        border:
                          date === "27"
                            ? "1px solid #444"
                            : "1px solid transparent",
                        cursor: "pointer",
                        fontSize: "20px",
                      }}
                    >
                      {date}
                    </Box>
                  ))}
                </Box>
              ))}
            </Paper>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;