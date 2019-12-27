import { useState } from "react";

// Hook to update checkboxes where only one item is allowed to be selected
export default initialState => {
  const [checkboxes, setCheckboxes] = useState(initialState);

  const toggleCheckboxes = (currentIndex, indexToToggle) => {
    const updatedCheckboxes = checkboxes.map((item, index) => {
      if (index === currentIndex || index === indexToToggle) {
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
