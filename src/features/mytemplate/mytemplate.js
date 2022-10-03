import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { EnhancedTableHead } from "../../components/table/Header";
import { handleApi } from "../../components/utils/utils";
import constant from "../../constants/constant";
import { myTemplateHeader, SampleMyTest } from "../../constants/sample";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import "./mytemplate.css";

function fetchData(setTableData, pagingObj, setPagingObj) {
  axios
    .get(`${constant.BASEURL}/core/exam-template`, { params: pagingObj })
    .then((res) => {
      handleApi(res, (e) => {
        //localStorage.setItem(constant.localStorage.EMAIL, e.email);
        setTableData(res.data.data.results);
        setPagingObj({
          ...pagingObj,
          totalPages: res.data.data.totalPages,
          totalElements: res.data.data.totalElements,
        });
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

export default function MyTemplate() {
  const navigate = useNavigate();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tableData, setTableData] = useState([]);
  const [pagingObj, setPagingObj] = useState({
    page: 1,
    limit: 2,
    search: "",
    totalElements: 0,
    totalPages: 0,
    sort_by: "id",
    sort_type: "ASC",
  });

  useEffect(() => {
    fetchData(setTableData, pagingObj, setPagingObj);
  }, []);

  useEffect(() => {
    fetchData(setTableData, pagingObj, setPagingObj);
  }, [pagingObj.search, pagingObj.page, pagingObj.search]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - SampleMyTest.length) : 0;

  function handleSearch(searchStr) {
    let newPaging = { ...pagingObj };
    newPaging.search = searchStr;
    setPagingObj(newPaging);
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
            <div className="table-data-section">
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                >
                  <EnhancedTableHead
                    header={myTemplateHeader}
                    order={order}
                    orderBy={orderBy}
                    rowCount={SampleMyTest.length}
                  />
                  <TableBody>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                    {tableData.map((row, index) => {
                      return (
                        <TableRow hover id={row.id} key={row.id}>
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
                          <TableCell align="left">{row.subject_name}</TableCell>
                          <TableCell align="left" className="word-break-cell">
                            {row.start_date}
                          </TableCell>
                          <TableCell align="left">{row.created_date}</TableCell>
                          <TableCell align="center">
                            <EditIcon
                              onClick={(e) =>
                                navigate(
                                  `/manage/template/${e.target.parentElement.parentElement.getAttribute(
                                    "id"
                                  )}`
                                )
                              }
                              className="icon"
                            />
                            <DeleteIcon
                              // onClick={() => handleDelete(row.id)}
                              className="icon"
                            />
                          </TableCell>
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
            </div>
            {/* <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={pagingObj.totalElements}
              rowsPerPage={pagingObj.limit}
              page={pagingObj.page}
            /> */}
            <div className="table-footer-section">
              <div
                style={{
                  flex: 1,
                  float: "left",
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
              >
                Total items: {pagingObj.totalElements}
              </div>
              <div
                style={{
                  flex: 1,
                  float: "right",
                  marginTop: "10px",
                  marginRight: "10px",
                }}
              >
                <Pagination
                  count={pagingObj.totalPages}
                  page={pagingObj.page}
                  onChange={(e, value) =>
                    setPagingObj({ ...pagingObj, page: value })
                  }
                />
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
}
