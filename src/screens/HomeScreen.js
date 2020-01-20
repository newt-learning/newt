import React, { useContext } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import _ from "lodash";
import { Feather } from "@expo/vector-icons";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import Loader from "../components/Loader";
import ClearButton from "../components/ClearButton";
// Styling
import {
  BOLD,
  SEMIBOLD,
  REGULAR,
  FS32,
  FS20,
  FS16,
  FS14
} from "../design/typography";
import { GRAY_2, GRAY_5, NEWT_BLUE } from "../design/colors";

const HomeScreen = ({ navigation }) => {
  const {
    state: { isFetching, items }
  } = useContext(ContentContext);

  const NoContentMessage = () => (
    <View style={styles.noContentContainer}>
      <Text style={styles.noContentHeader}>No Content yet?</Text>
      <Text style={styles.noContentText}>
        Head over to the Add Content tab to add books, articles, and videos to
        your Library.
      </Text>
      <ClearButton
        title="Add Content"
        titleStyle={{ fontSize: FS14, color: NEWT_BLUE }}
        containerStyle={{ marginTop: 15 }}
        onPress={() => navigation.navigate("Add Content")}
      />
    </View>
  );

  // If data is being fetched, show loading spinner
  if (isFetching) {
    return <Loader isLoading={isFetching} />;
  }

  // If there's no data and it's not currently being fetched, show the "No Content"
  // message
  if (!isFetching && _.isEmpty(items)) {
    return <NoContentMessage />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>In Progress</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY_5
  },
  title: {
    fontFamily: BOLD,
    fontSize: FS32,
    marginTop: 20,
    marginHorizontal: 15
  },
  noContentContainer: {
    flex: 1,
    backgroundColor: GRAY_5,
    paddingHorizontal: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  noContentHeader: {
    fontFamily: SEMIBOLD,
    fontSize: FS20
  },
  noContentText: {
    fontFamily: REGULAR,
    fontSize: FS16,
    color: GRAY_2,
    marginTop: 5,
    textAlign: "center"
  }
});

export default HomeScreen;
