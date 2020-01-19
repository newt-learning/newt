import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Platform,
  Button,
  Text,
  StyleSheet,
  TextInput
} from "react-native";
import { Button as ElementButton } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
// Design
import { SEMIBOLD, FS16 } from "../design/typography";
import { GRAY_5, GRAY_2 } from "../design/colors";

const UpdateProgressScreen = ({ navigation }) => {
  let pagesRead = navigation.getParam("pagesRead");
  const [updatedPagesRead, setUpdatedPagesRead] = useState(`${pagesRead}`);

  const submitUpdatedPagesRead = () => {
    console.log(updatedPagesRead);
  };

  // Pass submit function as params so that it can be wired up in the right header
  // button.
  useEffect(() => {
    navigation.setParams({ updateProgress: submitUpdatedPagesRead });
  }, [updatedPagesRead]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.text}>I'm on page</Text>
      <TextInput
        style={styles.input}
        value={updatedPagesRead}
        onFocus={() => setUpdatedPagesRead(null)}
        onChangeText={setUpdatedPagesRead}
        keyboardType="numeric"
        maxLength={8}
      />
    </ScrollView>
  );
};

UpdateProgressScreen.navigationOptions = ({ navigation }) => {
  const updateProgress = navigation.getParam("updateProgress");

  return {
    headerRight: () =>
      Platform.OS === "ios" ? (
        <Button title="Done" onPress={updateProgress} />
      ) : (
        <ElementButton
          type="clear"
          icon={<MaterialIcons name="check" size={24} />}
          onPress={updateProgress}
        />
      )
  };
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
