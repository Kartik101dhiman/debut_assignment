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
import MUIBox from "../Component/MUIcomponent/MUIBox";
import MUITypography from "../Component/MUIcomponent/MUITypography";
import { DeleteIcon, EditIcon } from "../Component/Icons/Icons";
import { Modal } from "@mui/material";
import { useEffect } from "react";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import Confirmmodal from "../Component/Comman/Comfirmmodal";

import { Stack, Snackbar } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import MuiAlert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const columns = [
  {
    id: "PostId",
    label: "PostId",
    minWidth: 140,
  },
  {
    id: "ID",
    label: "ID",
    minWidth: 70,
  },
  {
    id: "name",
    label: "Name",
    minWidth: 140,
  },
  {
    id: "email",
    label: "Email",
    minWidth: 80,
  },
  {
    id: "body",
    label: "Body",
    minWidth: 120,
  },
];

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
  const { t } = useTranslation();
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

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#1976d2",
  border: "2px solid #fff",
  color: "white",
  boxShadow: 24,
  p: 4,
};

const Comments = () => {
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

  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modaldata, setModaldata] = useState([]);
  const [openmodal, setOpenModal] = useState(false);

  const handleClosemodal = () => setOpenModal(false);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const showtabledata = async () => {
    try {
      let apidata;
      setLoader(true);
      const url = "https://jsonplaceholder.typicode.com/comments";
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

  useEffect(() => {
    showtabledata();
  }, []);

  const handleOpen = async (id) => {
    try {
      let modalinfo;
      const url = "https://jsonplaceholder.typicode.com/comments/" + id;
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

  const [openconfirm, setOpenconfirm] = useState(false);

  const handleCloseconfirm = () => {
    setOpenconfirm(false);
  };

  const deleterowdata = () => {
    setOpenconfirm(true);
  };

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
                <TableRow hover role="checkbox" tabIndex={-1} key={data.id}>
                  <TableCell>{data.postId}</TableCell>
                  <TableCell>{data.id}</TableCell>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.email}</TableCell>
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
              name: {modaldata.name}
            </MUITypography>
            <MUITypography id="modal-modal-title" variant="h6" component="h2">
              email: {modaldata.email}
            </MUITypography>
            <MUITypography id="modal-modal-title" variant="h6" component="h2">
              body: {modaldata.body}
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
export default Comments;
