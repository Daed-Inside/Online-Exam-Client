import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  handleChangeQuestion,
  handleChangeType,
  handleChangeDifficult,
  handleChangeAns,
  addChangeAns,
  containsObject,
  addCorrectAns,
  delCorrectAns,
  handleChangeTextAns,
  delEl,
  addEl,
  delAns,
} from "../libs/functions";
import AddIcon from "@mui/icons-material/Add";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import { selectType, selectQuesType } from "./selectTypeConfig";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from '@mui/material/CircularProgress';
import Autocomplete from '@mui/material/Autocomplete';
import {topFilms} from "../fakeData";
import constant from "../../../constants/constant";
import { handleApi } from "../../../components/utils/utils";
import axios from "axios";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function fetchQuestion(setOption, search, level, subject_id) {
  axios
    .get(`${constant.BASEURL}/core/question`, { params: { subject: subject_id, level: level, search: search } })
    .then((res) => {
      handleApi(res, (e) => {
        //localStorage.setItem(constant.localStorage.EMAIL, e.email);
        let arr_question = []
        res.data.data.results.map((el, index) => (
          arr_question.push({label: el.content, id: el.id, answers: el.answers})
        ))
        setOption(arr_question)
      });
      // setTimeout(() => {
      //   alert("Login success");
      // }, 400);
    })
    .catch((error) => {
      setTimeout(() => {
        alert(error);
      }, 400);
    });
}

function QuestionAns({ children, ...props }) {
  // const [bankData, setBankData] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const { el, index, focus, setFocused, formData, setFormData } = props;
  const [defaultQuestion, setDefaultQuestion] = useState({label: el.content, id: el.id});
  const bankData = el.is_bank
  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      fetchQuestion(setOptions, null, null, null)
      // setOptions([...topFilms]);
    }
  }, [open]);

  return (
    <>
      <div
        style={{
          border:
            focus === el.id ? "1px solid #16c79a" : "1px solid transparent",
        }}
        onClick={() => {
          setFocused(el.id);
        }}
        key={el.id}
        id={el.id}
        className="create_test-el"
      >
        <div
          style={{ display: focus === el.id ? "inherit" : "none" }}
          className="create_test-edit_bar"
        >
          <AddIcon
            className="create_test-icon"
            onClick={() => {
              addEl(index + 1, formData, setFormData, false);
            }}
          />
          {/* {
            bankData === false ? <AccountBalanceWalletOutlinedIcon
              className="create_test-icon"
              onClick={() => {
                setBankData(!bankData);
              }}
            /> : <AccountBalanceWalletIcon */}
            <AccountBalanceWalletIcon
              className="create_test-icon"
              onClick={() => {
                // setBankData(!bankData);
                addEl(index + 1, formData, setFormData, true);
              }}
            />
          {/* } */}

          <DeleteIcon
            className="create_test-icon"
            onClick={() => {
              delEl(el.id, formData, setFormData);
            }}
          />
        </div>
        <div className="create_test-group">
          <div className="create_test-group_qa">
            <div className="create_test-area_question">
              {bankData === false?<TextField
                rows={2}
                className="create_test-input"
                value={el.question}
                onChange={(e) =>
                  handleChangeQuestion(
                    e.target.value,
                    el.id,
                    formData,
                    setFormData,
                    false
                  )
                }
                key={el.id}
                label="Input question"
                variant="filled"
              />: <Autocomplete
              id="asynchronous-demo"
              sx={{ width: 300 }}
              open={open}
              value={defaultQuestion}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              isOptionEqualToValue={(options, value) => options.id === value.id}
              getOptionLabel={(options) => options.label}
              // value={(option) => option.id}
              onChange={(e, value)=>{
                setDefaultQuestion(value)
                handleChangeQuestion(
                  value.id === "" ? null : options?.find((option)=> value.id === option.id),
                  el.id,
                  formData,
                  setFormData,
                  true
                );
                // el.answers = options?.find((option)=> e.target.value === option.label)?.answers
              }}
              options={options}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.id}>
                    {option.label}
                  </li>
                );
              }}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose question"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />}
            </div>
            <div className="create_test-area_type">
              <TextField
                id="outlined-select-currency-native"
                select
                label="Choose type"
                disabled={bankData}
                value={el.type}
                onChange={(e) => {
                  handleChangeType(
                    e.target.value,
                    el.id,
                    formData,
                    setFormData
                  );
                }}
                SelectProps={{
                  native: true,
                }}
                helperText="Choose type for answer"
              >
                {selectType.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <TextField
                id="outlined-select-currency-native"
                select
                label="Choose difficulty"
                value={el.question_type}
                onChange={(e) => {
                  handleChangeDifficult(
                    e.target.value,
                    el.id,
                    formData,
                    setFormData
                  );
                }}
                SelectProps={{
                  native: true,
                }}
                helperText="Choose type for answer"
              >
                {selectQuesType.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </div>
          </div>
          <div className="create_test-group_ans">
            <Answers
              key={"ans_" + el.id}
              el={el}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionAns;

function Answers({ ...props }) {
  const { el, index, focus, setFocused, formData, setFormData } = props;
  // console.log("_____________________IS BANK DATA_____________________________")
  // console.log(el.is_bank)
  return (
    <>
      <FormLabel id="demo-controlled-radio-buttons-group">Answers</FormLabel>
      {el.answers?.map((an) => {
          return (
              <div key={an.id} className="create_test-ans">
                <div className="create_test-ans_input">
                  {el.type === "radio" ? (
                    <Radio
                      style={{ paddingLeft: 0, paddingBottom: 0 }}
                      disabled={true}
                    />
                  ) : (
                    <Checkbox
                      style={{ paddingLeft: 0, paddingBottom: 0 }}
                      disabled
                    />
                  )}
                  <TextField
                    placeholder="Nhập câu trả lời"
                    value={an.content}
                    disabled={el.isBank}
                    onChange={(e) => {
                      handleChangeAns(
                        e.target.value,
                        el.id,
                        an.id,
                        formData,
                        setFormData
                      );
                    }}
                    style={{ margin: "auto 0" }}
                    id="standard-basic"
                    variant="standard"
                  />
                </div>
                {!an.is_correct ? (
                  <Tooltip title="Đánh dấu câu trả lời đúng" arrow>
                    <StarOutlineIcon
                      onClick={() =>
                        addCorrectAns(an.id, el.id, formData, setFormData, el.is_bank)
                      }
                      style={{
                        marginTop: "auto",
                        marginRight: "20px",
                        color: "#262626",
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Xóa đánh dấu" arrow>
                    <StarIcon
                      onClick={() =>
                        delCorrectAns(el.id, an.id, formData, setFormData, el.is_bank)
                      }
                      style={{
                        marginTop: "auto",
                        marginRight: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                )}
                {el.is_bank ? (<></>) : (<>
                <Tooltip title="Xóa câu trả lời" arrow>
                  <ClearIcon
                    onClick={() => {
                      delAns(el.id, an.id, formData, setFormData);
                    }}
                    style={{
                      marginTop: "auto",
                      color: "#262626",
                      cursor: "pointer",
                    }}
                  />
                </Tooltip></>)}
              </div>
          );
        })}
      {!el.is_bank && (
        <Button
          onClick={() => {
            console.log(el.id);
            addChangeAns(el.id, formData, setFormData);
          }}
          variant="contained"
        >
          Thêm
        </Button>
      )}
    </>
  );
}
