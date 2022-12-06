import { state } from "../../index.js";

export function reducer(prevState, action) {
  switch (state.tag) {
    case "idle": {
      switch (action.type) {
        case "FETCH": {
          return {
            ...prevState,
            tag: "loading",
          };
        }
        default: {
          return prevState;
        }
      }
    }
    case "loading": {
      switch (action.type) {
        case "FETCH_SUCCESS": {
          return {
            ...prevState,
            tag: "loaded",
            products: action.payload.products,
            total: action.payload.total,
            errorMsg: "",
          };
        }
        case "FETCH_EMPTY": {
          return {
            ...prevState,
            tag: "empty",
            products: [],
            errorMsg: "",
          };
        }
        case "FETCH_ERROR": {
          return {
            ...prevState,
            tag: "error",
            products: [],
            errorMsg: action.payload.errorMsg,
          };
        }
        default: {
          return prevState;
        }
      }
    }
    case "loaded": {
      switch (action.type) {
        case "FETCH": {
          return {
            ...prevState,
            tag: "loading",
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
            ...prevState,
            tag: "loading",
            skip: 0,
            total: 0,
          };
        }
        case "NEXT_PAGE": {
          return {
            ...prevState,
            tag: "loading",
            skip: parseInt((state.skip += state.limit)),
          };
        }
        case "PREV_PAGE": {
          return {
            ...prevState,
            tag: "loading",
            skip: parseInt((state.skip -= state.limit)),
          };
        }
        case "PAGINATION": {
          return {
            ...prevState,
            tag: "loading",
            limit: parseInt(action.payload.limit),
          };
        }
      }
    }
    case "empty": {
      switch (action.type) {
        case "FETCH": {
          return {
            ...prevState,
            tag: "loading",
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
            ...prevState,
            tag: "loading",
            skip: 0,
            total: 0,
          };
        }
        case "NEXT_PAGE": {
          return {
            ...prevState,
            tag: "loading",
            skip: parseInt((state.skip += state.limit)),
          };
        }
        case "PREV_PAGE": {
          return {
            ...prevState,
            tag: "loading",
            skip: parseInt((state.skip -= state.limit)),
          };
        }
        case "PAGINATION": {
          return {
            ...prevState,
            tag: "loading",
            limit: parseInt(action.payload.limit),
          };
        }
      }
    }
    case "error": {
      switch (action.type) {
        case "FETCH": {
          return {
            ...prevState,
            tag: "loading",
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
            ...prevState,
            tag: "loading",
            skip: 0,
            total: 0,
          };
        }
        case "NEXT_PAGE": {
          return {
            ...prevState,
            tag: "loading",
            skip: parseInt((state.skip += state.limit)),
          };
        }
        case "PREV_PAGE": {
          return {
            ...prevState,
            tag: "loading",
            skip: parseInt((state.skip -= state.limit)),
          };
        }
        case "PAGINATION": {
          return {
            ...prevState,
            tag: "loading",
            limit: parseInt(action.payload.limit),
          };
        }
      }
    }
    default: {
      return prevState;
    }
  }
}
