import React, { useState, useContext } from "react";
import {
  TouchableWithoutFeedback,
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

const EditTopicScreen = ({ route, navigation }) => {
  const { topicInfo } = route.params;
  const [topicName, setTopicName] = useState(topicInfo.name);

  const {
    state: { isFetching },
    updateTopic,
  } = useContext(TopicsContext);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <TextInput
            style={styles.input}
            value={topicName}
            onChangeText={setTopicName}
          />
          <View style={styles.btnContainer}>
            <ActionButton
              title="Update"
              onPress={async () => {
                await updateTopic(topicInfo._id, { name: topicName });
                navigation.goBack();
              }}
              disabled={topicName === topicInfo.name}
              showLoading={isFetching}
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

export default EditTopicScreen;
