import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  handleChangeRadioType,
  handleChangeTextAns,
  onCheckRadioType,
  handleChangeCheckBoxType,
  onCheckHasChoose,
} from "../libs/functions";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";

function QuestionAns({ children, ...props }) {
  const { el, index, focus, setFocused, formData, setFormData } = props;

  return (
    <>
      <div key={el.id} id={el.id} className="do_test-el">
        <div className="index">{index + 1}</div>
        <div className="do_test-group">
          <div className="do_test-group_qa">
            <div className="do_test-area_question">
              <h3>{el.question}</h3>
            </div>
          </div>
          <div className="do_test-group_ans">
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
            <div key={an.id} className="do_test-ans">
              {el.type === "radio" ? (
                <>
                  <div
                    onClick={() =>
                      handleChangeRadioType(el.id, an.id, formData, setFormData)
                    }
                    className="do_test-ans_input"
                  >
                    <Radio
                      style={{ paddingLeft: 0, paddingBottom: 0 }}
                      checked={onCheckRadioType(el.id, an.id, formData)}
                    />
                    <p>{an.value}</p>
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={() =>
                      handleChangeCheckBoxType(
                        el.id,
                        an.id,
                        formData,
                        setFormData
                      )
                    }
                    className="do_test-ans_input"
                  >
                    <Checkbox
                      style={{ paddingLeft: 0, paddingBottom: 0 }}
                      checked={onCheckRadioType(el.id, an.id, formData)}
                    />
                    <p>{an.value}</p>
                  </div>
                </>
              )}
            </div>
          );
        })}
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
