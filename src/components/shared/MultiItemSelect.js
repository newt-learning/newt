import React from "react";
import { StyleSheet } from "react-native";
// Components
import Pill from "./Pill";
// Hooks
import useMultiSelectCheckbox from "../../hooks/useMultiSelectCheckbox";
// Helpers
import { initializeMultiSelectCheckbox } from "../../helpers/screenHelpers";
// Design
import { RUBY_5, RUBY, GRAY_2, GRAY_4, RUBY_4 } from "../../design/colors";
import { FS16 } from "../../design/typography";

const MultiItemSelect = ({ items }) => {
  const [itemsList, toggleItemsList] = useMultiSelectCheckbox(
    initializeMultiSelectCheckbox(items, [])
  );

  return itemsList.map((item, index) => {
    const buttonStyle = StyleSheet.compose([
      styles.pill,
      item.checked ? styles.activePill : styles.inactivePill,
    ]);
    const titleStyle = StyleSheet.compose([
      styles.title,
      item.checked ? styles.activeTitle : styles.inactiveTitle,
    ]);
    return (
      <Pill
        title={item.name}
        key={item._id}
        onPress={() => toggleItemsList(index)}
        buttonStyle={buttonStyle}
        titleStyle={titleStyle}
      />
    );
  });
};

const styles = StyleSheet.create({
  pill: {
    marginHorizontal: 6,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  activePill: {
    backgroundColor: RUBY_5,
    borderColor: RUBY_4,
  },
  inactivePill: {
    backgroundColor: GRAY_4,
    borderColor: GRAY_4,
  },
  title: {
    fontSize: FS16,
  },
  activeTitle: {
    color: RUBY,
  },
  inactiveTitle: {
    color: GRAY_2,
  },
});

export default MultiItemSelect;
