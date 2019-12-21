import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button, SocialIcon } from "react-native-elements";
// Context
import { Context as AuthContext } from "../context/AuthContext";
// Styling
import { WHITE, GRAY_2, GRAY_3, NEWT_BLUE } from "../design/colors";

const SignInScreen = () => {
  const { state, authenticateWithGoogle } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>newt</Text>
      <View style={{ width: "100%" }}>
        <Button
          icon={
            <Image
              source={require("../../assets/google-logo.png")}
              style={styles.icon}
            />
          }
          title="Sign in with Google"
          titleStyle={styles.buttonTitle}
          onPress={authenticateWithGoogle}
          buttonStyle={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NEWT_BLUE,
    alignItems: "center",
    justifyContent: "space-around"
  },
  title: {
    fontFamily: "Righteous",
    letterSpacing: 2,
    color: "white",
    fontSize: 64,
    fontWeight: "bold"
  },
  button: {
    backgroundColor: WHITE,
    justifyContent: "center",
    borderRadius: 8,
    marginRight: 25,
    marginLeft: 25
  },
  icon: {
    width: 25,
    height: 25,
    marginHorizontal: 25
  },
  buttonTitle: {
    color: GRAY_2,
    fontFamily: "Muli-SemiBold",
    marginRight: 25,
    fontSize: 16
  }
});

export default SignInScreen;
