import "./createTest.css";
import { fakeData } from "./fakeData";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import QuestionAns from "./components/question";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { onChangeFormValue, onChangeTime } from "./libs/functions";
import { selectType } from "./components/selectTypeConfig";
import {showToast} from "../../components/toast/toast.js"
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import constant from "../../constants/constant";
import { handleApi } from "../../components/utils/utils";
import axios from "axios";

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

function createTestAPI(reqBody) {
  axios
    .post(`${constant.BASEURL}/core/exam-template`, reqBody)
    .then((res) => {
      handleApi(res, (e) => {
        setTimeout(() => {
          alert("Congrat, create successfully");
        }, 400);
      });
    })
    .catch((error) => {
      console.log(error);
      setTimeout(() => {
        alert(error);
      }, 400);
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
  const { id } = useParams();
  console.log("YOUR UPDATE ID")
  console.log(typeof id)
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
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                This is a success alert — <strong>check it out!</strong>
              </Alert>;
              // createTestAPI(formData);
            }
          }}
          variant="contained"
        >
          <div id="toast"></div>
          Save
        </Button>
      </div>
    </>
  );
}

export default CreateTest;
