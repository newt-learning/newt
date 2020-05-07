import React, { useState, Fragment } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import _ from "lodash";
// Components
import CreateTopicButton from "./CreateTopicButton";
import Dialog from "react-native-dialog";
import TopicCard from "./TopicCard";
// Design
import { GRAY_2, ANDROID_GREEN } from "../../design/colors";
import { SEMIBOLD, FS14 } from "../../design/typography";

const CreateTopicDialog = ({
  visible,
  topicName,
  onChangeText,
  onCancel,
  onSubmit,
}) => (
  <Dialog.Container visible={visible}>
    <Dialog.Title>Create topic</Dialog.Title>
    <Dialog.Input
      value={topicName}
      onChangeText={onChangeText}
      underlineColorAndroid={ANDROID_GREEN}
    />
    <Dialog.Button label="Cancel" onPress={onCancel} />
    <Dialog.Button label="Create" onPress={onSubmit} />
  </Dialog.Container>
);

const TopicsSection = ({ items, onCreateTopic, ButtonGroupHeader }) => {
  const [topicName, setTopicName] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  // Functions to handle cancelling and submitting from CreateTopicDialog
  const onCancelDialog = () => {
    setDialogVisible(false);
    setTopicName("");
  };
  const onSubmitDialog = () => {
    onCreateTopic({ name: topicName });
    setDialogVisible(false);
    setTopicName("");
  };

  if (_.isEmpty(items)) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>
          Looks like you haven't created any topics. You can use topics to
          organize your content.
        </Text>
        <CreateTopicButton onPress={() => setDialogVisible(true)} />
        <CreateTopicDialog
          visible={dialogVisible}
          topicName={topicName}
          onChangeText={setTopicName}
          onCancel={onCancelDialog}
          onSubmit={onSubmitDialog}
        />
      </View>
    );
  }

  return (
    <Fragment>
      <FlatList
        ListHeaderComponent={<ButtonGroupHeader />}
        ListHeaderComponentStyle={{ marginBottom: 15 }}
        ListFooterComponent={
          <CreateTopicButton onPress={() => setDialogVisible(true)} />
        }
        ListFooterComponentStyle={{ marginHorizontal: 15, marginTop: 20 }}
        data={items}
        numColumns={2}
        renderItem={({ item }) => <TopicCard name={item.name} />}
        keyExtractor={(topic) => topic._id}
        columnWrapperStyle={styles.columnContainer}
      />
      <CreateTopicDialog
        visible={dialogVisible}
        topicName={topicName}
        onChangeText={setTopicName}
        onCancel={onCancelDialog}
        onSubmit={onSubmitDialog}
      />
    </Fragment>
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
