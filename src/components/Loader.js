import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { GRAY_5, NEWT_BLUE } from "../design/colors";

const Loader = ({ isLoading, backgroundColor = GRAY_5 }) => {
  const containerStyle = StyleSheet.flatten([
    styles.container,
    { backgroundColor },
  ]);

  return (
    <View style={containerStyle}>
      <ActivityIndicator animating={isLoading} color={NEWT_BLUE} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Loader;
