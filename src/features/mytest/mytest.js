import SearchIcon from "@mui/icons-material/Search";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
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
import {
  IncomingTabHeader,
  SampleHeader,
  SampleMyTest,
} from "../../constants/sample";
import "./mytest.css";
import moment from "moment";

function fetchData(setTableData, pagingObj, setPagingObj, setEmptyRow) {
  axios
    .get(`${constant.BASEURL}/core/exam-result`, {
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

export default function MyTest() {
  const navigate = useNavigate();
  const currentDate = new Date();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [tabValue, setTabValue] = useState("COMPLETED");
  const [dense, setDense] = useState(false);
  const [emptyRow, setEmptyRow] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [pagingObj, setPagingObj] = useState({
    page: 1,
    limit: 7,
    search: "",
    totalElements: 0,
    totalPages: 0,
    sort_by: "id",
    sort_type: "ASC",
    tab: "COMPLETED",
  });

  // useEffect(() => {
  //   fetchData(setTableData, pagingObj, setPagingObj, setEmptyRow);
  // }, []);

  useEffect(() => {
    fetchData(setTableData, pagingObj, setPagingObj, setEmptyRow);
  }, [pagingObj.search, pagingObj.page, pagingObj.tab]);

  function handleSearch(searchStr) {
    let newPaging = { ...pagingObj };
    newPaging.search = searchStr;
    setPagingObj(newPaging);
  }

  const handleTabChange = async (event, newValue) => {
    let newPaging = { ...pagingObj };
    newPaging.tab = newValue;
    newPaging.page = 1;
    await setPagingObj(newPaging);
    setTabValue(newValue);
  };

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
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
              >
                <Tab label="COMPLETED" value="COMPLETED" />
                <Tab label="INCOMING" value="INCOMING" />
              </TabList>
            </Box>
            <TabPanel sx={{ padding: "5px 0 0 0" }} value="COMPLETED">
              <Paper
                className="table-paper"
                sx={{ width: "100%", mb: 2, height: "110%" }}
              >
                <div className="table-data-section">
                  <TableContainer sx={{ height: "100%" }}>
                    <Table
                      sx={{ minWidth: 750, height: "100%" }}
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
                              <TableCell
                                align="left"
                                className="word-break-cell"
                              >
                                {row.name}
                              </TableCell>
                              <TableCell align="left">{row.subject}</TableCell>
                              <TableCell
                                align="left"
                                className="word-break-cell"
                              >
                                {row.first_name} {row.last_name}
                              </TableCell>
                              <TableCell align="left">
                                {moment(row.created_date).format(
                                  "MM/DD/YYYY hh:mm:ss"
                                )}
                              </TableCell>
                              <TableCell align="center">{row.score}</TableCell>
                            </TableRow>
                          );
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
            </TabPanel>
            <TabPanel sx={{ padding: "5px 0 0 0" }} value="INCOMING">
              <Paper
                className="table-paper"
                sx={{ width: "100%", mb: 2, height: "110%" }}
              >
                <div className="table-data-section">
                  <TableContainer sx={{ height: "100%" }}>
                    <Table
                      sx={{ minWidth: 750, height: "100%" }}
                      aria-labelledby="tableTitle"
                      size={true ? "small" : "medium"}
                    >
                      <EnhancedTableHead
                        header={IncomingTabHeader}
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
                              <TableCell
                                align="left"
                                className="word-break-cell"
                              >
                                {row.name}
                              </TableCell>
                              <TableCell align="left">
                                {row.subject_name}
                              </TableCell>
                              <TableCell
                                align="left"
                                className="word-break-cell"
                              >
                                {row.first_name} {row.last_name}
                              </TableCell>
                              <TableCell align="left">
                                {moment(row.created_date).format(
                                  "MM/DD/YYYY hh:mm:ss"
                                )}
                              </TableCell>
                              <TableCell align="center">
                                {moment()
                                  .add(1, "minutes")
                                  .isSameOrBefore(moment(row.start_date)) ? (
                                  <p className="blacked-text-small">WAITING</p>
                                ) : moment(row.expired_date).isSameOrAfter(
                                    moment()
                                  ) ? (
                                  <Button
                                    sx={{
                                      padding: "0 0 0 0",
                                      fontSize: "12px",
                                      height: "80%",
                                    }}
                                    onClick={
                                      (e) => navigate(`/test/conduct/${row.id}`)
                                      // {
                                      //   console.log(new Date(row.expired_date));
                                      //   console.log(new Date());
                                      // }
                                    }
                                  >
                                    Take exam
                                  </Button>
                                ) : (
                                  <p className="blacked-text-small">EXPIRED</p>
                                )}
                              </TableCell>
                            </TableRow>
                          );
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
            </TabPanel>
          </TabContext>
        </div>
      </div>
    </>
  );
}
