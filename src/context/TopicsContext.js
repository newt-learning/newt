import createDataContext from "./createDataContext";
import newtApi from "../api/newtApi";
import { updateObjectInArrayById } from "../helpers/contextHelpers";

// Action constants
const REQUEST_TOPICS = "REQUEST_TOPICS";
const RESOLVE_TOPICS = "RESOLVE_TOPICS";
const SET_TOPICS = "SET_TOPICS";
const ADD_INDIVIDUAL_TOPIC = "ADD_INDIVIDUAL_TOPIC";
const UPDATE_INDIVIDUAL_TOPIC = "UPDATE_INDIVIDUAL_TOPIC";

// Reducer
const topicsReducer = (state, action) => {
  switch (action.type) {
    case REQUEST_TOPICS:
      return { ...state, isFetching: true };
    case RESOLVE_TOPICS:
      return { ...state, isFetching: false, errorMessage: "" };
    case SET_TOPICS:
      return { ...state, items: action.payload };
    case ADD_INDIVIDUAL_TOPIC:
      return { ...state, items: [...state.items, action.payload] };
    case UPDATE_INDIVIDUAL_TOPIC:
      return {
        ...state,
        items: updateObjectInArrayById(state.items, action.payload),
      };
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

const createTopic = (dispatch) => async (data) => {
  try {
    dispatch(requestTopics());

    const res = await newtApi.post("/topics/create", data);
    dispatch({ type: ADD_INDIVIDUAL_TOPIC, payload: res.data });
    dispatch(resolveTopics());
  } catch (error) {
    console.log(error);
  }
};

const updateTopic = (dispatch) => async (topicId, data) => {
  try {
    dispatch(requestTopics());
    const res = await newtApi.put(`/topics/${topicId}/update`, data);
    dispatch({ type: UPDATE_INDIVIDUAL_TOPIC, payload: res.data });
    dispatch(resolveTopics());
  } catch (error) {
    console.log(error);
  }
};

// Add content (contentId) to multiple topics
const addContentToTopics = (dispatch) => async (data) => {
  try {
    dispatch(requestTopics());
    const res = await newtApi.put("/topics/add-content", data);
    dispatch(resolveTopics());
  } catch (error) {
    console.log(error);
  }
};

// Remove content (contentId) from multiple topics
const removeContentTopics = (dispatch) => async (data) => {
  try {
    dispatch(requestTopics());
    const res = await newtApi.put("/topics/remove-content", data);
    dispatch(resolveTopics());
  } catch (error) {
    console.log(error);
  }
};

const deleteTopic = (dispatch) => async (topicId) => {
  try {
    dispatch(resolveTopics());
    await newtApi.delete(`/topics/${topicId}`);
    dispatch(resolveTopics());
  } catch (error) {
    console.log(error);
  }
};

export const { Provider, Context } = createDataContext(
  topicsReducer,
  {
    fetchTopics,
    createTopic,
    updateTopic,
    addContentToTopics,
    removeContentTopics,
    deleteTopic,
  },
  {
    isFetching: false,
    items: [],
    errorMessage: "",
  }
);
