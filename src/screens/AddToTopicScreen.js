import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
// Context
import { Context as TopicsContext } from "../context/TopicsContext";
// Components
import Loader from "../components/shared/Loader";
import ListSelect from "../components/shared/ListSelect";
import { BOLD, FS20 } from "../design/typography";
import { OFF_BLACK } from "../design/colors";

const AddToTopicScreen = () => {
  const {
    state: { isFetching, items },
    fetchTopics,
  } = useContext(TopicsContext);

  useEffect(() => {
    fetchTopics();
  }, []);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Topic(s)</Text>
      {items.map((item) => (
        <ListSelect name={item.name} key={item._id} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontFamily: BOLD,
    fontSize: FS20,
    color: OFF_BLACK,
    marginTop: 20,
    marginBottom: 5,
    marginHorizontal: 15,
  },
});

export default AddToTopicScreen;
