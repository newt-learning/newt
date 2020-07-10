import React, { useState, useContext, useLayoutEffect } from "react";
import { ScrollView, View, StyleSheet, Image } from "react-native";
import _ from "lodash";
import * as Linking from "expo-linking";
// API
import { useCreatePersonalQuiz } from "../api/quizzes";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import Loader from "../components/shared/Loader";
import TitleSection from "../components/Content/TitleSection";
import ActionSection from "../components/Content/ActionSection";
import QuizSection from "../components/Content/QuizSection";
import Description from "../components/Content/Description";
import MoreOptionsButton from "../components/shared/MoreOptionsButton";
import OptionsModal from "../components/shared/OptionsModal";
// Design
import { OFF_WHITE } from "../design/colors";
// Helpers
import { convertFromNewtContentToUserContent } from "./AddVideoScreen/helpers";

const VideoScreen = ({ route, navigation }) => {
  // Toggle show more/less description text
  const [showMore, setShowMore] = useState(false);
  // Initialize modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Get function to create a quiz
  const [createPersonalQuiz, { status: quizStatus }] = useCreatePersonalQuiz();

  // Add the 3-dot options icon which opens the options modal
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MoreOptionsButton onPress={() => setIsModalVisible(true)} />
      ),
    });
  });

  const passedVideoInfo = route.params.videoInfo;
  // If coming from the Discover section in Add Content Screen
  const comingFromDiscoverSection =
    route.params.comingFromDiscoverSection ?? false;

  const { state: contentState, updateContent } = useContext(ContentContext);

  // Need to come up with a better, more efficient way of ensuring the screen
  // updates when the data updates.
  let videoInfo = {};

  // If coming from the Discover section, filter items with Newt content Id
  // (since the section displays stuff part of Newt Content DB) so if the item
  // is already in the user's library, it shows that instead of a new one.
  // Otherwise filter by _id to get the latest data
  if (comingFromDiscoverSection) {
    videoInfo =
      contentState.items.filter(
        (item) => item.newtContentInfo?.newtContentId === passedVideoInfo._id
      )[0] ?? passedVideoInfo;
  } else {
    videoInfo =
      contentState.items.filter(
        (item) => item._id === passedVideoInfo._id
      )[0] ?? passedVideoInfo;
  }

  const {
    _id,
    name,
    authors,
    type,
    shelf,
    topics,
    description,
    thumbnailUrl,
    startFinishDates,
    isOnNewtContentDatabase,
    newtContentInfo,
    quizInfo,
    dateAdded,
  } = videoInfo;

  // If data is loading, show Loader
  if (contentState.isFetching) {
    return <Loader />;
  }

  // List of buttons in the options modal
  const modalOptions = [
    {
      title: "Add or Edit Dates Watched",
      onPress: () => {
        setIsModalVisible(false);
        navigation.navigate("AddEditDates", {
          contentId: _id,
          contentType: type,
          startFinishDates: JSON.stringify(videoInfo.startFinishDates),
        });
      },
    },
  ];

  // Open video either on YouTube app or browser
  const handleOpenLink = () => {
    Linking.openURL(`https://youtu.be/${videoInfo.videoInfo.videoId}`);
  };

  const handleTakeQuiz = async () => {
    if (_.isEmpty(quizInfo)) {
      // Create personal quiz for user
      const personalQuiz = await createPersonalQuiz({
        newtQuizId: newtContentInfo.newtQuizId,
        userContentId: _id,
      });
      // Add quiz to the user's content
      await updateContent(_id, {
        quizInfo: [
          ...quizInfo,
          { quizId: personalQuiz._id, dateCreated: personalQuiz.dateCreated },
        ],
      });
      // Navigate to quiz screen
      navigation.navigate("QuizScreen", { quizId: personalQuiz._id });
    } else {
      // Fetch already taken quiz for now
      navigation.navigate("QuizScreen", { quizId: quizInfo[0].quizId });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: thumbnailUrl }}
          style={styles.thumbnail}
          resizeMode="contain"
        />
      </View>
      <TitleSection
        title={name}
        authors={authors}
        contentType={type}
        onPress={handleOpenLink}
      />
      <ActionSection
        contentId={_id}
        type={type}
        shelf={shelf}
        topics={topics}
        startFinishDates={startFinishDates}
        dateAdded={dateAdded}
        onPress={
          shelf
            ? () =>
                navigation.navigate("ShelfSelect", {
                  contentInfo: videoInfo,
                  buttonText: "Confirm",
                  addToLibrary: false,
                })
            : () =>
                navigation.navigate("ShelfSelect", {
                  contentInfo: convertFromNewtContentToUserContent(videoInfo),
                  buttonText: "Add to Library",
                  addToLibrary: true,
                  contentType: "video",
                })
        }
      />
      {isOnNewtContentDatabase && (
        <QuizSection
          quizInfo={quizInfo}
          onPress={handleTakeQuiz}
          isLoading={quizStatus === "loading" || contentState.isFetching}
        />
      )}
      <Description
        text={description}
        showMore={showMore}
        setShowMore={setShowMore}
      />
      <OptionsModal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        options={modalOptions}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: OFF_WHITE,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  thumbnail: {
    borderRadius: 8,
    height: 150,
    width: 266.67,
    marginHorizontal: 15,
  },
});

export default VideoScreen;
