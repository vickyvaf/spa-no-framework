import { Loader } from "./utils/Loader.js";
import { ItemNotFound } from "./utils/ItemNotFound.js";

const baseUrl = "https://dummyjson.com/products/search?q="
const paginateUrl = "https://dummyjson.com/products?limit="

let state = {
  datas: [],
  searchInputValue: "",
  isLoading: true,
  isSearch: null,
  isError: null,
  // 
  limit: 10,
  skip: 0,
  total: null,
  isPaginate: true,
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
    .then((res) => {
      setState({
        datas: res.products,
        isPaginate: false,
        searchInputValue: "",
        isLoading: false,
        isSearch: false
      })
    })
    .catch((err) => setState({ isError: err }))
}

function paginate() {
  fetch(`${paginateUrl}${state.limit}&skip=${state.skip}`)
    .then((res) => res.json())
    .then((res) => {
      setState({
        datas: res.products,
        total: res.total,
        isPaginate: false,
        searchInputValue: "",
        isLoading: false,
        isSearch: false,
      })
    })
    .catch((err) => setState({ isError: err }))
}

paginate()

function truncate(text) {
  if (text.length > 25) {
    return text.slice(0, 25) + "..."
  }
  return text
}

function onStateChange(prevState, nextState) {
  if (nextState.isPaginate === true || nextState.isSearch === true && nextState.searchInputValue === "") {
    paginate()
  }
  if (nextState.isSearch === true && nextState.searchInputValue !== "") {
    fetchDatas()
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

  const paginateCounter = document.createElement("p")
  if (state.datas.length !== 0) {
    paginateCounter.textContent = `${state.skip} - ${state.skip + state.limit} / ${state.total}`
  }
  if (state.datas.length < state.limit) {
    paginateCounter.textContent = `0 - ${state.datas.length} / ${state.datas.length}`
  }

  searchInput.value = state.searchInputValue;
  searchInput.oninput = function (event) {
    setState({ searchInputValue: event.target.value });
  };

  const nextPage = document.createElement("button")
  nextPage.textContent = ">"

  const prevPage = document.createElement("button")
  prevPage.textContent = "<"

  nextPage.onclick = function () {
    setState({ skip: state.skip += 10, isPaginate: true, isLoading: true })
  }

  prevPage.onclick = function () {
    setState({ skip: state.skip -= 10, isPaginate: true, isLoading: true })
  }

  if (state.skip === 0 || state.isLoading === true || state.datas.length < state.limit) {
    prevPage.style.cursor = "not-allowed"
    prevPage.disabled = "true"
  } else {
    prevPage.style.cursor = "pointer"
  }

  if (state.limit + state.skip >= state.total || state.isLoading === true || state.datas.length < state.limit) {
    nextPage.style.cursor = "not-allowed"
    nextPage.disabled = "true"
  } else {
    nextPage.style.cursor = "pointer"
  }

  const upWrapper = document.createElement("div")
  upWrapper.append(searchInput);
  upWrapper.append(searchButton);
  upWrapper.append(listWrapper)
  div.append(upWrapper)

  if (state.datas === null || state.isLoading === true) {
    div.append(Loader());
    searchButton.disabled = "true";
    searchInput.disabled = "true";
  }

  if (state.isLoading === false && state.datas.length === 0 && state.isError === null) {
    div.append(ItemNotFound());
  }

  if (state.isError !== null) {
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
    setState({ isSearch: true, isLoading: true, isPaginate: false });
  };

  const downWrapper = document.createElement("div")
  downWrapper.append(prevPage)
  downWrapper.append(nextPage)
  downWrapper.append(paginateCounter)

  div.append(downWrapper)

  div.style.height = "450px"
  div.style.display = "flex"
  div.style.flexDirection = "column"
  div.style.justifyContent = "space-between"

  searchButton.style.cursor = "pointer";
  prevPage.style.width = "50%"
  nextPage.style.width = "50%"

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