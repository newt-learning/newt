import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
// Components
import Header from "../components/Header";
// Styling
import { OFF_BLACK } from "../design/colors";

const AddContent = () => {
  return (
    <View>
      <Header />
      <Text style={{ fontSize: 48 }}>Add Content</Text>
    </View>
  );
};

AddContent.navigationOptions = {
  tabBarIcon: <Feather name="plus-square" size={20} color={OFF_BLACK} />
};

export default AddContent;
