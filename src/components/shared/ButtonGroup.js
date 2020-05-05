import React from "react";
import { StyleSheet } from "react-native";
import { ButtonGroup as ElementsButtonGroup } from "react-native-elements";
import { REGULAR, FS14 } from "../../design/typography";
import { GRAY_1, GRAY_3, OFF_WHITE } from "../../design/colors";

const ButtonGroup = ({
  buttonsArray,
  selectedIndex,
  onPress,
  containerStyle: passedContainerStyle,
  selectedButtonColor = GRAY_3,
}) => {
  const containerStyle = StyleSheet.compose([
    styles.container,
    { borderColor: selectedButtonColor },
    passedContainerStyle,
  ]);
  const selectedButtonStyle = StyleSheet.compose([
    styles.selectedButtonStyle,
    { backgroundColor: selectedButtonColor },
  ]);

  return (
    <ElementsButtonGroup
      onPress={onPress}
      selectedIndex={selectedIndex}
      buttons={buttonsArray}
      containerStyle={containerStyle}
      selectedButtonStyle={selectedButtonStyle}
      innerBorderStyle={styles.innerBorderStyle}
      textStyle={styles.text}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    borderRadius: 8,
    backgroundColor: OFF_WHITE,
    height: 28,
  },
  text: {
    fontFamily: REGULAR,
    color: GRAY_1,
    fontSize: FS14,
  },
  selectedButtonStyle: {
    borderRadius: 6,
  },
  innerBorderStyle: {
    width: 0,
  },
});

export default ButtonGroup;
