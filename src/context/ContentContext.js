import createDataContext from "./createDataContext";
import newtApi from "../api/newtApi";
import { navigateBack } from "../refs/navigationRef";

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
const resolveContent = () => {
  return { type: RESOLVE_CONTENT };
};
const setContent = payload => {
  return { type: SET_CONTENT, payload };
};

// Dispatch functions
const addContent = dispatch => async data => {
  try {
    // Indicate request is going to take place
    dispatch(requestContent());

    // Make request to create content
    const res = await newtApi.post("/content/create", data);
    // Set received data to state
    dispatch(setContent(res.data));
    // Navigate to prev screen (from Add To My Library to Book Screen)
    navigateBack();
  } catch (error) {
    console.error(error);
    dispatch(resolveContent());
  }
};

export const { Provider, Context } = createDataContext(
  contentReducer,
  { addContent },
  { isFetching: false, items: {}, errorMessage: "" }
);
