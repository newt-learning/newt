import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
// Components
import Header from "../components/Header";
// Context
import { Context as AuthContext } from "../context/AuthContext";
// Styling
import { OFF_BLACK } from "../design/colors";

const ProfileScreen = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <View>
      <Header />
      <Text style={{ fontSize: 48 }}>Profile</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
};

ProfileScreen.navigationOptions = {
  tabBarIcon: <Feather name="user" size={20} color={OFF_BLACK} />
};

export default ProfileScreen;
