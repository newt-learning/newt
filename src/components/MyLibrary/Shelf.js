import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import { Feather } from "@expo/vector-icons";
// Components
import { H2 } from "../shared/Headers";
import ShelfContentCard from "./ShelfContentCard";
// Styling
import { REGULAR, FS14 } from "../../design/typography";
import { OFF_BLACK, GRAY_2, GRAY_4, OFF_WHITE } from "../../design/colors";
// Helpers
import { handleContentNavigation } from "../../helpers/screenHelpers";

const SeeAllCard = ({ onPress }) => (
  <TouchableHighlight
    style={styles.seeAllCard}
    onPress={onPress}
    underlayColor={GRAY_4}
  >
    <>
      <Text style={styles.seeAllText}>See all</Text>
      <Feather name="chevron-right" color={OFF_BLACK} size={16} />
    </>
  </TouchableHighlight>
);

const Shelf = ({ name, data, numItems, onPressTitle }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.titleContainer} onPress={onPressTitle}>
        <>
          <H2>{name}</H2>
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
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ShelfContentCard
              title={item.name}
              thumbnailUrl={item.thumbnailUrl}
              type={item.type}
              onPress={() => handleContentNavigation(item, navigation)}
            />
          )}
          ListFooterComponent={
            numItems > 4 ? <SeeAllCard onPress={onPressTitle} /> : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  titleContainer: {
    marginHorizontal: 15,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emptyText: {
    fontSize: FS14,
    fontFamily: REGULAR,
    marginLeft: 15,
    color: GRAY_2,
  },
  seeAllCard: {
    height: 150,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: OFF_WHITE,
  },
  seeAllText: {
    fontFamily: REGULAR,
    color: OFF_BLACK,
    fontSize: FS14,
  },
});

export default Shelf;
