import React, { useContext, useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import _ from "lodash";
import { Feather } from "@expo/vector-icons";
// Context
import { Context as ContentContext } from "../context/ContentContext";
import { Context as TopicsContext } from "../context/TopicsContext";
// Components
import OptionsModal from "../components/shared/OptionsModal";
import ContentList from "../components/ContentList";
import Loader from "../components/shared/Loader";
import { NavHeaderTitle } from "../components/shared/Headers";
import initiateDeleteConfirmation from "../components/shared/initiateDeleteConfirmation";
// Design
import { SEMIBOLD, FS16 } from "../design/typography";
import { OFF_BLACK, GRAY_2 } from "../design/colors";

const TopicScreen = ({ route, navigation }) => {
  const topic = route.params.topicInfo;
  const [topicInfo, setTopicInfo] = useState(topic);

  const { state: contentState, fetchContent } = useContext(ContentContext);
  const { state: topicsState, deleteTopicAndAssociatedContent } = useContext(
    TopicsContext
  );
  // Initialize modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Add the 3-dot options icon which opens the modal on the right side of the header.
  // Also added title and headerTitle options here so that they update once the
  // topic has been updated (see useEffect below)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: topicInfo.name,
      headerTitle: () => <NavHeaderTitle title={topicInfo.name} />,
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => setIsModalVisible(true)}
        >
          <Feather name="more-horizontal" color={OFF_BLACK} size={24} />
        </TouchableOpacity>
      ),
      // Work around to title truncation not working as expected in react-navigation
      // https://github.com/react-navigation/react-navigation/issues/7057#issuecomment-593086348
      headerTitleContainerStyle: {
        width: Platform.OS === "ios" ? "60%" : "70%",
        alignItems: Platform.OS === "ios" ? "center" : "flex-start",
      },
      headerBackTitle: "Back",
    });
  }, [topicInfo]);

  // This useEffect call has a listener that will update the topic on this screen
  // by getting the data from topic state. I've added this so that when a topic
  // is updated for EditTopicScreen, when we go back to this screen the topicInfo
  // data will be old (after updating). Thus this listener will get the new data
  // from topic state and set it to this screen's state. My first solution was
  // to use navigation.navigate('Topic', ...props) instead of navigation.goBack()
  // with an updated prop to indicate the data has been updated, but doing
  // that weirdly took me to the Topic screen on the Home stack instead of the
  // My Library stack where the edit took place. Don't know why, maybe has
  // something to do with going from Presentation modal to normal screen in the
  // stack. The solution is inefficient/not ideal but not sure how else to do
  // this without deviating from always getting data from context (single source),
  // it'll probably change for the better once the reducer state data format is
  // re-done a bit better.
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const topic = _.filter(topicsState.items, { _id: topicInfo._id })[0];
      setTopicInfo(topic);
    });

    return unsubscribe;
  }, [navigation, topicsState.items]);

  // List of buttons in the options modal
  const modalOptions = [
    {
      title: "Edit",
      onPress: () => {
        navigation.navigate("EditTopic", { topicInfo });
        setIsModalVisible(false);
      },
    },
    {
      title: "Delete",
      onPress: () => {
        // Hide the options modal
        setIsModalVisible(false);
        // Put the delete ActionSheet/Alert in a timer so that the modal
        // animation finishes first, otherwise the ActionSheet/Alert appears
        // then immediately disappears. This is def not the proper way of
        // handling this, but can't find good info on how to handle this
        // particular case
        setTimeout(function () {
          const deleteMessage = "Are you sure you want to delete this topic?";
          const onDelete = async () => {
            await deleteTopicAndAssociatedContent(topicInfo._id);
            // Fetch all content (for now, should really be only changed ones),
            // because they'll be updated after deleting the topic
            fetchContent();
            navigation.goBack();
          };

          initiateDeleteConfirmation(deleteMessage, onDelete);
        }, 400);
      },
      isDelete: true,
    },
  ];

  // Show Loader if either content or topics is fetching
  if (contentState.isFetching || topicsState.isFetching) {
    return <Loader />;
  }

  // If the topic has no content saved, show no content message
  if (_.isEmpty(topicInfo.content)) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>
          There is no content saved under this topic.
        </Text>
        <OptionsModal
          isVisible={isModalVisible}
          onBackdropPress={() => setIsModalVisible(false)}
          options={modalOptions}
        />
      </View>
    );
  }

  // The topicInfo prop passed down has an array of contentIds which belong to
  // this topic. For each contentId, find the content data and create an array
  // of all content data to be passed to ContentList component (should really
  // be done server-side or through state management, but client-side is a
  // quicker temp. solution).
  const contentData = _.map(topicInfo.content, (contentId) => {
    return _.find(contentState.items, { _id: contentId });
  });

  return (
    <View style={{ flex: 1 }}>
      <ContentList data={contentData} />
      <OptionsModal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        options={modalOptions}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noDataText: {
    marginHorizontal: 15,
    marginTop: 20,
    fontFamily: SEMIBOLD,
    fontSize: FS16,
    color: GRAY_2,
    textAlign: "center",
  },
});

export default TopicScreen;
