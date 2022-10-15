import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnhancedTableHead } from "../../components/table/Header";
import { handleApi } from "../../components/utils/utils";
import constant from "../../constants/constant";
import { myTemplateHeader, SampleMyTest } from "../../constants/sample";
import AddTemplateClassDiaglog from "./component/manageTemplClass";
import moment from "moment";
import "./mytemplate.css";

function fetchData(setTableData, pagingObj, setPagingObj, setEmptyRow) {
  axios
    .get(`${constant.BASEURL}/core/exam-template`, {
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
  const [emptyRow, setEmptyRow] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [dialogStatus, setDialogStatus] = useState({
    open: false,
    template_id: null,
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
  const dense = false;
  useEffect(() => {
    fetchData(setTableData, pagingObj, setPagingObj, setEmptyRow);
  }, []);

  useEffect(() => {
    fetchData(setTableData, pagingObj, setPagingObj, setEmptyRow);
  }, [pagingObj.search, pagingObj.page, pagingObj.search]);

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
                My examination template
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
                          <TableCell align="left">{row.duration} Min</TableCell>
                          <TableCell align="left" className="word-break-cell">
                            {moment(row.start_date).format(
                              "MM/DD/YYYY hh:mm:ss"
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {moment(row.created_date).format(
                              "MM/DD/YYYY hh:mm:ss"
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <EditIcon
                              onClick={(e) =>
                                navigate(`/template/edit/${row.id}`)
                              }
                              className="icon"
                            />
                            <AddCircleOutlineOutlinedIcon
                              onClick={() =>
                                setDialogStatus({
                                  open: true,
                                  template_id: row.id,
                                })
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
                    {emptyRow > 0 && (
                      <TableRow
                        style={{
                          height:
                            (dense ? 33 : 53) *
                            (emptyRow > 0 ? emptyRow + 0.5 : emptyRow),
                        }}
                      >
                        <TableCell colSpan={7} />
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
      <AddTemplateClassDiaglog
        template_id={dialogStatus.template_id}
        open={dialogStatus.open}
        setOpen={setDialogStatus}
      />
    </>
  );
}