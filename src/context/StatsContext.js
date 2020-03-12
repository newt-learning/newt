import createDataContext from "./createDataContext";
import newtApi from "../api/newtApi";

// Action constants
const REQUEST_LEARNING_UPDATES = "REQUEST_LEARNING_UPDATES";
const RESOLVE_LEARNING_UPDATES = "RESOLVE_LEARNING_UPDATES";
const SET_LEARNING_UPDATES = "SET_LEARNING_UPDATES";
const ADD_LEARNING_UPDATE = "ADD_LEARNING_UPDATE";

// Reducer
const statsReducer = (state, action) => {
  switch (action.type) {
    case REQUEST_LEARNING_UPDATES:
      return { ...state, isFetching: true };
    case RESOLVE_LEARNING_UPDATES:
      return { ...state, isFetching: false, errorMessage: "" };
    case SET_LEARNING_UPDATES:
      return { ...state, items: action.payload };
    case ADD_LEARNING_UPDATE:
      return { ...state, items: [...state.items, action.payload] };
    default:
      return state;
  }
};

// Actions
const requestLearningUpdates = () => {
  return { type: REQUEST_LEARNING_UPDATES };
};
const resolveLearningUpdates = () => {
  return { type: RESOLVE_LEARNING_UPDATES };
};
const setLearningUpdates = payload => {
  return { type: SET_LEARNING_UPDATES, payload };
};
const addLearningUpdate = payload => {
  return { type: ADD_LEARNING_UPDATE, payload };
};

// Dispatch functions
const fetchLearningUpdates = dispatch => async () => {
  try {
    dispatch(requestLearningUpdates());

    const res = await newtApi.get("/learning-updates");
    dispatch(setLearningUpdates(res.data));
    dispatch(resolveLearningUpdates());
  } catch (error) {
    console.error(error);
    dispatch(resolveLearningUpdates());
  }
};

const createLearningUpdate = dispatch => async data => {
  try {
    dispatch(requestLearningUpdates());

    const res = await newtApi.post("/learning-updates/create", data);
    // Update state
    dispatch(addLearningUpdate(res.data));
    dispatch(resolveLearningUpdates());
  } catch (error) {
    console.error(error);
    dispatch(resolveLearningUpdates());
  }
};

export const { Provider, Context } = createDataContext(
  statsReducer,
  { fetchLearningUpdates, createLearningUpdate },
  { isFetching: false, items: [], errorMessage: "" }
);
