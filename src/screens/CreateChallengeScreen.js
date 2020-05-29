import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  Text,
  Keyboard,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  View,
} from "react-native";
// Components
import ActionButton from "../components/shared/ActionButton";
// API
import { useCreateChallenge } from "../api/challenges";
// Design
import { SEMIBOLD, FS18, FS24 } from "../design/typography";
import { GRAY_2 } from "../design/colors";

const CreateChallengeScreen = ({ navigation }) => {
  const [numBooks, setNumBooks] = useState("");
  const [createChallenge] = useCreateChallenge();

  // Initialize data and fire create challenge API call
  const onSubmit = () => {
    const data = {
      contentTypes: ["book"],
      challengeType: "reading",
      totalItems: Number(numBooks),
    };

    createChallenge(data);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.text}>
            How many books do you wish to read this year?
          </Text>
          <TextInput
            style={styles.input}
            autoFocus={true}
            value={numBooks}
            onChangeText={setNumBooks}
            keyboardType="number-pad"
          />
          <View style={styles.btnContainer}>
            <ActionButton
              title="Create"
              onPress={onSubmit}
              disabled={Number(numBooks) === 0}
              showOnlyDisabledIcon={true}
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

export default CreateChallengeScreen;
