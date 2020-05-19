import _ from "lodash";
import createDataContext from "./createDataContext";
import newtApi from "../api/newtApi";
import {
  updateObjectInArrayById,
  addIfDoesNotExist,
  deleteObjectFromArray,
} from "../helpers/contextHelpers";
import displayErrorAlert from "../components/shared/displayErrorAlert";

// Action constants
const REQUEST_CONTENT = "REQUEST_CONTENT";
const RESOLVE_CONTENT = "RESOLVE_CONTENT";
const SET_CONTENT = "SET_CONTENT";
const ADD_INDIVIDUAL_CONTENT = "ADD_INDIVIDUAL_CONTENT";
const ADD_CONTENT_IF_DOES_NOT_EXIST = "ADD_CONTENT_IF_DOES_NOT_EXIST";
const UPDATE_INDIVIDUAL_CONTENT = "UPDATE_INDIVIDUAL_CONTENT";
const DELETE_CONTENT = "DELETE_CONTENT";
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
        items: action.payload,
      };
    case ADD_INDIVIDUAL_CONTENT:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case ADD_CONTENT_IF_DOES_NOT_EXIST:
      return {
        ...state,
        items: addIfDoesNotExist(state.items, action.payload),
      };
    case UPDATE_INDIVIDUAL_CONTENT:
      return {
        ...state,
        items: updateObjectInArrayById(state.items, action.payload),
      };
    case DELETE_CONTENT:
      return {
        ...state,
        items: deleteObjectFromArray(state.items, action.payload),
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
const setContent = (payload) => {
  return { type: SET_CONTENT, payload };
};
const addIndividualContent = (payload) => {
  return { type: ADD_INDIVIDUAL_CONTENT, payload };
};
const addContentIfDoesNotExist = (payload) => {
  return { type: ADD_CONTENT_IF_DOES_NOT_EXIST, payload };
};
const updateIndividualContent = (payload) => {
  return { type: UPDATE_INDIVIDUAL_CONTENT, payload };
};
const deleteIndividualContent = (payload) => {
  return { type: DELETE_CONTENT, payload };
};
const setErrorMessage = (payload) => {
  return { type: SET_ERROR_MESSAGE, payload };
};

// Dispatch functions
const fetchContent = (dispatch) => async () => {
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

const checkIfBookExistsInLibrary = (dispatch) => async (googleBookId) => {
  try {
    dispatch(requestContent());
    const res = await newtApi.get(`/content/check-book/${googleBookId}`);

    dispatch(addContentIfDoesNotExist(res.data));
    dispatch(resolveContent());

    // Whether the book exists in the user's library or not
    return !_.isEmpty(res.data);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    dispatch(resolveContent());

    // If there's an error in checking, return false for now (not there in
    // library) as the safe option. The API call is not user-requested (as in
    // it's an internal check), so a error Alert might be a confusing UX.
    return false;
  }
};

const addContent = (dispatch) => async (data, returnData = false) => {
  try {
    // Indicate request is going to take place
    dispatch(requestContent());

    // Make request to create content
    const res = await newtApi.post("/content/create", data);
    // Update state
    dispatch(addIndividualContent(res.data));
    dispatch(resolveContent());

    // This extra bit is so when a user adds a book to their library, the data
    // can be then passed as a param to BookScreen in order to change the Shelf
    // button from 'Add to Library' to whatever shelf they chose.
    if (returnData) {
      return res.data;
    }
  } catch (error) {
    // Show error Alert
    displayErrorAlert(
      `Sorry, an error occurred while trying to add the ${data.type}.`
    );
    dispatch(resolveContent());

    if (returnData) {
      return null;
    }
  }
};

const updateContent = (dispatch) => async (contentId, data) => {
  try {
    // Indicate request is going to take place
    dispatch(requestContent());

    // Make request to update content
    const res = await newtApi.put(`/content/${contentId}/update`, data);
    // Update state
    dispatch(updateIndividualContent(res.data));
    dispatch(resolveContent());
  } catch (error) {
    // Show error Alert
    displayErrorAlert(
      "Sorry, an error occurred while trying to update your book."
    );
    dispatch(resolveContent());
  }
};

const updateBookProgress = (dispatch) => async (contentId, pagesRead) => {
  try {
    dispatch(requestContent());

    const res = await newtApi.put(`/content/${contentId}/book-progress`, {
      pagesRead,
    });

    dispatch(updateIndividualContent(res.data));
    dispatch(resolveContent());
  } catch (error) {
    // Show error Alert
    displayErrorAlert(
      "Sorry, an error occurred while trying to update your book."
    );
    dispatch(resolveContent());
  }
};

const deleteContent = (dispatch) => async (contentId) => {
  try {
    dispatch(requestContent());

    await newtApi.delete(`/content/${contentId}`);

    dispatch(deleteIndividualContent(contentId));
    dispatch(resolveContent());

    // Return false to not show error Alert
    return false;
  } catch (e) {
    // Show Alert saying that an error has occurred. No dispatch bec no other
    // on-screen UI needs to be changed.
    displayErrorAlert(
      "Sorry, an error occurred while trying to delete your book."
    );
    // End fetching started by requestContent() in try block
    dispatch(resolveContent());
  }
};

export const { Provider, Context } = createDataContext(
  contentReducer,
  {
    fetchContent,
    checkIfBookExistsInLibrary,
    addContent,
    updateContent,
    updateBookProgress,
    deleteContent,
  },
  {
    isFetching: false,
    items: [],
    errorMessage: "",
  }
);
