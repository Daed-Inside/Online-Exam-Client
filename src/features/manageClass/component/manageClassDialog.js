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
import * as Yup from "yup";

export const CreateClassSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});

function ManageClassDiaglog(props) {
  const { el, open, setOpen } = props;
  const [searchList, setSearchList] = React.useState([
    { id: 7, name: "H" },
    { id: 8, name: "E" },
  ]);
  React.useEffect(() => {}, []);

  function firstLoad() {
    if (el) {
    } else {
    }
  }

  function handleSubmit() {}

  return (
    <>
      <Dialog
        fullScreen={false}
        open={open}
        onClose={setOpen}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {el ? "Edit Class" : "Create Class"}
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ name: el?.name, selectStu: el?.student_list }}
            enableReinitialize={true}
            validationSchema={CreateClassSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
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
            }) => (
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
                      onChange={(e) => console.log(e.target.value)}
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
                    {searchList?.map((e) => (
                      <SelectItem
                        key={e.id}
                        item={e}
                        searchList={searchList}
                        setSearchList={setSearchList}
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
                        setSearchList={setSearchList}
                        searchList={searchList}
                        item={e}
                        values={values}
                        setFieldValue={setFieldValue}
                      />
                    ))}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpen(!open)}>
            Cancle
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ManageClassDiaglog;

const SelectItem = (props) => {
  const { item, setFieldValue, values, setSearchList, searchList } = props;

  function handleAddItem() {
    let newSelItems = values.selectStu;
    newSelItems.push(item);
    setSearchList(searchList.filter((e) => e.id !== item.id));
    setFieldValue("selectStu", newSelItems);
  }

  return (
    <>
      <div
        onClick={() => handleAddItem(item)}
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
  const { item, setFieldValue, values, setSearchList, searchList } = props;
  function handleRemoveItem() {
    let newItems = values.selectStu.filter((e) => e.id !== item.id);
    setFieldValue("selectStu", newItems);

    let searchItems = searchList;
    searchItems.push(item);
    setSearchList(searchItems);
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
