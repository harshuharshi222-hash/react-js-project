import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Button,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useNavigate } from "react-router-dom";


const historyData = [];

export default function AddDesignation() {

  const navigate = useNavigate();
  
    const AppraisalQuestion = () => {
      navigate("/AppraisalQuestion/index");
    };

  const { state } = useLocation();

  console.log(state);

  const question = state?.question;

  console.log(question);


  const [department, setDepartment] = useState("PLANNING");
  const [rows, setRows] = useState(
  question
    ? [
        {
          id: 1,
          designation: question.designation,
          checked: true,
        },
      ]
    : []
);

  const handleSelectAll = (event) => {
    const checked = event.target.checked;

    setRows((prev) =>
      prev.map((item) => ({
        ...item,
        checked,
      }))
    );
  };

  const handleRowCheck = (id) => {
    setRows((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, checked: !item.checked }
          : item
      )
    );
  };

  const allSelected =
    rows.length > 0 && rows.every((item) => item.checked);

  const handleSubmit = () => {
    const selected = rows.filter((item) => item.checked);
    console.log(selected);
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#f5f5f5", minHeight: "100vh", }}>
      {/* Top Card */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
        }}
      >
        {/* <Typography
          variant="h5"
          fontWeight={600}
          mb={3}
        > */}
              <Box
          onClick={AppraisalQuestion}
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 5,
            color: "#0f0f0f",
            fontSize: "28px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >

       <MenuOpenIcon sx={{ color: "#1976d2",  fontSize: 35 }} 
        onClick={AppraisalQuestion} 
        />
          
          Add Designation
          <br></br>
          </Box>
        
        

        <FormControl fullWidth>

          <InputLabel>Department</InputLabel>

          <Select
            value={department}
            label="Department"
            onChange={(e) => setDepartment(e.target.value)}
          >
           
          </Select>
        </FormControl>

        <Table
          sx={{
            mt: 3,
            border: "1px solid #ddd",
          }}
        >
          <TableHead sx={{ background: "#eef5fc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                Sl No
              </TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>
                Designation
              </TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>
                <Checkbox
                  checked={allSelected}
                  onChange={handleSelectAll}
                />
                Select All
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>

                <TableCell>{row.designation}</TableCell>

                <TableCell>
                  <Checkbox
                    checked={row.checked}
                    onChange={() =>
                      handleRowCheck(row.id)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <br></br>

        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              width: 150,
              height: 50,
              borderRadius: 2,
              fontWeight: 600,
              alignItems:"center",
            }}
          >
            SUBMIT
          </Button>
        </Box>
      </Paper>

      {/* History Card */}

      <Paper
        elevation={0}
        sx={{
          mt: 5,
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight={600}
          mb={3}
        >
          Designation History
         
        </Typography>
        
        <br></br>
        <Table
          sx={{
            border: "1px solid #ddd",
          }}
        >
          <TableHead sx={{ background: "#eef5fc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                Sl No
              </TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>
                Department
              </TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>
                Designation
              </TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>
                Added By
              </TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>
                Added On
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {historyData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                >
                  No Records Found
                </TableCell>
              </TableRow>
            ) : (
              historyData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>

                  <TableCell>{item.department}</TableCell>

                  <TableCell>{item.designation}</TableCell>

                  <TableCell>{item.addedBy}</TableCell>

                  <TableCell>{item.addedOn}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}