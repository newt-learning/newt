import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import _ from "lodash";
import Shelf from "../components/Content/Shelf";
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
  const [shelves, setShelves] = useState(SHELVES);

  const toggleShelf = (currentIndex, indexToToggle) => {
    const updatedShelves = shelves.map((item, index) => {
      if (index === currentIndex || index === indexToToggle) {
        return {
          ...item,
          checked: !item.checked
        };
      }

      return item;
    });

    setShelves(updatedShelves);
  };

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

              toggleShelf(currentCheckedShelfIndex, index);
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
