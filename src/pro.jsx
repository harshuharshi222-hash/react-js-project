import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  Paper,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GavelIcon from "@mui/icons-material/Gavel";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const drawerWidth = 300;

const rows = [
  {
    id: 1,
    project: "",
    category: "",
    title: "",
    description: "",
  },
];

export default function DashboardUI() {
  const [user, setUser] = useState("Sadanand");

  return (
    <Box sx={{ display: "flex", bgcolor: "#f4f4f4", minHeight: "100vh" }}>
      
      {/* TOPBAR */}
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          bgcolor: "white",
          color: "black",
          zIndex: 1201,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          
          {/* LEFT */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton>
              <MenuIcon sx={{ fontSize: 35 }} />
            </IconButton>

            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#1f2347" }}
            >
              KNS
            </Typography>
          </Box>

          {/* RIGHT */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Badge badgeContent="99+" color="secondary">
              <NotificationsIcon />
            </Badge>

            <Typography variant="h6">Sadanand</Typography>

            <Avatar />

            <Typography
              sx={{ color: "green", fontWeight: "bold", fontSize: 28 }}
            >
              TEST
            </Typography>

            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: "#9be28c",
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#171d47",
            color: "white",
            mt: "64px",
          },
        }}
      >
        <List>
          <ListItem button sx={{ py: 3 }}>
            <ListItemIcon sx={{ color: "white" }}>
              <GavelIcon />
            </ListItemIcon>

            <ListItemText
              primary="Legal"
              primaryTypographyProps={{ fontSize: 20 }}
            />

            <KeyboardArrowDownIcon />
          </ListItem>

          <ListItem button sx={{ py: 3 }}>
            <ListItemIcon sx={{ color: "white" }}>
              <AdminPanelSettingsIcon />
            </ListItemIcon>

            <ListItemText
              primary="Admin"
              primaryTypographyProps={{ fontSize: 20 }}
            />

            <KeyboardArrowDownIcon />
          </ListItem>

          <ListItem button sx={{ py: 3 }}>
            <ListItemIcon sx={{ color: "white" }}>
              <FormatAlignLeftIcon />
            </ListItemIcon>

            <ListItemText
              primary="Master"
              primaryTypographyProps={{ fontSize: 20 }}
            />

            <KeyboardArrowDownIcon />
          </ListItem>
        </List>
      </Drawer>

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: "64px",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4">Welcome</Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl sx={{ minWidth: 400 }} size="small">
              <InputLabel>User</InputLabel>

              <Select
                value={user}
                label="User"
                onChange={(e) => setUser(e.target.value)}
              >
                <MenuItem value="Sadanand">Sadanand</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              sx={{
                bgcolor: "#1976d2",
                px: 4,
              }}
            >
              SEARCH
            </Button>
          </Box>
        </Box>

        {/* EMPTY BAR */}
        <Box
          sx={{
            height: 45,
            bgcolor: "#efefef",
            borderRadius: 5,
            mb: 4,
          }}
        />

        {/* CARD */}
        <Card
          sx={{
            p: 3,
            borderRadius: 3,
            boxShadow: 2,
          }}
        >
          {/* TITLE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              To Do
            </Typography>

            <AddCircleIcon
              sx={{
                color: "#7d5fff",
                fontSize: 35,
              }}
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* CONTENT */}
          <Box sx={{ display: "flex", gap: 3 }}>
            
            {/* TABLE */}
            <TableContainer
              component={Paper}
              sx={{
                flex: 1,
                maxHeight: 500,
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {[
                      "Sl.No",
                      "Project",
                      "Category",
                      "Title",
                      "Description",
                    ].map((head) => (
                      <TableCell
                        key={head}
                        sx={{
                          fontWeight: "bold",
                          bgcolor: "#f7f7f7",
                          fontSize: 18,
                        }}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.project}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* MESSAGE */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 250,
                }}
              >
                <Typography
                  sx={{
                    bgcolor: "#efefef",
                    px: 4,
                    py: 2,
                    borderRadius: 1,
                    fontSize: 28,
                    color: "gray",
                  }}
                >
                  You don't have permission to view the data
                </Typography>
              </Box>
            </TableContainer>

            {/* CALENDAR */}
            <Paper
              sx={{
                width: 320,
                p: 3,
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  mb: 4,
                }}
              >
                May 2026
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7,1fr)",
                  gap: 3,
                  textAlign: "center",
                }}
              >
                {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                  <Typography key={day} fontWeight="bold">
                    {day}
                  </Typography>
                ))}

                {Array.from({ length: 31 }, (_, i) => (
                  <Typography
                    key={i}
                    sx={{
                      p: 1,
                      borderRadius: "50%",
                      border:
                        i + 1 === 25 ? "1px solid black" : "none",
                    }}
                  >
                    {i + 1}
                  </Typography>
                ))}
              </Box>
            </Paper>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}