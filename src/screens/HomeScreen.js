import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
// Components
import Header from "../components/Header";
// Styling
import { GRAY_5 } from "../design/colors";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="newt" displayLogo />
    </View>
  );
};

HomeScreen.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Feather name="home" size={20} color={tintColor} />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_5
  }
});

export default HomeScreen;
