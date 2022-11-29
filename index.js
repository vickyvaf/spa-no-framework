let state = {
  datas: [],
  searchInputValue: "",
  isLoading: true,
};

function setState(newState) {
  const prevState = { ...state };
  const nextState = { ...state, ...newState };
  state = nextState;

  render();
  onStateChange(prevState, nextState);
}

function onStateChange(prevState, nextState) {
  if (prevState.searchInputValue !== nextState.searchInputValue) {
    searchProducts();
  }
}

async function fetchDatas() {
  await fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((res) => setState({ datas: res.products }))
    .catch()
    .finally(() => setState({ isLoading: false }));
}
fetchDatas();

async function searchProducts() {
  await fetch(
    `https://dummyjson.com/products/search?q=${state.searchInputValue}`
  )
    .then((res) => res.json())
    .then((res) => setState({ datas: res.products }))
    .catch()
    .finally(() => setState({ isLoading: false }));
}

function Loader() {
  const loading = document.createElement("p");
  loading.textContent = "Loading...";

  return loading;
}

function HomePage() {
  const div = document.createElement("div");
  const listWrapper = document.createElement("div");

  const searchInput = document.createElement("input");
  searchInput.id = "input";

  const searchButton = document.createElement("button");
  searchButton.textContent = "Search";

  const none = document.createElement("p");
  none.textContent = "Item not found";

  searchInput.value = state.searchInputValue;
  searchInput.oninput = function (event) {
    // realtime search
    // setState({ searchInputValue: event.target.value });

    // search button clicked
    state.searchInputValue = event.target.value;
  };

  div.append(searchInput);
  div.append(searchButton);

  if (state.isLoading === true) {
    div.append(Loader());
  }

  if (state.isLoading === false && state.datas.length === 0) {
    div.append(none);
  }

  if (state.isLoading === false) {
    state.datas.forEach((data, i) => {
      const li = document.createElement("p");
      li.textContent = data.title;

      listWrapper.append(li);
    });
  }

  searchButton.onclick = function () {
    setState({ isLoading: true });

    searchProducts();
  };

  div.append(listWrapper);

  return div;
}

function render() {
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
