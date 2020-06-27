import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  Text,
  Platform,
} from "react-native";
import _ from "lodash";
// API
import {
  getYoutubeVideoInfo,
  getYoutubePlaylistInfo,
} from "../../api/youtubeApi";
// Components
import { H3, H4 } from "../../components/shared/Headers";
import BoxTextInput from "../../components/shared/BoxTextInput";
import ActionButton from "../../components/shared/ActionButton";
// Design
import { OFF_WHITE, GRAY_5, RED, GRAY_1 } from "../../design/colors";
import { REGULAR, FS14 } from "../../design/typography";
// Helpers
import { validateYoutubeVideoUrl, validateYoutubePlaylistUrl } from "./helpers";

const VideoUrlForm = ({
  videoLink,
  seriesLink,
  setVideoLink,
  setSeriesLink,
  setVideoInfo,
  setOnConfirmationSection,
}) => {
  const [urlErrorMessage, setUrlErrorMessage] = useState({
    video: "",
    series: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const getYoutubeInfo = async (videoLink) => {
    // Get videoId from url inputted. If it's not a valid url, this will return null
    const videoId = validateYoutubeVideoUrl(videoLink);

    // If an id can be extracted, get the video info with a request to YouTube API
    if (videoId) {
      setIsLoading(true);
      const results = await getYoutubeVideoInfo(videoId);

      if (results.items) {
        setVideoInfo(results.items[0]);
        setIsLoading(false);
        setOnConfirmationSection(true);
      } else {
        setVideoInfo(null);
        setIsLoading(false);
      }
    } else {
      setUrlErrorMessage({
        ...urlErrorMessage,
        video: "Hello friend, please make sure it's a valid YouTube URL.",
      });
    }
  };

  const getPlaylistInfo = async (seriesLink) => {
    // Get playlistId from url inputted. If it's not a valid url, this will return null
    const playlistId = validateYoutubePlaylistUrl(seriesLink);

    if (playlistId) {
      const results = await getYoutubePlaylistInfo(playlistId);

      console.log(results);
    } else {
      setUrlErrorMessage({
        ...urlErrorMessage,
        series: "Hello friend, please make sure it's a valid YouTube URL.",
      });
    }
  };

  const onSubmit = () => {
    if (!_.isEmpty(videoLink)) {
      getYoutubeInfo(videoLink);
    } else {
      getPlaylistInfo(seriesLink);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <View>
            <View style={styles.group}>
              <H3>YouTube video link</H3>
              <BoxTextInput
                value={videoLink}
                onChangeText={setVideoLink}
                onFocus={() => {
                  // If there's an error message, remove it when focusing on input
                  if (!_.isEmpty(urlErrorMessage.video)) {
                    setUrlErrorMessage({ ...urlErrorMessage, video: "" });
                  }
                }}
                style={StyleSheet.compose([
                  styles.input,
                  !_.isEmpty(urlErrorMessage.video) ? styles.inputError : null,
                ])}
                autoCorrect={false}
              />
              {/* Show error message if there is one */}
              {!_.isEmpty(urlErrorMessage.video) && (
                <Text style={styles.urlError}>{urlErrorMessage.video}</Text>
              )}
            </View>
            <H4 style={styles.or}>OR</H4>
            <View style={styles.group}>
              <H3>YouTube playlist link</H3>
              <BoxTextInput
                value={seriesLink}
                onChangeText={setSeriesLink}
                onFocus={() => {
                  // If there's an error message, remove it when focusing on input
                  if (!_.isEmpty(urlErrorMessage.series)) {
                    setUrlErrorMessage({ ...urlErrorMessage, series: "" });
                  }
                }}
                style={StyleSheet.compose([
                  styles.input,
                  !_.isEmpty(urlErrorMessage.series) ? styles.inputError : null,
                ])}
                autoCorrect={false}
              />
              {/* Show error message if there is one */}
              {!_.isEmpty(urlErrorMessage.series) && (
                <Text style={styles.urlError}>{urlErrorMessage.series}</Text>
              )}
            </View>
          </View>

          <View style={styles.btnContainer}>
            <ActionButton
              title="Next"
              onPress={onSubmit}
              disabled={_.isEmpty(videoLink) && _.isEmpty(seriesLink)}
              showLoading={isLoading}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
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
    borderRadius: 12,
  },
  input: {
    width: "100%",
    marginTop: 5,
    borderRadius: 4,
    backgroundColor: GRAY_5,
    padding: 5,
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
  or: {
    textAlign: "center",
    marginTop: 10,
    color: GRAY_1,
  },
  btnContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
});

export default VideoUrlForm;
