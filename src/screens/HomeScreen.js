import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
// Components
import Header from "../components/Header";
// Styling
import { OFF_BLACK } from "../design/colors";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={{ fontSize: 48 }}>Home Screen</Text>
    </View>
  );
};

HomeScreen.navigationOptions = {
  tabBarIcon: <Feather name="home" size={20} color={OFF_BLACK} />
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default HomeScreen;
