import createDataContext from "./createDataContext";

const contentReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const { Provider, Context } = createDataContext(
  contentReducer,
  {},
  { isFetching: false, items: {}, errorMessage: "" }
);
