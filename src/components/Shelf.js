import React from "react";
import _ from "lodash";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { REGULAR, BOLD, FS14, FS24 } from "../design/typography";
import { OFF_BLACK, GRAY_2, GRAY_4 } from "../design/colors";

const ShelfContentCard = ({ title }) => {
  return (
    <View style={styles.card}>
      <Text>{title}</Text>
    </View>
  );
};

const Shelf = ({ name, data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      {_.isEmpty(data) ? (
        <Text style={styles.emptyText}>This shelf is empty</Text>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <ShelfContentCard title={item.name} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 15
  },
  title: {
    fontFamily: BOLD,
    fontSize: FS24,
    color: OFF_BLACK,
    marginBottom: 5
  },
  card: {
    height: 150,
    width: 150,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: GRAY_4
  },
  emptyText: {
    fontSize: FS14,
    fontFamily: REGULAR,
    color: GRAY_2
  }
});

export default Shelf;
