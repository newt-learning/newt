import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
// Context
import { Context as AuthContext } from "../context/AuthContext";

const SignInScreen = () => {
  const { state, authenticateWithGoogle } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>newt</Text>
      <View>
        <Button title="Sign in with Google" onPress={authenticateWithGoogle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38ceff",
    alignItems: "center",
    justifyContent: "space-around"
  },
  title: {
    color: "white",
    fontSize: 56,
    fontWeight: "bold"
  }
});

export default SignInScreen;
