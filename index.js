let state = {
  inputValue: "",
  list: JSON.parse(localStorage.getItem("list2")) ?? [],
  checkedList: JSON.parse(localStorage.getItem("checkedList2")) ?? [],
};

function setState(newState) {
  const prevState = { ...state };
  const nextState = { ...state, ...newState };
  state = nextState;

  render();
  onStateChange(prevState, nextState);
}

function onStateChange(prevState, nextState) {
  if (prevState.list !== nextState.list) {
    localStorage.setItem("list2", JSON.stringify(state.list));
  }
  if (prevState.checkedList !== nextState.checkedList) {
    localStorage.setItem("list2", JSON.stringify(state.list));
    localStorage.setItem("checkedList2", JSON.stringify(state.checkedList));
  }
  if (nextState.checkedList !== nextState.list) {
    localStorage.setItem("list2", JSON.stringify(state.list));
    localStorage.setItem("checkedList2", JSON.stringify(state.checkedList));
  }
}

function truncate(text) {
  if (text.length > 8) {
    return text.slice(0, 8) + "...";
  }
  return text;
}

function AddToDo() {
  const input = document.createElement("input");
  input.autocomplete = "off";
  input.placeholder = "Type to add...";

  const addButton = document.createElement("button");
  addButton.textContent = "Add";

  const editButton = document.createElement("button");
  editButton.textContent = "Update";

  editButton.style.display = "none";

  input.value = state.inputValue;
  input.oninput = function (event) {
    state.inputValue = event.target.value;
  };

  addButton.onclick = function () {
    if (state.inputValue === "") {
      alert("Please fill the input");
    }
    if (state.inputValue !== "") {
      setState({ list: [...state.list, state.inputValue] });
      setState({ inputValue: "" });
    }
  };

  editButton.onclick = function () {
    if (state.inputValue === "") {
      alert("Please fill the input");
    }
    if (state.inputValue !== "") {
      setState({ list: [...state.list, state.inputValue] });
      setState({ inputValue: "" });

      addButton.style.display = "block";
      editButton.style.display = "none";
    }
  };

  const listContainer = document.createElement("div");

  state.list.forEach((data, i) => {
    const li = document.createElement("span");

    const listWrapper = document.createElement("div");

    const checkedIcon = document.createElement("img");
    checkedIcon.src = "./public/icons/check.png";
    checkedIcon.style.width = "1em";
    checkedIcon.style.height = "1em";
    checkedIcon.style.cursor = "pointer";

    const editIcon = document.createElement("img");
    editIcon.src = "./public/icons/edit.png";
    editIcon.style.width = "1em";
    editIcon.style.height = "1em";
    editIcon.style.cursor = "pointer";

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "./public/icons/delete.png";
    deleteIcon.style.width = "1em";
    deleteIcon.style.height = "1em";
    deleteIcon.style.cursor = "pointer";

    li.textContent = truncate(data);

    checkedIcon.onclick = function () {
      state.list.splice(i, 1);
      setState({ checkedList: [...state.checkedList, data] });
    };

    editIcon.onclick = function () {
      state.inputValue = data;
      input.value = state.inputValue;

      state.list.splice(i, 1);

      addButton.style.display = "none";
      editButton.style.display = "block";
    };

    deleteIcon.onclick = function () {
      state.list.splice(i, 1);
      setState({ list: [...state.list] });
    };

    const wrapperLeft = document.createElement("div");
    wrapperLeft.append(checkedIcon);

    const iconWrapperRight = document.createElement("div");
    iconWrapperRight.append(editIcon);
    iconWrapperRight.append(deleteIcon);

    wrapperLeft.append(checkedIcon);
    wrapperLeft.append(li);

    listWrapper.append(wrapperLeft);
    listWrapper.append(iconWrapperRight);

    listContainer.append(listWrapper);

    wrapperLeft.style.display = "flex";
    wrapperLeft.style.gap = "0.8rem";

    iconWrapperRight.style.display = "flex";
    iconWrapperRight.style.gap = "0.7rem";

    listWrapper.style.display = "flex";
    listWrapper.style.alignItems = "center";
    listWrapper.style.justifyContent = "space-between";
    listWrapper.style.marginBottom = "0.7rem";
  });

  const div = document.createElement("div");
  const inputWrapper = document.createElement("div");

  inputWrapper.append(input);
  inputWrapper.append(addButton);
  inputWrapper.append(editButton);

  div.append(inputWrapper);
  div.append(listContainer);

  div.style.width = "230px";
  div.style.margin = "1rem 0";

  input.style.width = "70%";
  addButton.style.width = "30%";
  addButton.style.cursor = "pointer";

  editButton.style.width = "30%";
  editButton.style.cursor = "pointer";

  inputWrapper.style.display = "flex";
  inputWrapper.style.alignItems = "center";

  listContainer.style.marginTop = "1.4rem";
  listContainer.style.display = "flex";
  listContainer.style.flexDirection = "column-reverse";

  return div;
}

function CheckedToDo() {
  const title = document.createElement("p");
  title.textContent = "Finished To Do";

  const listContainer = document.createElement("div");

  state.checkedList.map((data, i) => {
    const li = document.createElement("s");

    const undoIcon = document.createElement("img");
    undoIcon.src = "./public/icons/undo.png";
    undoIcon.style.width = "1em";
    undoIcon.style.height = "1em";
    undoIcon.style.cursor = "pointer";

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "./public/icons/delete.png";
    deleteIcon.style.width = "1em";
    deleteIcon.style.height = "1em";
    deleteIcon.style.cursor = "pointer";

    li.textContent = truncate(data);

    undoIcon.onclick = function () {
      state.checkedList.splice(i, 1);
      setState({ list: [...state.list, data] });
    };

    deleteIcon.onclick = function () {
      state.checkedList.splice(i, 1);
      setState({ checkedList: [...state.checkedList] });
    };

    const listWrapper = document.createElement("div");
    const iconWrapper = document.createElement("div");

    iconWrapper.append(undoIcon);
    iconWrapper.append(deleteIcon);

    listWrapper.append(li);
    listWrapper.append(iconWrapper);

    listContainer.append(listWrapper);

    iconWrapper.style.display = "flex";
    iconWrapper.style.gap = "0.7rem";

    listWrapper.style.width = "100%";
    listWrapper.style.display = "flex";
    listWrapper.style.alignItems = "center";
    listWrapper.style.justifyContent = "space-between";
    listWrapper.style.marginBottom = "1rem";
  });

  listContainer.style.display = "flex";
  listContainer.style.flexDirection = "column-reverse";

  const div = document.createElement("div");
  div.append(title);
  div.append(listContainer);

  div.style.width = "150px";

  title.style.textAlign = "center";

  return div;
}

function render() {
  const root = document.getElementById("root");
  root.innerHTML = "";
  root.append(AddToDo());
  root.append(CheckedToDo());

  // Style
  root.style.width = "fit-content";
  root.style.margin = "0 auto";
  root.style.display = "flex";
  root.style.gap = "5rem";
}

render();
