import { state, setState } from "../../index.js";

export function reducer(prevState, action) {
  switch (action.type) {
    case "FETCH": {
      return {
        ...prevState,
        isLoading: true,
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
        isLoading: true,
        skip: 0,
        total: 0,
      };
    }
    case "FETCH_SUCCESS": {
      return {
        isLoading: false,
        datas: action.payload.datas,
        total: action.payload.total,
      };
    }
    case "FETCH_ERROR": {
      return {
        errorMsg: action.payload.errorMsg,
      };
    }
    case "NEXT_PAGE": {
      return {
        ...prevState,
        isLoading: true,
        skip: (state.skip += 10),
      };
    }
    case "PREV_PAGE": {
      return {
        ...prevState,
        isLoading: true,
        skip: (state.skip -= 10),
      };
    }
    default: {
      return prevState;
    }
  }
}