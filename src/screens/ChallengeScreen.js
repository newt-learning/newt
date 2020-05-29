import React from "react";
import { View, StyleSheet } from "react-native";
import { ProgressCircle } from "react-native-svg-charts";
import { Text } from "react-native-svg";
import { ORANGE, GRAY_2, GRAY_4 } from "../design/colors";
import { FS24, BOLD } from "../design/typography";

const ChallengeScreen = ({ route }) => {
  const STROKE_WIDTH = 14;

  const { numItemsFinished, totalItems } = route.params;
  const finishedFraction = `${numItemsFinished} / ${totalItems}`;

  return (
    <View>
      <ProgressCircle
        style={styles.chart}
        progress={numItemsFinished / totalItems}
        strokeWidth={STROKE_WIDTH}
        progressColor={ORANGE}
        backgroundColor={GRAY_4}
        children={
          <Text
            textAnchor="middle"
            fontSize={FS24}
            fontWeight="700"
            fontFamily={BOLD}
            fill={GRAY_2}
          >
            {finishedFraction}
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    height: 200,
    marginTop: 30,
  },
});

export default ChallengeScreen;
