import React, { Fragment, useContext, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import _ from "lodash";
import { Feather } from "@expo/vector-icons";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import OptionsModal from "../components/shared/OptionsModal";
import ContentList from "../components/ContentList";
// Design
import { SEMIBOLD, FS16 } from "../design/typography";
import { OFF_BLACK, GRAY_2 } from "../design/colors";

const TopicScreen = ({ route, navigation }) => {
  const { topicInfo } = route.params;
  const { state: contentState } = useContext(ContentContext);
  // Initialize modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Add the 3-dot options icon which opens the modal on the right side of the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => setIsModalVisible(true)}
        >
          <Feather name="more-horizontal" color={OFF_BLACK} size={24} />
        </TouchableOpacity>
      ),
    });
  });

  // If the topic has no content saved, show no content message
  if (_.isEmpty(topicInfo.content)) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>
          There is no content saved under this topic.
        </Text>
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
      onPress: () => console.log("Delete"),
      isDelete: true,
    },
  ];

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
