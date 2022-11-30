import { Loader } from "./utils/Loader.js";
import { ItemNotFound } from "./utils/ItemNotFound.js";

const baseUrl = "https://dummyjson.com/products/search?q="

let state = {
  datas: [],
  searchInputValue: "",
  isLoading: true,
  isSearch: false,
  isError: null,
};

function setState(newState) {
  const prevState = { ...state };
  const nextState = { ...state, ...newState };
  state = nextState;

  render();
  onStateChange(prevState, nextState);
}

function fetchDatas() {
  fetch(`${baseUrl}${state.searchInputValue}`)
    .then((res) => res.json())
    .then((res) => setState({ datas: res.products, isLoading: false, isSearch: false, searchInputValue: "" }))
    .catch((err) => setState({ isError: err }))
}

fetchDatas();

function onStateChange(prevState, nextState) {
  if (nextState.isSearch === true) {
    fetchDatas();
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
  errorMsg.textContent = state.isError;

  searchInput.value = state.searchInputValue;
  searchInput.oninput = function (event) {
    setState({ searchInputValue: event.target.value });
  };

  div.append(searchInput);
  div.append(searchButton);

  if (state.isLoading === true) {
    div.append(Loader());
    searchButton.disabled = "true";
    searchInput.disabled = "true";
  }

  if (
    state.isLoading === false &&
    state.datas.length === 0 &&
    state.isError === null
  ) {
    div.append(ItemNotFound());
  }

  if (state.isError !== null) {
    div.append(errorMsg);
  }

  if (state.datas !== null && state.isLoading === false) {
    state.datas.forEach((data) => {
      const li = document.createElement("p");
      li.textContent = data.title;

      listWrapper.append(li);
    });
  }

  searchButton.onclick = function () {
    setState({ isSearch: true, isLoading: true });
  };

  div.append(listWrapper);

  searchButton.style.cursor = "pointer";

  return div;
}

function render() {
  const root = document.getElementById("root");

  const focusedElementId = document.activeElement.id;
  const focusedElementSelectionStart = document.activeElement.selectionStart;
  const focusedElementSelectionEnd = document.activeElement.selectionEnd;

  root.innerHTML = "";
  root.append(HomePage());

  root.style.maxWidth = "fit-content";
  root.style.margin = "0 auto";

  if (focusedElementId) {
    const focusedElement = document.getElementById(focusedElementId);
    focusedElement.focus();
    focusedElement.selectionStart = focusedElementSelectionStart;
    focusedElement.selectionEnd = focusedElementSelectionEnd;
  }
}

render();
