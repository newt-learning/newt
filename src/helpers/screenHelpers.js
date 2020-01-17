import _ from "lodash";

// Initialize shelves object for single checkbox selection, setting the passed
// checkedShelf parameter as the shelf that should be checked initially
export const initializeShelves = checkedShelf => {
  let initialShelves = [
    {
      name: "Currently Learning",
      checked: false
    },
    {
      name: "Want to Learn",
      checked: false
    },
    {
      name: "Finished Learning",
      checked: false
    }
  ];

  if (checkedShelf) {
    const checkedShelfIndex = _.findIndex(
      initialShelves,
      shelf => shelf.name === checkedShelf
    );
    initialShelves[checkedShelfIndex].checked = true;
  } else {
    // Otherwise set the 'Want to Learn' as the default checked shelf
    initialShelves[1].checked = true;
  }

  return initialShelves;
};

export const calculatePercentComplete = (amountCompleted, total) => {
  // For now, if the type or actual number doesn't make sense for the calculation,
  // return 0 or 100.
  if (typeof amountCompleted !== "number" || typeof total !== "number") {
    return 0;
  }
  if (amountCompleted < 0) {
    return 0;
  }
  if (amountCompleted > total) {
    return 100;
  }

  return _.round((amountCompleted / total) * 100);
};
