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
import { DeleteDialog } from "../../components/dialog/dialog";
import "./manageClass.css";
import { ManageClassHeader, SampleManageClass } from "./manageClassConfig";
import Pagination from "@mui/material/Pagination";
import moment from "moment";

// * fetch class info api
function fetchData(
  setTableData,
  pagingObj,
  setPagingObj,
  setEmptyRow,
  setReloadToggle
) {
  axios
    .get(`${constant.BASEURL}/core/class`, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(constant.localStorage.TOKEN),
      },
      params: pagingObj,
    })
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
        setReloadToggle(false);
      });
    })
    .catch((error) => {
      console.log(error);
      setTimeout(() => {
        alert(error);
      }, 400);
    });
}

function handleDelete(id, setDialogObj, setReloadToggle) {
  axios
    .delete(`${constant.BASEURL}/core/class/${id}`, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(constant.localStorage.TOKEN),
      },
    })
    .then((res) => {
      handleApi(res, (e) => {
        setDialogObj({
          open: true,
          msg: res.data.message,
          status: 1,
        });
        setTimeout(() => {
          setDialogObj({
            open: false,
            msg: res.data.message,
            status: 1,
          });
          setReloadToggle(true);
        }, 2000);
      });
    })
    .catch((error) => {
      console.log(error);
      setDialogObj({
        open: true,
        msg: "System error",
        status: 2,
      });
      setTimeout(() => {
        setDialogObj({
          open: false,
          msg: "System error",
          status: 2,
        });
      }, 2000);
    });
}

// * main render function
export default function ManageClass() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [emptyRow, setEmptyRow] = useState(0);
  const [reloadToggle, setReloadToggle] = useState(false);
  const [delDialogStatus, setDelDialogStatus] = useState({
    open: false,
    id: null,
  });
  const [tableData, setTableData] = useState([]);
  const [dialogStatus, setDialogStatus] = useState({
    open: false,
    el: null,
  });
  const [pagingObj, setPagingObj] = useState({
    page: 1,
    limit: 7,
    search: "",
    totalElements: 0,
    totalPages: 0,
    sort_by: "id",
    sort_type: "ASC",
  });

  // useEffect(() => {
  //   fetchData(setTableData, pagingObj, setPagingObj, setEmptyRow);
  // }, []);

  useEffect(() => {
    fetchData(
      setTableData,
      pagingObj,
      setPagingObj,
      setEmptyRow,
      setReloadToggle
    );
  }, [pagingObj.search, pagingObj.page, pagingObj.limit]);

  useEffect(() => {
    if (reloadToggle === true) {
      fetchData(
        setTableData,
        pagingObj,
        setPagingObj,
        setEmptyRow,
        setReloadToggle
      );
    }
  }, [reloadToggle]);

  function handleSearch(search_str) {
    const delayDebounceFn = setTimeout(() => {
      let newPagingObj = { ...pagingObj };
      newPagingObj.search = search_str;
      newPagingObj.page = 1;
      setPagingObj(newPagingObj);
      // Send Axios request here
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }

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
              <Button
                id={"btn_create"}
                onClick={() => setDialogStatus({ el: null, open: true })}
              >
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
                  size={true ? "small" : "medium"}
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
                      return (
                        <BodyItem
                          row={row}
                          editDialog={setDialogStatus}
                          setDelDialogStatus={setDelDialogStatus}
                        />
                      );
                    })}
                    {emptyRow > 0 && (
                      <TableRow
                        style={{
                          height: (false ? 33 : 53) * emptyRow,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
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
      <ManageClassDiaglog
        open={dialogStatus.open}
        setOpen={setDialogStatus}
        setReloadToggle={setReloadToggle}
        el={dialogStatus.el}
      />
      <DeleteDialog
        warningMsg={
          "Delete this class will remove this class from template has it assigned"
        }
        open={delDialogStatus.open}
        setOpen={setDelDialogStatus}
        deleteFunc={handleDelete}
        setReloadToggle={setReloadToggle}
        id={delDialogStatus.id}
      />
    </>
  );
}

const BodyItem = (props) => {
  const [open, setOpen] = useState(false);
  const { row, editDialog, setDelDialogStatus } = props;
  return (
    <TableRow hover key={row.id}>
      <TableCell component="th" scope="row" padding="normal" align="center">
        {row.id}
      </TableCell>
      <TableCell align="left" className="word-break-cell">
        {row.name}
      </TableCell>
      <TableCell align="left">{row.student_count} members</TableCell>
      <TableCell align="left">
        {moment(row.created_date).format("MM/DD/YYYY hh:mm:ss")}
      </TableCell>
      <TableCell align="center">
        <EditIcon
          onClick={() => editDialog({ el: row, open: true })}
          className="icon"
        />
        <DeleteIcon
          onClick={() =>
            setDelDialogStatus({
              open: true,
              id: row.id,
            })
          }
          className="icon"
        />
      </TableCell>
    </TableRow>
  );
};
