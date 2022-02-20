import "./doTest.css";
import { fakeData } from "./fakeData";
import { onCheckHasChoose } from "./libs/functions";
import React, { useState } from "react";
import QuestionAns from "./components/question";
import Button from "@mui/material/Button";
import Countdown from "react-countdown";

function DoTest() {
  const [formData, setFormData] = useState(fakeData);
  const [hasTime, setHasTime] = useState(checkHasTime(formData.duration));
  const [focus, setFocused] = useState(null);

  return (
    <>
      {hasTime ? (
        <div className="do_test-form">
          <div className="do_test-header">
            <h1>{formData.title}</h1>
            <p>{formData.subject}</p>
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
      ) : (
        <div className="">Hết thời gian làm bài</div>
      )}
      <div className="do_test-footer">
        <Button
          onClick={() => {
            const section = document.querySelector("#question-1");
            section.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          variant="contained"
        >
          Nộp bài
        </Button>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <p>Thời gian còn lại</p>
          <Countdown date={formData.duration} renderer={renderer} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <p>Mục lục</p>
          <div className="do_test-footer_content">
            {formData?.data?.map((el, index) => (
              <ContentBlock
                key={el.id}
                id={el.id}
                label={index + 1}
                json={formData}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default DoTest;

const ContentBlock = ({ id, label, json }) => {
  return (
    <>
      <div
        onClick={() => {
          const section = document.querySelector("#" + id);
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className={
          (onCheckHasChoose(id, json) ? "do_test-block-active" : "") +
          " do_test-block"
        }
      >
        <div style={{ margin: "auto" }}>{label}</div>
      </div>
    </>
  );
};

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
  } else {
    // Render a countdown
  }
  return (
    <span>
      {hours}:{minutes}:{seconds}
    </span>
  );
};

const checkHasTime = (expireDate) => {
  let date = new Date();
  if (date.getTime() > expireDate) {
    return false;
  } else {
    return true;
  }
};
