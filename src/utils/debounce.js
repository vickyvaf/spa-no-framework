import { state } from "../index.js";

export function debounce(func, delay) {
  if (state.searchInputValue !== "") clearTimeout(state.searchInputValue);

  return setTimeout(() => {
    func();
  }, delay);
}
