import { useState } from "react";

// Hook to update checkboxes where only one item is allowed to be selected
// (unselect current checked box and select pressed checked box)
export default initialState => {
  const [checkboxes, setCheckboxes] = useState(initialState);

  const toggleCheckboxes = (currentIndex, indexToToggle) => {
    const updatedCheckboxes = checkboxes.map((item, index) => {
      // If the index is either the index of the checkbox pressed or the index
      // of the currently checked item AND those two indices are not the same
      // (i.e. pressing the already selected option), then toggle the checked value.
      if (
        (index === currentIndex || index === indexToToggle) &&
        currentIndex !== indexToToggle
      ) {
        return {
          ...item,
          checked: !item.checked
        };
      }

      return item;
    });

    setCheckboxes(updatedCheckboxes);
  };

  return [checkboxes, toggleCheckboxes];
};
