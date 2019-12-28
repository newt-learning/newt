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
    case RESOLVE_CONTENT:
      return { ...state, isFetching: false };
    case SET_CONTENT:
      return { ...state, isFetching: false, items: action.payload };
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
const fetchContent = dispatch => async () => {
  try {
    dispatch(requestContent());

    const res = await newtApi.get("/content");
    dispatch(setContent(res.data));
  } catch (error) {
    console.error(error);
    dispatch(resolveContent());
  }
};

const addContent = dispatch => async data => {
  try {
    // Indicate request is going to take place
    dispatch(requestContent());

    // Make request to create content
    await newtApi.post("/content/create", data);
    // Navigate to prev screen (from Add To My Library to Book Screen)
    navigateBack();
  } catch (error) {
    console.error(error);
    dispatch(resolveContent());
  }
};

export const { Provider, Context } = createDataContext(
  contentReducer,
  { fetchContent, addContent },
  { isFetching: false, items: [], errorMessage: "" }
);
