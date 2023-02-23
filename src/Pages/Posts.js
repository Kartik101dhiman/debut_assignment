import React, { useState, forwardRef } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Apiservices from "../Services/Apiservices";
import { useEffect } from "react";
import MUIBox from "../Component/MUIcomponent/MUIBox";
import { DeleteIcon, EditIcon } from "../Component/Icons/Icons";
import Modal from "@mui/material/Modal";
import MUITypography from "../Component/MUIcomponent/MUITypography";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";

import { Stack, Snackbar } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import MuiAlert from "@mui/material/Alert";

import Confirmmodal from "../Component/Comman/Comfirmmodal";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const columns = [
  {
    id: "userid",
    label: "UserID",
    minWidth: 170,
  },
  {
    id: "id",
    label: "ID",
    minWidth: 100,
  },
  {
    id: "title",
    label: "Title",
    minWidth: 170,
  },
  {
    id: "body",
    label: "Body",
    minWidth: 170,
  },
];

const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#1976d2",
  border: "2px solid #fff",
  color: "white",
  boxShadow: 24,
  p: 4,
};

// useEffect(() => {
//   showtabledata("posts");
// },[]);

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{ fontWeight: "bold" }}
            >
              {t(headCell.label)}
              {orderBy === headCell.id ? (
                <MUIBox component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </MUIBox>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>
          <MUITypography sx={{ fontWeight: "bold" }}>
            {t("Action")}
          </MUITypography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const Posts = () => {
  const { t } = useTranslation();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const [open, setOpen] = useState(false);
  const [load, setLoader] = useState(false);
  const [snake, SetSnake] = useState({
    severity: "error",
    message: "Data not found",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  //delete
  const [openconfirm, setOpenconfirm] = useState(false);

  const handleCloseconfirm = () => {
    setOpenconfirm(false);
  };

  const deleterowdata = () => {
    setOpenconfirm(true);
  };

  //
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);

  const [modaldata, setModaldata] = useState([]);

  const [openmodal, setOpenModal] = useState(false);

  const handleClosemodal = () => setOpenModal(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = async (id) => {
    try {
      let modalinfo;
      const url = "https://jsonplaceholder.typicode.com/posts/" + id;
      setLoader(true);
      modalinfo = await Apiservices.GetData(url);
      SetSnake({ severity: "success", message: "Successful" });
      setLoader(false);
      setOpen(true);
      setModaldata(modalinfo.data);
    } catch {
      setLoader(false);
      setOpen(true);
    }

    setOpenModal(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const showtabledata = async () => {
    try {
      let apidata;
      setLoader(true);
      const url = "https://jsonplaceholder.typicode.com/posts";
      apidata = await Apiservices.GetData(url);
      SetSnake({ severity: "success", message: "Successful" });
      setLoader(false);
      setOpen(true);
      setData(apidata.data);
    } catch {
      setLoader(false);
      setOpen(true);
    }
  };

  // showtabledata("posts");

  useEffect(() => {
    showtabledata();
  }, []);

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table aria-label="sticky table">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />
          <TableBody>
            {stableSort(data, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data) => (
                <TableRow hover tabIndex={-1} key={data.id}>
                  <TableCell>{data.userId}</TableCell>
                  <TableCell>{data.id}</TableCell>
                  <TableCell>{data.title}</TableCell>
                  <TableCell>{data.body}</TableCell>
                  <TableCell>
                    <EditIcon
                      Id={data.id}
                      onClick={() => handleOpen(data.id)}
                      sx={{ color: "yellow", cursor: "pointer" }}
                    />
                    <DeleteIcon
                      onClick={() => deleterowdata()}
                      sx={{ color: "red", cursor: "pointer" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        sx={{ verticalAlign: "center" }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <MUIBox>
        <Modal
          open={openmodal}
          onClose={handleClosemodal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MUIBox sx={style}>
            <MUITypography id="modal-modal-title" variant="h6" component="h2">
              UserId: {modaldata.id}
            </MUITypography>
            <MUITypography id="modal-modal-title" variant="h6" component="h2">
              Title: {modaldata.title}
            </MUITypography>
          </MUIBox>
        </Modal>
      </MUIBox>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={snake.severity}
            sx={{ width: "100%" }}
          >
            {snake.message}
          </Alert>
        </Snackbar>
      </Stack>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={load}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Confirmmodal
        heading="Confimation box"
        text=" Want to delete data parmanently"
        openconfirm={openconfirm}
        handleCloseconfirm={handleCloseconfirm}
      ></Confirmmodal>
    </Paper>
  );
};
export default Posts;

//  {
//    columns.map((column) => {
//      const value = row[column.id];
//      return (
//        <TableCell key={column.id} align={column.align}>
//          {column.format && typeof value === "number"
//            ? column.format(value)
//            : value}
//        </TableCell>
//      );
//    });
//  }

// {
//                Object.values(apidata[i]).forEach((val) => {
//                 console.log(val);
//                    })
//                }

//  <TableRow hover role="checkbox" tabIndex={-1} key={apidata.id}>
//                 <TableCell>{apidata.userId}</TableCell>
//                 <TableCell>{apidata.id}</TableCell>
//                 <TableCell>{apidata.title}</TableCell>
//                 <TableCell>{apidata.body}</TableCell>
//               </TableRow>

//  Object.values(apidata).forEach((val) => {
//                 <TableRow hover role="checkbox" tabIndex={-1} key={apidata.id}>
//                   <TableCell>{apidata.userId}</TableCell>
//                   <TableCell>{apidata.id}</TableCell>
//                   <TableCell>{apidata.title}</TableCell>
//                   <TableCell>{apidata.body}</TableCell>
//                 </TableRow>;
//               })

// {Object.values(apidata).forEach((val) => console.log(val))}

// {apidata.map((apidata) => alert())}

// <TableRow hover role="checkbox" tabIndex={-1} key={data.useID}>
//                 <TableCell>dfjdk</TableCell>
//                 <TableCell>1345</TableCell>
//                 <TableCell>kartik</TableCell>
//                 <TableCell>dfkjdslkfj</TableCell>
//               </TableRow>

// <MUIBox>
//   <Dialog
//     open={openconfirm}
//     onClose={handleCloseconfirm}
//     aria-labelledby="alert-dialog-title"
//     aria-describedby="alert-dialog-description"
//     className="confirmmodal"
//   >
//     <DialogTitle id="alert-dialog-title">
//       {"Confirmation box"}
//     </DialogTitle>
//     <DialogContent>
//       <DialogContentText id="alert-dialog-description">
//         Want to delete parmanent data
//       </DialogContentText>
//     </DialogContent>
//     <DialogActions>
//       <MUIButton onClick={handleCloseconfirm}>confirm</MUIButton>
//       <MUIButton onClick={handleCloseconfirm} autoFocus>
//         cancel
//       </MUIButton>
//     </DialogActions>
//   </Dialog>
// </MUIBox>

// import PropTypes from 'prop-types';
// import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { visuallyHidden } from '@mui/utils';

// function EnhancedTableHead(props) {
//   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
//     props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               'aria-label': 'select all desserts',
//             }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Nutrition
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

// export default function EnhancedTable() {
//   const [order, setOrder] = React.useState('asc');
//   const [orderBy, setOrderBy] = React.useState('calories');
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => n.name);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event) => {
//     setDense(event.target.checked);
//   };

//   const isSelected = (name) => selected.indexOf(name) !== -1;

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Paper sx={{ width: '100%', mb: 2 }}>
//         <EnhancedTableToolbar numSelected={selected.length} />
//         <TableContainer>
//           <Table
//             sx={{ minWidth: 750 }}
//             aria-labelledby="tableTitle"
//             size={dense ? 'small' : 'medium'}
//           >
//             <EnhancedTableHead
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={rows.length}
//             />
//             <TableBody>
//               {stableSort(rows, getComparator(order, orderBy))
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, index) => {
//                   const isItemSelected = isSelected(row.name);
//                   const labelId = `enhanced-table-checkbox-${index}`;

//                   return (
//                     <TableRow
//                       hover
//                       onClick={(event) => handleClick(event, row.name)}
//                       role="checkbox"
//                       aria-checked={isItemSelected}
//                       tabIndex={-1}
//                       key={row.name}
//                       selected={isItemSelected}
//                     >
//                       <TableCell padding="checkbox">
//                         <Checkbox
//                           color="primary"
//                           checked={isItemSelected}
//                           inputProps={{
//                             'aria-labelledby': labelId,
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell
//                         component="th"
//                         id={labelId}
//                         scope="row"
//                         padding="none"
//                       >
//                         {row.name}
//                       </TableCell>
//                       <TableCell align="right">{row.calories}</TableCell>
//                       <TableCell align="right">{row.fat}</TableCell>
//                       <TableCell align="right">{row.carbs}</TableCell>
//                       <TableCell align="right">{row.protein}</TableCell>
//                     </TableRow>
//                   );
//                 })}
//               {emptyRows > 0 && (
//                 <TableRow
//                   style={{
//                     height: (dense ? 33 : 53) * emptyRows,
//                   }}
//                 >
//                   <TableCell colSpan={6} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//       <FormControlLabel
//         control={<Switch checked={dense} onChange={handleChangeDense} />}
//         label="Dense padding"
//       />
//     </Box>
//   );
// }

// <TableRow>
//   {stableSort(columns, getComparator(order, orderBy)).map((column) => (
//     <TableCell
//       key={column.id}
//       align={column.align}
//       style={{
//         top: 57,
//         minWidth: column.minWidth,
//         fontWeight: "bold",
//       }}
//     >
//       {column.label}
//     </TableCell>
//   ))}
// </TableRow>;
