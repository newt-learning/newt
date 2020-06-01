import React, { useContext } from "react";
import { View, StyleSheet, Image } from "react-native";
// Components
import ClearButton from "../components/shared/ClearButton";
import { H2 } from "../components/shared/Headers";
// Context
import { Context as AuthContext } from "../context/AuthContext";
// Styling
import { GRAY_5, OFF_BLACK } from "../design/colors";
import { FS18, SEMIBOLD } from "../design/typography";

const ProfileScreen = () => {
  const {
    state: { userInfo },
    signOut,
  } = useContext(AuthContext);

  if (userInfo === null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Image
          source={require("../../assets/icons8-owl-64.png")}
          style={{ width: 64, height: 64 }}
        />
        <H2 style={{ marginTop: 20, color: OFF_BLACK }}>
          {userInfo.firstName} {userInfo.lastName}
        </H2>
      </View>
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
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 50,
  },
  userInfoContainer: {
    alignItems: "center",
  },
});

export default ProfileScreen;
