import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
// Context
import { Context as AuthContext } from "../context/AuthContext";
// Styling
import { GRAY_5 } from "../design/colors";

const ProfileScreen = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_5
  }
});

export default ProfileScreen;
