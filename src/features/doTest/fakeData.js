//text: "văn bản"
//checkbox: "chọn nhiều"
//radio: "chọn một"

//0: easy
//1: medium
//2: hard
export const fakeData = {
  title: "Bài test 2",
  duration: 1649091600000,
  subject: "Môn 1",
  description: "Mô tả gì đó",
  easyQuest: 0,
  mediumQuest: 0,
  hardQuest: 0,
  data: [
    {
      id: "question-1",
      question: "What is your age?",
      textAns: "",
      questType: 0,
      hasChoose: false,
      selectAnswers: [],
      correctAnswers: [
        {
          id: "1",
          value: "over 50 years old",
        },
      ],
      type: "radio",
      answers: [
        {
          id: "1",
          value: "over 50 years old",
        },
        {
          id: "2",
          value: "from 36 to 50 years old",
        },
      ],
    },
    {
      id: "question-2",
      question: "What is your age?",
      textAns: "",
      questType: 1,
      hasChoose: false,
      selectAnswers: [],
      correctAnswers: [
        {
          id: "1",
          value: "over 50 years old",
        },
      ],
      type: "checkbox",
      answers: [
        {
          id: "1",
          value: "over 50 years old",
        },
        {
          id: "2",
          value: "from 36 to 50 years old",
        },
      ],
    },
  ],
};
