import React, { Fragment } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
// Components
import CreateTopicButton from "./CreateTopicButton";
import TopicCard from "./TopicCard";
// Design
import { GRAY_2 } from "../../design/colors";
import { SEMIBOLD, FS14 } from "../../design/typography";

const TopicsSection = ({ items, ButtonGroupHeader }) => {
  const navigation = useNavigation();

  if (_.isEmpty(items)) {
    return (
      <View style={styles.container}>
        <ButtonGroupHeader />
        <Text style={styles.noDataText}>
          Looks like you haven't created any topics. You can use topics to
          organize your content.
        </Text>
        <CreateTopicButton onPress={() => navigation.navigate("CreateTopic")} />
      </View>
    );
  }

  return (
    <Fragment>
      <FlatList
        ListHeaderComponent={<ButtonGroupHeader />}
        ListHeaderComponentStyle={{ marginBottom: 15 }}
        ListFooterComponent={
          <CreateTopicButton
            onPress={() => navigation.navigate("CreateTopic")}
          />
        }
        ListFooterComponentStyle={{ marginHorizontal: 15, marginTop: 20 }}
        data={items}
        numColumns={2}
        renderItem={({ item }) => <TopicCard name={item.name} />}
        keyExtractor={(topic) => topic._id}
        columnWrapperStyle={styles.columnContainer}
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
