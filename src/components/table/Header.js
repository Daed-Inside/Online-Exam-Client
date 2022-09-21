import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import ImageStudy from "../../assets/images/login_test_image.png";
import { FormikError } from "../../components/FormikError/FormikError.js";
import { SignInSchema } from "../../constants/validation";
import axios from "axios";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import "./Header.css";
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
import { SampleHeader } from "../../constants/sample";

const HeaderData = SampleHeader;

export function EnhancedTableHead(props) {
  const { order, orderBy, rowCount } = props;
  //   const createSortHandler = (property) => (event) => {
  //     onRequestSort(event, property);
  //   };

  return (
    <TableHead>
      <TableRow>
        {props.header?.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={
              headCell.middle ? "center" : headCell.numeric ? "right" : "left"
            }
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            size="medium"
            style={{ width: headCell.width }}
            className="table-header-cell"
          >
            <div
              className="header-inside"
              style={{
                justifyContent: headCell.middle
                  ? "center"
                  : headCell.numeric
                  ? "right"
                  : "left",
              }}
            >
              <div className="header-value">{headCell.label}</div>
              {headCell.isSort ? (
                <div
                  data-sortBy={"sort-" + headCell.label}
                  className="sort-icon-section"
                  onClick={(e) =>
                    console.log(e.currentTarget.getAttribute("data-sortBy"))
                  }
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      class="cursor-pointer"
                      d="M8 1.3335L12 6.18198H4L8 1.3335Z"
                      fill="#7c7c7c"
                    ></path>
                    <path
                      class="cursor-pointer"
                      d="M8 14.6668L12 9.81835H4L8 14.6668Z"
                      fill="#7c7c7c"
                    ></path>
                  </svg>
                </div>
              ) : null}
            </div>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
