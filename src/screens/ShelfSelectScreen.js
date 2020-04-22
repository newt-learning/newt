import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import _ from "lodash";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import ShelfSelect from "../components/Content/ShelfSelect";
import ActionButton from "../components/ActionButton";
import ClearButton from "../components/ClearButton";
// Hooks
import useSingleCheckbox from "../hooks/useSingleCheckbox";
// Styling
import { BOLD, FS20 } from "../design/typography";
import { OFF_BLACK, RED, GRAY_5 } from "../design/colors";
// Helpers
import { initializeShelves } from "../helpers/screenHelpers";

const ShelfSelectScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addContent, deleteContent, updateContent } = useContext(
    ContentContext
  );

  // Get params passed from route
  const { bookInfo, buttonText, showDeleteButton, addToLibrary } = route.params;

  // Initialize shelves
  const [shelves, toggleShelves] = useSingleCheckbox(
    initializeShelves(bookInfo.shelf)
  );

  const addBookToLibrary = (selectedShelf) => {
    const data = { ...bookInfo, shelf: selectedShelf, type: "book" };
    addContent(data);
  };
  const updateShelf = (selectedShelf) => {
    // If the selected shelf is "Finished Learning", add/update the date
    // completed field as well. Otherwise only change the shelf
    if (selectedShelf === "Finished Learning") {
      updateContent(bookInfo._id, {
        shelf: selectedShelf,
        dateCompleted: Date.now(),
      });
    } else {
      updateContent(bookInfo._id, { shelf: selectedShelf });
    }
    navigation.goBack();
  };
  const deleteItem = () => {
    deleteContent(bookInfo._id);
    navigation.popToTop();
  };

  // Function that decided what to do when the Confirm/Add To Library button is
  // pressed. If coming from the 'Add Content' screen, then add to Library.
  // Otherwise update the shelf of already existing content.
  onConfirmShelf = (selectedShelf) => {
    if (addToLibrary) {
      addBookToLibrary(selectedShelf);
    } else {
      updateShelf(selectedShelf);
    }
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
                (shelf) => shelf.checked
              );

              toggleShelves(currentCheckedShelfIndex, index);
            }}
            key={shelf.name}
          />
        ))}
        {showDeleteButton ? (
          <ClearButton
            title="Delete book from Library"
            onPress={deleteItem}
            containerStyle={styles.deleteButton}
            titleStyle={styles.delete}
          />
        ) : null}
      </View>
      <View style={styles.button}>
        <ActionButton
          title={buttonText}
          onPress={() => {
            setIsLoading(true);
            const currentShelf = _.find(shelves, (shelf) => shelf.checked);
            onConfirmShelf(currentShelf.name);
          }}
          showLoading={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: GRAY_5,
  },
  option: {
    justifyContent: "flex-start",
  },
  header: {
    fontFamily: BOLD,
    fontSize: FS20,
    color: OFF_BLACK,
    marginTop: 20,
    marginHorizontal: 15,
  },
  button: {
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 20,
  },
  deleteButton: {
    marginTop: 30,
  },
  delete: {
    color: RED,
  },
});

export default ShelfSelectScreen;
