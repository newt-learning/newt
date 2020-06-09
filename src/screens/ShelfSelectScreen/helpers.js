export const figureOutShelfMovingDataChanges = (
  currentShelf,
  newShelf,
  bookInfo
) => {
  // If moving from Currently Learning...
  if (currentShelf === "Currently Learning") {
    // ...to Want to Learn, remove the last date in the dateStarted array
    if (newShelf === "Want to Learn") {
      return {
        shelf: newShelf,
        dateStarted: bookInfo.dateStarted.slice(0, -1),
      };
    }
  }

  // If moving from Want to Learn...
  if (currentShelf === "Want to Learn") {
    // ...to Currently Learning, add current date to dateStarted array
    if (newShelf === "Currently Learning") {
      return {
        shelf: newShelf,
        dateStarted: [...bookInfo.dateStarted, Date.now()],
      };
    }
  }
};
