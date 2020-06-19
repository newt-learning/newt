import React, { useState } from "react";
import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import _ from "lodash";
// API
import { getYoutubeVideoInfo } from "../api/youtubeApi";
// Components
import { H3 } from "../components/shared/Headers";
import BoxTextInput from "../components/shared/BoxTextInput";
import ActionButton from "../components/shared/ActionButton";
// Design
import { OFF_WHITE, GRAY_5 } from "../design/colors";

const AddVideoScreen = () => {
  const [videoLink, setVideoLink] = useState("");

  const getYoutubeInfo = async (videoLink) => {
    // Get videoId from url inputted. If it's not a valid url, this will return null
    const videoId = validateYoutubeUrl(videoLink);

    // If an id can be extracted, get the video info with a request to YouTube API
    if (videoId) {
      const results = await getYoutubeVideoInfo(videoId);
      console.log(results);
    } else {
      console.log("not a youtube url");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.group}>
          <H3>YouTube link</H3>
          <BoxTextInput
            value={videoLink}
            onChangeText={setVideoLink}
            style={styles.input}
          />
        </View>
        <View style={styles.btnContainer}>
          <ActionButton
            title="Next"
            onPress={() => getYoutubeInfo(videoLink)}
            disabled={_.isEmpty(videoLink)}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Youtube URL parser which only does full and short links, among others.
// See: https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
const validateYoutubeUrl = (url) => {
  const regex = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
  const match = url.match(regex);

  // Get videoId from url if it exists
  const videoId = match && match[1].length === 11 ? match[1] : null;

  return videoId;
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
