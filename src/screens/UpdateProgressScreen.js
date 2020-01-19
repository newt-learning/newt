import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  Platform,
  Button,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator
} from "react-native";
import { Button as ElementButton } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Design
import { SEMIBOLD, FS16 } from "../design/typography";
import { OFF_BLACK, GRAY_5, GRAY_2, IOS_BLUE } from "../design/colors";

const UpdateProgressScreen = ({ navigation }) => {
  const contentId = navigation.getParam("contentId");
  const pagesRead = navigation.getParam("pagesRead");
  const [updatedPagesRead, setUpdatedPagesRead] = useState(`${pagesRead}`);
  const {
    state: { isFetching },
    updateBookProgress
  } = useContext(ContentContext);

  const submitUpdatedPagesRead = () => {
    updateBookProgress(contentId, updatedPagesRead);
  };

  // Pass submit function as params so that it can be wired up in the right header
  // button.
  useEffect(() => {
    navigation.setParams({ updateProgress: submitUpdatedPagesRead });
    navigation.setParams({ isFetching });
  }, [updatedPagesRead, isFetching]);

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
  const isFetching = navigation.getParam("isFetching");

  return {
    headerRight: () => {
      if (Platform.OS === "ios") {
        if (isFetching) {
          return (
            <ActivityIndicator
              animating={isFetching}
              color={IOS_BLUE}
              style={{ marginRight: 15 }}
            />
          );
        } else {
          return <Button title="Done" onPress={updateProgress} />;
        }
      } else {
        return (
          <ElementButton
            type="clear"
            loading={isFetching}
            loadingProps={{ color: OFF_BLACK }}
            icon={<MaterialIcons name="check" size={24} />}
            onPress={updateProgress}
          />
        );
      }
    }
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
