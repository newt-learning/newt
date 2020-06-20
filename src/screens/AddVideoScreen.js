import React, { useState } from "react";
import {
  View,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import _ from "lodash";
// API
import { getYoutubeVideoInfo } from "../api/youtubeApi";
// Components
import { H3, H4 } from "../components/shared/Headers";
import BoxTextInput from "../components/shared/BoxTextInput";
import ActionButton from "../components/shared/ActionButton";
// Design
import { OFF_WHITE, GRAY_5, RED, GRAY_3 } from "../design/colors";
import { REGULAR, FS14 } from "../design/typography";

const VideoUrlForm = ({ setVideoInfo, setOnConfirmationSection }) => {
  const [videoLink, setVideoLink] = useState("");
  const [urlErrorMessage, setUrlErrorMessage] = useState("");

  const getYoutubeInfo = async (videoLink) => {
    // Get videoId from url inputted. If it's not a valid url, this will return null
    const videoId = validateYoutubeUrl(videoLink);

    // If an id can be extracted, get the video info with a request to YouTube API
    if (videoId) {
      const results = await getYoutubeVideoInfo(videoId);

      if (results.items) {
        setVideoInfo(results.items[0]);
        setOnConfirmationSection(true);
      } else {
        setVideoInfo(null);
      }
    } else {
      setUrlErrorMessage(
        "Hello friend, please make sure it's a valid YouTube URL."
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.formContainer}>
        <View style={styles.group}>
          <H3>YouTube link</H3>
          <BoxTextInput
            value={videoLink}
            onChangeText={setVideoLink}
            onFocus={() => {
              // If there's an error message, remove it when focusing on input
              if (!_.isEmpty(urlErrorMessage)) {
                setUrlErrorMessage("");
              }
            }}
            style={StyleSheet.compose([
              styles.input,
              !_.isEmpty(urlErrorMessage) ? styles.inputError : null,
            ])}
          />
          {/* Show error message if there is one */}
          {!_.isEmpty(urlErrorMessage) && (
            <Text style={styles.urlError}>{urlErrorMessage}</Text>
          )}
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

const VideoConfirmation = ({ videoInfo, setOnConfirmationSection }) => {
  const [name, setName] = useState(videoInfo.snippet.title);
  const [description, setDescription] = useState(videoInfo.snippet.description);

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.confirmationContainer}>
          <Image
            source={{ uri: videoInfo.snippet.thumbnails.maxres.url }}
            style={styles.thumbnail}
            resizeMode="contain"
          />
          <View style={styles.group}>
            <H4>Name</H4>
            <BoxTextInput
              value={name}
              onChangeText={setName}
              style={{ ...styles.input, marginBottom: 15 }}
              multiline
            />
            <H4>Description</H4>
            <BoxTextInput
              value={description}
              onChangeText={setDescription}
              style={styles.input}
              multiline
            />
          </View>
          <View style={styles.confirmBtnContainer}>
            <ActionButton
              title="Back"
              buttonStyle={styles.backBtn}
              onPress={() => setOnConfirmationSection(false)}
            />
            <ActionButton title="Confirm" buttonStyle={styles.confirmBtn} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const AddVideoScreen = () => {
  const [videoInfo, setVideoInfo] = useState(null);
  const [onConfirmationSection, setOnConfirmationSection] = useState(false);

  return onConfirmationSection ? (
    <VideoConfirmation
      videoInfo={videoInfo}
      setOnConfirmationSection={setOnConfirmationSection}
    />
  ) : (
    <VideoUrlForm
      setVideoInfo={setVideoInfo}
      setOnConfirmationSection={setOnConfirmationSection}
    />
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
  formContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: GRAY_5,
    justifyContent: "space-between",
  },
  confirmationContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: GRAY_5,
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
  urlError: {
    fontFamily: REGULAR,
    fontSize: FS14,
    color: RED,
    marginTop: 5,
  },
  inputError: {
    borderWidth: 1,
    borderColor: RED,
  },
  thumbnail: {
    borderRadius: 8,
    height: 195,
    marginBottom: 10,
  },
  confirmBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  backBtn: {
    width: 125,
    backgroundColor: GRAY_3,
  },
  confirmBtn: {
    width: 125,
  },
});

export default AddVideoScreen;
