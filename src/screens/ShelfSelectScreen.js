import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import _ from "lodash";
// Components
import ShelfSelect from "../components/Content/ShelfSelect";
import ActionButton from "../components/ActionButton";
import ClearButton from "../components/ClearButton";
// Hooks
import useSingleCheckbox from "../hooks/useSingleCheckbox";
// Styling
import { BOLD, FS20 } from "../design/typography";
import { OFF_BLACK, RED } from "../design/colors";
// Helpers
import { initializeShelves } from "../helpers/screenHelpers";

const ShelfSelectScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const currentShelf = navigation.getParam("currentShelf");
  const buttonText = navigation.getParam("buttonText");
  // Whether the Delete button should be shown or not
  const showDeleteButton = navigation.getParam("showDeleteButton");
  const onConfirmShelf = navigation.getParam("onConfirmShelf");
  const onDelete = navigation.getParam("onDelete");

  const [shelves, toggleShelves] = useSingleCheckbox(
    initializeShelves(currentShelf)
  );

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
        {showDeleteButton ? (
          <ClearButton
            title="Delete book from Library"
            onPress={onDelete}
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
            const currentShelf = _.find(shelves, shelf => shelf.checked);
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
  },
  deleteButton: {
    marginTop: 30
  },
  delete: {
    color: RED
  }
});

export default ShelfSelectScreen;
