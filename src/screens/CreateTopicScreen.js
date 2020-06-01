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
import { SEMIBOLD, FS18, FS24, REGULAR, FS14 } from "../design/typography";
import { GRAY_2, RED } from "../design/colors";

const CHARACTER_LIMIT = 24;

const CreateTopicScreen = ({ navigation }) => {
  const [topicName, setTopicName] = useState("");
  let nameCharRemaining = CHARACTER_LIMIT - topicName.length;
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
          {/* If the topic is getting close to the character limit (8 characters
            away), show number of characters remaining in red.  */}
          <Text style={styles.charLimit}>
            {nameCharRemaining <= 8 && nameCharRemaining}
          </Text>
          <View style={styles.btnContainer}>
            <ActionButton
              title="Create"
              onPress={() => {
                createTopic({ name: topicName });
                navigation.goBack();
              }}
              // Disable button if there's no name or if the name is over the
              // character limit
              disabled={topicName.length === 0 || nameCharRemaining < 0}
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
  },
  text: {
    textAlign: "center",
    marginBottom: 40,
    fontFamily: SEMIBOLD,
    fontSize: FS18,
  },
  charLimit: {
    textAlign: "right",
    marginTop: 5,
    fontFamily: REGULAR,
    fontSize: FS14,
    color: RED,
  },
  input: {
    fontFamily: SEMIBOLD,
    fontSize: FS24,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: GRAY_2,
  },
  btnContainer: {
    marginTop: 95,
    alignItems: "center",
  },
});

export default CreateTopicScreen;
