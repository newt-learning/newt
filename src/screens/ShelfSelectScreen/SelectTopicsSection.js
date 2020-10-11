import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
// Components
import { H3 } from "../../components/shared/Headers";
import MultiItemSelect from "../../components/shared/MultiItemSelect";
import ShowMoreShowLess from "../../components/Content/ShowMoreShowLess";

const INITIAL_NUM_TOPICS_TO_SHOW = 8;

const SelectTopicsSection = ({
  topicsList,
  onSelectTopic,
  showMore,
  setShowMore,
  showCreateItem = true,
  topicSelectContainer: passedTopicSelectContainer,
}) => {
  const navigation = useNavigation();

  const topicSelectContainer = StyleSheet.compose([
    styles.topicSelectContainer,
    passedTopicSelectContainer,
  ]);

  return (
    <>
      <H3 style={styles.header}>Select Topic(s)</H3>
      <View style={topicSelectContainer}>
        <MultiItemSelect
          itemsList={
            showMore
              ? topicsList
              : topicsList.slice(0, INITIAL_NUM_TOPICS_TO_SHOW)
          }
          onSelect={onSelectTopic}
          showCreateItem={showCreateItem}
          onSelectCreateItem={() => navigation.navigate("CreateTopic")}
        />
      </View>
      {/* Only show the Show More button if there are more topics to show (in
          this case, more than initial num defined above) */}
      {topicsList.length > INITIAL_NUM_TOPICS_TO_SHOW ? (
        <ShowMoreShowLess showMore={showMore} setShowMore={setShowMore} />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 5,
  },
  topicSelectContainer: {
    marginHorizontal: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
});

export default SelectTopicsSection;
