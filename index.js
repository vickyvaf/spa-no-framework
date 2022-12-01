let state = {
  inputValue: "",
  list: JSON.parse(localStorage.getItem("list2")) ?? [],
  checkedList: JSON.parse(localStorage.getItem("checkedList2")) ?? [],
  isUpdate: false,
  selectedIndex: null,
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
  input.id = "input";

  const addButton = document.createElement("button");
  addButton.textContent = "Add";

  const editButton = document.createElement("button");
  editButton.textContent = "Update";

  input.value = state.inputValue;
  input.oninput = function (event) {
    setState({ inputValue: event.target.value });
  };

  addButton.onclick = function () {
    if (state.inputValue === "") {
      alert("Please fill the input");
    }
    if (state.inputValue !== "") {
      setState({ list: [...state.list, state.inputValue], inputValue: "" });
    }
  };

  editButton.onclick = function () {
    if (state.inputValue === "") {
      alert("Please fill the input");
    }
    if (state.inputValue !== "") {
      const newList = [...state.list];
      newList[state.selectedIndex] = state.inputValue;

      setState({
        list: newList,
        isUpdate: false,
        inputValue: "",
      });
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
      const filteredData = state.list.filter((_, indexList) => indexList !== i)
      setState({
        list: [...filteredData],
        checkedList: [...state.checkedList, data],
        inputValue: "",
        isUpdate: false,
      });
    };

    editIcon.onclick = function () {
      setState({ isUpdate: true, inputValue: data, selectedIndex: i });
    };

    deleteIcon.onclick = function () {
      const filteredData = state.list.filter((_, indexList) => indexList !== i)
      setState({
        list: [...filteredData],
        isUpdate: false,
        inputValue: ""
      });
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
    wrapperLeft.style.alignItems = "center";
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

  state.isUpdate
    ? inputWrapper.append(editButton)
    : inputWrapper.append(addButton);

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

  state.checkedList.forEach((data, i) => {
    const li = document.createElement("s");

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "./public/icons/delete.png";
    deleteIcon.style.width = "1em";
    deleteIcon.style.height = "1em";
    deleteIcon.style.cursor = "pointer";

    li.textContent = truncate(data);

    deleteIcon.onclick = function () {
      const filteredData = state.checkedList.filter((_, indexList) => indexList !== i)
      setState({ checkedList: [...filteredData] });
    };

    const listWrapper = document.createElement("div");
    const iconWrapper = document.createElement("div");

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

  const focusedElementId = document.activeElement.id;
  const focusedElementSelectionStart = document.activeElement.selectionStart;
  const focusedElementSelectionEnd = document.activeElement.selectionEnd;

  root.innerHTML = "";
  root.append(AddToDo());
  root.append(CheckedToDo());

  if (focusedElementId) {
    const focusedElement = document.getElementById(focusedElementId);
    focusedElement.focus();
    focusedElement.selectionStart = focusedElementSelectionStart;
    focusedElement.selectionEnd = focusedElementSelectionEnd;
  }

  root.style.width = "fit-content";
  root.style.margin = "0 auto";
  root.style.display = "flex";
  root.style.gap = "5rem";
}

render();
