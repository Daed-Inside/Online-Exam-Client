import React, { useState, useEffect } from "react";
import "./manageClass.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import ImageStudy from "../../assets/images/login_test_image.png";
import { FormikError } from "../../components/FormikError/FormikError.js";
import { SignInSchema } from "../../constants/validation";
import axios from "axios";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { ManageClassHeader, SampleManageClass } from "./manageClassConfig";
import { EnhancedTableHead } from "../../components/table/Header";
import EditIcon from "@mui/icons-material/Edit";
import ManageClassDiaglog from "./component/manageClassDialog";
import { handleApi } from "../../components/utils/utils";
import constant from "../../constants/constant";

// * fetch class info api
function fetchData(setTableData, pagingObj, setPagingObj) {
  axios
  .get(`${constant.BASEURL}/core/class`, {params: pagingObj})
  .then((res) => {
    handleApi(res, (e) => {
      //localStorage.setItem(constant.localStorage.EMAIL, e.email);
      setTableData(res.data.data.results)
      setPagingObj({...pagingObj, totalPages: res.data.data.totalPages, totalElements: res.data.data.totalElements})
    });
    // setTimeout(() => {
    //   alert("Login success");
    // }, 400);
  })
  .catch((error) => {
    console.log(error);
    setTimeout(() => {
      alert(error);
    }, 400);
  });
}

// * main render function
export default function ManageClass() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [tableData, setTableData] = useState([])
  const [pagingObj, setPagingObj] = useState({
    page: 1,
    limit: 10,
    search: "",
    totalElements: 0,
    totalPages: 0,
    sort_by: "id",
    sort_type: "ASC"
  })

  useEffect(() => {
    fetchData(setTableData, pagingObj, setPagingObj)
  }, [])

  useEffect(() => {
    fetchData(setTableData, pagingObj, setPagingObj)
  }, [pagingObj.search, pagingObj.page, pagingObj.limit, pagingObj.sort_by, pagingObj.sort_type])

  function handleSearch(search_str) {
    let newPagingObj = {...pagingObj}
    newPagingObj.search = search_str
    setPagingObj(newPagingObj)
  }

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - SampleManageClass.length)
      : 0;

  function handleEdit() {}

  return (
    <>
      <div className="mytest-layout">
        <div className="table-top-section">
          <div className="table-name">
            <div className="align-name-center">
              <Typography variant="h4" noWrap component="div">
                Manage Class
              </Typography>
            </div>
          </div>
          <div className="table-search">
            <div className="search-bar-center">
              <TextField
                label="Search here"
                onChange={(e) => handleSearch(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button id={"btn_create"} onClick={() => setOpen(!open)}>
                Create
              </Button>
            </div>
          </div>
        </div>
        <div className="table-section">
          <Paper
            className="table-paper"
            sx={{ width: "100%", mb: 2, height: "100%" }}
          >
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  header={ManageClassHeader}
                  order={order}
                  orderBy={orderBy}
                  rowCount={SampleManageClass.length}
                />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                  {tableData.map((row, index) => {
                    return <BodyItem row={row} />;
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={SampleManageClass.length}
              rowsPerPage={rowsPerPage}
              page={page}
            />
          </Paper>
        </div>
      </div>
      <ManageClassDiaglog open={open} setOpen={setOpen} />
    </>
  );
}

const BodyItem = (props) => {
  const [open, setOpen] = useState(false);
  const { row } = props;
  return (
    <>
      <TableRow hover key={row.id}>
        <TableCell component="th" scope="row" padding="normal" align="center">
          {row.id}
        </TableCell>
        <TableCell align="left" className="word-break-cell">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.student_count} members</TableCell>
        <TableCell align="left">
          <EditIcon onClick={() => setOpen(true)} className="icon" />
          <DeleteIcon onClick={() => handleDelete(row.id)} className="icon" />
        </TableCell>
      </TableRow>
      <ManageClassDiaglog open={open} setOpen={setOpen} el={row} />
    </>
  );
};

function handleDelete(id) {}
