import { useState } from "react";

// Hook to update checkboxes where multiple items can be selected.
const useMultiSelectCheckbox = (initialState) => {
  const [checkboxes, setCheckboxes] = useState(initialState);

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

  const setCheckboxesFromOutside = (checkboxesState) => {
    setCheckboxes(checkboxesState);
  };

  return [checkboxes, toggleCheckboxes, setCheckboxesFromOutside];
};

export default useMultiSelectCheckbox;
