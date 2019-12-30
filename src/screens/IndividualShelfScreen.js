import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import _ from "lodash";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import { HeaderTitle } from "../components/Header";
import ContentList from "../components/ContentList";
import SearchBar from "../components/SearchBar";
import { OFF_WHITE } from "../design/colors";

const IndividualShelfScreen = ({ navigation }) => {
  const {
    state: { items }
  } = useContext(ContentContext);
  const { title } = navigation.state.params;

  const filterContentByShelf = shelf => {
    return _.filter(items, item => item.shelf === shelf);
  };

  return (
    <View style={styles.container}>
      <ContentList data={filterContentByShelf(title)} />
    </View>
  );
};

IndividualShelfScreen.navigationOptions = ({ navigation }) => {
  // Get title from params
  const { title } = navigation.state.params;

  return {
    headerTitle: Platform.OS === "ios" ? <HeaderTitle title={title} /> : title,
    headerStyle: {
      backgroundColor: OFF_WHITE
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default IndividualShelfScreen;
