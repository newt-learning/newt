import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
// Components
import Header from "../components/Header";
// Styling
import { NEWT_BLUE, OFF_BLACK, GRAY_3 } from "../design/colors";
import { FS14 } from "../design/typography";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="newt" displayLogo />
    </View>
  );
};

HomeScreen.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Feather name="home" size={20} color={focused ? NEWT_BLUE : OFF_BLACK} />
  )
};

HomeScreen.tabBarOptions = {
  activeTintColor: NEWT_BLUE,
  showLabel: false
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default HomeScreen;
