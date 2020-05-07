import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { RUBY_2, OFF_BLACK } from "../../design/colors";
import { SEMIBOLD, FS18 } from "../../design/typography";

const TopicCard = ({ name }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
    </View>
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
