import React, { useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import _ from "lodash";
import { ProgressCircle } from "react-native-svg-charts";
import { Text as SVGText } from "react-native-svg";
// Components
import Loader from "../components/shared/Loader";
import ContentListCard from "../components/ContentListCard";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Design
import { ORANGE, GRAY_2, OFF_WHITE, GRAY_5 } from "../design/colors";
import { FS24, BOLD } from "../design/typography";

const ChallengeScreen = ({ route }) => {
  const STROKE_WIDTH = 14;

  const { numItemsFinished, totalItems, itemsFinished } = route.params;
  const finishedFraction = `${numItemsFinished} / ${totalItems}`;

  const {
    state: { items: content, isFetching: contentIsFetching },
  } = useContext(ContentContext);

  const finishedBooks = itemsFinished.map((finishedId) =>
    _.find(content, { _id: finishedId })
  );

  const ProgressCircleContainer = () => (
    <View style={styles.progressCircleContainer}>
      <ProgressCircle
        style={styles.chart}
        progress={numItemsFinished / totalItems}
        strokeWidth={STROKE_WIDTH}
        progressColor={ORANGE}
        backgroundColor={GRAY_5}
        children={
          <SVGText
            textAnchor="middle"
            fontSize={FS24}
            fontWeight="700"
            fontFamily={BOLD}
            fill={GRAY_2}
          >
            {finishedFraction}
          </SVGText>
        }
      />
    </View>
  );

  return contentIsFetching ? (
    <Loader />
  ) : (
    <FlatList
      data={finishedBooks}
      renderItem={({ item, index }) => {
        let cardStyle = StyleSheet.compose([
          styles.bookCard,
          index === 0 && styles.firstBookCard,
          index === finishedBooks.length - 1 && styles.lastBookCard,
        ]);
        return (
          <ContentListCard
            title={item.name}
            authors={item.authors}
            thumbnailUrl={item.thumbnailUrl}
            cardStyle={cardStyle}
          />
        );
      }}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.booksContainer}
      ListHeaderComponent={<ProgressCircleContainer />}
    />
  );
};

const styles = StyleSheet.create({
  chart: {
    height: 200,
  },
  progressCircleContainer: {
    marginBottom: 20,
    paddingVertical: 30,
    backgroundColor: OFF_WHITE,
    borderRadius: 12,
  },
  booksContainer: {
    marginHorizontal: 15,
    marginTop: 15,
  },
  firstBookCard: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  bookCard: {
    height: 110,
  },
  lastBookCard: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomWidth: 0,
  },
});

export default ChallengeScreen;
