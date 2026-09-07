
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

import {
  useUpdateLiaisonProcessPlanningAuthorityMutation,
} from "../../api/constructionApi";



const authorityList = [
  { id: 6, authority_name: "BBMP" },
  { id: 1, authority_name: "BDA" },
  { id: 3, authority_name: "BIAAPA" },
  { id: 2, authority_name: "BMICAPA" },
  { id: 4, authority_name: "BMRDA" },
  { id: 13, authority_name: "DTCP" },
  { id: 14, authority_name: "KPL (Kolar Planning Authority)" },
  { id: 9, authority_name: "MALUR PLANNING AUTHORITY" },
  { id: 5, authority_name: "MUDA" },
  { id: 10, authority_name: "STRR" },
  { id: 11, authority_name: "Temp" },
  { id: 12, authority_name: "TUDA" },
];


export default function UpdatePlanningAuthority({
  open,
  onClose,
  processData,
  planningAuthority = [],
  onUpdate,
}) {
  const [authorities, setAuthorities] = useState([]);

  const [
  updateLiaisonProcessPlanningAuthority,
  { isLoading: isUpdating },
] = useUpdateLiaisonProcessPlanningAuthorityMutation();




  
useEffect(() => {
  // if (!open) {
  //   setAuthorities([]);
  //   return;
  // }

  const apiAuthorities = Array.isArray(planningAuthority)
    ? planningAuthority
    : [];

  console.log("====================================");
  console.log("PLANNING AUTHORITY FROM API:");
  console.log(apiAuthorities);
  console.log("====================================");

  const updatedAuthorities = authorityList.map((authority) => {
    const matchedAuthority = apiAuthorities.find((item) => {

      // API ID
      const apiId =
        // item?.authority?.id ??
        // item?.authority_id ??
        // item?.authorityID ??
        // item?.authorityId ??
        // item?.planning_authority_id ??
        // item?.planningAuthorityId ??
        // item?.planningAuthorityID ??
        item?.id;
                item?.authority_name;


      // API NAME
      const apiName =
        item?.authority?.authority_name ;
        // item?.authority?.name ??
        // item?.authority_name ??
        // item?.authorityName ??
        // item?.planning_authority_name ??
        // item?.planningAuthorityName ??
        // item?.name;

      // Match ID
      const idMatch =
        apiId !== undefined &&
        apiId !== null &&
        String(apiId).trim() === String(authority.id).trim();

      // Match NAME
      const nameMatch =
        apiName &&
        String(apiName).trim().toLowerCase() ===
          String(authority.authority_name).trim().toLowerCase();

      return idMatch || nameMatch;
    });

    const checked = !!matchedAuthority;

    console.log({
      masterId: authority.id,
      masterName: authority.authority_name,
      matchedAPIData: matchedAuthority,
      checked: checked,
    });

    return {
      id: authority.id,
      authority_name: authority.authority_name,
      checked: checked,
      map_status: checked ? 1 : 0,
    };
  });

  console.log("FINAL CHECKBOX DATA:", updatedAuthorities);

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
        checked: newChecked,
        map_status: newChecked ? 1 : 0,
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



const handleUpdate = async () => {
  try {
    const payload = {
      userID: "169548080048036100",

      planningAuthorityID: authorities.map((item) => ({
        id: String(item.id),
        isSelected: item.checked === true,
        authority_name: item.authority_name,
        map_status: item.checked ? 1 : 0,
      })),

      liaisonProcessID: String(
        processData?.liaisonProcessID ??
          processData?.liaison_process_id ??
          processData?.id ??
          ""
      ),
    };

    console.log("UPDATE PAYLOAD:", payload);

    const response =
      await updateLiaisonProcessPlanningAuthority(
        JSON.stringify(payload)
      ).unwrap();

    console.log("UPDATE RESPONSE:", response);

    // Tell parent/table page that update was successful
    if (onUpdate) {
      onUpdate(authorities);
    }

  } catch (error) {
    console.error(
      "UPDATE PLANNING AUTHORITY API ERROR:",
      error
    );

    setErrorMessage(
      error?.data?.message ||
        error?.data?.error ||
        "Failed to update Planning Authority"
    );
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
                  {item.authority_name}
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
  disabled={isUpdating}
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
  {isUpdating ? "UPDATING..." : "UPDATE"}
</Button>
        </Box>

      </Box>
    </Dialog>
  );
}
