import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
// Components
import Header from "../components/Header";
// Context
import { Context as AuthContext } from "../context/AuthContext";
// Styling
import { GRAY_5 } from "../design/colors";

const ProfileScreen = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Header title="Profile" />
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
};

ProfileScreen.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Feather name="user" size={20} color={tintColor} />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_5
  }
});

export default ProfileScreen;
