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
    correctAnswer: "",
    type: "text",
    Answer: [],
  };
  let newJson = json.data;
  newJson.splice(index, 0, newEl);
  setJson({
    ...json,
    data: newJson,
  });
}

export function delEl(id, json, setJson) {
  let newJson = json.data?.filter((e) => e.id !== id);
  setJson({
    ...json,
    data: newJson,
  });
}

export function handleChangeQuestion(value, id, json, setJson) {
  let newJson = json.data?.map((e) => {
    if (e.id === id) {
      e.question = value;
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
      e.question_type = value;
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
    if (e.id === qsId) {
      e.answers?.push(newAns);
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

export function handleChangeRadioType(qsId, id, json, setJson) {
  let newJson = json.questions?.map((e) => {
    if (e.id === qsId) {
      e.is_answered = true;
      e.selected = [];
      e.selected.push(id);
    }
    return e;
  });

  setJson({
    ...json,
    questions: newJson,
  });
}

export function onCheckRadioType(qsId, id, json) {
  let isCheck = null;
  json.questions?.map((e) => {
    if (e.id === qsId) {
      isCheck = e.selected?.find((el) => el === id);
    }
    return e;
  });

  return isCheck ? true : false;
}

export function handleChangeCheckBoxType(qsId, id, json, setJson) {
  let newJson = json.questions?.map((e) => {
    if (e.id === qsId) {
      e.is_answered = true;
      let existedAns = e.selected?.find((el) => el === id);
      if (existedAns) {
        e.selected = e.selected.filter((el) => el !== id);
        if (e.selected.length === 0) e.is_answered = false;
      } else {
        if (e.selected) {
          e.selected.push(id);
        } else {
          e.selected = [id];
        }
      }
    }
    return e;
  });

  setJson({
    ...json,
    questions: newJson,
  });
}

export function onCheckis_answered(qsId, json) {
  let isCheck = null;
  json.data?.map((e) => {
    if (e.id === qsId) {
      isCheck = e.is_answered;
    }
    return e;
  });

  return isCheck ? true : false;
}
