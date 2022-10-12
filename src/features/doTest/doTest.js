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
    .get(`${constant.BASEURL}/core/test/${id}`, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(constant.localStorage.TOKEN),
      },
    })
    .then((res) => {
      handleApi(res, (e) => {
        let lcstr_temp = localStorage.getItem(`test_id_${id}`);
        if (lcstr_temp == null || lcstr_temp == undefined) {
          setFormData(res.data.data);
        } else {
          let lcstr_temp_obj = JSON.parse(lcstr_temp);
          let questions_alt = res.data.data.questions?.map((e) => {
            e.selected = lcstr_temp_obj[e.id];
            e.is_answered = true;
            return e;
          });
          let new_formData = { ...res.data.data, questions: questions_alt };
          setFormData(new_formData);
        }
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
    .post(`${constant.BASEURL}/core/test/submit/${id}`, reqBody, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(constant.localStorage.TOKEN),
      },
    })
    .then((res) => {
      handleApi(res, (e) => {
        setDialogObj({
          open: true,
          msg: res.data.message,
          status: res.data.dialog_code,
          score: res.data.data,
        });
        setTimeout(async () => {
          await setDialogObj({
            open: false,
            msg: res.data.message,
            status: res.data.dialog_code,
            score: res.data.data,
          });
        }, 2000);
        localStorage.removeItem(`test_id_${id}`);
        window.location.href = "/manage/test";
      });
    })
    .catch((error) => {
      setDialogObj({
        open: true,
        msg: "System error",
        status: -1,
        score: null,
      });
      setTimeout(async () => {
        await setDialogObj({
          open: false,
          msg: "System error",
          status: -1,
          score: null,
        });
      }, 2000);
      window.location.href = "/manage/test";
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
    // setInterval(() => {
    //   if (formData != null && formData.questions.length > 0) {
    //     let temp_val = {};
    //     formData.questions.map((item) => {
    //       temp_val[item.id] = item.selected;
    //     });
    //     localStorage.setItem(`test_id_${id}`, JSON.stringify(temp_val));
    //   }
    // }, 20000);
  }, []);

  useEffect(() => {
    if (formData != null && formData.questions.length > 0) {
      let temp_val = {};
      formData.questions.map((item) => {
        temp_val[item.id] = item.selected;
      });
      localStorage.setItem(`test_id_${id}`, JSON.stringify(temp_val));
    }
  }, [formData]);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      handleSubmit(id, formData, setDialogObj);
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
            date={new Date(formData.expired_date)}
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

const checkHasTime = (expireDate) => {
  let date = new Date();
  if (date.getTime() > expireDate) {
    return false;
  } else {
    return true;
  }
};
