import React, { useState, useContext, useLayoutEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import _ from "lodash";
import { ProgressCircle } from "react-native-svg-charts";
import { Text as SVGText } from "react-native-svg";
// Components
import Loader from "../components/shared/Loader";
import ContentListCard from "../components/ContentListCard";
import MoreOptionsButton from "../components/shared/MoreOptionsButton";
import OptionsModal from "../components/shared/OptionsModal";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Design
import { ORANGE, GRAY_2, OFF_WHITE, GRAY_5 } from "../design/colors";
import { FS24, BOLD } from "../design/typography";
// Helpers
import { handleContentNavigation } from "../helpers/screenHelpers";

const ChallengeScreen = ({ navigation, route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Display more options icon on the right side of the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MoreOptionsButton onPress={() => setIsModalVisible(true)} />
      ),
    });
  });

  // Constants for chart
  const STROKE_WIDTH = 14;

  // Get challenge data passed into route
  const { challengeData } = route.params;
  const { numItemsFinished, totalItems, itemsFinished } = challengeData;
  const finishedFraction = `${numItemsFinished} / ${totalItems}`;

  // Get content data to display the books that have been finished
  const {
    state: { items: content, isFetching: contentIsFetching },
  } = useContext(ContentContext);
  const finishedBooks = itemsFinished.map((finishedId) =>
    _.find(content, { _id: finishedId })
  );

  // List of buttons in the options modal
  const modalOptions = [
    {
      title: "Edit",
      onPress: () => {
        navigation.navigate("EditChallenge", { challengeData });
        setIsModalVisible(false);
      },
    },
    {
      title: "Delete",
      onPress: () => {
        console.log("Delete");
        setIsModalVisible(true);
      },
      isDelete: true,
    },
  ];

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
    <View style={{ flex: 1 }}>
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
              onPress={() => handleContentNavigation(item, navigation)}
              cardStyle={cardStyle}
            />
          );
        }}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.booksContainer}
        ListHeaderComponent={<ProgressCircleContainer />}
      />
      <OptionsModal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        options={modalOptions}
      />
    </View>
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
