import { uniqueID } from "./libs/functions";
//text: "văn bản"
//checkbox: "chọn nhiều"
//radio: "chọn một"

//0: easy
//1: medium
//2: hard
export const fakeData = {
  title: "Name",
  duration: new Date(),
  subject: "radio",
  description: "Description",
  easyQuest: null,
  mediumQuest: null,
  hardQuest: null,
  data: [
    {
      id: uniqueID("question"),
      question: "Question",
      textAns: "",
      questType: 0,
      correctAnswers: [],
      type: "radio",
      answers: [],
    },
  ],
};
