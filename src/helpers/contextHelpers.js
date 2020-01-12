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
