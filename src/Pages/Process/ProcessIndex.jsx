


import React, { useMemo, useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";

import { useNavigate } from "react-router-dom";

import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";

import {
  Box,
  Button,
  Chip,
  Checkbox,
  ListItemText,
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
import TableCell, {
  tableCellClasses,
} from "@mui/material/TableCell";

import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  useGetLiaisonProcessMutation,
  useGetLiaisonProcessCategoryMutation,
  useGetUserMutation,
} from "../../api/constructionApi";

import UpdatePlanningAuthority from "../../Pages/Process/PlanningUpdate";

export default function LiaisonProcess() {
  const navigate = useNavigate();


  const [totalRecords, setTotalRecords] = useState(0);



  // Filter values currently selected in the UI
const [searchText, setSearchText] = useState("");
const [category, setCategory] = useState("");
const [status, setStatus] = useState("Active");
const [user, setUser] = useState("");
const [ismandatory, setIsMandatory] = useState("");

// Filter values actually applied after clicking Search
const [appliedSearchText, setAppliedSearchText] = useState("");
const [appliedCategory, setAppliedCategory] = useState("");
const [appliedStatus, setAppliedStatus] = useState("Active");
const [appliedUser, setAppliedUser] = useState("");
const [appliedIsMandatory, setAppliedIsMandatory] = useState("");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  const [planningAuthorityOpen, setPlanningAuthorityOpen] =
    useState(false);

  const [selectedProcessData, setSelectedProcessData] =
    useState(null);

  const [selectedPlanningAuthority, setSelectedPlanningAuthority] =
    useState([]);


  const [getLiaisonProcessApi] =
    useGetLiaisonProcessMutation();

  const [getLiaisonProcessCategory] =
    useGetLiaisonProcessCategoryMutation();

  const [getUser] = useGetUserMutation();



  const [categoryList, setCategoryList] = useState([]);
  const [userList, setUserList] = useState([]);


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

  // Only use filters after Search button is clicked
  processStatus: appliedStatus,
  processCategory: appliedCategory,
  processOwner: appliedUser,
  isMandatory: appliedIsMandatory,

  completionType: "",
  executionType: "",

  generalSearch: appliedSearchText,

  sortOrder: "",

  iDisplayStart: pageIndex * pageSize,
   iDisplayLength: pageSize,
};
      const response =
        await getLiaisonProcessApi(
          JSON.stringify(payload)
        ).unwrap();

      console.log(
        "LIAISON API RESPONSE:",
        response
      );

      console.log(
        "FIRST ROW:",
        response?.data?.[0]
      );

      setData(response?.data || []);

      setTotalRecords(
        response?.totalCount ||
          response?.totalRecords ||
          0
      );
    } catch (err) {
      console.log(
        "Liaison Process API Error:",
        err
      );

      setData([]);
      setTotalRecords(0);
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
  appliedSearchText,
  appliedCategory,
  appliedStatus,
  appliedUser,
  appliedIsMandatory,
]);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const payload = {
        userID: "169548080048036100",
      };

      const response =
        await getLiaisonProcessCategory(
          JSON.stringify(payload)
        ).unwrap();

      console.log(
        "Category Response:",
        response
      );

      if (response?.data) {
        setCategoryList(response.data);
      } else {
        setCategoryList([]);
      }
    } catch (error) {
      console.log(
        "Category API Error:",
        error
      );

      setCategoryList([]);
    }
  };

 

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

      const response =
        await getUser(
          JSON.stringify(payload)
        ).unwrap();

      console.log(
        "User Response:",
        response
      );

      if (response?.user) {
        setUserList(response.user);
      } else if (response?.data) {
        setUserList(response.data);
      } else {
        setUserList([]);
      }
    } catch (err) {
      console.log(
        "User API Error:",
        err
      );

      setUserList([]);
    }
  };

  

  const allColumns = [
    "SL/No",
    "Category Name",
    "Process Name",
    "Order",
    "Process Load Time",
    "Owner",
    "Execution Type",
    "Is Mandatory",
    "Completion Type",
    "Priority",
    "Planning Authority",
    "Added By",
    "Added On",
    "Status",
  ];



  const [selected, setSelected] =
    useState(allColumns);

  const [columnVisibility, setColumnVisibility] =
    useState({
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

  const handleChange = (event) => {
    const value =
      typeof event.target.value === "string"
        ? event.target.value.split(",")
        : event.target.value;

    setSelected(value);

    setColumnVisibility({
      slNo: value.includes("SL/No"),
      process_category_name:
        value.includes("Category Name"),
      process_name:
        value.includes("Process Name"),
      process_order:
        value.includes("Order"),
      process_lead_time:
        value.includes("Process Load Time"),
      owner_name:
        value.includes("Owner"),
      execution_type:
        value.includes("Execution Type"),
      is_mandatory:
        value.includes("Is Mandatory"),
      completion_type:
        value.includes("Completion Type"),
      task_priority:
        value.includes("Priority"),
      planning_authority:
        value.includes("Planning Authority"),
      user_name:
        value.includes("Added By"),
      added_on:
        value.includes("Added On"),
      status:
        value.includes("Status"),
    });
  };



  const handleProcessAuthority = (rowData) => {
    console.log(
      "Planning Authority Edit Row:",
      rowData
    );

    setSelectedProcessData(rowData);

    setSelectedPlanningAuthority(
      rowData?.planningAuthority || []
    );

    setPlanningAuthorityOpen(true);
  };


  const handleClosePlanningAuthority = () => {
    setPlanningAuthorityOpen(false);

    setSelectedProcessData(null);

    setSelectedPlanningAuthority([]);
  };


  const handlePlanningAuthorityUpdate = (
    selectedAuthorities
  ) => {
    console.log(
      "Updated Planning Authorities:",
      selectedAuthorities
    );

    

    handleClosePlanningAuthority();

    getLiaisonProcess(
      pagination.pageIndex,
      pagination.pageSize
    );
  };



  const handleAddLiaisonProcess = () => {
    navigate(
      "/LiaisonProcess/Process/ProcessForm"
    );
  };



  const handleUpdateLiaisonProcess = (
    rowData
  ) => {
    navigate(
      "/LiaisonProcess/Process/ProcessEdit",
      {
        state: {
          question: rowData,
        },
      }
    );
  };

 

  const handlegotodashboard = () => {
    navigate("/dashboard");
  };


  const handlePrint = () => {
    const printElement =
      document.getElementById(
        "printTable"
      );

    if (!printElement) return;

    const printContents =
      printElement.innerHTML;

    const printWindow = window.open(
      "",
      "",
      "width=1200,height=800"
    );

    printWindow.document.write(`
      <html>
        <head>
          <title>Liaison Process</title>

          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
            }

            th,
            td {
              border: 1px solid #000;
              padding: 8px;
              text-align: left;
            }

            th {
              background: #f2f2f2;
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
      "Process Load Time",
      "Owner",
      "Execution Type",
      "Is Mandatory",
      "Completion Type",
      "Priority",
      "Planning Authority",
      "Added By",
      "Added On",
      "Status",
    ];

    console.log(
      "Export Headers:",
      headers
    );

    console.log(
      "Export Data:",
      data
    );
  };



  const StyledTableCell =
    styled(TableCell)(({ theme }) => ({
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
        borderBottom:
          "1px solid #ddd",
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

  const StyledTableRow =
    styled(TableRow)(() => ({
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



  const columns = useMemo(
    () => [
      {
        id: "slNo",
        header: "SL/No",
        size: 60,

        cell: ({ row }) =>
          pagination.pageIndex *
            pagination.pageSize +
          row.index +
          1,
      },

    {
  accessorKey: "process_category_name",
  header: "Category Name",
  size: 130,

  cell: ({ getValue }) => (
    <Tooltip title={getValue() || "-"} arrow>
      <Box
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          cursor: "pointer",
        }}
      >
        {getValue() || "-"}
      </Box>
    </Tooltip>
  ),
},




      {
        accessorKey: "process_name",
        header: "Process Name",
        size: 160,
       cell: ({ getValue }) => (
    <Tooltip title={getValue() || "-"} arrow>
      <Box
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          cursor: "pointer",
        }}
      >
        {getValue() || "-"}
      </Box>
    </Tooltip>
  ),
},

      {
        accessorKey: "process_order",
        header: "Order",
        size: 80,
      },

      {
        accessorKey:
          "process_lead_time",
        header: "Process Load Time",
        size: 130,
      },

      {
        accessorKey: "owner_name",
        header: "Owner",
        size: 120,
      },

      {
        accessorKey: "execution_type",
        header: "Execution Type",
        size: 120,
      },

      {
        accessorKey: "is_mandatory",
        header: "Is Mandatory",
        size: 110,
      },

      {
        accessorKey:
          "completion_type",
        header: "Completion Type",
        size: 120,
      },

      {
        accessorKey: "task_priority",
        header: "Priority",
        size: 100,
      },


      {
   accessorKey: "planning_authority",
  header: "Planning Authority",
  size: 100,

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
        <Tooltip title="Edit Planning Authority">
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
      handleProcessAuthority(row.original);
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
        size: 120,
      },

      {
        accessorKey: "added_on",
        header: "Added On",
        size: 120,
      },

     
      {
        accessorKey: "status",
        id: "status",
        header: "Status",
        size: 110,

        cell: ({ row }) => {
          const rowStatus =
            row.original
              .status ||
            row.original
              .processStatus ||
            row.original
              .process_status ||
            "";

          const normalizedStatus =
            String(
              rowStatus
            ).toLowerCase();

          const isActive =
            normalizedStatus ===
            "active";

          return (
            <Chip
              label={
                rowStatus || "-"
              }
              onClick={(e) => {
                e.stopPropagation();

                handleUpdateLiaisonProcess(
                  row.original
                );
              }}
              sx={{
                width: 90,
                fontWeight:
                  "bold",
                color: "#fff",
                cursor:
                  "pointer",

                backgroundColor:
                  isActive
                    ? "#74BFD0"
                    : "#6C63FF",

                "&:hover": {
                  backgroundColor:
                    isActive
                      ? "#74BFD0"
                      : "#6C63FF",
                },
              }}
            />
          );
        },
      },
    ],
    [
      pagination.pageIndex,
      pagination.pageSize,
    ]
  );


  const table = useReactTable({
    data,
    columns,

    state: {
      pagination,
      columnVisibility,
    },

    manualPagination: true,

    pageCount: Math.max(
      1,
      Math.ceil(
        (totalRecords || 0) /
          pagination.pageSize
      )
    ),

    onPaginationChange:
      setPagination,

    onColumnVisibilityChange:
      setColumnVisibility,

    getCoreRowModel:
      getCoreRowModel(),
  });

  const totalPages = Math.max(
    1,
    Math.ceil(
      (totalRecords || 0) /
        pagination.pageSize
    )
  );

  return (
    <Box
      sx={{
        background: "#ffffff",
        minHeight: "100vh",
        p: 2,
      }}
    >
   


      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: -7,
          borderRadius: 3,
          display: "flex",
          justifyContent:
            "end",
          alignItems: "center",
          flexWrap:
            "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems:
              "center",
            flexWrap:
              "wrap",
          }}
        >
          {/* COLUMN FILTER */}

          <FormControl
            size="small"
          >
            <Select
              multiple
              value={selected}
              onChange={
                handleChange
              }
              displayEmpty
              IconComponent={() =>
                null
              }
              renderValue={() => (
                <FilterListIcon
                  sx={{
                    color:
                      "#6c6868",
                    fontSize: 26,
                  }}
                />
              )}
              sx={{
                width: 45,
                height: 40,
                border:
                  "1px solid #a5a8ad",
                borderRadius:
                  "3px",

                "& .MuiOutlinedInput-notchedOutline":
                  {
                    border:
                      "none",
                  },

                "& .MuiSelect-select":
                  {
                    display:
                      "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    padding:
                      "0px !important",
                  },
              }}
            >
              {allColumns.map(
                (column) => (
                  <MenuItem
                    key={column}
                    value={column}
                  >
                    <Checkbox
                      checked={selected.includes(
                        column
                      )}
                    />

                    <ListItemText
                      primary={
                        column
                      }
                    />
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          {/* CATEGORY */}

          <FormControl
            size="small"
            sx={{
              width: 180,
            }}
          >
            <InputLabel>
              Category
            </InputLabel>

            <Select
              value={category}
              label="Category"
            
              onChange={(e) => {
  setCategory(e.target.value);
}}
              endAdornment={
                category && (
                  <InputAdornment
                    position="end"
                    sx={{
                      mr: 2,
                    }}
                  >
                    <IconButton
                      fontSize="small"
                      
                      onClick={(
                        e
                      ) => {
                        e.stopPropagation();

                        setCategory(
                          ""
                        );

                        setPagination(
                          (
                            prev
                          ) => ({
                            ...prev,
                            pageIndex: 0,
                          })
                        );
                      }}
                    >
                       <ClearIcon
                        fontSize="small"
                      />
                      </IconButton>
                  </InputAdornment>
                )
              }
            >
              {categoryList.map(
                (item) => (
                  <MenuItem
                    key={
                      item.id
                    }
                    value={
                      item.id
                    }
                  >
                    {
                      item.process_category_name
                    }
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          {/* USER */}

          <FormControl
            size="small"
            sx={{
              width: 180,
            }}
          >
            <InputLabel>
              User
            </InputLabel>

            <Select
              value={user}
              label="User"
             
              onChange={(e) => {
  setUser(e.target.value);
}}
              endAdornment={
                user && (
                  <InputAdornment
                    position="end"
                    sx={{
                      mr: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={(
                        e
                      ) => {
                        e.stopPropagation();

                        setUser(
                          ""
                        );

                        setPagination(
                          (
                            prev
                          ) => ({
                            ...prev,
                            pageIndex: 0,
                          })
                        );
                      }}
                    >
                      <ClearIcon
                        fontSize="small"
                      />
                    </IconButton>
                  </InputAdornment>
                )
              }
            >
              {userList.map(
                (item) => (
                  <MenuItem
                    key={
                      item.user_id
                    }
                    value={
                      item.user_id
                    }
                  >
                    {
                      item.user_name
                    }
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          {/* IS MANDATORY */}

          <FormControl
            size="small"
            sx={{
              width: 180,
            }}
          >
            <InputLabel>
              Is Mandatory
            </InputLabel>

            <Select
              value={
                ismandatory
              }
              label="Is Mandatory"
             
              onChange={(e) => {
  setIsMandatory(e.target.value);
}}
            >
             
              <MenuItem value="default">
                Default
              </MenuItem>

              <MenuItem value="legaloption">
                LegalOption
              </MenuItem>

              <MenuItem value="liaisonoption">
                LiaisonOption
              </MenuItem>
            </Select>
            
          </FormControl>

          {/* STATUS */}

          <FormControl
            size="small"
            sx={{
              width: 180,
            }}
          >
            <InputLabel>
              Status
            </InputLabel>

            <Select
              value={status}
              label="Status"
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
            >
              <MenuItem value="Active">
                Active
              </MenuItem>

              <MenuItem value="inActive">
                In-Active
              </MenuItem>
            </Select>
          </FormControl>

          {/* SEARCH */}

          <TextField
            size="small"
            label="Search"
            value={searchText}
            onChange={(e) =>
              setSearchText(
                e.target.value
              )
            }
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

          {/* SEARCH BUTTON */}

         

          <Button
  variant="contained"
  size="small"
  onClick={() => {
    // Apply currently selected filters
    setAppliedSearchText(searchText);
    setAppliedCategory(category);
    setAppliedStatus(status);
    setAppliedUser(user);
    setAppliedIsMandatory(ismandatory);

    // Go back to first page
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));

    // setCategory("");
    // setUser("");
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
          justifyContent:
            "start",
          alignItems:
            "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems:
              "center",
            gap: 1.5,
          }}
        >
          <MenuOpenIcon
            sx={{
              color:
                "#1976d2",
              fontSize: 35,
              cursor:
                "pointer",
            }}
            onClick={
              handlegotodashboard
            }
          />

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 20,
              fontFamily:
                "Times New Roman",
            }}
          >
            Process
          </Typography>

          <Tooltip title="Add">
            <IconButton
              onClick={
                handleAddLiaisonProcess
              }
            >
              <AddCircleIcon
                sx={{
                  color:
                    "#7a5af8",
                  fontSize: 30,
                }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Export">
            <IconButton
              onClick={
                handleDownload
              }
            >
              <SystemUpdateAltIcon
                sx={{
                  color:
                    "#6C63FF",
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
          overflow:
            "hidden",
            resize: "vertical",
            overflow: "auto",
          border:
            "25px solid #ffffff",
        }}
      >
        <div id="printTable">
          <TableContainer
            component={Paper}
            sx={{
              height:
                "500px",

              border:
                "1px solid #d0d7de",

              overflowY:
                "auto",
              overflowX:
                "auto",

              "&::-webkit-scrollbar":
                {
                  width:
                    "8px",
                  height:
                    "8px",
                },

              "&::-webkit-scrollbar-thumb":
                {
                  background:
                    "#dddddd",
                  borderRadius:
                    "10px",
                },
            }}
          >
            <Table
              stickyHeader
              sx={{
                tableLayout:
                  "fixed",
                width:
                  "100%",
              }}
            >
              {/* TABLE HEADER */}

              <TableHead>
                {table
                  .getHeaderGroups()
                  .map(
                    (
                      headerGroup
                    ) => (
                      <TableRow
                        key={
                          headerGroup.id
                        }
                      >
                        {headerGroup.headers.map(
                          (
                            header
                          ) => (
                            <StyledTableCell
                              key={
                                header.id
                              }
                              sx={{
                                width:
                                  header.getSize(),
                                minWidth:
                                  header.getSize(),
                                maxWidth:
                                  header.getSize(),
                                position:
                                  "relative",
                                borderRight:
                                  "1px solid #e0e0e0",
                                whiteSpace:
                                  "nowrap",
                              }}
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header
                                      .column
                                      .columnDef
                                      .header,
                                    header.getContext()
                                  )}

                              {/* RESIZE */}

                              <Box
                                onMouseDown={
                                  header.getResizeHandler()
                                }
                                onTouchStart={
                                  header.getResizeHandler()
                                }
                                sx={{
                                  position:
                                    "absolute",
                                  right: 0,
                                  top: 0,
                                  height:
                                    "100%",
                                  width:
                                    "5px",
                                  cursor:
                                    "col-resize",
                                  userSelect:
                                    "none",
                                  touchAction:
                                    "none",
                                }}
                              />
                            </StyledTableCell>
                          )
                        )}
                      </TableRow>
                    )
                  )}
              </TableHead>

              {/* TABLE BODY */}

             

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
          </StyledTableCell>
        ))}
      </StyledTableRow>
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
        </div>

        {/* 
            PAGINATION
        */}

        <Box
          sx={{
            display:
              "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            pt: 1,
            pb:1,
            borderTop:
              "1px solid #ddd",
            bgcolor:
              "#fff",
          }}
        >
          <Button
            variant="outlined"
            size="small"
            disabled={
              pagination.pageIndex ===
              0
            }
            onClick={() =>
              setPagination(
                (prev) => ({
                  ...prev,
                  pageIndex:
                    prev.pageIndex -
                    1,
                })
              )
            }
            sx={{
              minWidth: 60,
              width: 300,
              height: 50,
              textTransform:
                "none",
              fontSize: 13,
            }}
          >
            Previous
          </Button>

          <Box
            sx={{
              display:
                "flex",
              alignItems:
                "center",
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
              }}
            >
              Page{" "}
              {pagination.pageIndex +
                1}{" "}
              of{" "}
              {totalPages}
            </Typography>

            <FormControl
              size="small"
              sx={{
                minWidth: 120,
              }}
            >
              <Select
                value={
                  pagination.pageSize
                }
                onChange={(e) => {
                  setPagination({
                    pageIndex: 0,
                    pageSize:
                      Number(
                        e.target
                          .value
                      ),
                  });
                }}
              >
                <MenuItem value={10}>
                  10 Rows
                </MenuItem>

                <MenuItem value={20}>
                  20 Rows
                </MenuItem>

                <MenuItem value={30}>
                  30 Rows
                </MenuItem>

                <MenuItem value={40}>
                  40 Rows
                </MenuItem>

                <MenuItem value={50}>
                  50 Rows
                </MenuItem>

                <MenuItem value={150}>
                  150 Rows
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Button
            variant="outlined"
            size="small"
            disabled={
              pagination.pageIndex >=
              totalPages - 1
            }
            onClick={() =>
              setPagination(
                (prev) => ({
                  ...prev,
                  pageIndex:
                    prev.pageIndex +
                    1,
                })
              )
            }
            sx={{
              minWidth: 80,
              width: 300,
              height: 50,
              textTransform:
                "none",
              fontSize: 13,
            }}
          >
            Next
          </Button>
        </Box>
      </Paper>

    {/* //// popup */}

      <UpdatePlanningAuthority
        open={
          planningAuthorityOpen
        }
        onClose={
          handleClosePlanningAuthority
        }
        processData={
          selectedProcessData
        }
        planningAuthority={
          selectedPlanningAuthority
        }
        onUpdate={
          handlePlanningAuthorityUpdate
        }
      />
    </Box>
  );
}