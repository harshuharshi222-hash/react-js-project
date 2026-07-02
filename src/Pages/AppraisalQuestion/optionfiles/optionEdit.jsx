
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function UpdateOption() {
  const [rate, setRate] = useState("Unsatisfactory (1)");
  const [status, setStatus] = useState("Active");
  const [description, setDescription] = useState("hi");

const location = useLocation();

const option = location.state?.option;

useEffect(() => {
  if (option) {
    setRate(option.rate);
    setStatus(option.status);
    setDescription(option.rate_description);
  }
}, [option]);

  

  return (
    <Box sx={{ background: "#f5f5f5", minHeight: "100vh", p: 2 }}>
      {/* Header */}
      <Toolbar sx={{ pl: 0 }}>
        <IconButton>
          <MenuIcon color="primary" />
        </IconButton>

        <Typography
          variant="h6"
          fontWeight="600"
          sx={{ ml: 1 }}
        >
          Update Option
        </Typography>
      </Toolbar>

      {/* Card */}
      <Card
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: 1,
        }}
      >
        <Typography sx={{ mb: 3 }}>
          <span
            style={{
              color: "green",
              fontWeight: 700,
            }}
          >
            Question:
          </span>{" "}
          121 . 12
        </Typography>

        {/* Rate */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Rate *</InputLabel>

          <Select
            value={rate}
            label="Rate *"
            onChange={(e) => setRate(e.target.value)}
          >
            <MenuItem value="Unsatisfactory (1)">
              Unsatisfactory (1)
            </MenuItem>

            <MenuItem value="Needs Improvement (2)">
              Needs Improvement (2)
            </MenuItem>

            <MenuItem value="Average (3)">
              Average (3)
            </MenuItem>

            <MenuItem value="Good (4)">
              Good (4)
            </MenuItem>

            <MenuItem value="Excellent (5)">
              Excellent (5)
            </MenuItem>
          </Select>
        </FormControl>

        {/* Editor */}
        <Box
          sx={{
            border: "1px solid #ddd",
            borderRadius: 1,
            overflow: "hidden",
            mb: 3,
          }}
        >
          {/* Toolbar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 1,
              background: "#fafafa",
            }}
          >
            <IconButton size="small">
              <FormatBoldIcon />
            </IconButton>

            <IconButton size="small">
              <FormatItalicIcon />
            </IconButton>

            <IconButton size="small">
              <FormatUnderlinedIcon />
            </IconButton>

            <Divider orientation="vertical" flexItem />

            <IconButton size="small">
              <FormatListBulletedIcon />
            </IconButton>

            <IconButton size="small">
              <FormatListNumberedIcon />
            </IconButton>

            <Divider orientation="vertical" flexItem />

            <IconButton size="small">
              <LinkIcon />
            </IconButton>

            <IconButton size="small">
              <LinkOffIcon />
            </IconButton>

            <Divider orientation="vertical" flexItem />

            <IconButton size="small">
              <UndoIcon />
            </IconButton>

            <IconButton size="small">
              <RedoIcon />
            </IconButton>
          </Box>

          <Divider />

          {/* Text Area */}
          <TextField
            multiline
            rows={8}
            fullWidth
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputProps={{
              disableUnderline: true,
              sx: {
                p: 2,
                alignItems: "flex-start",
              },
            }}
          />
        </Box>

        {/* Status */}
        <FormControl fullWidth>
          <InputLabel>Status *</InputLabel>

          <Select
            value={status}
            label="Status *"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>

        {/* Save */}
        <Box
          sx={{
            mt: 5,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: 85,
              height: 42,
              textTransform: "uppercase",
              borderRadius: 1,
            }}
          >
            Save
          </Button>
        </Box>
      </Card>
    </Box>
  );
}