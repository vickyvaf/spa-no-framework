import { Link, Navbar } from "./components/Navbar.js";

export let state = {
  inputValue: localStorage.getItem("inputValue") ?? "",
  hash: location.hash,
};

export function setState(newState) {
  const prevState = { ...state };
  const nextState = { ...state, ...newState };
  state = nextState;
  render();
  onStateChange(prevState, nextState);
}

export function onStateChange(prevState, nextState) {
  if (prevState.inputValue !== nextState.inputValue) {
    localStorage.setItem("inputValue", nextState.inputValue);
  }

  if (prevState.hash !== nextState.hash) {
    history.pushState(null, "", nextState.hash)
  }
}

export function HomePage() {
  const navbar = Navbar();

  const input = document.createElement("input");
  input.id = "input";
  input.placeholder = "Type...";
  input.value = state.inputValue;
  input.oninput = function (event) {
    setState({ inputValue: event.target.value });
  };

  const buttonClear = document.createElement("button");
  buttonClear.textContent = "Clear";
  buttonClear.onclick = function (event) {
    setState({ inputValue: "" });
  };

  const textPreview = document.createElement("p");
  textPreview.textContent = state.inputValue;

  const div = document.createElement("div");
  div.append(navbar);
  div.append(input);
  div.append(buttonClear);
  div.append(textPreview);

  return div;
}

export function AboutPage() {
  const navbar = Link({
    href: "#home",
    label: "Kembali ke Home",
  });

  const textPreview = document.createElement("p");
  textPreview.textContent = "Welcome to About";

  const div = document.createElement("div");
  div.append(navbar);
  div.append(textPreview);

  return div;
}

export function App() {
  const homePage = HomePage();
  const aboutPage = AboutPage();

  if (state.hash === "#home") {
    return homePage;
  } else if (state.hash === "#about") {
    return aboutPage;
  } else {
    return homePage;
  }
}

export function render() {
  const root = document.getElementById("root");
  const app = App();

  const focusedElementId = document.activeElement.id;
  const focusedElementSelectionStart = document.activeElement.selectionStart;
  const focusedElementSelectionEnd = document.activeElement.selectionEnd;

  root.innerHTML = "";
  root.append(App());

  if (focusedElementId) {
    const focusedElement = document.getElementById(focusedElementId);
    focusedElement.focus();
    focusedElement.selectionStart = focusedElementSelectionStart;
    focusedElement.selectionEnd = focusedElementSelectionEnd;
  }
}

render();
