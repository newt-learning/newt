import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { GRAY_5, NEWT_BLUE } from "../design/colors";

const Loader = ({ isLoading }) => (
  <View style={styles.container}>
    <ActivityIndicator animating={isLoading} color={NEWT_BLUE} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: GRAY_5
  }
});

export default Loader;
