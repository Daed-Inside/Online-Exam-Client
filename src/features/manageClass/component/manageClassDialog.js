import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { FormControl, InputAdornment, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { FormikError } from "../../../components/FormikError/FormikError";
import { handleApi } from "../../../components/utils/utils";
import constant from "../../../constants/constant";
import ApiStatusDialog from "../../../components/dialog/dialog.js";
import axios from "axios";
import * as Yup from "yup";

export const CreateClassSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});

function fetchStudent(setStudentData, setAddedStudent, search, class_id) {
  axios
    .get(`${constant.BASEURL}/core/student-class`, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(constant.localStorage.TOKEN),
      },
      params: { class_id: class_id, search: search },
    })
    .then((res) => {
      handleApi(res, (e) => {
        //localStorage.setItem(constant.localStorage.EMAIL, e.email);
        setStudentData(res.data.data.non_added_student);
        setAddedStudent(res.data.data.added_student);
      });
    })
    .catch((error) => {
      console.log(error);
      setTimeout(() => {
        alert(error);
      }, 400);
    });
}

function createClass(
  values,
  setDialogObj,
  setOpen,
  setSearch,
  setReloadToggle
) {
  axios
    .post(
      `${constant.BASEURL}/core/class`,
      {
        students: values.selectStu,
        name: values.name,
        class_id: values.class_id,
      },
      {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem(constant.localStorage.TOKEN),
        },
      }
    )
    .then((res) => {
      handleApi(res, async (e) => {
        await setDialogObj({
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
          setOpen(false);
          setSearch(null);
          setReloadToggle(true);
        }, 2000);
      });
    })
    .catch(async (error) => {
      await setDialogObj({
        open: true,
        msg: "System error",
        status: -1,
      });
      setTimeout(() => {
        setDialogObj({
          open: false,
          msg: "System error",
          status: -1,
        });
        setOpen(false);
      }, 2000);
    });
}

function ManageClassDiaglog(props) {
  const { el, open, setOpen, setReloadToggle } = props;
  const [studentData, setStudentData] = React.useState([]);
  const [addedStudent, setAddedStudent] = React.useState([]);
  const [search, setSearch] = React.useState(null);
  const [dialogObj, setDialogObj] = React.useState({
    open: false,
    msg: "OK",
    status: 1,
  });
  React.useEffect(() => {
    // if (el?.id != null && el?.id != undefined) {
    fetchStudent(setStudentData, setAddedStudent, search, el?.id);
    // }
  }, [el?.id]);

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchStudent(setStudentData, setAddedStudent, search, el?.id);
      // Send Axios request here
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <>
      <Dialog
        fullScreen={false}
        open={open}
        onClose={setOpen}
        aria-labelledby="responsive-dialog-title"
      >
        <Formik
          initialValues={{
            searchList: studentData,
            name: el?.name,
            selectStu: addedStudent,
          }}
          enableReinitialize={true}
          validationSchema={CreateClassSchema}
          onSubmit={(values, { setSubmitting }) => {
            let newValue = { ...values };
            newValue.class_id = el?.id;
            createClass(
              newValue,
              setDialogObj,
              setOpen,
              setSearch,
              setReloadToggle
            );
          }}
        >
          {({
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
            errors,
            touched,
          }) => {
            return (
              <>
                <DialogTitle id="responsive-dialog-title">
                  {el ? "Edit Class" : "Create Class"}
                </DialogTitle>
                <DialogContent>
                  <Form style={{ width: "100%" }}>
                    <TextField
                      multiline
                      name="name"
                      label={"Class's name"}
                      value={values.name}
                      onChange={handleChange}
                      style={{ width: "100%", margin: "12px 0" }}
                      variant="standard"
                    />
                    {errors.name && touched.name ? (
                      FormikError(errors, "name")
                    ) : (
                      <div />
                    )}
                    <div
                      style={{
                        width: "100%",
                        margin: "12px 0",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div
                        style={{
                          borderRadius: "4px",
                          padding: "12px",
                          border: "1px solid #bdbdbd",
                          width: "300px",
                          height: "300px",
                          overflow: "auto",
                        }}
                      >
                        <TextField
                          label="Search here"
                          style={{
                            border: "none",
                            marginBottom: "12px",
                          }}
                          onChange={(e) => setSearch(e.target.value)}
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
                        {values.searchList?.map((e) => (
                          <SelectItem
                            key={e.id}
                            item={e}
                            searchList={values.searchList}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        ))}
                      </div>
                      <div
                        style={{
                          margin: "0 12px",
                          width: "50px",
                          justifyContent: "center",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "50px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <ArrowForwardIcon />
                        </div>
                      </div>
                      <div
                        style={{
                          borderRadius: "4px",
                          border: "1px solid #bdbdbd",
                          width: "300px",
                          height: "300px",
                          overflow: "auto",
                        }}
                      >
                        {values.selectStu?.map((e) => (
                          <RemoveItem
                            key={e.id}
                            item={e}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        ))}
                      </div>
                    </div>
                  </Form>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={() => setOpen(!open)}>
                    Cancle
                  </Button>
                  <Button onClick={handleSubmit} autoFocus>
                    Save
                  </Button>
                </DialogActions>
              </>
            );
          }}
        </Formik>
        <ApiStatusDialog
          msg={dialogObj.msg}
          open={dialogObj.open}
          status={dialogObj.status}
        />
      </Dialog>
    </>
  );
}

export default ManageClassDiaglog;

const SelectItem = (props) => {
  const { item, setFieldValue, values } = props;

  async function handleAddItem() {
    let newSelItems = values.selectStu;
    newSelItems.push(item);
    await setFieldValue("selectStu", newSelItems);
    await setFieldValue(
      "searchList",
      values.searchList.filter((e) => e.id !== item.id)
    );
  }

  return (
    <>
      <div
        onClick={async () => await handleAddItem(item)}
        className="manage_class-select_item"
        style={{
          padding: "12px",
          color: "#262626",
          cursor: "pointer",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {item.first_name} {item.last_name}
        <AddIcon />
      </div>
    </>
  );
};

const RemoveItem = (props) => {
  const { item, setFieldValue, values } = props;
  function handleRemoveItem() {
    let newItems = values.selectStu.filter((e) => e.id !== item.id);
    setFieldValue("selectStu", newItems);

    let searchItems = values.searchList;
    searchItems.push(item);
    setFieldValue("searchList", searchItems);
  }
  return (
    <>
      <>
        <div
          onClick={() => handleRemoveItem()}
          className="manage_class-select_item"
          style={{
            padding: "12px",
            color: "#262626",
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {item.first_name} {item.last_name}
          <CloseIcon />
        </div>
      </>
    </>
  );
};
