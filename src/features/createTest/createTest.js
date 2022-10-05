import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ApiStatusDialog from "../../components/dialog/dialog.js";
import { handleApi } from "../../components/utils/utils";
import constant from "../../constants/constant";
import QuestionAns from "./components/question";
import "./createTest.css";
import { fakeData } from "./fakeData";
import { onChangeFormValue, onChangeTime } from "./libs/functions";

function fetchSubject(setSubject) {
  axios
    .get(`${constant.BASEURL}/core/subject`)
    .then((res) => {
      handleApi(res, (e) => {
        setSubject(res.data.data);
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

function createTestAPI(reqBody, setDialogObj) {
  axios
    .post(`${constant.BASEURL}/core/exam-template`, reqBody)
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

function fetchEditTemplate(id, setFormData) {
  axios
    .get(`${constant.BASEURL}/core/exam-template/${id}`)
    .then((res) => {
      handleApi(res, (e) => {
        setFormData(res.data.data);
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

function CreateTest(props) {
  const [formData, setFormData] = useState(fakeData);
  const [subject, setSubject] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [focus, setFocused] = useState(null);
  const [dialogObj, setDialogObj] = useState({
    open: false,
    msg: "OK",
    status: 1,
  });
  const { id } = useParams();
  // const id = 3
  useEffect(() => {
    if (id && id !== "null") {
      setIsEdit(true);
      fetchEditTemplate(id, setFormData);
      fetchSubject(setSubject);
    } else {
      setIsEdit(false);
      fetchSubject(setSubject);
    }
  }, []);

  function handleCreate() {
    axios
      .post(`${constant.BASEURL}/core-service/exam`, formData, {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem(constant.localStorage.TOKEN),
        },
      })
      .then((res) => {
        handleApi(res, (e) => {});
      })
      .catch((error) => {
        setTimeout(() => {
          alert(error);
        }, 400);
      });
  }

  return (
    <>
      <div className="create_test-form">
        <div className="create_test-header">
          <TextField
            id="title"
            placeholder="Input name"
            variant="standard"
            value={formData.name}
            onChange={(e) => {
              onChangeFormValue("name", e.target.value, formData, setFormData);
            }}
            style={{ height: 50, width: "100%" }}
            InputLabelProps={{
              style: {
                height: 50,
                ...{ top: `50px` },
              },
            }}
            inputProps={{
              style: {
                height: 50,
                fontSize: "1.5rem",
              },
            }}
          />
          <div className="create_test-question_number">
            <div style={{ width: "100%" }}>
              <LocalizationProvider
                style={{ width: "100%" }}
                dateAdapter={AdapterDateFns}
              >
                <DateTimePicker
                  style={{ width: "100%" }}
                  label="Date"
                  value={formData.start_date}
                  onChange={(e) => {
                    onChangeTime(e, formData, setFormData);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <TextField
              style={{ width: "100%" }}
              id="outlined-select-currency-native"
              select
              label="Choose subject"
              value={formData.subject}
              onChange={(e) => {
                onChangeFormValue(
                  "subject",
                  e.target.value,
                  formData,
                  setFormData
                );
              }}
              SelectProps={{
                native: true,
              }}
              helperText="Choose subject"
            >
              {subject.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.subject_name}
                </option>
              ))}
            </TextField>
            <TextField
              id="chooseMinute"
              type={"number"}
              helperText="Choose minute"
              placeholder="Choose minute"
              variant="standard"
              value={formData.duration}
              onChange={(e) => {
                onChangeFormValue(
                  "duration",
                  e.target.value,
                  formData,
                  setFormData
                );
              }}
              style={{ height: 45, width: "100%" }}
              inputProps={{
                style: {
                  height: 45,
                  fontSize: "1.5rem",
                },
              }}
            />
          </div>
        </div>
        {formData?.questions?.map((el, index) => (
          <QuestionAns
            index={index}
            focus={focus}
            setFocused={setFocused}
            key={el.id}
            el={el}
            formData={formData}
            setFormData={setFormData}
          />
        ))}
      </div>
      <div className="create_test-footer">
        <Button
          onClick={() => {
            if (isEdit) {
              // handleUpdate();
              console.log("_________FORM DATA_____________");
              console.log(formData);
            } else {
              // handleCreate();
              console.log(formData);
              createTestAPI(formData, setDialogObj);
            }
          }}
          variant="contained"
        >
          <div id="toast"></div>
          Save
        </Button>
        <ApiStatusDialog
          msg={dialogObj.msg}
          open={dialogObj.open}
          status={dialogObj.status}
        />
      </div>
    </>
  );
}

export default CreateTest;
