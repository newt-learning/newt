import React from "react";
import { ScrollView, Text, StyleSheet, TextInput } from "react-native";
// Design
import { SEMIBOLD, FS16 } from "../design/typography";
import { GRAY_5, GRAY_2 } from "../design/colors";

const UpdateProgressScreen = ({ navigation }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.text}>I'm on page</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={8}
        autoFocus
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 15
  },
  text: {
    textAlignVertical: "center",
    fontFamily: SEMIBOLD,
    fontSize: FS16
  },
  input: {
    fontSize: FS16,
    backgroundColor: GRAY_5,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderColor: GRAY_2,
    width: 100,
    padding: 2,
    marginLeft: 10
  }
});

export default UpdateProgressScreen;
