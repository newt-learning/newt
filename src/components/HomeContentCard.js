import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight
} from "react-native";
// Components
import ProgressBar from "./ProgressBar";
// Design
import { SEMIBOLD, REGULAR, FS16, FS14 } from "../design/typography";
import { OFF_BLACK, GRAY_2, GRAY_4, OFF_WHITE } from "../design/colors";

const HomeContentCard = ({
  title,
  authors,
  thumbnailUrl,
  percentComplete,
  onPress
}) => {
  return (
    <TouchableHighlight
      style={styles.card}
      underlayColor={GRAY_4}
      onPress={onPress}
    >
      <>
        <Image
          style={styles.thumbnail}
          resizeMode="contain"
          source={thumbnailUrl ? { uri: thumbnailUrl } : null}
        />
        <View style={styles.info}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>by {authors.join(", ")}</Text>
          </View>
          <ProgressBar
            percentComplete={percentComplete}
            barContainerStyle={styles.progressBar}
            barStyle={styles.progressBar}
          />
        </View>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 10,
    padding: 15,
    backgroundColor: OFF_WHITE,
    borderRadius: 10
  },
  thumbnail: {
    height: 100,
    width: 66,
    marginRight: 15
  },
  info: {
    height: 100,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  title: {
    fontFamily: SEMIBOLD,
    fontSize: FS16,
    color: OFF_BLACK
  },
  author: {
    fontFamily: REGULAR,
    fontSize: FS14,
    color: GRAY_2,
    marginBottom: 10
  },
  progressBar: {
    height: 15
  }
});

export default HomeContentCard;
