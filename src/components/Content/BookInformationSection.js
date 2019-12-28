import React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";
import _ from "lodash";
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
  pageCount,
  publisher,
  datePublished,
  isbns
}) => {
  return (
    <View style={styles.container}>
      <SubHeader>Information</SubHeader>
      <InfoField
        fieldName="Pages"
        fieldValue={_.isInteger(pageCount) ? `${pageCount} pages` : null}
      />
      <InfoField
        fieldName="Publisher"
        fieldValue={_.isString(publisher) ? publisher : null}
      />
      <InfoField fieldName="Publish Date" fieldValue={datePublished} />
      <InfoField
        fieldName="ISBN-10"
        fieldValue={isbns["ISBN_10"] ? isbns["ISBN_10"] : null}
      />
      <InfoField
        fieldName="ISBN-13"
        fieldValue={isbns["ISBN_13"] ? isbns["ISBN_13"] : null}
      />
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
