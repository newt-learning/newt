import React from "react";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { RUBY, RUBY_5 } from "../../design/colors";
import { SEMIBOLD, FS16 } from "../../design/typography";

const CreateTopicButton = ({ onPress }) => {
  return (
    <Button
      title="Create topic"
      type="outline"
      containerStyle={styles.container}
      buttonStyle={styles.button}
      icon={<Feather name="plus" size={22} color={RUBY} />}
      titleStyle={styles.title}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  button: {
    borderRadius: 8,
    borderColor: RUBY,
    backgroundColor: RUBY_5,
    borderWidth: 2,
    paddingVertical: 10,
    borderStyle: "dotted",
  },
  title: {
    fontFamily: SEMIBOLD,
    fontSize: FS16,
    color: RUBY,
    marginLeft: 16,
  },
});

export default CreateTopicButton;
