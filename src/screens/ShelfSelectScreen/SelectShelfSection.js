import React from "react";
import { StyleSheet } from "react-native";
import _ from "lodash";
// Components
import { H3 } from "../../components/shared/Headers";
import ListSelect from "../../components/shared/ListSelect";

const SelectShelfSection = ({ shelves, onSelectShelf }) => {
  return (
    <>
      <H3 style={styles.header}>Select Shelf</H3>
      {shelves.map((shelf, index) => (
        <ListSelect
          name={shelf.name}
          checked={shelf.checked}
          onPressCheckbox={() => {
            const currentCheckedShelfIndex = _.findIndex(
              shelves,
              (shelf) => shelf.checked
            );

            onSelectShelf(currentCheckedShelfIndex, index);
          }}
          key={shelf.name}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 5,
  },
});

export default SelectShelfSection;
