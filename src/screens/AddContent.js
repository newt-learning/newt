import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
// Styling
import { OFF_BLACK } from "../design/colors";

const AddContent = () => {
  return (
    <View style={{ marginTop: 40 }}>
      <Text style={{ fontSize: 48 }}>Add Content</Text>
    </View>
  );
};

AddContent.navigationOptions = {
  tabBarIcon: <Feather name="plus-square" size={20} color={OFF_BLACK} />
};

export default AddContent;
