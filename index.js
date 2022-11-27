let state = {
  inputValue: "",
  list: [],
};

function setState(newState) {
  const prevState = { ...state };
  const nextState = { ...state, ...newState };
  state = nextState;

  render();
  // onStateChange(prevState, nextState);
}

// function onStateChange(prevState, nextState) {
//   if (prevState.inputValue !== nextState.inputValue) {
//     localStorage.setItem("list", nextState.inputValue);
//   }
// }

function HomePage() {
  //----- Element -----//
  const input = document.createElement("input");
  input.placeholder = "Type to add...";
  input.id = "input";

  const addButton = document.createElement("button");
  addButton.textContent = "Add";

  const listContainer = document.createElement("div");

  //----- Action -----//
  input.value = state.inputValue;
  input.oninput = function (event) {
    setState({ inputValue: event.target.value });
  };

  addButton.onclick = function () {
    setState({ list: [...state.list, state.inputValue] });
    setState({ inputValue: "" });
  };

  state.list.forEach((data, i) => {
    const li = document.createElement("span");
    const deleteIcon = document.createElement("img");
    deleteIcon.src = "./public/icons/delete.png";
    const listWrapper = document.createElement("div");

    li.textContent = data;

    deleteIcon.onclick = function () {
      state.list.splice(i, 1);
      setState();
    };

    listWrapper.append(li);
    listWrapper.append(deleteIcon);
    listContainer.append(listWrapper);

    //----- Styles -----//
    deleteIcon.style.width = "1em";
    deleteIcon.style.height = "1em";
    deleteIcon.style.cursor = "pointer"

    listWrapper.style.margin = "0.7rem 0"
    listWrapper.style.display = "flex";
    listWrapper.style.alignItems = "center";
    listWrapper.style.justifyContent = "space-between";
  });

  //----- Container -----//
  const div = document.createElement("div");
  div.append(input);
  div.append(addButton);
  div.append(listContainer);

  //----- Styles -----//
  div.style.maxWidth = "fit-content";
  div.style.margin = "0 auto";

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
