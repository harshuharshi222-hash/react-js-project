// import React, { useState } from "react";
// import {
//   Dialog,
//   Box,
//   Typography,
//   IconButton,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Checkbox,
//   Button,
// } from "@mui/material";

// import CloseIcon from "@mui/icons-material/Close";
// import { useLocation, useNavigate } from "react-router-dom";


// const authorityList = [
//   { id: 1, name: "BBMP", applicable: false },
//   { id: 2, name: "BDA", applicable: false },
//   { id: 3, name: "BIAAPA", applicable: false },
//   { id: 4, name: "BMICAPA", applicable: false },
//   { id: 5, name: "BMRDA", applicable: false },
//   { id: 6, name: "DTCP", applicable: false },
//   {
//     id: 7,
//     name: "KPL (Kolar Planning Authority",
//     applicable: true,
//   },
//   {
//     id: 8,
//     name: "MALUR PLANNING AUTHORITY",
//     applicable: true,
//   },
//   { id: 9, name: "MUDA", applicable: false },
//   { id: 10, name: "STRR", applicable: false },
//   { id: 11, name: "Temp", applicable: false },
//   { id: 12, name: "TUDA", applicable: false },
// ];
// export default function UpdatePlanningAuthority() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const processData = location.state?.processData;
//   const planningAuthority =
//     location.state?.planningAuthority || [];

//   console.log("Process Data:", processData);
//   console.log("Planning Authority:", planningAuthority);
//   // Select all
//   const handleSelectAll = (event) => {
//     const checked = event.target.checked;

//     setAuthorities((oldData) =>
//       oldData.map((item) => ({
//         ...item,
//         applicable: checked,
//       }))
//     );
//   };

//   // Update button
//   const handleUpdate = () => {
//     const selectedAuthorities = authorities.filter(
//       (item) => item.applicable
//     );

//     console.log("Selected Authorities:", selectedAuthorities);

//     // Later you can call your API here
//   };

//   const allSelected =
//     authorities.length > 0 &&
//     authorities.every((item) => item.applicable);

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="md"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: "5px",
//         },
//       }}
//     >
//       {/* HEADER */}
//       <Box
//         sx={{
//           height: "54px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           borderBottom: "1px solid #ddd",
//           px: 2,
//         }}
//       >
//         <Typography
//           sx={{
//             fontSize: "20px",
//             fontWeight: 600,
//           }}
//         >
//           Update Planning Authority
//         </Typography>

//         <IconButton
//           onClick={onClose}
//           sx={{
//             color: "red",
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </Box>

//       {/* BODY */}
//       <Box sx={{ p: 2.5 }}>

//         {/* PROCESS */}
//         <Box
//           sx={{
//             display: "flex",
//             gap: "5px",
//             mb: 0.5,
//           }}
//         >
//           <Typography
//             sx={{
//               color: "green",
//               fontWeight: 700,
//               fontSize: "15px",
//             }}
//           >
//             Process :
//           </Typography>

//           <Typography
//             sx={{
//               fontWeight: 700,
//               fontSize: "14px",
//             }}
//           >
//             {processData?.process_name || "-"}
//           </Typography>
//         </Box>

//         {/* TABLE */}
//         <Table
//           sx={{
//             border: "1px solid #ddd",
//             tableLayout: "fixed",
//           }}
//         >
//           <TableHead>
//             <TableRow
//               sx={{
//                 backgroundColor: "#eef7fd",
//               }}
//             >
//               <TableCell
//                 sx={{
//                   width: "12%",
//                   fontWeight: 700,
//                   fontSize: "16px",
//                   borderRight: "1px solid #ddd",
//                   py: 0.7,
//                 }}
//               >
//                 SI No
//               </TableCell>

//               <TableCell
//                 sx={{
//                   width: "55%",
//                   fontWeight: 700,
//                   fontSize: "16px",
//                   borderRight: "1px solid #ddd",
//                   py: 0.7,
//                 }}
//               >
//                 AUTHORITY
//               </TableCell>

//               <TableCell
//                 sx={{
//                   width: "33%",
//                   fontWeight: 700,
//                   fontSize: "16px",
//                   py: 0.7,
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   APPLICABILITY

//                   <Checkbox
//                     size="small"
//                     checked={allSelected}
//                     onChange={handleSelectAll}
//                   />
//                 </Box>
//               </TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {authorities.map((item, index) => (
//               <TableRow key={item.id}>

//                 {/* SI NO */}
//                 <TableCell
//                   sx={{
//                     borderRight: "1px solid #ddd",
//                     py: 0.4,
//                     fontSize: "16px",
//                   }}
//                 >
//                   {index + 1}
//                 </TableCell>

//                 {/* AUTHORITY */}
//                 <TableCell
//                   sx={{
//                     borderRight: "1px solid #ddd",
//                     py: 0.4,
//                     fontSize: "16px",
//                   }}
//                 >
//                   {item.name}
//                 </TableCell>

//                 {/* CHECKBOX */}
//                 <TableCell
//                   sx={{
//                     py: 0.4,
//                   }}
//                 >
//                   <Checkbox
//                     size="small"
//                     checked={item.applicable}
//                     onChange={() =>
//                       handleCheckbox(item.id)
//                     }
//                   />
//                 </TableCell>

//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         {/* UPDATE BUTTON */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             mt: 2,
//           }}
//         >
//           <Button
//             variant="contained"
//             onClick={handleUpdate}
//             sx={{
//               backgroundColor: "#1976d2",
//               fontWeight: 700,
//               fontSize: "14px",
//               px: 2,
//               py: 0.8,
//             }}
//           >
//             UPDATE
//           </Button>
//         </Box>

//       </Box>
//     </Dialog>
//   );
// }





import React, { useState } from "react";

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
  useLocation,
  useNavigate,
} from "react-router-dom";


// ============================================================
// AUTHORITY MASTER LIST
// ============================================================

const authorityList = [
  {
    id: 1,
    name: "BBMP",
    applicable: false,
  },
  {
    id: 2,
    name: "BDA",
    applicable: false,
  },
  {
    id: 3,
    name: "BIAAPA",
    applicable: false,
  },
  {
    id: 4,
    name: "BMICAPA",
    applicable: false,
  },
  {
    id: 5,
    name: "BMRDA",
    applicable: false,
  },
  {
    id: 6,
    name: "DTCP",
    applicable: false,
  },
  {
    id: 7,
    name: "KPL (Kolar Planning Authority)",
    applicable: false,
  },
  {
    id: 8,
    name: "MALUR PLANNING AUTHORITY",
    applicable: false,
  },
  {
    id: 9,
    name: "MUDA",
    applicable: false,
  },
  {
    id: 10,
    name: "STRR",
    applicable: false,
  },
  {
    id: 11,
    name: "Temp",
    applicable: false,
  },
  {
    id: 12,
    name: "TUDA",
    applicable: false,
  },
];


// ============================================================
// COMPONENT
// ============================================================

export default function UpdatePlanningAuthority() {
  const location = useLocation();
  const navigate = useNavigate();


  // ============================================================
  // DATA RECEIVED FROM LIAISON PROCESS PAGE
  // ============================================================

  const processData =
    location.state?.processData || null;

  const planningAuthority =
    location.state?.planningAuthority || [];


  // ============================================================
  // DEBUG
  // ============================================================

  console.log(
    "===================================="
  );

  console.log(
    "Planning Authority Update Page"
  );

  console.log(
    "Process Data:",
    processData
  );

  console.log(
    "Planning Authority:",
    planningAuthority
  );

  console.log(
    "===================================="
  );


  // ============================================================
  // AUTHORITY STATE
  // ============================================================

  const [authorities, setAuthorities] =
    useState(authorityList);


  // ============================================================
  // INDIVIDUAL CHECKBOX
  // ============================================================

  const handleCheckbox = (id) => {
    setAuthorities((oldData) =>
      oldData.map((item) =>
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


  // ============================================================
  // SELECT ALL
  // ============================================================

  const handleSelectAll = (event) => {
    const checked =
      event.target.checked;

    setAuthorities((oldData) =>
      oldData.map((item) => ({
        ...item,
        applicable: checked,
      }))
    );
  };


  // ============================================================
  // UPDATE BUTTON
  // ============================================================

  const handleUpdate = () => {
    const selectedAuthorities =
      authorities.filter(
        (item) => item.applicable
      );

    console.log(
      "Process Data:",
      processData
    );

    console.log(
      "Selected Authorities:",
      selectedAuthorities
    );


    // ========================================================
    // API CALL WILL BE ADDED HERE
    // ========================================================

    // Example:
    //
    // const payload = {
    //   processId: processData?.process_id,
    //   authorities: selectedAuthorities,
    // };
    //
    // console.log("UPDATE PAYLOAD:", payload);


    alert(
      "Planning Authority updated successfully"
    );
  };


  // ============================================================
  // CHECK WHETHER ALL ARE SELECTED
  // ============================================================

  const allSelected =
    authorities.length > 0 &&
    authorities.every(
      (item) => item.applicable
    );


  // ============================================================
  // CLOSE PAGE
  // ============================================================

  const handleClose = () => {
    navigate(-1);
  };


  // ============================================================
  // UI
  // ============================================================

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "5px",
        },
      }}
    >

      {/* ======================================================
          HEADER
      ====================================================== */}

      <Box
        sx={{
          height: "54px",
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",
          borderBottom:
            "1px solid #ddd",
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
          onClick={handleClose}
          sx={{
            color: "red",
          }}
        >
          <CloseIcon />
        </IconButton>

      </Box>


      {/* ======================================================
          BODY
      ====================================================== */}

      <Box sx={{ p: 2.5 }}>


        {/* ====================================================
            PROCESS NAME
        ==================================================== */}

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
            {processData?.process_name ||
              "-"}
          </Typography>

        </Box>


        {/* ====================================================
            TABLE
        ==================================================== */}

        <Table
          sx={{
            border:
              "1px solid #ddd",
            tableLayout:
              "fixed",
          }}
        >

          {/* ==================================================
              HEADER
          ================================================== */}

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
                  width: "12%",
                  fontWeight: 700,
                  fontSize: "16px",
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
                  width: "55%",
                  fontWeight: 700,
                  fontSize: "16px",
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
                  width: "33%",
                  fontWeight: 700,
                  fontSize: "16px",
                  py: 0.7,
                }}
              >

                <Box
                  sx={{
                    display: "flex",
                    alignItems:
                      "center",
                  }}
                >

                  APPLICABILITY


                  <Checkbox
                    size="small"
                    checked={
                      allSelected
                    }
                    onChange={
                      handleSelectAll
                    }
                  />

                </Box>

              </TableCell>

            </TableRow>

          </TableHead>


          {/* ==================================================
              BODY
          ================================================== */}

          <TableBody>

            {authorities.map(
              (item, index) => (

                <TableRow
                  key={item.id}
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
                    {index + 1}
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


        {/* ====================================================
            UPDATE BUTTON
        ==================================================== */}

        <Box
          sx={{
            display: "flex",
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
              fontWeight: 700,
              fontSize: "14px",
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