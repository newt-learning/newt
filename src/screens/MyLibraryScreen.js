import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Context as ContentContext } from "../context/ContentContext";

const MyLibraryScreen = () => {
  const { state, fetchContent } = useContext(ContentContext);

  // Fetch content data
  useEffect(() => {
    fetchContent();
  }, []);

  return <View></View>;
};

const styles = StyleSheet.create({});

export default MyLibraryScreen;
