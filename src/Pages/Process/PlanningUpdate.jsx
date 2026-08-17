
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

// import {
//   useLocation,
//   useNavigate,
// } from "react-router-dom";



// const authorityList = [
//   {
//     id: 1,
//     name: "BBMP",
//     applicable: false,
//   },
//   {
//     id: 2,
//     name: "BDA",
//     applicable: false,
//   },
//   {
//     id: 3,
//     name: "BIAAPA",
//     applicable: false,
//   },
//   {
//     id: 4,
//     name: "BMICAPA",
//     applicable: false,
//   },
//   {
//     id: 5,
//     name: "BMRDA",
//     applicable: false,
//   },
//   {
//     id: 6,
//     name: "DTCP",
//     applicable: false,
//   },
//   {
//     id: 7,
//     name: "KPL (Kolar Planning Authority)",
//     applicable: false,
//   },
//   {
//     id: 8,
//     name: "MALUR PLANNING AUTHORITY",
//     applicable: false,
//   },
//   {
//     id: 9,
//     name: "MUDA",
//     applicable: false,
//   },
//   {
//     id: 10,
//     name: "STRR",
//     applicable: false,
//   },
//   {
//     id: 11,
//     name: "Temp",
//     applicable: false,
//   },
//   {
//     id: 12,
//     name: "TUDA",
//     applicable: false,
//   },
// ];


// export default function UpdatePlanningAuthority() {
//   const location = useLocation();
//   const navigate = useNavigate();


//   const processData =
//     location.state?.processData || null;

//   const planningAuthority =
//     location.state?.planningAuthority || [];


//   console.log(
//     "===================================="
//   );

//   console.log(
//     "Planning Authority Update Page"
//   );

//   console.log(
//     "Process Data:",
//     processData
//   );

//   console.log(
//     "Planning Authority:",
//     planningAuthority
//   );

//   console.log(
//     "===================================="
//   );


 
//   const [authorities, setAuthorities] =
//     useState(authorityList);



//   const handleCheckbox = (id) => {
//     setAuthorities((oldData) =>
//       oldData.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               applicable:
//                 !item.applicable,
//             }
//           : item
//       )
//     );
//   };



//   const handleSelectAll = (event) => {
//     const checked =
//       event.target.checked;

//     setAuthorities((oldData) =>
//       oldData.map((item) => ({
//         ...item,
//         applicable: checked,
//       }))
//     );
//   };



//   const handleUpdate = () => {
//     const selectedAuthorities =
//       authorities.filter(
//         (item) => item.applicable
//       );

//     console.log(
//       "Process Data:",
//       processData
//     );

//     console.log(
//       "Selected Authorities:",
//       selectedAuthorities
//     );



//     alert(
//       "Planning Authority updated successfully"
//     );
//   };



//   const allSelected =
//     authorities.length > 0 &&
//     authorities.every(
//       (item) => item.applicable
//     );


 
//   const handleClose = () => {
//     navigate(-1);
//   };



//   return (
//     <Dialog
//       open={true}
//       onClose={handleClose}
//       maxWidth="md"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: "5px",
//         },
//       }}
//     >

     

//       <Box
//         sx={{
//           height: "54px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent:
//             "space-between",
//           borderBottom:
//             "1px solid #ddd",
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
//           onClick={handleClose}
//           sx={{
//             color: "red",
//           }}
//         >
//           <CloseIcon />
//         </IconButton>

//       </Box>


 

//       <Box sx={{ p: 2.5 }}>


   

//         <Box
//           sx={{
//             display: "flex",
//             gap: "5px",
//             mb: 1,
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
//             {processData?.process_name ||
//               "-"}
//           </Typography>

//         </Box>


        

//         <Table
//           sx={{
//             border:
//               "1px solid #ddd",
//             tableLayout:
//               "fixed",
//           }}
//         >

         

//           <TableHead>

//             <TableRow
//               sx={{
//                 backgroundColor:
//                   "#eef7fd",
//               }}
//             >

//               {/* SI NO */}

//               <TableCell
//                 sx={{
//                   width: "12%",
//                   fontWeight: 700,
//                   fontSize: "16px",
//                   borderRight:
//                     "1px solid #ddd",
//                   py: 0.7,
//                 }}
//               >
//                 SI No
//               </TableCell>


//               {/* AUTHORITY */}

//               <TableCell
//                 sx={{
//                   width: "55%",
//                   fontWeight: 700,
//                   fontSize: "16px",
//                   borderRight:
//                     "1px solid #ddd",
//                   py: 0.7,
//                 }}
//               >
//                 AUTHORITY
//               </TableCell>


//               {/* APPLICABILITY */}

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
//                     alignItems:
//                       "center",
//                   }}
//                 >

//                   APPLICABILITY


//                   <Checkbox
//                     size="small"
//                     checked={
//                       allSelected
//                     }
//                     onChange={
//                       handleSelectAll
//                     }
//                   />

//                 </Box>

//               </TableCell>

//             </TableRow>

//           </TableHead>


//           <TableBody>

//             {authorities.map(
//               (item, index) => (

//                 <TableRow
//                   key={item.id}
//                 >

//                   {/* SI NO */}

//                   <TableCell
//                     sx={{
//                       borderRight:
//                         "1px solid #ddd",
//                       py: 0.4,
//                       fontSize:
//                         "16px",
//                     }}
//                   >
//                     {index + 1}
//                   </TableCell>


//                   {/* AUTHORITY */}

//                   <TableCell
//                     sx={{
//                       borderRight:
//                         "1px solid #ddd",
//                       py: 0.4,
//                       fontSize:
//                         "16px",
//                     }}
//                   >
//                     {item.name}
//                   </TableCell>


//                   {/* CHECKBOX */}

//                   <TableCell
//                     sx={{
//                       py: 0.4,
//                     }}
//                   >

//                     <Checkbox
//                       size="small"
//                       checked={
//                         item.applicable
//                       }
//                       onChange={() =>
//                         handleCheckbox(
//                           item.id
//                         )
//                       }
//                     />

//                   </TableCell>

//                 </TableRow>

//               )
//             )}

//           </TableBody>

//         </Table>




//         <Box
//           sx={{
//             display: "flex",
//             justifyContent:
//               "center",
//             mt: 2,
//           }}
//         >

//           <Button
//             variant="contained"
//             onClick={
//               handleUpdate
//             }
//             sx={{
//               backgroundColor:
//                 "#1976d2",
//               fontWeight: 700,
//               fontSize: "14px",
//               px: 2,
//               py: 0.8,
//               "&:hover": {
//                 backgroundColor:
//                   "#1565c0",
//               },
//             }}
//           >
//             UPDATE
//           </Button>

//         </Box>

//       </Box>

//     </Dialog>
//   );
// }


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

// =========================================================
// AUTHORITY MASTER LIST
// =========================================================

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

// =========================================================
// COMPONENT
// =========================================================

export default function UpdatePlanningAuthority({
  open,
  onClose,
  processData,
  planningAuthority = [],
  onUpdate,
}) {
  // =======================================================
  // AUTHORITY STATE
  // =======================================================

  const [authorities, setAuthorities] =
    useState([]);

  // =======================================================
  // WHEN POPUP OPENS
  // LOAD EXISTING PLANNING AUTHORITY
  // =======================================================

  useEffect(() => {
    if (!open) {
      return;
    }

    console.log(
      "===================================="
    );

    console.log(
      "Planning Authority Popup Open"
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

    // =====================================================
    // CREATE AUTHORITY LIST
    // =====================================================

    const existingAuthorities =
      planningAuthority || [];

    const updatedAuthorities =
      authorityList.map(
        (authority) => {
          const matchedAuthority =
            existingAuthorities.find(
              (item) => {
                const apiName =
                  item?.authority_name
                    ?.replace(
                      /<[^>]*>/g,
                      ""
                    )
                    ?.trim()
                    ?.toLowerCase();

                return (
                  apiName ===
                  authority.name
                    .trim()
                    .toLowerCase()
                );
              }
            );

          return {
            ...authority,

            applicable:
              Boolean(
                matchedAuthority
              ),
          };
        }
      );

    setAuthorities(
      updatedAuthorities
    );
  }, [
    open,
    processData,
    planningAuthority,
  ]);

  // =======================================================
  // CHECK / UNCHECK INDIVIDUAL
  // =======================================================

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

  // =======================================================
  // SELECT ALL
  // =======================================================

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

  // =======================================================
  // UPDATE
  // =======================================================

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

  // =======================================================
  // SELECT ALL CHECKBOX STATUS
  // =======================================================

  const allSelected =
    authorities.length > 0 &&
    authorities.every(
      (item) =>
        item.applicable
    );

  // =======================================================
  // SOME SELECTED
  // =======================================================

  const someSelected =
    authorities.some(
      (item) =>
        item.applicable
    ) &&
    !allSelected;

  // =======================================================
  // RETURN
  // =======================================================

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
      {/* =================================================
          HEADER
      ================================================== */}

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

      {/* =================================================
          CONTENT
      ================================================== */}

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

        {/* =================================================
            AUTHORITY TABLE
        ================================================== */}

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

        {/* =================================================
            UPDATE BUTTON
        ================================================== */}

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