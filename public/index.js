import App from "./App.js";

export let state = {
  path: window.location.pathname,
};

export function setState(newState) {
  const prevState = { ...state };
  const nextState = { ...state, ...newState };
  state = nextState;
  render();
  onStateChange(prevState, nextState);
}

export function onStateChange(prevState, nextState) {
  if (prevState.path !== nextState.path) {
    history.pushState(null, "", nextState.path);
  }
}

export function render() {
  const root = document.getElementById("root");
  root.innerHTML = "";
  root.appendChild(App());
}

render();
