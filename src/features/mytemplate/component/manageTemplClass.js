import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Form, Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";
import { FormikError } from "../../../components/FormikError/FormikError";
import { handleApi } from "../../../components/utils/utils";
import constant from "../../../constants/constant";
import ApiStatusDialog from "../../../components/dialog/dialog.js";

function fetchClass(setClassData, setAddedClassData, template_id, search) {
  axios
    .get(`${constant.BASEURL}/core/class/all`, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(constant.localStorage.TOKEN),
      },
      params: { template_id: template_id, search: search },
    })
    .then((res) => {
      handleApi(res, (e) => {
        //localStorage.setItem(constant.localStorage.EMAIL, e.email);
        setClassData(res.data.data.non_added_class);
        setAddedClassData(res.data.data.added_class);
      });
    })
    .catch((error) => {
      console.log(error);
      setTimeout(() => {
        alert(error);
      }, 400);
    });
}

function addClassTemplate(reqBody, setDialogObj, setOpen, setSearch) {
  axios
    .post(`${constant.BASEURL}/core/exam-template-class`, reqBody, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(constant.localStorage.TOKEN),
      },
    })
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

function AddTemplateClassDialog(props) {
  const { template_id, open, setOpen } = props;
  const [classData, setClassData] = React.useState([]);
  const [addedClassData, setAddedClassData] = React.useState([]);
  const [search, setSearch] = React.useState(null);
  const [dialogObj, setDialogObj] = React.useState({
    open: false,
    msg: "OK",
    status: 1,
  });
  React.useEffect(() => {
    if (template_id != null && template_id != undefined) {
      fetchClass(setClassData, setAddedClassData, template_id, search);
    }
  }, [template_id]);

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchClass(setClassData, setAddedClassData, template_id, search);
      // Send Axios request here
    }, 2000);
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
            searchList: classData,
            template_id: template_id,
            selectClass: addedClassData,
          }}
          enableReinitialize={true}
          onSubmit={(values, { setSubmitting }) => {
            let classIds = values.selectClass.map((item) => {
              return item.id;
            });
            let reqBody = {
              exam_template_id: values.template_id,
              class_ids: classIds,
            };
            addClassTemplate(reqBody, setDialogObj, setOpen, setSearch);
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
                  {"Add class to template"}
                </DialogTitle>
                <DialogContent>
                  <Form style={{ width: "100%" }}>
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
                        {values.selectClass?.map((e) => (
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
                  <Button
                    autoFocus
                    onClick={() => {
                      setOpen(!open);
                      setSearch(null);
                    }}
                  >
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

export default AddTemplateClassDialog;

const SelectItem = (props) => {
  const { item, setFieldValue, values } = props;

  async function handleAddItem() {
    let newSelItems = values.selectClass;
    newSelItems.push(item);
    await setFieldValue("selectClass", newSelItems);
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
        {item.name}
        <AddIcon />
      </div>
    </>
  );
};

const RemoveItem = (props) => {
  const { item, setFieldValue, values } = props;
  function handleRemoveItem() {
    let newItems = values.selectClass.filter((e) => e.id !== item.id);
    setFieldValue("selectClass", newItems);

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
          {item.name}
          <CloseIcon />
        </div>
      </>
    </>
  );
};
