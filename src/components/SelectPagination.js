import { state, dispatch } from "../index.js";

function selectPagination() {
  const div = document.createElement("div");

  const select = document.createElement("select");
  select.id = "value";

  const defaultOption = document.createElement("option");
  defaultOption.textContent = state.products.length === 0 ? 0 : state.limit;
  defaultOption.value = 10;
  defaultOption.selected = "true";
  defaultOption.disabled = "true";
  defaultOption.hidden = "true";

  const option1 = document.createElement("option");
  option1.textContent = "5";
  option1.value = 5;
  if (state.total <= 5) {
    option1.disabled = "true";
    option1.hidden = "true";
  }

  const option2 = document.createElement("option");
  option2.textContent = "10";
  option2.value = 10;
  if (state.total <= 10) {
    option2.disabled = "true";
    option2.hidden = "true";
  }

  const option3 = document.createElement("option");
  option3.textContent = "20";
  option3.value = 20;
  if (state.total <= 20) {
    option3.disabled = "true";
    option3.hidden = "true";
  }

  const option4 = document.createElement("option");
  option4.textContent = "50";
  option4.value = 50;
  if (state.total <= 50) {
    option4.disabled = "true";
    option4.hidden = "true";
  }

  select.onclick = function () {
    dispatch({
      type: "CHANGE_PAGE_SIZE",
      payload: { limit: parseInt(select.value) },
    });
  };

  select.append(defaultOption);
  select.append(option1);
  select.append(option2);
  select.append(option3);
  select.append(option4);

  div.append(select);

  return div;
}

export default selectPagination;
