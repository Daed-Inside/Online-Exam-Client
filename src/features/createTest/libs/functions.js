export function onChangeFormValue(name, value, json, setJson) {
  setJson({
    ...json,
    [name]: value,
  });
}

export function onChangeTime(value, json, setJson) {
  setJson({
    ...json,
    start_date: value,
  });
}

export function addEl(index, json, setJson, is_bank) {
  let newEl = {
    id: uniqueID("question"),
    content: "",
    correctAnswers: [],
    question_type: 1,
    level: 2,
    is_bank: is_bank,
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
  let newJson = json.questions?.filter((e) => e.id !== id);
  setJson({
    ...json,
    questions: newJson,
  });
}

export function handleChangeQuestion(value, id, json, setJson, is_bank) {
  let newJson = json.questions?.map((e) => {
    if (e.id === id) {
      if (!is_bank) {
        e.content = value;
      } else {
        e.content = value.content;
        e.answers = value.answers;
        e.question_id = value.id;
        e.is_bank = is_bank;
      }
    }

    return e;
  });

  setJson({
    ...json,
    questions: newJson,
  });
}

export function handleChangeTextAns(value, id, json, setJson) {
  let newJson = json.questions?.map((e) => {
    if (e.id === id) {
      e.textAns = value;
    }
    return e;
  });

  setJson({
    ...json,
    questions: newJson,
  });
}

export function handleChangeType(value, id, json, setJson) {
  let newJson = json.questions?.map((e) => {
    if (e.id === id) {
      e.type = value;
    }
    return e;
  });

  setJson({
    ...json,
    questions: newJson,
  });
}

export function handleChangeDifficult(value, id, json, setJson) {
  let newJson = json.questions?.map((e) => {
    if (e.id === id) {
      e.level = value;
    }
    return e;
  });

  setJson({
    ...json,
    questions: newJson,
  });
}

export function addChangeAns(qsId, json, setJson) {
  let newAns = {
    id: uniqueID("ans"),
    content: "",
    is_correct: false,
  };
  let newJson = json.questions?.map((e) => {
    if (e.id === qsId) {
      e.answers?.push(newAns);
    }
    return e;
  });
  console.log(json);
  setJson({
    ...json,
    questions: newJson,
  });
}

export function handleChangeAns(value, qsId, id, json, setJson) {
  let newJson = json.questions?.map((e) => {
    if (e.id === qsId) {
      e.answers = e.answers?.map((an) => {
        if (an.id === id) {
          an.content = value;
        }
        return an;
      });
    }
    return e;
  });
  setJson({
    ...json,
    questions: newJson,
  });
}

export function delAns(qsId, id, json, setJson) {
  let newJson = json.questions?.map((e) => {
    if (e.id === qsId) {
      // e.correctAnswers = e.correctAnswers?.filter((el) => el.id !== id);
      e.answers = e.answers?.filter((el) => el.id !== id);
    }
    return e;
  });
  setJson({
    ...json,
    questions: newJson,
  });
}

export function addCorrectAns(id, qsId, json, setJson, isBank) {
  if (!isBank) {
    let newJson = json.questions?.map((e) => {
      if (e.id === qsId) {
        e.answers = e.answers?.map((an) => {
          if (an.id === id) {
            an.is_correct = true;
          }
          return an;
        });
      }
      return e;
    });

    setJson({
      ...json,
      questions: newJson,
    });
  }
}

export function delCorrectAns(qsId, id, json, setJson, isBank) {
  if (!isBank) {
    let newJson = json.questions?.map((e) => {
      if (e.id === qsId) {
        e.answers = e.answers?.map((an) => {
          if (an.id === id) {
            an.is_correct = false;
          }
          return an;
        });
      }
      return e;
    });

    setJson({
      ...json,
      questions: newJson,
    });
  }
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
