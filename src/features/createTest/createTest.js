import "./createTest.css";
import { fakeData } from "./fakeData";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import QuestionAns from "./components/question";
import Button from "@mui/material/Button";
import { onChangeFormName, onChangeTime } from "./libs/functions";
import { selectType } from "./components/selectTypeConfig";

function CreateTest() {
  const [formData, setFormData] = useState(fakeData);
  const [focus, setFocused] = useState(null);

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
              onChangeFormName(e.target.value, formData, setFormData);
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

          <TextField
            id="time"
            type={"number"}
            placeholder="Chọn thời gian"
            variant="standard"
            value={formData.duration}
            onChange={(e) => {
              onChangeTime(e.target.value, formData, setFormData);
            }}
            style={{ height: 30, width: "100%" }}
            InputLabelProps={{
              style: {
                height: 20,
                ...{ top: `20px` },
              },
            }}
            inputProps={{
              style: {
                height: 20,
              },
            }}
          />

          <TextField
            id="outlined-select-currency-native"
            select
            label="Chọn môn"
            value={formData.subject}
            onChange={(e) => {
              //handleChangeType(e.target.value, el.id, formData, setFormData);
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
        <Button onClick={() => {}} variant="contained">
          Lưu
        </Button>
      </div>
    </>
  );
}

export default CreateTest;
