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
  GRAY_1,
  GRAY_2,
  GRAY_4,
  OFF_WHITE,
  ORANGE,
  ORANGE_5,
} from "../../design/colors";
import { SEMIBOLD, REGULAR, FS18, FS16, FS14 } from "../../design/typography";
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
  const navigation = useNavigation();

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
    <TouchableHighlight
      style={styles.card}
      underlayColor={GRAY_4}
      onPress={() => navigation.navigate("Challenge")}
    >
      <Fragment>
        <View style={[styles.yearContainer, styles.activeYearContainer]}>
          <Text style={[styles.year, styles.activeYear]}>{year}</Text>
        </View>
        <View style={styles.challengeInfoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Reading Challenge</Text>
            <Feather name="chevron-right" size={20} color={ORANGE} />
          </View>

          <View style={styles.progressBarContainer}>
            {/* Progress bar of number of books read so far */}
            <ProgressBar
              percentComplete={calculatePercentComplete(
                numItemsFinished,
                totalItems
              )}
              barContainerStyle={{ width: "77%" }}
              displayPercentText={false}
            />
            {/* Number of books read so far over total */}
            <Text
              style={styles.numCompleted}
            >{`${numItemsFinished}/${totalItems}`}</Text>
          </View>
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
  progressBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  createChallenge: {
    fontFamily: SEMIBOLD,
    fontSize: FS16,
    color: GRAY_2,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: SEMIBOLD,
    fontSize: FS18,
    color: ORANGE,
  },
  numCompleted: {
    fontFamily: REGULAR,
    fontSize: FS14,
    color: GRAY_1,
  },
});

export default ChallengeCard;
