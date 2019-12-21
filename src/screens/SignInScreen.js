import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button, SocialIcon } from "react-native-elements";
// Context
import { Context as AuthContext } from "../context/AuthContext";
// Styling
import { WHITE, GRAY_2, GRAY_3, NEWT_BLUE } from "../design/colors";
import { SEMIBOLD, FS16, FS72 } from "../design/typography";

const SignInScreen = () => {
  const {
    state: { isFetching },
    authenticateWithGoogle
  } = useContext(AuthContext);

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
          loading={isFetching}
          loadingProps={{ color: NEWT_BLUE }}
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
    fontSize: FS72
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
    fontFamily: SEMIBOLD,
    marginRight: 25,
    fontSize: FS16
  }
});

export default SignInScreen;
