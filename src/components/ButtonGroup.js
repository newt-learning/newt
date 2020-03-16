import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { ButtonGroup as ElementsButtonGroup } from "react-native-elements";
import { REGULAR, FS14 } from "../design/typography";
import { GRAY_1, GRAY_3 } from "../design/colors";

const ButtonGroup = ({
  buttonsArray,
  containerStyle: passedContainerStyle
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerStyle = StyleSheet.flatten([
    styles.container,
    passedContainerStyle
  ]);

  return (
    <ElementsButtonGroup
      onPress={setSelectedIndex}
      selectedIndex={selectedIndex}
      buttons={buttonsArray}
      containerStyle={containerStyle}
      selectedButtonStyle={styles.selectedButton}
      textStyle={styles.text}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderColor: GRAY_3,
    height: 28
  },
  selectedButton: {
    backgroundColor: GRAY_3
  },
  text: {
    fontFamily: REGULAR,
    color: GRAY_1,
    fontSize: FS14
  }
});

export default ButtonGroup;
