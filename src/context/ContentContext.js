import createDataContext from "./createDataContext";
import newtApi from "../api/newtApi";

// Action constants
const REQUEST_CONTENT = "REQUEST_CONTENT";
const RESOLVE_CONTENT = "RESOLVE_CONTENT";
const SET_CONTENT = "SET_CONTENT";

const contentReducer = (state, action) => {
  switch (action.type) {
    case REQUEST_CONTENT:
      return { ...state, isFetching: true };
    default:
      return state;
  }
};

// Actions
const requestContent = () => {
  return { type: REQUEST_CONTENT };
};
const resolveSignIn = () => {
  return { type: RESOLVE_CONTENT };
};
const setContent = payload => {
  return { type: SET_CONTENT, payload };
};

// Dispatch functions
const addContent = dispatch => async data => {
  console.log(data);
};

export const { Provider, Context } = createDataContext(
  contentReducer,
  { addContent },
  { isFetching: false, items: {}, errorMessage: "" }
);
