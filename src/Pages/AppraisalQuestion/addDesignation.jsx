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
import  { useEffect } from "react";
import { useGetDepartmentMasterMutation } from "../../api/constructionApi";
import { useGetHrAppraisalQuestionDesignationForUpdateMutation } from "../../api/constructionApi";
import { useGetHrAppraisalQuestionDesignationMutation } from "../../api/constructionApi";



export default function AddDesignation() {

  const [historyData, setHistoryData] = useState([]);


  

  const [department, setDepartment] = useState("");
const [departmentList, setDepartmentList] = useState([]);
// department dependacy//
const [getDepartmentMaster] = useGetDepartmentMasterMutation();


useEffect(() => {
  fetchDepartments();
}, []);

const fetchDepartments = async () => {
  try {
    const payload = {
      userID: "171464700312440400",
      status: "1",
      generalSearch: "",
      sortOrder: "",
      iDisplayStart: 0,
      iDisplayLength: "-1",
    };

    const response = await getDepartmentMaster(JSON.stringify(payload)).unwrap();

    console.log("Department Response:", response);

    setDepartmentList(response.data || []);
  } catch (error) {
    console.error("Department API Error:", error);
  }
};

// designation table dependancy//
const [getDesignationForUpdate] =
  useGetHrAppraisalQuestionDesignationForUpdateMutation();



const handleDepartmentChange = async (e) => {
  const deptID = e.target.value;

  setDepartment(deptID);

  try {
    const payload = {
      userID: "171464700312440400",
      appraisalQuestionID: "120",
      departmentID: deptID,
    };

    const response = await getDesignationForUpdate(
      JSON.stringify(payload)
    ).unwrap();

    console.log(response);

    const formattedRows = (response.data || []).map((item) => ({
      id: item.designation_id,
      designation: item.designation_name,
      checked: item.isSelected === "1",
    }));

    setRows(formattedRows);
  } catch (error) {
    console.log(error);
    setRows([]);
  }
};


// history designation///


const [getHrAppraisalQuestionDesignation, { isLoading }] =
  useGetHrAppraisalQuestionDesignationMutation();

useEffect(() => {
  fetchHistory();
}, []);

const fetchHistory = async () => {
  try {
    const payload = {
      userID: "171464700312440400",
      appraisalQuestionID: "120",
    };

    const response = await getHrAppraisalQuestionDesignation(JSON.stringify(payload)).unwrap();

    console.log(response);

    // Replace "data" with the actual key returned by your API
    setHistoryData(response.data || []);
  } catch (error) {
    console.error("Error:", error);
  }
};





  const navigate = useNavigate();
  
    const AppraisalQuestion = () => {
      navigate("/AppraisalQuestion/index");
    };

  const { state } = useLocation();

  console.log(state);

  const question = state?.question;

  console.log(question);



const [rows, setRows] = useState([]);

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
  const selectedRows = rows.filter((row) => row.checked);

  if (selectedRows.length === 0) {
    alert("Please select at least one designation.");
    return;
  }

   const selectedDepartment = departmentList.find(
    (dept) => dept.general_task_department_id === department
  );

  const newHistory = selectedRows.map((item) => ({
    department_id: department,
    department_name:selectedDepartment?.general_task_department_name || "",
    designation_name: item.designation,
    designation_name: item.designation,
    
    added_by: "Admin",
    added_on: new Date().toLocaleString(),
  }));

  setHistoryData((prev) => [...newHistory, ...prev]);

  console.log(newHistory);
};

console.log(historyData);
console.log(historyData[0]);

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
            gap: 1.5,
          }}
        >

       <MenuOpenIcon sx={{ color: "#1976d2",  fontSize: 35 }} 
        onClick={AppraisalQuestion} 
        />
          
         <Typography
                     sx={{
                       fontWeight: 700,
                       fontSize: 20,
                       fontFamily: "Times New Roman",
                     }}
                   >
                     Add Designation
                   </Typography>
     
          </Box>
        
        
<FormControl fullWidth>
  <InputLabel>Department</InputLabel>

 

  <Select
  value={department}
  label="Department"
  onChange={handleDepartmentChange}
>
  {departmentList.map((item) => (
    <MenuItem
      key={item.general_task_department_id}
      value={item.general_task_department_id}
    >
      {item.general_task_department_name}
    </MenuItem>
  ))}
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
      <TableCell sx={{ fontWeight: "bold" }}>Sl No</TableCell>

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
            onChange={() => handleRowCheck(row.id)}
        
          />
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
        <br></br>

     <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mt: 4,
  }}
>
  <Button
    variant="contained"
    onClick={handleSubmit}
    sx={{
      width: 150,
      height: 50,
      borderRadius: 2,
      fontWeight: 600,
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
  {historyData.length > 0 &&
    console.log("History Data:", historyData)}

  {isLoading ? (
    <TableRow>
      <TableCell colSpan={5} align="center">
        Loading...
      </TableCell>
    </TableRow>
  ) : historyData.length === 0 ? (
    <TableRow>
      <TableCell colSpan={5} align="center">
        No Records Found
      </TableCell>
    </TableRow>
  ) : (
    historyData.map((item, index) => (
      <TableRow key={item.id || index}>
        <TableCell>{index + 1}</TableCell>

        <TableCell>{String(item.department_name || "")}</TableCell>

        <TableCell>{String(item.designation_name || "")}</TableCell>

        <TableCell>{String(item.added_user_name || item.added_by || "")}</TableCell>

        <TableCell>{String(item.added_on || "")}</TableCell>
      </TableRow>
    ))
  )}
</TableBody>
        </Table>
      </Paper>
    </Box>
  );
}