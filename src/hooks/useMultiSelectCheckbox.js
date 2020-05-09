import { useState } from "react";

// Hook to update checkboxes where multiple items can be selected.
const useMultiSelectCheckbox = (initialState) => {
  console.log("initialstate: ", initialState);
  const [checkboxes, setCheckboxes] = useState(initialState);
  console.log("checkboxes: ", checkboxes);

  const toggleCheckboxes = (selectedIndex) => {
    const updatedCheckboxes = checkboxes.map((item, index) => {
      if (selectedIndex === index) {
        return {
          ...item,
          checked: !item.checked,
        };
      }

      return item;
    });

    setCheckboxes(updatedCheckboxes);
  };

  return [checkboxes, toggleCheckboxes];
};

export default useMultiSelectCheckbox;
