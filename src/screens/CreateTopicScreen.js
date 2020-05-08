import React, { useState, useContext } from "react";
import {
  TouchableWithoutFeedback,
  Text,
  Keyboard,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  View,
} from "react-native";
// Context
import { Context as TopicsContext } from "../context/TopicsContext";
// Components
import ActionButton from "../components/shared/ActionButton";
// Design
import { SEMIBOLD, FS18, FS24 } from "../design/typography";
import { GRAY_2 } from "../design/colors";

const CreateTopicScreen = ({ navigation }) => {
  const [topicName, setTopicName] = useState("");
  const { createTopic } = useContext(TopicsContext);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.text}>Topic name:</Text>
          <TextInput
            style={styles.input}
            autoFocus={true}
            value={topicName}
            onChangeText={setTopicName}
          />
          <View style={styles.btnContainer}>
            <ActionButton
              title="Create"
              onPress={() => {
                createTopic({ name: topicName });
                navigation.goBack();
              }}
              disabled={topicName.length === 0}
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
  },
  text: {
    textAlign: "center",
    marginBottom: 40,
    fontFamily: SEMIBOLD,
    fontSize: FS18,
  },
  input: {
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

export default CreateTopicScreen;
