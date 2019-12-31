import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import { withNavigation } from "react-navigation";
import _ from "lodash";
import { Feather } from "@expo/vector-icons";
// Styling
import { REGULAR, SEMIBOLD, BOLD, FS14, FS24 } from "../design/typography";
import { OFF_BLACK, GRAY_2, GRAY_4, OFF_WHITE } from "../design/colors";

const SeeAllCard = () => (
  <View style={styles.seeAllCard}>
    <Text style={styles.seeAllText}>See all</Text>
    <Feather name="chevron-right" color={OFF_BLACK} size={16} />
  </View>
);

let ShelfContentCard = ({ title, thumbnailUrl, onPress }) => {
  return (
    <TouchableHighlight
      style={styles.card}
      onPress={onPress}
      underlayColor={GRAY_4}
    >
      <>
        <Image
          style={styles.thumbnail}
          resizeMode="contain"
          source={thumbnailUrl ? { uri: thumbnailUrl } : null}
        />
        <Text style={styles.bookTitle}>{title}</Text>
      </>
    </TouchableHighlight>
  );
};

const Shelf = ({
  name,
  data,
  numItems,
  onPressTitle,
  onPressSeeAllCard,
  navigation
}) => {
  const handleContentCardPress = data => {
    switch (data.type) {
      case "book":
        return navigation.navigate("BookScreen", { bookInfo: data });
      default:
        return;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.titleContainer} onPress={onPressTitle}>
        <>
          <Text style={styles.title}>{name}</Text>
          <Feather name="chevron-right" color={OFF_BLACK} size={24} />
        </>
      </TouchableOpacity>
      {_.isEmpty(data) ? (
        <Text style={styles.emptyText}>This shelf is empty</Text>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 15, paddingRight: 5 }}
          data={data}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <ShelfContentCard
              title={item.name}
              thumbnailUrl={
                item.bookInfo.imageLinks.thumbnail
                  ? item.bookInfo.imageLinks.thumbnail
                  : null
              }
              onPress={() => handleContentCardPress(item)}
            />
          )}
          ListFooterComponent={numItems > 4 ? <SeeAllCard /> : null}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  titleContainer: {
    marginHorizontal: 15,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontFamily: BOLD,
    fontSize: FS24,
    color: OFF_BLACK
  },
  card: {
    height: 150,
    width: 150,
    justifyContent: "center",
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: OFF_WHITE
  },
  emptyText: {
    fontSize: FS14,
    fontFamily: REGULAR,
    marginLeft: 15,
    color: GRAY_2
  },
  thumbnail: {
    height: 80,
    marginBottom: 10
  },
  bookTitle: {
    fontFamily: SEMIBOLD,
    fontSize: FS14,
    alignSelf: "center",
    textAlign: "center"
  },
  seeAllCard: {
    height: 150,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: OFF_WHITE
  },
  seeAllText: {
    fontFamily: REGULAR,
    color: OFF_BLACK,
    fontSize: FS14
  }
});

export default withNavigation(Shelf);
