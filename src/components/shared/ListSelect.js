// List of items that can be selected (single select or multi-select)
import React from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { REGULAR } from "../../design/typography";
import { BLUE_5 } from "../../design/colors";

const ListSelect = ({ name, checked, onPressCheckbox }) => {
  return (
    <ListItem
      title={name}
      titleStyle={styles.title}
      containerStyle={checked ? styles.checkedContainer : null}
      underlayColor={BLUE_5}
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

const styles = StyleSheet.create({
  title: {
    fontFamily: REGULAR,
  },
  checkedContainer: {
    backgroundColor: BLUE_5,
  },
});

export default ListSelect;
