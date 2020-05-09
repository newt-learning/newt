// List of items that can be selected (single select or multi-select)
import React from "react";
import { ListItem } from "react-native-elements";

const ListSelect = ({ name, checked, onPressCheckbox }) => {
  return (
    <ListItem
      title={name}
      bottomDivider
      iconType="feather"
      onPress={onPressCheckbox}
      checkBox={{
        checked,
        onPress: onPressCheckbox,
        iconType: "feather",
        checkedIcon: "check-circle",
        uncheckedIcon: "circle",
      }}
    />
  );
};

export default ListSelect;
