import React from "react";
import { View, Text, StyleSheet } from "react-native";
// Components
import SubHeader from "./SubHeader";
// Styling
import { SEMIBOLD, REGULAR, FS14 } from "../../design/typography";
import { OFF_BLACK, GRAY_1 } from "../../design/colors";

const InfoFieldName = ({ children }) => (
  <Text style={styles.fieldName}>{children}</Text>
);
const InfoFieldValue = ({ children }) => (
  <Text style={styles.fieldValue}>{children}</Text>
);
const InfoField = ({ fieldName, fieldValue }) => {
  if (!fieldValue) {
    return null;
  }

  return (
    <View style={styles.infoField}>
      <InfoFieldName>{fieldName}</InfoFieldName>
      <InfoFieldValue>{fieldValue}</InfoFieldValue>
    </View>
  );
};

const BookInformationSection = ({
  numPages,
  publisher,
  datePublished,
  isbns
}) => {
  return (
    <View style={styles.container}>
      <SubHeader>Information</SubHeader>
      <InfoField fieldName="Pages" fieldValue={`${numPages} pages`} />
      <InfoField fieldName="Publisher" fieldValue={publisher} />
      <InfoField fieldName="Publish Date" fieldValue={datePublished} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  infoField: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 3
  },
  fieldName: {
    fontFamily: SEMIBOLD,
    fontSize: FS14,
    color: OFF_BLACK,
    minWidth: 100
  },
  fieldValue: {
    fontFamily: REGULAR,
    fontSize: FS14,
    color: OFF_BLACK
  }
});

export default BookInformationSection;
