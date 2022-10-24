import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

function QuestionAns({ children, ...props }) {
  const { el, index, focus, setFocused, formData, setFormData } = props;

  return (
    <>
      <div key={el.id} id={`question-${el.id}`} className="do_test-el">
        <div className="do_test-group">
          <div className="do_test-group_qa">
            <div className="do_test-area_question">
              <h3>
                Question {index + 1}: {el.content}
              </h3>
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
      {/* <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel> */}
      {el.answers?.map((an) => {
        return (
          <div key={an.id} className="do_test-ans">
            {el.question_type === 1 ? (
              <>
                <div disabled={true} className="do_test-ans_input">
                  <Radio
                    style={{ paddingLeft: 0, paddingBottom: 0 }}
                    checked={an.checked}
                  />
                  <p className="ans_text">{an.content}</p>
                  {an.color_flag === 1 ? (
                    <CheckCircleOutlineIcon
                      sx={{
                        fontSize: 20,
                        margin: "auto",
                        marginLeft: "5px",
                      }}
                      className="icon"
                      color="success"
                    />
                  ) : an.color_flag === -1 ? (
                    <CancelOutlinedIcon
                      sx={{
                        fontSize: 20,
                        margin: "auto",
                        marginLeft: "5px",
                        color: "red",
                      }}
                      className="icon"
                    />
                  ) : (
                    <div></div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div disabled={true} className="do_test-ans_input">
                  <Checkbox
                    style={{ paddingLeft: 0, paddingBottom: 0 }}
                    checked={an.checked}
                  />
                  <p className="ans_text">{an.content}</p>
                  {an.color_flag === 1 ? (
                    <CheckCircleOutlineIcon
                      sx={{
                        fontSize: 20,
                        margin: "auto",
                        marginLeft: "5px",
                      }}
                      className="icon"
                      color="success"
                    />
                  ) : an.color_flag === -1 ? (
                    <CancelOutlinedIcon
                      sx={{
                        fontSize: 20,
                        margin: "auto",
                        marginLeft: "5px",
                        color: "red",
                      }}
                      className="icon"
                    />
                  ) : (
                    <div></div>
                  )}
                </div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
}
