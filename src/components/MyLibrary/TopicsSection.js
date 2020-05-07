import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import _ from "lodash";
// Components
import CreateTopicButton from "./CreateTopicButton";
import Dialog from "react-native-dialog";
import TopicCard from "./TopicCard";
// Design
import { GRAY_2, ANDROID_GREEN } from "../../design/colors";
import { SEMIBOLD, FS14 } from "../../design/typography";

const TopicsSection = ({ items, onCreateTopic, ButtonGroupHeader }) => {
  const [topicName, setTopicName] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  if (_.isEmpty(items)) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>
          Looks like you haven't created any topics. You can use topics to
          organize your content.
        </Text>
        <CreateTopicButton onPress={() => setDialogVisible(true)} />
        <Dialog.Container visible={dialogVisible}>
          <Dialog.Title>Create topic</Dialog.Title>
          <Dialog.Input
            value={topicName}
            onChangeText={setTopicName}
            underlineColorAndroid={ANDROID_GREEN}
          />
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              setDialogVisible(false);
              setTopicName("");
            }}
          />
          <Dialog.Button
            label="Create"
            onPress={() => {
              onCreateTopic({ name: topicName });
              setDialogVisible(false);
              setTopicName("");
            }}
          />
        </Dialog.Container>
      </View>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={<ButtonGroupHeader />}
      ListHeaderComponentStyle={{ marginBottom: 15 }}
      data={items}
      numColumns={2}
      renderItem={({ item }) => <TopicCard name={item.name} />}
      keyExtractor={(topic) => topic._id}
      columnWrapperStyle={styles.columnContainer}
    />
  );
};

const styles = StyleSheet.create({
  columnContainer: {
    marginHorizontal: 10,
  },
  noDataText: {
    textAlign: "center",
    fontFamily: SEMIBOLD,
    fontSize: FS14,
    color: GRAY_2,
  },
});

export default TopicsSection;
