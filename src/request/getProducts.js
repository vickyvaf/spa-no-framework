import { state, dispatch } from "../index.js";

const baseUrl = "https://dummyjson.com/products/search?q=";

function getProducts() {
  fetch(
    `${baseUrl}${state.searchInputValue}&limit=${state.limit}&skip=${state.skip}`
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.products.length === 0) {
        dispatch({ type: "FETCH_EMPTY" });
      } else {
        dispatch({ type: "FETCH_SUCCESS", payload: { products: res.products, total: res.total } });
      }
    })
    .catch((err) =>
      dispatch({
        type: "FETCH_ERROR",
        payload: { errorMsg: err.message },
      })
    );
}

export { getProducts };
