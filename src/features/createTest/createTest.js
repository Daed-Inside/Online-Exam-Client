import "./createTest.css";
import { fakeData } from "./fakeData";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import QuestionAns from "./components/question";
import Button from "@mui/material/Button";
import { onChangeFormValue, onChangeTime } from "./libs/functions";
import { selectType } from "./components/selectTypeConfig";
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
        //localStorage.setItem(constant.localStorage.EMAIL, e.email);
        setSubject(res.data.data)
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
  const [subject, setSubject] = useState([])
  const [isEdit, setIsEdit] = useState(false);
  const [focus, setFocused] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      loadFormById(id);
    } else {
      setIsEdit(false);
      fetchSubject(setSubject)
    }
  }, []);

  function loadFormById(id) {
    axios
      .get(`${constant.BASEURL}/core-service/exam/` + id, {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem(constant.localStorage.TOKEN),
        },
      })
      .then((res) => {
        handleApi(res, (e) => {
          //setFormData(e.formData);
        });
      })
      .catch((error) => {
        setTimeout(() => {
          alert(error);
        }, 400);
      });
  }

  function handleUpdate(id) {
    axios
      .put(`${constant.BASEURL}/core-service/exam/` + id, formData, {
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
            placeholder="Nhập tên form"
            variant="standard"
            value={formData.title}
            onChange={(e) => {
              onChangeFormValue("title", e.target.value, formData, setFormData);
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
                  value={formData.duration}
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
              label="Chọn môn"
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
              helperText="Chọn loại cho câu trả lời"
            >
              {subject.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.subject_name}
                </option>
              ))}
            </TextField>
          </div>
          <div className="create_test-question_number">
            <TextField
              id="easyQuest"
              type={"number"}
              placeholder="Easy"
              variant="standard"
              value={formData.easyQuest}
              onChange={(e) => {
                onChangeFormValue(
                  "easyQuest",
                  e.target.value,
                  formData,
                  setFormData
                );
              }}
              style={{ height: 24, width: "100%" }}
              InputLabelProps={{
                style: {
                  height: 24,
                  ...{ top: `50px` },
                },
              }}
              inputProps={{
                style: {
                  height: 24,
                  fontSize: "1.5rem",
                },
              }}
            />

            <TextField
              id="mediumQuest"
              type={"number"}
              placeholder="Medium"
              variant="standard"
              value={formData.mediumQuest}
              onChange={(e) => {
                onChangeFormValue(
                  "mediumQuest",
                  e.target.value,
                  formData,
                  setFormData
                );
              }}
              style={{ height: 24, width: "100%" }}
              InputLabelProps={{
                style: {
                  height: 24,
                  ...{ top: `50px` },
                },
              }}
              inputProps={{
                style: {
                  height: 24,
                  fontSize: "1.5rem",
                },
              }}
            />

            <TextField
              id="hardQuest"
              type={"number"}
              placeholder="Hard"
              variant="standard"
              value={formData.hardQuest}
              onChange={(e) => {
                onChangeFormValue(
                  "hardQuest",
                  e.target.value,
                  formData,
                  setFormData
                );
              }}
              style={{ height: 24, width: "100%" }}
              InputLabelProps={{
                style: {
                  height: 24,
                  ...{ top: `50px` },
                },
              }}
              inputProps={{
                style: {
                  height: 24,
                  fontSize: "1.5rem",
                },
              }}
            />
          </div>
        </div>
        {formData?.data?.map((el, index) => (
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
              handleUpdate();
            } else {
              handleCreate();
            }
          }}
          variant="contained"
        >
          Lưu
        </Button>
      </div>
    </>
  );
}

export default CreateTest;
