

import React, {
  useEffect,
  useState,
} from "react";

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
  {
    id: 1,
    name: "BBMP",
  },
  {
    id: 2,
    name: "BDA",
  },
  {
    id: 3,
    name: "BIAAPA",
  },
  {
    id: 4,
    name: "BMICAPA",
  },
  {
    id: 5,
    name: "BMRDA",
  },
  {
    id: 6,
    name: "DTCP",
  },
  {
    id: 7,
    name: "KPL (Kolar Planning Authority)",
  },
  {
    id: 8,
    name: "MALUR PLANNING AUTHORITY",
  },
  {
    id: 9,
    name: "MUDA",
  },
  {
    id: 10,
    name: "STRR",
  },
  {
    id: 11,
    name: "Temp",
  },
  {
    id: 12,
    name: "TUDA",
  },
];


export default function UpdatePlanningAuthority({
  open,
  onClose,
  processData,
  planningAuthority = [],
  onUpdate,
}) {

  const [authorities, setAuthorities] =
    useState([]);



// useEffect(() => {
//   if (!open) {
//     return;
//   }

//   console.log("====================================");
//   console.log("Planning Authority Popup Open");
//   console.log("Process Data:", processData);
//   console.log("API Planning Authority:", planningAuthority);
//   console.log("====================================");

//   const existingAuthorities = Array.isArray(planningAuthority)
//     ? planningAuthority
//     : [];

//   const updatedAuthorities = authorityList.map((authority) => {
//     const matchedAuthority = existingAuthorities.find((item) => {
//       const apiName = item?.authority_name
//         ?.replace(/<[^>]*>/g, "")
//         ?.trim()
//         ?.toLowerCase();

//       const masterName = authority.name
//         ?.trim()
//         ?.toLowerCase();

//       return apiName === masterName;
//     });

//     console.log(
//       "Authority:",
//       authority.name,
//       "API Match:",
//       matchedAuthority
//     );

//     // IMPORTANT:
//     // Only check if API says this authority is applicable.
//     const isApplicable =
//       matchedAuthority &&
//       (
//         matchedAuthority.applicable === true ||
//         matchedAuthority.applicable === "true" ||
//         matchedAuthority.applicable === "Yes" ||
//         matchedAuthority.applicable === "yes" ||
//         matchedAuthority.applicable === "1" ||
//         matchedAuthority.applicable === 1
//       );

//     return {
//       ...authority,
//       applicable: Boolean(isApplicable),
//     };
//   });

//   console.log(
//     "FINAL CHECKBOX DATA:",
//     updatedAuthorities
//   );

//   setAuthorities(updatedAuthorities);
// }, [
//   open,
//   processData,
//   planningAuthority,
// ]);

useEffect(() => {
  if (!open) return;

  console.log("====================================");
  console.log("Planning Authority Popup Open");
  console.log("Process Data:", processData);
  console.log("API Planning Authority:", planningAuthority);
  console.log("====================================");

  const existingAuthorities = Array.isArray(planningAuthority)
    ? planningAuthority
    : [];

  const updatedAuthorities = authorityList.map((authority) => {
    const matchedAuthority = existingAuthorities.find((item) => {

      const apiId =
        item?.authority_id ??
        item?.planning_authority_id ??
        item?.id;

      if (
        apiId !== undefined &&
        apiId !== null &&
        String(apiId) === String(authority.id)
      ) {
        return true;
      }


      const apiName = String(
        item?.authority_name ??
        item?.planning_authority_name ??
        item?.name ??
        ""
      )
        .replace(/<[^>]*>/g, "")
        .trim()
        .toLowerCase();

      const masterName = String(authority.name)
        .replace(/<[^>]*>/g, "")
        .trim()
        .toLowerCase();

      return apiName === masterName;
    });

    console.log(
      "Authority:",
      authority.name,
      "Matched API:",
      matchedAuthority
    );


    const applicableValue =
      matchedAuthority?.applicable ??
      matchedAuthority?.isApplicable ??
      matchedAuthority?.is_applicable ??
      matchedAuthority?.selected ??
      matchedAuthority?.checked;

    const isApplicable =
      applicableValue === true ||
      applicableValue === "true" ||
      applicableValue === "TRUE" ||
      applicableValue === "True" ||
      applicableValue === "yes" ||
      applicableValue === "Yes" ||
      applicableValue === "YES" ||
      applicableValue === "1" ||
      applicableValue === 1;

    return {
      ...authority,
      applicable: Boolean(isApplicable),
    };
  });

  console.log(
    "FINAL CHECKBOX DATA:",
    updatedAuthorities
  );

  setAuthorities(updatedAuthorities);
}, [
  open,
  planningAuthority,
  processData,
]);



  const handleCheckbox = (id) => {
    setAuthorities(
      (oldData) =>
        oldData.map(
          (item) =>
            item.id === id
              ? {
                  ...item,

                  applicable:
                    !item.applicable,
                }
              : item
        )
    );
  };



  const handleSelectAll = (
    event
  ) => {
    const checked =
      event.target.checked;

    setAuthorities(
      (oldData) =>
        oldData.map(
          (item) => ({
            ...item,

            applicable:
              checked,
          })
        )
    );
  };



  const handleUpdate = () => {
    const selectedAuthorities =
      authorities.filter(
        (item) =>
          item.applicable
      );

    console.log(
      "Process Data:",
      processData
    );

    console.log(
      "Selected Authorities:",
      selectedAuthorities
    );

    // Send selected authorities
    // back to parent component.

    if (onUpdate) {
      onUpdate(
        selectedAuthorities
      );
    } else {
      alert(
        "Planning Authority updated successfully"
      );
    }
  };

 

  const allSelected =
    authorities.length > 0 &&
    authorities.every(
      (item) =>
        item.applicable
    );


  const someSelected =
    authorities.some(
      (item) =>
        item.applicable
    ) &&
    !allSelected;



  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius:
            "5px",
        },
      }}
    >

      <Box
        sx={{
          height: "54px",

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "space-between",

          borderBottom:
            "1px solid #ddd",

          px: 2,
        }}
      >
        <Typography
          sx={{
            fontSize:
              "20px",

            fontWeight:
              600,
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

  

      <Box
        sx={{
          p: 2.5,
        }}
      >
        {/* PROCESS NAME */}

        <Box
          sx={{
            display:
              "flex",

            gap: "5px",

            mb: 1,
          }}
        >
          <Typography
            sx={{
              color:
                "green",

              fontWeight:
                700,

              fontSize:
                "15px",
            }}
          >
            Process :
          </Typography>

          <Typography
            sx={{
              fontWeight:
                700,

              fontSize:
                "14px",
            }}
          >
            {processData?.process_name ||
              "-"}
          </Typography>
        </Box>



        <Table
          sx={{
            border:
              "1px solid #ddd",

            tableLayout:
              "fixed",
          }}
        >
          {/* TABLE HEADER */}

          <TableHead>
            <TableRow
              sx={{
                backgroundColor:
                  "#eef7fd",
              }}
            >
              {/* SI NO */}

              <TableCell
                sx={{
                  width:
                    "12%",

                  fontWeight:
                    700,

                  fontSize:
                    "16px",

                  borderRight:
                    "1px solid #ddd",

                  py: 0.7,
                }}
              >
                SI No
              </TableCell>

              {/* AUTHORITY */}

              <TableCell
                sx={{
                  width:
                    "55%",

                  fontWeight:
                    700,

                  fontSize:
                    "16px",

                  borderRight:
                    "1px solid #ddd",

                  py: 0.7,
                }}
              >
                AUTHORITY
              </TableCell>

              {/* APPLICABILITY */}

              <TableCell
                sx={{
                  width:
                    "33%",

                  fontWeight:
                    700,

                  fontSize:
                    "16px",

                  py: 0.7,
                }}
              >
                <Box
                  sx={{
                    display:
                      "flex",

                    alignItems:
                      "center",

                    justifyContent:
                      "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight:
                        700,

                      fontSize:
                        "16px",
                    }}
                  >
                    APPLICABILITY
                  </Typography>

                  <Checkbox
                    size="small"
                    checked={
                      allSelected
                    }
                    indeterminate={
                      someSelected
                    }
                    onChange={
                      handleSelectAll
                    }
                  />
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>

          {/* TABLE BODY */}

          <TableBody>
            {authorities.map(
              (
                item,
                index
              ) => (
                <TableRow
                  key={
                    item.id
                  }
                >
                  {/* SI NO */}

                  <TableCell
                    sx={{
                      borderRight:
                        "1px solid #ddd",

                      py: 0.4,

                      fontSize:
                        "16px",
                    }}
                  >
                    {index +
                      1}
                  </TableCell>

                  {/* AUTHORITY */}

                  <TableCell
                    sx={{
                      borderRight:
                        "1px solid #ddd",

                      py: 0.4,

                      fontSize:
                        "16px",
                    }}
                  >
                    {
                      item.name
                    }
                  </TableCell>

                  {/* CHECKBOX */}

                  <TableCell
                    sx={{
                      py: 0.4,
                    }}
                  >
                    <Checkbox
                      size="small"

                      checked={
                        item.applicable
                      }

                      onChange={() =>
                        handleCheckbox(
                          item.id
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>



        <Box
          sx={{
            display:
              "flex",

            justifyContent:
              "center",

            mt: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={
              handleUpdate
            }
            sx={{
              backgroundColor:
                "#1976d2",

              fontWeight:
                700,

              fontSize:
                "14px",

              px: 2,

              py: 0.8,

              "&:hover": {
                backgroundColor:
                  "#1565c0",
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