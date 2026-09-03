
import React, { useEffect, useState } from "react";

import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Button,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";



const authorityList = [
  { id: 1, name: "BBMP" },
  { id: 2, name: "BDA" },
  { id: 3, name: "BIAAPA" },
  { id: 4, name: "BMICAPA" },
  { id: 5, name: "BMRDA" },
  { id: 6, name: "DTCP" },
  { id: 7, name: "KPL (Kolar Planning Authority)" },
  { id: 8, name: "MALUR PLANNING AUTHORITY" },
  { id: 9, name: "MUDA" },
  { id: 10, name: "STRR" },
  { id: 11, name: "Temp" },
  { id: 12, name: "TUDA" },
];



export default function UpdatePlanningAuthority({
  open,
  onClose,
  processData,
  planningAuthority = [],
  onUpdate,
}) {
  const [authorities, setAuthorities] = useState([]);



  useEffect(() => {
    if (!open) {
      setAuthorities([]);
      return;
    }

    console.log("====================================");
    console.log("UPDATE PLANNING AUTHORITY");
    console.log("PROCESS DATA:", processData);
    console.log("PLANNING AUTHORITY API:", planningAuthority);
    console.log("====================================");

    const apiAuthorities = Array.isArray(planningAuthority)
      ? planningAuthority
      : [];

   

    const updatedAuthorities = authorityList.map((authority) => {
     
      const matchedAuthority = apiAuthorities.find((item) => {
        const apiId =
          item?.authority_id ??
          item?.authorityID ??
          item?.authorityId ??
          item?.planning_authority_id ??
          item?.planningAuthorityId ??
          item?.planningAuthorityID ??
          item?.id;

        return (
          apiId !== undefined &&
          apiId !== null &&
          String(apiId).trim() === String(authority.id).trim()
        );
      });



      const mapStatus =
        matchedAuthority?.map_status ??
        matchedAuthority?.mapStatus ??
        null;

 

      const checked = String(mapStatus) === "1";

      console.log({
        authorityId: authority.id,
        authorityName: authority.name,
        matchedAuthority,
        mapStatus,
        checked,
      });

      return {
        id: authority.id,
        name: authority.name,

        // Checkbox UI state
        checked: checked,

        // API value
        map_status: checked ? 1 : null,
      };
    });

    console.log(
      "FINAL CHECKBOX DATA:",
      updatedAuthorities
    );

    setAuthorities(updatedAuthorities);
  }, [open, planningAuthority]);



  const handleCheckbox = (id) => {
    setAuthorities((oldData) =>
      oldData.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const newChecked = !item.checked;

        return {
          ...item,

          // Checkbox state
          checked: newChecked,

          // API value
          map_status: newChecked ? 1 : null,
        };
      })
    );
  };



  const handleSelectAll = (event) => {
    const checked = event.target.checked;

    setAuthorities((oldData) =>
      oldData.map((item) => ({
        ...item,

        checked: checked,
        map_status: checked ? 1 : null,
      }))
    );
  };



  const handleUpdate = () => {


    const authorityData = authorities.map((item) => ({
      id: item.id,
      map_status: item.checked ? 1 : null,
    }));

    console.log("====================================");
    console.log("UPDATE AUTHORITY PAYLOAD:");
    console.log(authorityData);
    console.log("====================================");

    if (onUpdate) {
      onUpdate(authorityData);
    }
  };



  const allSelected =
    authorities.length > 0 &&
    authorities.every((item) => item.checked === true);

  const someSelected =
    authorities.some((item) => item.checked === true) &&
    !allSelected;

 
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "5px",
        },
      }}
    >

      <Box
        sx={{
          height: "54px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #ddd",
          px: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 600,
          }}
        >
          Update Planning Authority
        </Typography>

        <IconButton
          onClick={onClose}
          sx={{
            color: "red",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>



      <Box sx={{ p: 2.5 }}>



        <Box
          sx={{
            display: "flex",
            gap: "5px",
            mb: 1,
          }}
        >
          <Typography
            sx={{
              color: "green",
              fontWeight: 700,
              fontSize: "15px",
            }}
          >
            Process :
          </Typography>

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            {processData?.process_name || "-"}
          </Typography>
        </Box>



        <Table
          sx={{
            border: "1px solid #ddd",
            tableLayout: "fixed",
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#eef7fd",
              }}
            >
              {/* SI NO */}

              <TableCell
                sx={{
                  width: "12%",
                  fontWeight: 700,
                  fontSize: "16px",
                  borderRight: "1px solid #ddd",
                  py: 0.7,
                }}
              >
                SI No
              </TableCell>

              {/* AUTHORITY */}

              <TableCell
                sx={{
                  width: "55%",
                  fontWeight: 700,
                  fontSize: "16px",
                  borderRight: "1px solid #ddd",
                  py: 0.7,
                }}
              >
                AUTHORITY
              </TableCell>

              {/* APPLICABILITY */}

              <TableCell
                sx={{
                  width: "33%",
                  fontWeight: 700,
                  fontSize: "16px",
                  py: 0.7,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "16px",
                    }}
                  >
                    APPLICABILITY
                  </Typography>

                  <Checkbox
                    size="small"
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={handleSelectAll}
                  />
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>



          <TableBody>
            {authorities.map((item, index) => (
              <TableRow key={item.id}>

                {/* SI NO */}

                <TableCell
                  sx={{
                    borderRight: "1px solid #ddd",
                    py: 0.4,
                    fontSize: "16px",
                  }}
                >
                  {index + 1}
                </TableCell>

                {/* AUTHORITY */}

                <TableCell
                  sx={{
                    borderRight: "1px solid #ddd",
                    py: 0.4,
                    fontSize: "16px",
                  }}
                >
                  {item.name}
                </TableCell>

                {/* CHECKBOX */}

                <TableCell
                  sx={{
                    py: 0.4,
                  }}
                >
                  <Checkbox
                    size="small"
                    checked={item.checked === true}
                    onChange={() =>
                      handleCheckbox(item.id)
                    }
                  />
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>



        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              backgroundColor: "#1976d2",
              fontWeight: 700,
              fontSize: "14px",
              px: 2,
              py: 0.8,

              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            UPDATE
          </Button>
        </Box>

      </Box>
    </Dialog>
  );
}
