import _ from "lodash";

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
