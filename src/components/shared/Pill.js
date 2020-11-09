import React from "react";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { RUBY, RUBY_5, RUBY_2, OFF_WHITE } from "../../design/colors";
import { FS12, SEMIBOLD } from "../../design/typography";

const Pill = ({
  title,
  onPress,
  addPill = false, // whether the pill's for adding (for example, creating a playlist)
  buttonStyle: passedButtonStyle,
  titleStyle: passedTitleStyle,
  iconColor = RUBY,
}) => {
  const buttonStyle = StyleSheet.compose([
    styles.pill,
    addPill ? styles.addPill : styles.defaultPill,
    passedButtonStyle,
  ]);
  // If the pill's for adding, add margin from plus icon and change font color
  const titleStyle = StyleSheet.compose([
    styles.title,
    addPill ? styles.addPillTitle : styles.defaultTitle,
    passedTitleStyle,
  ]);

  return (
    <Button
      title={title}
      type="outline"
      buttonStyle={buttonStyle}
      titleStyle={titleStyle}
      icon={
        addPill ? <Feather name="plus" size={16} color={iconColor} /> : null
      }
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  pill: {
    borderRadius: 30,
    borderWidth: 2,
    paddingVertical: 3,
    paddingHorizontal: 15,
    alignSelf: "center",
    margin: 2,
  },
  defaultPill: {
    backgroundColor: RUBY_2,
    borderColor: RUBY_2,
    borderStyle: "solid",
  },
  addPill: {
    backgroundColor: RUBY_5,
    borderColor: RUBY,
    borderStyle: "dotted",
  },
  title: {
    fontFamily: SEMIBOLD,
    fontSize: FS12,
    color: RUBY_5,
  },
  defaultTitle: {
    color: OFF_WHITE,
  },
  addPillTitle: {
    marginLeft: 5,
    color: RUBY,
  },
});

export default Pill;
