import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import _ from "lodash";
import Shelf from "../components/Content/Shelf";
import useSingleCheckbox from "../hooks/useSingleCheckbox";
// Styling
import { BOLD, FS20 } from "../design/typography";
import { OFF_BLACK } from "../design/colors";

const SHELVES = [
  {
    name: "Currently Learning",
    checked: false
  },
  {
    name: "Want to Learn",
    checked: true
  },
  {
    name: "Finished Learning",
    checked: false
  }
];

const AddToMyLibraryScreen = () => {
  const [shelves, toggleShelves] = useSingleCheckbox(SHELVES);

  return (
    <View>
      <Text style={styles.header}>Select Shelf</Text>
      <FlatList
        data={shelves}
        renderItem={({ item, index }) => (
          <Shelf
            name={item.name}
            checked={item.checked}
            onPressCheckbox={() => {
              const currentCheckedShelfIndex = _.findIndex(
                shelves,
                shelf => shelf.checked
              );

              toggleShelves(currentCheckedShelfIndex, index);
            }}
          />
        )}
        keyExtractor={shelf => shelf.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: BOLD,
    fontSize: FS20,
    color: OFF_BLACK,
    marginTop: 20,
    marginHorizontal: 15
  }
});

export default AddToMyLibraryScreen;
