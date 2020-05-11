import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { RUBY, RUBY_5 } from "../../design/colors";
import { FS12, SEMIBOLD } from "../../design/typography";

const Pill = ({ title, outlineColor = RUBY, backgroundColor = RUBY_5 }) => {
  const buttonStyle = StyleSheet.compose([
    styles.pill,
    { backgroundColor, borderColor: outlineColor },
  ]);

  return (
    <Button
      title={title}
      type="outline"
      buttonStyle={buttonStyle}
      titleStyle={styles.title}
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
