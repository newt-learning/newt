import React, { Fragment } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import moment from "moment";
import { Feather } from "@expo/vector-icons";
// Components
import Loader from "../shared/Loader";
import ProgressBar from "../shared/ProgressBar";
// Design
import {
  GRAY_2,
  GRAY_4,
  OFF_WHITE,
  ORANGE,
  ORANGE_5,
} from "../../design/colors";
import { SEMIBOLD, FS16, FS18 } from "../../design/typography";
// Helpers
import { calculatePercentComplete } from "../../helpers/screenHelpers";

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
        <View style={styles.createChallengeContainer}>
          <Text style={styles.createChallenge}>Start a Reading Challenge</Text>
          <Feather name="chevron-right" size={20} color={GRAY_2} />
        </View>
      </Fragment>
    </TouchableHighlight>
  );
};

const ChallengeCard = ({ data, isFetching }) => {
  const { year, totalItems, numItemsFinished } = data[0];

  if (_.isEmpty(data)) {
    return <CreateChallengeCard />;
  }

  if (isFetching) {
    return (
      <TouchableHighlight style={[styles.card, styles.loadingCard]}>
        <Loader backgroundColor={OFF_WHITE} />
      </TouchableHighlight>
    );
  }

  return (
    <TouchableHighlight style={styles.card}>
      <Fragment>
        <View style={[styles.yearContainer, styles.activeYearContainer]}>
          <Text style={[styles.year, styles.activeYear]}>{year}</Text>
        </View>
        <View style={styles.challengeInfoContainer}>
          <Text style={styles.title}>Reading Challenge</Text>
          <ProgressBar
            percentComplete={calculatePercentComplete(
              numItemsFinished,
              totalItems
            )}
            displayPercentText={false}
          />
        </View>
      </Fragment>
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
  loadingCard: {
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  yearContainer: {
    height: 60,
    width: 60,
    backgroundColor: GRAY_4,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  activeYearContainer: {
    backgroundColor: ORANGE,
  },
  year: {
    fontFamily: SEMIBOLD,
    fontSize: FS16,
    color: GRAY_2,
  },
  activeYear: {
    color: ORANGE_5,
  },
  createChallengeContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
  },
  challengeInfoContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    marginLeft: 10,
  },
  createChallenge: {
    fontFamily: SEMIBOLD,
    fontSize: FS16,
    color: GRAY_2,
  },
  title: {
    fontFamily: SEMIBOLD,
    fontSize: FS18,
    color: ORANGE,
  },
});

export default ChallengeCard;
