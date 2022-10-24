import "./overview.css";
import { fakeData } from "./fakeData";
import React, { useState, useEffect } from "react";
import QuestionAns from "./components/question";
import Button from "@mui/material/Button";
import Countdown from "react-countdown";
import constant from "../../constants/constant";
import { handleApi } from "../../components/utils/utils";
import axios from "axios";
import { useParams } from "react-router";
import { SubmitDialog } from "../../components/dialog/dialog.js";
import { set } from "date-fns/esm";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

function fetchOverview(id, setFormData) {
  axios
    .get(`${constant.BASEURL}/core/test/overview/${id}`, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(constant.localStorage.TOKEN),
      },
    })
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

function Overview() {
  const [formData, setFormData] = useState(fakeData);
  // const [hasTime, setHasTime] = useState(checkHasTime(formData.duration));
  const [focus, setFocused] = useState(null);
  const [hasTime, setHasTime] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    fetchOverview(id, setFormData);
  }, []);

  return (
    <>
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
      <div className="do_test-footer">
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
    </>
  );
}

export default Overview;

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
