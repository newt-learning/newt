import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderTitle } from "../components/Header";
import { OFF_WHITE } from "../design/colors";

const IndividualShelfScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>shelf</Text>
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
