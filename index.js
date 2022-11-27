let state = {
  inputValue: "",
  list: JSON.parse(localStorage.getItem("list")) ?? [],
  buttonStatus: true,
};

function setButtonStatus(status) {
  state.buttonStatus = status;
}

function setState(newState) {
  const prevState = { ...state };
  const nextState = { ...state, ...newState };
  state = nextState;

  render();
}

function HomePage() {
  //----- Element -----//
  const input = document.createElement("input");
  input.placeholder = "Type to add...";
  input.id = "input";
  input.autocomplete = "off";

  const editInput = document.createElement("input");
  editInput.placeholder = "Type to add...";
  editInput.id = "input";
  editInput.autocomplete = "off";

  const addButton = document.createElement("button");
  addButton.textContent = "Add";

  const editButton = document.createElement("button");
  editButton.textContent = "Update";
  editButton.style.display = "none";

  const textWarn = document.createElement("p");

  const listContainer = document.createElement("div");

  //----- Action -----//
  input.value = state.inputValue;
  input.oninput = function (event) {
    state.inputValue = event.target.value;
    if (state.inputValue !== "") {
      textWarn.textContent = "";
    }
  };

  addButton.onclick = function () {
    textWarn.textContent = "Form can't empty";

    if (state.inputValue !== "") {
      setState({ list: [...state.list, state.inputValue] });
      localStorage.setItem("list", JSON.stringify(state.list));
      setState({ inputValue: "" });
    }
  };

  state.list.forEach((data, i) => {
    const li = document.createElement("span");

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "./public/icons/delete.png";

    const editIcon = document.createElement("img");
    editIcon.src = "./public/icons/edit.png";

    const iconWrapper = document.createElement("div");
    const listWrapper = document.createElement("div");

    li.textContent = data;

    deleteIcon.onclick = function () {
      state.list.splice(i, 1);
      localStorage.setItem("list", JSON.stringify(state.list));
      setState();
    };

    editIcon.onclick = function () {
      setButtonStatus(false);
      if (state.buttonStatus === false) {
        addButton.style.display = "none";
        editButton.style.display = "block";

        state.inputValue = data;
        input.value = state.inputValue;

        editButton.onclick = function () {
          textWarn.textContent = "Form can't empty";

          if (state.inputValue !== "") {
            setButtonStatus(true);

            state.list.splice(i, 1);
            setState({ list: [...state.list, state.inputValue] });
            localStorage.setItem("list", JSON.stringify(state.list));
            setState({ inputValue: "" });

            addButton.style.display = "block";
            editButton.style.display = "none";
          }
        };
      }
    };

    iconWrapper.append(editIcon);
    iconWrapper.append(deleteIcon);
    listWrapper.append(li);
    listWrapper.append(iconWrapper);
    listContainer.append(listWrapper);

    //----- Styles -----//
    editIcon.style.width = "1em";
    editIcon.style.height = "1em";
    editIcon.style.cursor = "pointer";

    deleteIcon.style.width = "1em";
    deleteIcon.style.height = "1em";
    deleteIcon.style.cursor = "pointer";

    iconWrapper.style.display = "flex";
    iconWrapper.style.alignItems = "center";
    iconWrapper.style.gap = "0.5rem";

    listWrapper.style.margin = "0.4rem 0";
    listWrapper.style.display = "flex";
    listWrapper.style.alignItems = "center";
    listWrapper.style.justifyContent = "space-between";
  });

  //----- Container -----//
  const div = document.createElement("div");
  const inputWrapper = document.createElement("div");

  inputWrapper.append(input);
  inputWrapper.append(editButton);
  inputWrapper.append(addButton);

  div.append(inputWrapper);
  div.append(textWarn);
  div.append(listContainer);

  //----- Styles -----//
  div.style.maxWidth = "320px";
  div.style.margin = "0 auto";

  input.style.width = "70%";

  addButton.style.width = "30%";
  addButton.style.cursor = "pointer";

  editButton.style.width = "30%";
  editButton.style.cursor = "pointer";

  inputWrapper.style.display = "flex";
  inputWrapper.style.alignItems = "center";

  textWarn.style.color = "red";
  textWarn.style.fontSize = "10px";
  textWarn.style.position = "absolute";
  textWarn.style.transform = "translate(180%, -80%)";

  listContainer.style.marginTop = "1.5rem";
  listContainer.style.display = "flex";
  listContainer.style.flexDirection = "column-reverse";

  return div;
}

export function render() {
  const root = document.getElementById("root");

  const focusedElementId = document.activeElement.id;
  const focusedElementSelectionStart = document.activeElement.selectionStart;
  const focusedElementSelectionEnd = document.activeElement.selectionEnd;

  root.innerHTML = "";
  root.append(HomePage());

  if (focusedElementId) {
    const focusedElement = document.getElementById(focusedElementId);
    focusedElement.focus();
    focusedElement.selectionStart = focusedElementSelectionStart;
    focusedElement.selectionEnd = focusedElementSelectionEnd;
  }
}

render();
