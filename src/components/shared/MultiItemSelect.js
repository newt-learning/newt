import React, { Fragment } from "react";
import { StyleSheet } from "react-native";
// Components
import Pill from "./Pill";
// Design
import {
  RUBY,
  RUBY_4,
  RUBY_5,
  GRAY_2,
  GRAY_3,
  GRAY_4,
  GRAY_5,
} from "../../design/colors";
import { FS16 } from "../../design/typography";

const MultiItemSelect = ({
  itemsList,
  onSelect,
  showCreateItem = false,
  onSelectCreateItem,
}) => {
  const renderItems = () => {
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
          onPress={() => onSelect(index)}
          buttonStyle={buttonStyle}
          titleStyle={titleStyle}
        />
      );
    });
  };

  return (
    <Fragment>
      {/* Render all the items first */}
      {renderItems()}
      {/* If showCreateItem is true, show the pill to create an item */}
      {showCreateItem ? (
        <Pill
          title="Create topic"
          addPill={true}
          onPress={onSelectCreateItem}
          buttonStyle={StyleSheet.compose(styles.pill, styles.addItemPill)}
          titleStyle={StyleSheet.compose(styles.title, styles.inactiveTitle)}
          iconColor={GRAY_2}
        />
      ) : null}
    </Fragment>
  );
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
  addItemPill: {
    borderColor: GRAY_3,
    backgroundColor: GRAY_5,
    borderStyle: "dotted",
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
