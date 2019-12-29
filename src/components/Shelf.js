import React from "react";
import _ from "lodash";
import { Text, View, StyleSheet, FlatList, Image, Button } from "react-native";
import { REGULAR, SEMIBOLD, BOLD, FS14, FS24 } from "../design/typography";
import { OFF_BLACK, GRAY_1, GRAY_2, OFF_WHITE } from "../design/colors";
import { Feather } from "@expo/vector-icons";

const SeeAllCard = () => (
  <View style={styles.seeAllCard}>
    <Text style={styles.seeAllText}>See all</Text>
    <Feather name="chevron-right" color={OFF_BLACK} size={16} />
  </View>
);

const ShelfContentCard = ({ title, thumbnailUrl }) => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.thumbnail}
        resizeMode="contain"
        source={thumbnailUrl ? { uri: thumbnailUrl } : null}
      />
      <Text style={styles.bookTitle}>{title}</Text>
    </View>
  );
};

const Shelf = ({ name, data, numItems }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
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
  title: {
    fontFamily: BOLD,
    fontSize: FS24,
    color: OFF_BLACK,
    marginLeft: 15,
    marginBottom: 5
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

export default Shelf;
