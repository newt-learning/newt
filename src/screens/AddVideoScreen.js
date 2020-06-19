import React, { useState } from "react";
import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
// Components
import { H3 } from "../components/shared/Headers";
import BoxTextInput from "../components/shared/BoxTextInput";
import ActionButton from "../components/shared/ActionButton";
// Design
import { OFF_WHITE, GRAY_5 } from "../design/colors";

const AddVideoScreen = () => {
  const [videoLink, setVideoLink] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.group}>
          <H3>Video link</H3>
          <BoxTextInput
            value={videoLink}
            onChangeText={setVideoLink}
            style={styles.input}
          />
        </View>
        <View style={styles.btnContainer}>
          <ActionButton title="Next" onPress={() => console.log("next")} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: GRAY_5,
    justifyContent: "space-between",
  },
  group: {
    marginTop: 10,
    backgroundColor: OFF_WHITE,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 8,
  },
  input: {
    width: "100%",
    marginTop: 5,
    borderRadius: 4,
    backgroundColor: GRAY_5,
    padding: 5,
  },
  btnContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
});

export default AddVideoScreen;
