import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RUBY_2, OFF_BLACK } from "../../design/colors";
import { SEMIBOLD, FS18 } from "../../design/typography";

const TopicCard = ({ topicInfo }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.3}
      onPress={() => navigation.navigate("Topic", { topicInfo })}
    >
      <Text style={styles.name}>{topicInfo.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    backgroundColor: RUBY_2,
    margin: 5,
    borderRadius: 12,
  },
  name: {
    fontFamily: SEMIBOLD,
    fontSize: FS18,
    color: OFF_BLACK,
  },
});

export default TopicCard;
