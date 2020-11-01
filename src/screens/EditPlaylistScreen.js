import React, { useState, useContext } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  View,
} from "react-native";
// API
import { useUpdatePlaylist } from "../api/playlists";
// Components
import ActionButton from "../components/shared/ActionButton";
// Design
import { SEMIBOLD, FS18, FS24 } from "../design/typography";
import { GRAY_2 } from "../design/colors";

const EditPlaylistScreen = ({ route, navigation }) => {
  const { playlistInfo } = route.params;
  const [playlistName, setPlaylistName] = useState(playlistInfo?.name);

  const [updatePlaylist, { status }] = useUpdatePlaylist();

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <TextInput
            style={styles.input}
            value={playlistName}
            onChangeText={setPlaylistName}
          />
          <View style={styles.btnContainer}>
            <ActionButton
              title="Update"
              onPress={async () => {
                await updatePlaylist({
                  playlistId: playlistInfo._id,
                  data: { name: playlistName },
                });
                navigation.goBack();
              }}
              disabled={playlistName === playlistInfo.name}
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

export default EditPlaylistScreen;
