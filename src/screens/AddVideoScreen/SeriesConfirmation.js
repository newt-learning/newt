import React from "react";
import { ScrollView, Text } from "react-native";

const SeriesConfirmation = ({ seriesInfo }) => {
  return (
    <ScrollView>
      <Text>{JSON.stringify(seriesInfo)}</Text>
    </ScrollView>
  );
};

export default SeriesConfirmation;
