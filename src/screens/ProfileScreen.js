import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import ClearButton from "../components/ClearButton";
// Context
import { Context as AuthContext } from "../context/AuthContext";
// Styling
import { GRAY_5 } from "../design/colors";
import { FS18, SEMIBOLD } from "../design/typography";

const ProfileScreen = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ClearButton
        title="Sign out"
        onPress={signOut}
        titleStyle={{ fontSize: FS18, fontFamily: SEMIBOLD }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_5,
    flexDirection: "column-reverse",
    paddingBottom: 50
  }
});

export default ProfileScreen;
