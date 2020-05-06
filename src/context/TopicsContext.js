import createDataContext from "./createDataContext";
import newtApi from "../api/newtApi";

// Action constants
const REQUEST_TOPICS = "REQUEST_TOPICS";
const RESOLVE_TOPICS = "RESOLVE_TOPICS";
const SET_TOPICS = "SET_TOPICS";

// Reducer
const topicsReducer = (state, action) => {
  switch (action.type) {
    case REQUEST_TOPICS:
      return { ...state, isFetching: false };
    case RESOLVE_TOPICS:
      return { ...state, isFetching: false, errorMessage: "" };
    case SET_TOPICS:
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

// Actions
const requestTopics = () => {
  return { type: REQUEST_TOPICS };
};
const resolveTopics = () => {
  return { type: RESOLVE_TOPICS };
};
const setTopics = (payload) => {
  return { type: SET_TOPICS, payload };
};

// Dispatch functions
const fetchTopics = (dispatch) => async () => {
  try {
    dispatch(requestTopics());

    const res = await newtApi.get("/topics");
    dispatch(setTopics(res.data));
    dispatch(resolveTopics());
  } catch (error) {
    console.error(error);
  }
};

export const { Provider, Context } = createDataContext(
  topicsReducer,
  {
    fetchTopics,
  },
  {
    isFetching: false,
    items: [],
    errorMessage: "",
  }
);
