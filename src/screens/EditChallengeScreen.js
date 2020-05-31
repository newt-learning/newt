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
// API
import { useUpdateChallenge } from "../api/challenges";
// Components
import ActionButton from "../components/shared/ActionButton";
// Design
import { SEMIBOLD, FS18, FS24 } from "../design/typography";
import { GRAY_2 } from "../design/colors";

const EditTopicScreen = ({ route, navigation }) => {
  const { challengeData } = route.params;
  const { _id, totalItems } = challengeData;
  const [numBooks, setNumBooks] = useState(String(totalItems));

  // API call query to update challenge
  const [updateChallenge, { status }] = useUpdateChallenge();

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
              onPress={async () => {
                await updateChallenge({
                  challengeId: _id,
                  data: { totalItems: Number(numBooks) },
                });
                navigation.goBack();
              }}
              disabled={numBooks === String(totalItems)}
              showLoading={status === "loading"}
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
