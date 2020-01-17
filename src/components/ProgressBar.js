import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  OFF_BLACK,
  GRAY_1,
  GRAY_2,
  GRAY_5,
  LIME_GREEN
} from "../design/colors";
import { REGULAR, FS12 } from "../design/typography";

const ProgressBar = ({ barContainerStyle, percentComplete }) => {
  const containerStyle = StyleSheet.compose(
    styles.barContainer,
    barContainerStyle
  );
  const barStyle = StyleSheet.flatten([
    styles.bar,
    {
      width: `${percentComplete}%`
    }
  ]);

  return (
    <View style={containerStyle}>
      <View style={barStyle}>
        <Text style={styles.barText}>{`${percentComplete}%`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    height: 20,
    backgroundColor: GRAY_5,
    borderRadius: 5
  },
  bar: {
    height: 20,
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: LIME_GREEN
  },
  barText: {
    fontFamily: REGULAR,
    fontSize: FS12,
    color: OFF_BLACK,
    paddingLeft: 5
  }
});

export default ProgressBar;
