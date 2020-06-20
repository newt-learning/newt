import React from "react";
import { StyleSheet } from "react-native";
import _ from "lodash";
// Components
import { H3 } from "../../components/shared/Headers";
import ListSelect from "../../components/shared/ListSelect";

const SelectShelfSection = ({ shelves, onSelectShelf, rounded = false }) => {
  return (
    <>
      <H3 style={styles.header}>Select Shelf</H3>
      {shelves.map((shelf, index) => {
        // Rounded corners styling
        const listStyle = StyleSheet.compose([
          index === 0 && styles.firstItem,
          index === 2 && styles.lastItem,
        ]);

        return (
          <ListSelect
            name={shelf.name}
            checked={shelf.checked}
            containerStyle={rounded ? listStyle : null}
            onPressCheckbox={() => {
              const currentCheckedShelfIndex = _.findIndex(
                shelves,
                (shelf) => shelf.checked
              );

              onSelectShelf(currentCheckedShelfIndex, index);
            }}
            key={shelf.name}
          />
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 5,
  },
  firstItem: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  lastItem: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomWidth: 0,
  },
});

export default SelectShelfSection;
