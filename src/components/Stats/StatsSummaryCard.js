import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { Feather } from "@expo/vector-icons";
// Design
import { OFF_WHITE, BLUE, GRAY_1, GRAY_4 } from "../../design/colors";
import { SEMIBOLD, FS18, FS16 } from "../../design/typography";

const StatsSummaryCard = ({
  contentType,
  summarySentence,
  onPress,
  cardStyle: passedCardStyle,
  showChevron = true,
}) => {
  const cardStyle = StyleSheet.flatten([styles.card, passedCardStyle]);

  return (
    <TouchableHighlight
      style={cardStyle}
      underlayColor={GRAY_4}
      onPress={onPress}
    >
      <>
        <View style={styles.statsTitleContainer}>
          <View style={{ flexDirection: "row" }}>
            <Feather name="book" size={22} color={BLUE} />
            <Text style={styles.statsTitle}>{contentType}</Text>
          </View>
          {showChevron && (
            <Feather name="chevron-right" size={20} color={BLUE} />
          )}
        </View>
        <Text style={styles.summary}>{summarySentence}</Text>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    marginHorizontal: 10,
    marginTop: 10,
    padding: 15,
    backgroundColor: OFF_WHITE,
    borderRadius: 10,
  },
  statsTitleContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statsTitle: {
    fontFamily: SEMIBOLD,
    fontSize: FS18,
    color: BLUE,
    marginLeft: 5,
  },
  summary: {
    fontFamily: SEMIBOLD,
    fontSize: FS16,
    color: GRAY_1,
    marginTop: 15,
  },
});

export default StatsSummaryCard;
