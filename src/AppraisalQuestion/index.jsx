import React, { useMemo, useState } from "react";
import Tooltip from '@mui/material/Tooltip';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import {
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
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

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
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

export default function AppraisalQuestion() {
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Active");

  const data = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        slNo: i + 1,
        categoryName: "",
        title: "",
        description: "",
        designation: "",
        option: "",
        addedBy: "",
        addedOn: "",
        status: "Active",
      })),
    []
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "slNo",
        header: "SL/No",
      },
      {
        accessorKey: "categoryName",
        header: "Category Name",
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "designation",
        header: "Designation",
        cell: () => (
          <InfoIcon
            sx={{ color: "#1976d2", fontSize: 18, cursor: "pointer" }}
          />
        ),
      },
      {
        accessorKey: "option",
        header: "Option",
        cell: () => (
          <InfoIcon
            sx={{ color: "#1976d2", fontSize: 18, cursor: "pointer" }}
          />
        ),
      },
      {
        accessorKey: "addedBy",
        header: "Added By",
      },
      {
        accessorKey: "addedOn",
        header: "Added On",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: () => (
          <Chip
            label="Active"
            sx={{
              background: "#6fb7c4",
              color: "#fff",
              width: 115,
              fontWeight: 600,
              borderRadius: "25px",
            }}
          />
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

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
          mb: 2,
          borderRadius: 3,
          display: "flex",
          justifyContent: "space-between",
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
          <Button
            variant="outlined"
            sx={{
              minWidth: 70,
              height: 42,
            }}
          >
            <FilterListIcon />
          </Button>

          <FormControl size="small" sx={{ width: 180 }}>
            <Select
              value={department}
              displayEmpty
              onChange={(e) => setDepartment(e.target.value)}
            >
              <MenuItem value="">Department</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ width: 180 }}>
            <Select
              value={designation}
              displayEmpty
              onChange={(e) => setDesignation(e.target.value)}
            >
              <MenuItem value="">Designation</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ width: 180 }}>
            <Select
              value={category}
              displayEmpty
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">Category</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ width: 180 }}>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="Active">Active</MenuItem>
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
            // sx={{
            //   height: 40,
            //   px: 4,
            //   size: "small",
            // }}
          >
            Search
          </Button>
        </Box>




        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <MenuOpenIcon sx={{ color: "#1976d2" }} />

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 28,
              fontFamily: "Times New Roman",
            }}
          >
            Appraisal Question
          </Typography>
              <Tooltip title="Add">
          <IconButton>
            <AddCircleIcon sx={{ color: "#7a5af8" }} />
          </IconButton>
          </Tooltip>

            <Tooltip title="Export">
              <IconButton >
            <SystemUpdateAltIcon
              sx={{
                color: "#6C63FF",
                fontSize: 30,
                 ml: -2,
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
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} hover>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      sx={{
                        borderBottom: "1px solid #eee",
                        fontFamily: "Times New Roman",
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
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
            Page 1 of 12
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