import { state, send } from "../index.js";

const baseUrl = "https://dummyjson.com/products/search?q=";

function getProducts() {
  fetch(
    `${baseUrl}${state.searchInputValue}&limit=${state.limit}&skip=${state.skip}`
  )
    .then((res) => res.json())
    .then((res) =>
      send({
        type: "FETCH_SUCCESS",
        payload: { datas: res.products, total: res.total },
      })
    )
    .catch((err) =>
      send({
        type: "FETCH_ERROR",
        payload: { errorMsg: err.message },
      })
    );
}

export { getProducts };
