export function onChangeFormValue(name, value, json, setJson) {
  setJson({
    ...json,
    [name]: value,
  });
}

export function onChangeTime(value, json, setJson) {
  setJson({
    ...json,
    duration: value,
  });
}

export function addEl(index, json, setJson) {
  let newEl = {
    id: uniqueID("question"),
    question: "",
    correctAnswers: [],
    type: "radio",
    answers: [],
  };
  let newJson = json.questions;
  newJson.splice(index, 0, newEl);
  setJson({
    ...json,
    questions: newJson,
  });
}

export function delEl(id, json, setJson) {
  let newJson = json.data?.filter((e) => e.id !== id);
  setJson({
    ...json,
    data: newJson,
  });
}

export function handleChangeQuestion(value, id, json, setJson, isBank) {
  let newJson = json.data?.map((e) => {
    if(!isBank){
      if (e.id === id) {
        e.question = value;
        e.question_id = null;
        e.isBank = isBank
      }
    } else {
      e.question_id = value;
      e.question = null;
      e.isBank = isBank
    }
    
    return e;
  });

  setJson({
    ...json,
    data: newJson,
  });
}

export function handleChangeTextAns(value, id, json, setJson) {
  let newJson = json.data?.map((e) => {
    if (e.id === id) {
      e.textAns = value;
    }
    return e;
  });

  setJson({
    ...json,
    data: newJson,
  });
}

export function handleChangeType(value, id, json, setJson) {
  let newJson = json.data?.map((e) => {
    if (e.id === id) {
      e.type = value;
      if (value === "text") {
        e.textAns = "";
      }
    }
    return e;
  });

  setJson({
    ...json,
    data: newJson,
  });
}

export function handleChangeQuesType(value, id, json, setJson) {
  let newJson = json.data?.map((e) => {
    if (e.id === id) {
      e.questType = value;
      if (value === "text") {
        e.textAns = "";
      }
    }
    return e;
  });

  setJson({
    ...json,
    data: newJson,
  });
}

export function addChangeAns(qsId, json, setJson) {
  let newAns = {
    id: uniqueID("ans"),
    value: "",
  };
  let newJson = json.data?.map((e) => {
    console.log("qsId", qsId);
    console.log("e.id", e.id);
    if (e.id === qsId) {
      e.answers?.push(newAns);
    }
    return e;
  });
  console.log(json);
  setJson({
    ...json,
    data: newJson,
  });
}

export function handleChangeAns(value, qsId, id, json, setJson) {
  let newJson = json.data?.map((e) => {
    if (e.id === qsId) {
      e.answers?.map((an) => {
        if (an.id === id) {
          an.value = value;
        }
      });
    }
    return e;
  });
  setJson({
    ...json,
    data: newJson,
  });
}

export function delAns(qsId, id, json, setJson) {
  let newJson = json.data?.map((e) => {
    if (e.id === qsId) {
      e.correctAnswers = e.correctAnswers?.filter((el) => el.id !== id);
      e.answers = e.answers?.filter((el) => el.id !== id);
    }
    return e;
  });
  setJson({
    ...json,
    data: newJson,
  });
}

export function addCorrectAns(value, qsId, json, setJson) {
  let newJson = json.data?.map((e) => {
    if (e.id === qsId) {
      e.correctAnswers?.push(value);
    }
    return e;
  });

  setJson({
    ...json,
    data: newJson,
  });
}

export function delCorrectAns(qsId, id, json, setJson) {
  let newJson = json.data?.map((e) => {
    if (e.id === qsId) {
      e.correctAnswers = e.correctAnswers?.filter((el) => el.id !== id);
    }
    return e;
  });

  setJson({
    ...json,
    data: newJson,
  });
}

export const uniqueID = (prefix = "default") => {
  return (
    prefix +
    "_" +
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    )
  );
};

export function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].id === obj.id) {
      return true;
    }
  }

  return false;
}
