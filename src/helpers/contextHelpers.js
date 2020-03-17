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
  // Initialize start and end date variables
  let startDate, endDate;
  // String to show date format required (used server-side)
  const dateFormatStr = "YYYY-MM-DD";
  // Current date
  const today = moment().utc();

  // If the period is "week", then get the start of the week (previous Sunday if it's some)
  // other day of the week), and end of the week (coming Saturday)
  if (period === "week") {
    // Get the day-of-the-week number (Sun = 0 ... Sat = 6). Cloning because original moment object is mutable
    const todayDayOfWeek = today.clone().day();
    // Subtract day-of-the-week-number days from today to get start of week
    startDate = today.clone().subtract(todayDayOfWeek, "days");
    // Add 6 days to start of the week to get end of the week
    endDate = startDate.clone().add("6", "days");
    // Format dates
    startDate = startDate.format(dateFormatStr);
    endDate = endDate.format(dateFormatStr);
  }

  return { startDate, endDate };
};
