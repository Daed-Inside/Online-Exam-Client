import "./doTest.css";
import { fakeData } from "./fakeData";
import { onCheckis_answered } from "./libs/functions";
import React, { useState, useEffect } from "react";
import QuestionAns from "./components/question";
import Button from "@mui/material/Button";
import Countdown from "react-countdown";
import constant from "../../constants/constant";
import { handleApi } from "../../components/utils/utils";
import axios from "axios";
import { useParams } from "react-router";
import { SubmitDialog } from "../../components/dialog/dialog.js";

function fetchTestTemplate(id, setFormData) {
  axios
    .get(`${constant.BASEURL}/core/test/${id}`)
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

function handleSubmit(id, reqBody, setDialogObj) {
  axios
    .post(`${constant.BASEURL}/core/test/submit/${id}`, reqBody)
    .then((res) => {
      handleApi(res, (e) => {
        console.log(res.data);
        setDialogObj({
          open: true,
          msg: res.data.message,
          status: res.data.dialog_code,
          score: res.data.data,
        });
        setTimeout(() => {
          setDialogObj({
            open: false,
            msg: res.data.message,
            status: res.data.dialog_code,
            score: res.data.data,
          });
        }, 2000);
      });
    })
    .catch((error) => {
      console.log(error);
      setTimeout(() => {
        alert(error);
      }, 400);
    });
}

function DoTest() {
  const [formData, setFormData] = useState(fakeData);
  // const [hasTime, setHasTime] = useState(checkHasTime(formData.duration));
  const [focus, setFocused] = useState(null);
  const [hasTime, setHasTime] = useState(true);
  const { id } = useParams();
  const [dialogObj, setDialogObj] = useState({
    open: false,
    msg: "OK",
    score: 0,
    status: 1,
  });
  useEffect(() => {
    fetchTestTemplate(id, setFormData);
  }, []);

  return (
    <>
      {hasTime ? (
        <div className="do_test-form">
          <div className="do_test-header">
            <h1 className="test_name">{formData.name}</h1>
            <div className="test-additional-info">
              <div className="test-additional-body">
                <b style={{ display: "inline-block" }}>Subject:</b>{" "}
                <p className="header-text">{formData.subject_name}</p>
              </div>
              <div className="test-additional-body">
                <b style={{ display: "inline-block" }}>Total questions:</b>{" "}
                <p className="header-text">{formData.questions.length}</p>
              </div>
              <div className="test-additional-body">
                <b style={{ display: "inline-block" }}>Duration:</b>{" "}
                <p className="header-text">{formData.duration}</p>
              </div>
            </div>
          </div>
          <div className="header-body-division"></div>
          <div className="do_test-body">
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
        </div>
      ) : (
        <div className="">Hết thời gian làm bài</div>
      )}
      <div className="do_test-footer">
        <Button
          onClick={() => {
            handleSubmit(id, formData, setDialogObj);
            // setDialogObj({
            //   open: true,
            //   msg: "What ever",
            //   status: 1,
            //   score: 50,
            // });
            // console.log(formData);
          }}
          variant="contained"
        >
          Submit
        </Button>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <p>Remaining time</p>
          <Countdown
            date={new Date(formData.test_end_date)}
            renderer={renderer}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <p>Table of contents</p>
          <div className="do_test-footer_content">
            {formData?.questions?.map((el, index) => (
              <ContentBlock
                key={el.id}
                el={el}
                label={index + 1}
                json={formData}
              />
            ))}
          </div>
        </div>
      </div>
      <SubmitDialog
        msg={dialogObj.msg}
        open={dialogObj.open}
        status={dialogObj.status}
        score={dialogObj.score}
      />
    </>
  );
}

export default DoTest;

const ContentBlock = ({ el, label, json }) => {
  // const [checkChoose, setCheckChoose] = useState()
  return (
    <>
      <div
        onClick={() => {
          const section = document.querySelector("#" + `question-${el.id}`);
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className={
          (el.is_answered ? "do_test-block-active" : "") + " do_test-block"
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
    // window.location.href = "/manage/test";
  } else {
    return (
      <span className="header-text">
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
  return (
    <span className="header-text">
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
