import { uniqueID } from "./libs/functions";
//text: "văn bản"
//checkbox: "chọn nhiều"
//radio: "chọn một"

//0: easy
//1: medium
//2: hard
export const fakeData = {
  label: "Name",
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
      question_id: null,
      isBank: false,
      textAns: "",
      questType: 0,
      correctAnswers: [],
      type: "radio",
      answers: [],
    },
  ],
};

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
export const topFilms = [
  { label: 'The Shawshank Redemption', id: 1994 },
  { label: 'The Godfather', id: 1972 },
  { label: 'The Godfather: Part II', id: 1974 },
  { label: 'The Dark Knight', id: 2008 },
  { label: '12 Angry Men', id: 1957 },
  { label: "Schindler's List", id: 1993 },
  { label: 'Pulp Fiction', id: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    id: 2003,
  },
  { label: 'The Good, the Bad and the Ugly', id: 1966 },
  { label: 'Fight Club', id: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    id: 2001,
  },
  {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    id: 1980,
  },
  { label: 'Forrest Gump', id: 1994 },
  { label: 'Inception', id: 2010 },
  {
    label: 'The Lord of the Rings: The Two Towers',
    id: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", id: 1975 },
  { label: 'Goodfellas', id: 1990 },
  { label: 'The Matrix', id: 1999 },
  { label: 'Seven Samurai', id: 1954 },
  {
    label: 'Star Wars: Episode IV - A New Hope',
    id: 1977,
  },
  { label: 'City of God', id: 2002 },
  { label: 'Se7en', id: 1995 },
  { label: 'The Silence of the Lambs', id: 1991 },
  { label: "It's a Wonderful Life", id: 1946 },
  { label: 'Life Is Beautiful', id: 1997 },
  { label: 'The Usual Suspects', id: 1995 },
  { label: 'Léon: The Professional', id: 1994 },
  { label: 'Spirited Away', id: 2001 },
  { label: 'Saving Private Ryan', id: 1998 },
  { label: 'Once Upon a Time in the West', id: 1968 },
  { label: 'American History X', id: 1998 },
  { label: 'Interstellar', id: 2014 },
];
