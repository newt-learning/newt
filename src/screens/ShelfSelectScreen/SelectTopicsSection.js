import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
// Components
import { H3 } from "../../components/shared/Headers";
import MultiItemSelect from "../../components/shared/MultiItemSelect";

const SelectTopicsSection = ({
  topicsList,
  onSelectTopic,
  showCreateItem = true,
}) => {
  const navigation = useNavigation();

  return (
    <>
      <H3 style={styles.header}>Select Topic(s)</H3>
      <View style={styles.topicSelectContainer}>
        <MultiItemSelect
          itemsList={topicsList}
          onSelect={onSelectTopic}
          showCreateItem={showCreateItem}
          onSelectCreateItem={() => navigation.navigate("CreateTopic")}
        />
      </View>
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
