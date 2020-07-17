import React from "react";
import { Image, StyleSheet } from "react-native";

const StackedImages = ({ imageUrls }) => {
  return (
    <>
      {imageUrls[2] && (
        <Image
          source={{ uri: imageUrls[2] }}
          style={StyleSheet.compose(styles.image, styles.thirdImage)}
        />
      )}
      {imageUrls[1] && (
        <Image
          source={{ uri: imageUrls[1] }}
          style={StyleSheet.compose(styles.image, styles.secondImage)}
        />
      )}
      {imageUrls[0] && (
        <Image
          source={{ uri: imageUrls[0] }}
          style={StyleSheet.compose(styles.image, styles.frontImage)}
          resizeMode="contain"
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 8,
    height: 150,
  },
  frontImage: {
    width: 267,
  },
  secondImage: {
    position: "absolute",
    top: -9,
    width: 255,
  },
  thirdImage: {
    position: "absolute",
    top: -17,
    width: 240,
  },
});

export default StackedImages;
