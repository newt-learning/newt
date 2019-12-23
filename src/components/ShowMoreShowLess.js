import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { REGULAR, FS14 } from "../design/typography";
import { GRAY_2 } from "../design/colors";

const ShowMoreShowLess = ({ showMore, setShowMore }) => {
  return showMore ? (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setShowMore(false)}
    >
      <Feather name="chevron-up" size={16} color={GRAY_2} />
      <Text style={styles.text}>Show Less</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setShowMore(true)}
    >
      <Text style={styles.text}>Show More</Text>
      <Feather name="chevron-down" size={16} color={GRAY_2} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: "center"
  },
  text: {
    fontFamily: REGULAR,
    fontSize: FS14,
    color: GRAY_2
  }
});

export default ShowMoreShowLess;
