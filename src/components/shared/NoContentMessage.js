import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ClearButton from "./ClearButton";
// Design
import { GRAY_5, GRAY_2, NEWT_BLUE } from "../../design/colors";
import { SEMIBOLD, REGULAR, FS20, FS16, FS14 } from "../../design/typography";

const NoContentMessage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>No Content yet?</Text>
      <Text style={styles.text}>
        Head over to the Add Content tab to add books, articles, and videos to
        your Library.
      </Text>
      <ClearButton
        title="Add Content"
        titleStyle={styles.buttonTitle}
        containerStyle={styles.buttonContainer}
        onPress={() => navigation.navigate("Add Content")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_5,
    paddingHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontFamily: SEMIBOLD,
    fontSize: FS20,
  },
  text: {
    fontFamily: REGULAR,
    fontSize: FS16,
    color: GRAY_2,
    marginTop: 5,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 15,
  },
  buttonTitle: {
    fontSize: FS14,
    color: NEWT_BLUE,
  },
});

export default NoContentMessage;
