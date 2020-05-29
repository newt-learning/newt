import React, { Fragment } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import { Feather } from "@expo/vector-icons";
// Design
import { GRAY_2, GRAY_4, OFF_WHITE } from "../../design/colors";
import { SEMIBOLD, FS16 } from "../../design/typography";
import moment from "moment";

const CreateChallengeCard = () => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      style={styles.card}
      underlayColor={GRAY_4}
      onPress={() => navigation.navigate("CreateChallenge")}
    >
      <Fragment>
        <View style={styles.yearContainer}>
          <Text style={styles.year}>{moment().format("YYYY")}</Text>
        </View>
        <View style={styles.challengeInfoContainer}>
          <Text style={styles.createChallenge}>Start a Reading Challenge</Text>
          <Feather name="chevron-right" size={20} color={GRAY_2} />
        </View>
      </Fragment>
    </TouchableHighlight>
  );
};

const ChallengeCard = ({ data }) => {
  if (_.isEmpty(data)) {
    return <CreateChallengeCard />;
  }

  return (
    <TouchableHighlight style={styles.card}>
      <View style={styles.yearContainer}>
        <Text style={styles.year}>2020</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 10,
    padding: 15,
    backgroundColor: OFF_WHITE,
    borderRadius: 10,
  },
  yearContainer: {
    height: 60,
    width: 60,
    backgroundColor: GRAY_4,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  year: {
    fontFamily: SEMIBOLD,
    fontSize: FS16,
    color: GRAY_2,
  },
  challengeInfoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
  },
  createChallenge: {
    fontFamily: SEMIBOLD,
    fontSize: FS16,
    color: GRAY_2,
  },
});

export default ChallengeCard;
