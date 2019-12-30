// A list of cards of content (used in listing search results and shelves)
import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import _ from "lodash";
// Components
import SearchBar from "./SearchBar";
import ContentListCard from "./ContentListCard";
// Styling
import { SEMIBOLD, FS16 } from "../design/typography";
import { GRAY_2 } from "../design/colors";

const ContentList = ({ data, SearchBar }) => {
  return (
    <View style={styles.container}>
      {/* If a SearchBar component is passed down, render it */}
      {SearchBar ? SearchBar : null}
      {_.isEmpty(data) ? (
        <Text style={styles.text}>Nothing to show.</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ContentListCard
              title={item.name}
              authors={item.authors}
              thumbnailUrl={item.thumbnailUrl}
              onPress={() => console.log(item.name)}
            />
          )}
          keyExtractor={item => item._id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    marginHorizontal: 15,
    marginTop: 5,
    fontFamily: SEMIBOLD,
    fontSize: FS16,
    color: GRAY_2
  }
});

export default ContentList;
