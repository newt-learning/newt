import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import { LIME_GREEN, NEWT_BLUE, YELLOW, OFF_WHITE } from "../../design/colors";
import { SEMIBOLD } from "../../design/typography";

const ChangeShelfButton = ({ shelf, onPress }) => {
  // Change background color of button based on what shelf it's on
  const getShelfColor = (shelf) => {
    switch (shelf) {
      case "Finished Learning":
        return LIME_GREEN;
      case "Want to Learn":
        return NEWT_BLUE;
      case "Currently Learning":
        return YELLOW;
      default:
        return NEWT_BLUE;
    }
  };

  // Merge button styles
  const buttonStyle = StyleSheet.flatten([
    styles.button,
    { backgroundColor: getShelfColor(shelf) },
  ]);

  return (
    <Button
      buttonStyle={buttonStyle}
      titleStyle={styles.buttonTitle}
      title={shelf}
      icon={<Feather name="chevron-down" size={24} color={OFF_WHITE} />}
      iconRight
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: 300,
    borderRadius: 5,
    alignSelf: "center",
  },
  buttonTitle: {
    fontFamily: SEMIBOLD,
    color: OFF_WHITE,
    marginRight: 10,
  },
});

export default ChangeShelfButton;
