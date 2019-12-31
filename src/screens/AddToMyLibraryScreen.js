import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import _ from "lodash";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import ShelfSelect from "../components/Content/ShelfSelect";
import ActionButton from "../components/ActionButton";
import useSingleCheckbox from "../hooks/useSingleCheckbox";
// Styling
import { BOLD, FS20 } from "../design/typography";
import { OFF_BLACK } from "../design/colors";
// Helpers
import { convertBookToDbContent } from "../helpers/apiHelpers";

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

const AddToMyLibraryScreen = ({ navigation }) => {
  const [shelves, toggleShelves] = useSingleCheckbox(SHELVES);
  const { state, addContent } = useContext(ContentContext);
  const bookInfo = navigation.getParam("bookInfo");

  const addBook = () => {
    const currentShelf = _.find(shelves, shelf => shelf.checked);
    // Combine shelf and content type info with book info
    const data = { ...bookInfo, shelf: currentShelf.name, type: "book" };

    addContent(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.option}>
        <Text style={styles.header}>Select Shelf</Text>
        {shelves.map((shelf, index) => (
          <ShelfSelect
            name={shelf.name}
            checked={shelf.checked}
            onPressCheckbox={() => {
              const currentCheckedShelfIndex = _.findIndex(
                shelves,
                shelf => shelf.checked
              );

              toggleShelves(currentCheckedShelfIndex, index);
            }}
            key={shelf.name}
          />
        ))}
      </View>
      <View style={styles.button}>
        <ActionButton title="Add to Library" onPress={addBook} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  options: {
    justifyContent: "flex-start"
  },
  header: {
    fontFamily: BOLD,
    fontSize: FS20,
    color: OFF_BLACK,
    marginTop: 20,
    marginHorizontal: 15
  },
  button: {
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 20
  }
});

export default AddToMyLibraryScreen;
