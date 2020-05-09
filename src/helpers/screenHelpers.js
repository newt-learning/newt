import _ from "lodash";

// Initialize shelves object for single checkbox selection, setting the passed
// checkedShelf parameter as the shelf that should be checked initially
export const initializeShelves = (checkedShelf) => {
  let initialShelves = [
    {
      name: "Currently Learning",
      checked: false,
    },
    {
      name: "Want to Learn",
      checked: false,
    },
    {
      name: "Finished Learning",
      checked: false,
    },
  ];

  if (checkedShelf) {
    const checkedShelfIndex = _.findIndex(
      initialShelves,
      (shelf) => shelf.name === checkedShelf
    );
    initialShelves[checkedShelfIndex].checked = true;
  } else {
    // Otherwise set the 'Want to Learn' as the default checked shelf
    initialShelves[1].checked = true;
  }

  return initialShelves;
};

// Initialize object for multi-select checkbox. Takes two parameters: allItems,
// which is all the items to be listed, and alreadySeletedItems, which are the
// items on the list to be selected by default
export const initializeMultiSelectCheckbox = (
  allItems,
  alreadySelectedItems
) => {
  let initialList = [];

  allItems.forEach((item) => {
    if (alreadySelectedItems.includes(item._id)) {
      initialList.push({ _id: item._id, name: item.name, checked: true });
    } else {
      initialList.push({ _id: item._id, name: item.name, checked: false });
    }
  });

  return initialList;
};

export const calculatePercentComplete = (amountCompleted, total) => {
  // For now, if the type or actual number doesn't make sense for the calculation,
  // return 0 or 100.
  if (typeof amountCompleted !== "number" || typeof total !== "number") {
    return 0;
  }

  return _.round((amountCompleted / total) * 100);
};

// Navigate to content screen (e.g. BookScreen) based on content type
export const handleContentNavigation = (content, navigationProp) => {
  switch (content.type) {
    case "book":
      return navigationProp.navigate("BookScreen", { bookInfo: content });
    default:
      return;
  }
};
