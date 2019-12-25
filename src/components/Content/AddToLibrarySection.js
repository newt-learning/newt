import React from "react";
import { View, Text, StyleSheet } from "react-native";
// Components
import { Button } from "react-native-elements";
// Styling
import { GRAY_4, INDIGO } from "../../design/colors";
import { REGULAR, SEMIBOLD } from "../../design/typography";

const AddToLibrarySection = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Add to Library"
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        onPress={onPress}
        raised
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: GRAY_4
  },
  button: {
    width: 300,
    backgroundColor: INDIGO,
    borderRadius: 5
  },
  buttonTitle: {
    fontFamily: SEMIBOLD
  }
});

export default AddToLibrarySection;
