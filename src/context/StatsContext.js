import createDataContext from "./createDataContext";
import newtApi from "../api/newtApi";
import { getPeriodStartAndEndDates } from "../helpers/contextHelpers";

// Action constants
const REQUEST_LEARNING_UPDATES = "REQUEST_LEARNING_UPDATES";
const RESOLVE_LEARNING_UPDATES = "RESOLVE_LEARNING_UPDATES";
const SET_LEARNING_UPDATES = "SET_LEARNING_UPDATES";
const ADD_LEARNING_UPDATE = "ADD_LEARNING_UPDATE";
const SET_SUMMARY_STATS = "SET_SUMMARY_STATS";
const SET_PERIOD_STATS = "SET_PERIOD_STATS";

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
    case SET_SUMMARY_STATS:
      return { ...state, summaryStats: action.payload };
    case SET_PERIOD_STATS:
      return {
        ...state,
        periodStats: {
          ...state.periodStats,
          [action.payload.period]: action.payload.data
        }
      };
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
const setSummaryStats = payload => {
  return { type: SET_SUMMARY_STATS, payload };
};
const setPeriodStats = payload => {
  return { type: SET_PERIOD_STATS, payload };
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

// Summary stats sentence for the week displayed on main Stats screen
const fetchSummaryStats = dispatch => async () => {
  try {
    dispatch(requestLearningUpdates());

    const res = await newtApi.get("/summary-stats");
    dispatch(setSummaryStats(res.data));
    dispatch(resolveLearningUpdates());
  } catch (error) {
    console.error(error);
    dispatch(resolveLearningUpdates());
  }
};

// Fetch reading stats for a particular period (day, week, month, or year)
// Temporarily just for "week"
const fetchStatsByPeriod = dispatch => async period => {
  try {
    const { startDate, endDate } = getPeriodStartAndEndDates(period);

    if (startDate && endDate) {
      dispatch(requestLearningUpdates());
      // Make request with period, start date and end date
      const res = await newtApi.get(
        `/stats/by-${period}/${startDate}.${endDate}`
      );
      dispatch(setPeriodStats({ period, data: res.data }));
      dispatch(resolveLearningUpdates());
    }
  } catch (error) {
    dispatch(resolveLearningUpdates());
    console.error(error);
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
  {
    fetchLearningUpdates,
    fetchSummaryStats,
    fetchStatsByPeriod,
    createLearningUpdate
  },
  {
    isFetching: false,
    items: [],
    summaryStats: {},
    periodStats: { day: [], week: [], month: [], year: [] },
    errorMessage: ""
  }
);
