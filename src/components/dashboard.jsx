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

 const [currentDate, setCurrentDate] = useState(new Date());
    const month = currentDate.toLocaleString("default", {
    month: "long",
  });

  const year = currentDate.getFullYear();

  // Total days in month
  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();

  // First day of month
  const firstDay = new Date(year, currentDate.getMonth(), 1).getDay();

  // Previous Month
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(year, currentDate.getMonth() - 1, 1)
    );
  };

  // Next Month
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(year, currentDate.getMonth() + 1, 1)
    );
  };

  // Calendar Array
  const calendarDays = [];

  let week = [];

  // Empty boxes before first day
  for (let i = 0; i < firstDay; i++) {
    week.push("");
  }

  // Add all dates
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);

    if (week.length === 7) {
      calendarDays.push(week);
      week = [];
    }
  }

  // Fill remaining boxes
  while (week.length < 7) {
    week.push("");
  }

  if (week.length > 0) {
    calendarDays.push(week);
  }

  const today = new Date();

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
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <IconButton onClick={handlePrevMonth}>
          <ChevronLeftIcon />
        </IconButton>

        <Typography
          variant="h5"
          sx={{ fontWeight: 700 }}
        >
          {month} {year}
        </Typography>

        <IconButton onClick={handleNextMonth}>
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Week Days */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
          mb: 2,
          color: "#666",
          fontSize: "18px",
          fontWeight: 600,
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
          {week.map((date, i) => {
            const isToday =
              date === today.getDate() &&
              currentDate.getMonth() === today.getMonth() &&
              currentDate.getFullYear() === today.getFullYear();

            return (
              <Box
                key={i}
                sx={{
                  height: 45,
                  width: 45,
                  lineHeight: "45px",
                  margin: "auto",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "18px",

                  backgroundColor: isToday
                    ? "#6C63FF"
                    : "transparent",

                  color: isToday ? "#fff" : "#000",

                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                {date}
              </Box>
            );
          })}
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