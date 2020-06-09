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
      // ... to Finished Learning, set date completed as now
    } else if (newShelf === "Finished Learning") {
      return {
        shelf: newShelf,
        dateCompleted: [...bookInfo.dateCompleted, Date.now()],
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
      // ... to Finished Learning, set both start date and completion date as now
      // (no start date would be there)
    } else if (newShelf === "Finished Learning") {
      return {
        shelf: newShelf,
        dateStarted: [...bookInfo.dateStarted, Date.now()],
        dateCompleted: [...bookInfo.dateCompleted, Date.now()],
      };
    }
  }

  // If moving from Finished Learning...
  if (currentShelf === "Finished Learning") {
    // ...to Currently Learning, add now to the dateStarted array
    if (newShelf === "Currently Learning") {
      return {
        shelf: newShelf,
        dateStarted: [...bookInfo.dateStarted, Date.now()],
      };
    }
  }

  return { shelf: newShelf };
};
