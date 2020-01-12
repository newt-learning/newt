import createDataContext from "./createDataContext";
import newtApi from "../api/newtApi";
import { navigateBack } from "../refs/navigationRef";
import { updateObjectInArrayById } from "../helpers/contextHelpers";

// Action constants
const REQUEST_CONTENT = "REQUEST_CONTENT";
const RESOLVE_CONTENT = "RESOLVE_CONTENT";
const SET_CONTENT = "SET_CONTENT";
const ADD_INDIVIDUAL_CONTENT = "ADD_INDIVIDUAL_CONTENT";
const UPDATE_INDIVIDUAL_CONTENT = "UPDATE_INDIVIDUAL_CONTENT";
const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";

const contentReducer = (state, action) => {
  switch (action.type) {
    case REQUEST_CONTENT:
      return { ...state, isFetching: true };
    case RESOLVE_CONTENT:
      return { ...state, isFetching: false, errorMessage: "" };
    case SET_CONTENT:
      return {
        ...state,
        items: action.payload
      };
    case ADD_INDIVIDUAL_CONTENT:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case UPDATE_INDIVIDUAL_CONTENT:
      return {
        ...state,
        items: updateObjectInArrayById(state.items, action.payload)
      };
    case SET_ERROR_MESSAGE:
      return { ...state, isFetching: false, errorMessage: action.payload };
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
const addIndividualContent = payload => {
  return { type: ADD_INDIVIDUAL_CONTENT, payload };
};
const updateIndividualContent = payload => {
  return { type: UPDATE_INDIVIDUAL_CONTENT, payload };
};
const setErrorMessage = payload => {
  return { type: SET_ERROR_MESSAGE, payload };
};

// Dispatch functions
const fetchContent = dispatch => async () => {
  try {
    dispatch(requestContent());

    const res = await newtApi.get("/content");
    dispatch(setContent(res.data));
    dispatch(resolveContent());
  } catch (error) {
    dispatch(
      setErrorMessage("Sorry, we're having some trouble getting your data.")
    );
  }
};

const addContent = dispatch => async data => {
  try {
    // Indicate request is going to take place
    dispatch(requestContent());

    // Make request to create content
    const res = await newtApi.post("/content/create", data);
    // Update state
    dispatch(addIndividualContent(res.data));
    dispatch(resolveContent());
    // Navigate to prev screen (from Add To My Library to Book Screen)
    navigateBack();
  } catch (error) {
    console.error(error);
    dispatch(resolveContent());
  }
};

const updateContent = dispatch => async (contentId, data) => {
  try {
    // Indicate request is going to take place
    dispatch(requestContent());

    // Make request to update content
    const res = await newtApi.put(`/content/${contentId}/update`, data);
    // Update state
    dispatch(updateIndividualContent(res.data));
    dispatch(resolveContent());
    // Navigate to prev screen (from Add To My Library to Book Screen)
    navigateBack();
  } catch (error) {
    console.error(error);
    dispatch(resolveContent());
  }
};

export const { Provider, Context } = createDataContext(
  contentReducer,
  { fetchContent, addContent, updateContent },
  { isFetching: false, items: [], errorMessage: "" }
);
