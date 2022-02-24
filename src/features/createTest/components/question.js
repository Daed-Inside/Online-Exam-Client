import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  handleChangeQuestion,
  handleChangeType,
  handleChangeQuesType,
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

function QuestionAns({ children, ...props }) {
  const { el, index, focus, setFocused, formData, setFormData } = props;

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
              addEl(index + 1, formData, setFormData);
            }}
          />
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
              <TextField
                rows={2}
                className="create_test-input"
                value={el.question}
                onChange={(e) =>
                  handleChangeQuestion(
                    e.target.value,
                    el.id,
                    formData,
                    setFormData
                  )
                }
                key={el.id}
                label="Nhập câu hỏi"
                variant="filled"
              />
            </div>
            <div className="create_test-area_type">
              <TextField
                id="outlined-select-currency-native"
                select
                label="Chọn loại"
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
                helperText="Chọn loại cho câu trả lời"
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
                label="Chọn độ khó"
                value={el.questType}
                onChange={(e) => {
                  handleChangeQuesType(
                    e.target.value,
                    el.id,
                    formData,
                    setFormData
                  );
                }}
                SelectProps={{
                  native: true,
                }}
                helperText="Chọn loại cho câu trả lời"
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

  return (
    <>
      <FormLabel id="demo-controlled-radio-buttons-group">Answers</FormLabel>
      {el.type !== "text" &&
        el.answers?.map((an) => {
          return (
            <>
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
                    value={an.value}
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
                {!containsObject(an, el.correctAnswers) ? (
                  <Tooltip title="Đánh dấu câu trả lời đúng" arrow>
                    <StarOutlineIcon
                      onClick={() =>
                        addCorrectAns(an, el.id, formData, setFormData)
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
                        delCorrectAns(el.id, an.id, formData, setFormData)
                      }
                      style={{
                        marginTop: "auto",
                        marginRight: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                )}
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
                </Tooltip>
              </div>
            </>
          );
        })}
      {el.type !== "text" && (
        <Button
          onClick={() => addChangeAns(el.id, formData, setFormData)}
          variant="contained"
        >
          Thêm
        </Button>
      )}
      {el.type === "text" && (
        <TextField
          multiline
          placeholder="Nhập câu trả lời"
          value={el.textAns}
          onChange={(e) => {
            handleChangeTextAns(e.target.value, el.id, formData, setFormData);
          }}
          style={{ margin: "auto 0" }}
          variant="standard"
        />
      )}
    </>
  );
}
