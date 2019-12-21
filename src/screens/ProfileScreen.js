import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
// Context
import { Context as AuthContext } from "../context/AuthContext";

const ProfileScreen = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={{ marginTop: 40 }}>
      <Text style={{ fontSize: 48 }}>Profile</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
};

export default ProfileScreen;
