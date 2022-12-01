import { Loader } from "./utils/Loader.js";
import { ItemNotFound } from "./utils/ItemNotFound.js";
import { truncate } from "./utils/truncate.js";
import { getProducts } from "./request/getProducts.js";

let state = {
  datas: [],
  searchInputValue: "",
  isLoading: false,
  errorMsg: "",
  limit: 10,
  skip: 0,
  total: null,
};

function setState(newState) {
  const prevState = { ...state };
  const nextState = { ...state, ...newState };
  state = nextState;

  render();
  onStateChange(prevState, nextState);
}

function reducer(prevState, action) {
  switch (action.type) {
    case "FETCH": {
      return {
        ...prevState,
        isLoading: true,
      };
    }
    case "CHANGE_INPUT": {
      return {
        ...prevState,
        searchInputValue: action.payload.searchInputValue,
      };
    }
    case "SEARCH": {
      return {
        isLoading: true,
        skip: 0,
        total: 0,
      };
    }
    case "FETCH_SUCCESS": {
      return {
        isLoading: false,
        datas: action.payload.datas,
        total: action.payload.total,
      };
    }
    case "FETCH_ERROR": {
      return {
        errorMsg: action.payload.errorMsg,
      };
    }
    case "NEXT_PAGE": {
      return {
        ...prevState,
        isLoading: true,
        skip: (state.skip += 10),
      };
    }
    case "PREV_PAGE": {
      return {
        ...prevState,
        isLoading: true,
        skip: (state.skip -= 10),
      };
    }
  }
}

function send(action) {
  const newState = reducer(state, action);
  setState(newState);
}

function onStateChange(prevState, nextState) {
  if (state.isLoading === true) {
    getProducts();
  }
}

function HomePage() {
  const div = document.createElement("div");
  const listWrapper = document.createElement("div");

  const searchInput = document.createElement("input");
  searchInput.autocomplete = "off";
  searchInput.id = "input";

  const searchButton = document.createElement("button");
  searchButton.textContent = "Search";

  const errorMsg = document.createElement("p");
  errorMsg.textContent = state.errorMsg;

  const paginateCounter = document.createElement("p");
  paginateCounter.textContent = "- - - - -";
  if (state.datas.length !== 0 && state.isLoading === false) {
    paginateCounter.textContent = `${state.skip} - ${
      state.datas.length + state.skip
    } / ${state.total}`;
  }

  searchInput.value = state.searchInputValue;
  searchInput.oninput = function (event) {
    send({
      type: "CHANGE_INPUT",
      payload: { searchInputValue: event.target.value },
    });
  };

  const nextPage = document.createElement("button");
  nextPage.textContent = ">";

  const prevPage = document.createElement("button");
  prevPage.textContent = "<";

  nextPage.onclick = function () {
    send({ type: "NEXT_PAGE" });
  };

  prevPage.onclick = function () {
    send({ type: "PREV_PAGE" });
  };

  if (state.skip === 0 || state.isLoading === true) {
    prevPage.style.cursor = "not-allowed";
    prevPage.disabled = "true";
  } else {
    prevPage.style.cursor = "pointer";
  }

  if (
    state.limit + state.skip >= state.total ||
    state.isLoading === true ||
    state.datas.length < state.limit
  ) {
    nextPage.style.cursor = "not-allowed";
    nextPage.disabled = "true";
  } else {
    nextPage.style.cursor = "pointer";
  }

  const upWrapper = document.createElement("div");
  upWrapper.append(searchInput);
  upWrapper.append(searchButton);
  upWrapper.append(listWrapper);
  div.append(upWrapper);

  if (state.datas === null || state.isLoading === true) {
    div.append(Loader());
    searchButton.disabled = "true";
    searchInput.disabled = "true";
  }

  if (
    state.isLoading === false &&
    state.datas.length === 0 &&
    state.errorMsg === ""
  ) {
    div.append(ItemNotFound());
  }

  if (state.errorMsg !== "") {
    div.append(errorMsg);
  }

  if (state.datas !== null && state.isLoading === false) {
    state.datas.forEach((data) => {
      const li = document.createElement("p");
      li.textContent = truncate(data.title);

      listWrapper.append(li);
    });
  }

  searchButton.onclick = function () {
    send({ type: "SEARCH" });
  };

  const downWrapper = document.createElement("div");
  downWrapper.append(prevPage);
  downWrapper.append(nextPage);
  downWrapper.append(paginateCounter);

  div.append(downWrapper);

  div.style.height = "450px";
  div.style.display = "flex";
  div.style.flexDirection = "column";
  div.style.justifyContent = "space-between";

  searchButton.style.cursor = "pointer";
  prevPage.style.width = "50%";
  nextPage.style.width = "50%";

  return div;
}

function render() {
  const root = document.getElementById("root");

  const focusedElementId = document.activeElement.id;
  const focusedElementSelectionStart = document.activeElement.selectionStart;
  const focusedElementSelectionEnd = document.activeElement.selectionEnd;

  root.innerHTML = "";
  root.append(HomePage());

  root.style.maxWidth = "250px";
  root.style.margin = "0 auto";

  if (focusedElementId) {
    const focusedElement = document.getElementById(focusedElementId);
    focusedElement.focus();
    focusedElement.selectionStart = focusedElementSelectionStart;
    focusedElement.selectionEnd = focusedElementSelectionEnd;
  }
}

render();
send({ type: "FETCH" });

export { state, send };
