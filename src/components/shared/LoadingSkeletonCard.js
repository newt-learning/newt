import React from "react";
import { View, StyleSheet } from "react-native";
import { OFF_WHITE } from "../../design/colors";

const LoadingSkeletonCard = ({
  height = 150,
  width = 150,
  backgroundColor = OFF_WHITE,
}) => {
  const containerStyle = StyleSheet.compose([
    styles.container,
    { height, width, backgroundColor },
  ]);

  return <View style={containerStyle} />;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginRight: 10,
  },
});

export default LoadingSkeletonCard;
