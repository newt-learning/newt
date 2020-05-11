import React from "react";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { RUBY, RUBY_5 } from "../../design/colors";
import { FS12, SEMIBOLD } from "../../design/typography";

const Pill = ({
  title,
  onPress,
  addPill = false, // whether the pill's for adding (for example, creating a topic)
  outlineColor = RUBY,
  backgroundColor = RUBY_5,
  buttonStyle: passedButtonStyle,
  titleStyle: passedTitleStyle,
}) => {
  const buttonStyle = StyleSheet.compose([
    styles.pill,
    {
      backgroundColor,
      borderColor: outlineColor,
      // If the pill's for adding, show dotted outline
      borderStyle: addPill ? "dotted" : "solid",
    },
    passedButtonStyle,
  ]);
  // If the pill's for adding, add margin from plus icon and change font color
  const titleStyle = addPill
    ? StyleSheet.compose([
        styles.title,
        { marginLeft: 5, color: RUBY },
        passedTitleStyle,
      ])
    : StyleSheet.compose(styles.title, passedTitleStyle);

  return (
    <Button
      title={title}
      type="outline"
      buttonStyle={buttonStyle}
      titleStyle={titleStyle}
      icon={addPill ? <Feather name="plus" size={16} color={RUBY} /> : null}
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
    marginHorizontal: 2,
  },
  title: {
    fontFamily: SEMIBOLD,
    fontSize: FS12,
    color: RUBY_5,
  },
});

export default Pill;
