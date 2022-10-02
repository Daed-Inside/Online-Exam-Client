import React, { useState, useEffect } from "react";
import "./mytest.css";
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
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { SampleHeader } from "../../constants/sample";
import { SampleMyTest } from "../../constants/sample";
import { EnhancedTableHead } from "../../components/table/Header";
import { handleApi } from "../../components/utils/utils";
import constant from "../../constants/constant";

function fetchData(setTableData, pagingObj, setPagingObj) {
  axios
  .get(`${constant.BASEURL}/core/exam-result`, {params: pagingObj})
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


export default function MyTest() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
  }, [pagingObj.search])

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - SampleMyTest.length) : 0;

  function handleSearch(searchStr) {
    let newPaging = {...pagingObj}
    newPaging.search = searchStr
    setPagingObj(newPaging)
  }

  return (
    <>
      <div className="mytest-layout">
        <div className="table-top-section">
          <div className="table-name">
            <div className="align-name-center">
              <Typography variant="h4" noWrap component="div">
                My Test
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
                  header={SampleHeader}
                  order={order}
                  orderBy={orderBy}
                  rowCount={SampleMyTest.length}
                />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                  {tableData.map((row, index) => {
                    return (
                      <TableRow hover key={row.id}>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="normal"
                          align="center"
                        >
                          {row.id}
                        </TableCell>
                        <TableCell align="left" className="word-break-cell">
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.subject}</TableCell>
                        <TableCell align="left" className="word-break-cell">{row.first_name} {row.last_name}</TableCell>
                        <TableCell align="left">{row.date}</TableCell>
                        <TableCell align="center">{row.score}</TableCell>
                      </TableRow>
                    );
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
              count={pagingObj.totalElements}
              rowsPerPage={pagingObj.limit}
              page={pagingObj.page}
            />
          </Paper>
        </div>
      </div>
    </>
  );
}
