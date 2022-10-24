//text: "văn bản"
//checkbox: "chọn nhiều"
//radio: "chọn một"

//0: easy
//1: medium
//2: hard
export const fakeData = {
  name: "Bài test 2",
  duration: 45,
  subject_name: "Math",
  description: "Mô tả gì đó",
  questions: [
    {
      id: "question-1",
      content: "What is your age?",
      textAns: "",
      question_type: 0,
      is_answered: false,
      answers: [
        {
          id: 1,
          content: "over 50 years old",
          checked: false,
          color_flag: 1,
        },
        {
          id: 2,
          content: "from 36 to 50 years old",
          checked: true,
          color_flag: -1,
        },
        {
          id: 3,
          content: "over 100 years old",
          checked: false,
          color_flag: 0,
        },
      ],
    },
  ],
};
