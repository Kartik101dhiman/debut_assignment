// import React from "react";
// import { useState } from "react";
// import Box from "@mui/material/Box";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";

// import TableRow from "@mui/material/TableRow";
// import TableSortLabel from "@mui/material/TableSortLabel";

// import Paper from "@mui/material/Paper";

// import { visuallyHidden } from "@mui/utils";

// // function createData(name, calories, fat, carbs, protein) {
// //   return {
// //     name,
// //     calories,
// //     fat,
// //     carbs,
// //     protein,
// //   };
// // }
// function createData(userid, id, title, body, action) {
//   return {
//     userid,
//     id,
//     title,
//     body,
//     action,
//   };
// }

// const rows = [
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Donut", 452, 25.0, 51, 4.9),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
//   createData("Honeycomb", 408, 3.2, 87, 6.5),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Jelly Bean", 375, 0.0, 94, 0.0),
//   createData("KitKat", 518, 26.0, 65, 7.0),
//   createData("Lollipop", 392, 0.2, 98, 0.0),
//   createData("Marshmallow", 318, 0, 81, 2.0),
//   createData("Nougat", 360, 19.0, 9, 37.0),
//   createData("Oreo", 437, 18.0, 63, 4.0),
// ];

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//   {
//     id: "name",
//     numeric: false,
//     disablePadding: true,
//     label: "UserID",
//   },
//   {
//     id: "calories",
//     numeric: true,
//     disablePadding: false,
//     label: "ID",
//   },
//   {
//     id: "fat",
//     numeric: true,
//     disablePadding: false,
//     label: "Title",
//   },
//   {
//     id: "carbs",
//     numeric: true,
//     disablePadding: false,
//     label: "Body",
//   },
//   {
//     id: "protein",
//     numeric: true,
//     disablePadding: false,
//     label: "Action",
//   },
// ];

// const columns = [
//   {
//     id: "userid",
//     numeric: false,
//     disablePadding: true,
//     label: "UserID",
//   },
//   {
//     id: "id",
//     numeric: true,
//     disablePadding: false,
//     label: "ID",
//   },
//   {
//     id: "title",
//     numeric: true,
//     disablePadding: false,
//     label: "Title",
//   },
//   {
//     id: "body",
//     numeric: true,
//     disablePadding: false,
//     label: "Body",
//   },
//   {
//     id: "action",
//     numeric: true,
//     disablePadding: false,
//     label: "Action",
//   },
// ];

// function EnhancedTableHead(props) {
//   const { order, orderBy, onRequestSort } = props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         {columns.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? "right" : "left"}
//             padding={headCell.disablePadding ? "none" : "normal"}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : "asc"}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === "desc" ? "sorted descending" : "sorted ascending"}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// export default function EnhancedTable() {
//   const [order, setOrder] = useState("asc");
//   const [orderBy, setOrderBy] = useState("id");

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Paper sx={{ width: "100%", mb: 2 }}>
//         <TableContainer>
//           <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
//             <EnhancedTableHead
//               order={order}
//               orderBy={orderBy}
//               onRequestSort={handleRequestSort}
//               rowCount={rows.length}
//             />
//             <TableBody>
//               {stableSort(rows, getComparator(order, orderBy)).map(
//                 (row, index) => {
//                   return (
//                     // <TableRow hover tabIndex={-1} key={row.name}>
//                     //   <TableCell component="th" scope="row" padding="none">
//                     //     {row.name}
//                     //   </TableCell>
//                     //   <TableCell align="right">{row.calories}</TableCell>
//                     //   <TableCell align="right">{row.fat}</TableCell>
//                     //   <TableCell align="right">{row.carbs}</TableCell>
//                     //   <TableCell align="right">{row.protein}</TableCell>
//                     // </TableRow>
//                     <TableRow hover tabIndex={-1} key={row.userid}>
//                       <TableCell component="th" scope="row" padding="none">
//                         {row.userid}
//                       </TableCell>
//                       <TableCell align="right">{row.id}</TableCell>
//                       <TableCell align="right">{row.title}</TableCell>
//                       <TableCell align="right">{row.body}</TableCell>
//                       <TableCell align="right">{row.action}</TableCell>
//                     </TableRow>
//                   );
//                 }
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//     </Box>
//   );
// }
