import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  View,
  Text,
} from "react-native";
// Components
import ActionButton from "../components/shared/ActionButton";
// Design
import { SEMIBOLD, FS18, FS24 } from "../design/typography";
import { GRAY_2 } from "../design/colors";

const EditTopicScreen = ({ route, navigation }) => {
  const { totalItems } = route.params;
  const [numBooks, setNumBooks] = useState(String(totalItems));

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.text}>
            How many books do you wish to read this year?
          </Text>
          <TextInput
            style={styles.input}
            value={numBooks}
            onChangeText={setNumBooks}
            keyboardType="number-pad"
          />
          <View style={styles.btnContainer}>
            <ActionButton
              title="Update"
              onPress={() => console.log("update")}
              disabled={numBooks === String(totalItems)}
              // showLoading={isFetching}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: 30,
    marginTop: 30,
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    marginBottom: 40,
    fontFamily: SEMIBOLD,
    fontSize: FS18,
  },
  input: {
    width: 100,
    textAlign: "center",
    fontFamily: SEMIBOLD,
    fontSize: FS24,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: GRAY_2,
  },
  btnContainer: {
    marginTop: 100,
    alignItems: "center",
  },
});

export default EditTopicScreen;
