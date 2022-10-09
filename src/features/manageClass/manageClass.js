import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
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
import ManageClassDiaglog from "./component/manageClassDialog";
import "./manageClass.css";
import { ManageClassHeader, SampleManageClass } from "./manageClassConfig";
import Pagination from "@mui/material/Pagination";

// * fetch class info api
function fetchData(setTableData, pagingObj, setPagingObj, setEmptyRow) {
  axios
    .get(`${constant.BASEURL}/core/class`, { params: pagingObj })
    .then((res) => {
      handleApi(res, (e) => {
        //localStorage.setItem(constant.localStorage.EMAIL, e.email);
        setTableData(res.data.data.results);
        setPagingObj({
          ...pagingObj,
          totalPages: res.data.data.totalPages,
          totalElements: res.data.data.totalElements,
        });
        const emptyRows = pagingObj.limit - res.data.data.results.length;
        setEmptyRow(emptyRows);
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
  const [dense, setDense] = React.useState(false);
  const [emptyRow, setEmptyRow] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [tableData, setTableData] = useState([]);
  const [pagingObj, setPagingObj] = useState({
    page: 1,
    limit: 7,
    search: "",
    totalElements: 0,
    totalPages: 0,
    sort_by: "id",
    sort_type: "ASC",
  });

  useEffect(() => {
    fetchData(setTableData, pagingObj, setPagingObj, setEmptyRow);
  }, []);

  useEffect(() => {
    fetchData(setTableData, pagingObj, setPagingObj, setEmptyRow);
  }, [pagingObj.search, pagingObj.page, pagingObj.limit]);

  function handleSearch(search_str) {
    let newPagingObj = { ...pagingObj };
    newPagingObj.search = search_str;
    setPagingObj(newPagingObj);
  }

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
            <div className="table-data-section">
              <TableContainer sx={{ height: "100%" }}>
                <Table
                  sx={{ minWidth: 750, height: "100%" }}
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
                    {emptyRow > 0 && (
                      <TableRow
                        style={{
                          height: (dense ? 33 : 53) * emptyRow,
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
              count={SampleManageClass.length}
              rowsPerPage={rowsPerPage}
              page={page}
            /> */}
            <div className="table-footer-section">
              <div className="total-element-footer blacked-text">
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
