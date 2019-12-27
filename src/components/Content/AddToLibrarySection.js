import React from "react";
import { View, Text, StyleSheet } from "react-native";
// Components
import { Button } from "react-native-elements";
import ActionButton from "../ActionButton";
// Styling
import { GRAY_4, INDIGO } from "../../design/colors";
import { REGULAR, SEMIBOLD } from "../../design/typography";

const AddToLibrarySection = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <ActionButton title="Add to Library" onPress={onPress} />
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

export default AddToLibrarySection;
