import _ from "lodash";
import moment from "moment";

export const updateObjectInArrayById = (array, newObject) => {
  return array.map((item, index) => {
    // If item in array has same id as new object, return new object.
    if (item._id === newObject._id) {
      return newObject;
    }

    // Otherwise return same item
    return item;
  });
};

export const addIfDoesNotExist = (array, data) => {
  if (_.isEmpty(data)) {
    return array;
  }

  const result = _.find(array, { _id: data[0]._id });

  if (!result) {
    return [...array, data[0]];
  }

  return array;
};

export const deleteObjectFromArray = (array, itemId) => {
  return _.filter(array, ({ _id }) => itemId !== _id);
};

// Used in fetching learning stats by period in Stats Context. Returns the start date and end
// date for a given period (day, week, month, year)
export const getPeriodStartAndEndDates = period => {
  // String to show date format required
  const dateFormatStr = "YYYY-MM-DD";

  const startDate = moment()
    .startOf(period)
    .format(dateFormatStr);
  const endDate = moment()
    .endOf(period)
    .format(dateFormatStr);

  return { startDate, endDate };
};
