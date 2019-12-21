import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
// Components
import Header from "../components/Header";
// Styling
import { OFF_BLACK } from "../design/colors";

const HomeScreen = () => {
  return (
    <View>
      <Header />
      <Text style={{ fontSize: 48 }}>Home Screen</Text>
    </View>
  );
};

HomeScreen.navigationOptions = {
  tabBarIcon: <Feather name="home" size={20} color={OFF_BLACK} />
};

export default HomeScreen;
