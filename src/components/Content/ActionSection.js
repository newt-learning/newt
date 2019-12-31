import React from "react";
import { View, Text, StyleSheet } from "react-native";
// Components
import { Button } from "react-native-elements";
import ActionButton from "../ActionButton";
import ChangeShelfButton from "./ChangeShelfButton";
// Styling
import { GRAY_4, INDIGO } from "../../design/colors";
import { REGULAR, SEMIBOLD } from "../../design/typography";

// Section for either adding a book to My Library or viewing and changing the
// shelf it's on if it's already been saved
const ActionSection = ({ shelf, onPress }) => {
  return (
    <View style={styles.container}>
      {shelf ? (
        <ChangeShelfButton shelf={shelf} onPress={onPress} />
      ) : (
        <ActionButton title="Add to Library" onPress={onPress} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: GRAY_4
  }
});

export default ActionSection;
