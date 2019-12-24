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
  numPages,
  publisher,
  datePublished,
  isbns: passedIsbns
}) => {
  let isbns = {};
  let formattedDate = "";

  if (!_.isEmpty(passedIsbns)) {
    passedIsbns.forEach(({ type, identifier }) => (isbns[type] = identifier));
  }
  // Check if the date passed is a string (some books had 101-01-01 as a date
  // for some reason, like what is this Google Books API?)
  if (_.isString(datePublished) && datePublished !== "101-01-01") {
    // If it's just the year, return that, otherwise format it
    formattedDate =
      datePublished.length === 4
        ? datePublished
        : moment(datePublished).format("DD MMM, YYYY");
  }

  return (
    <View style={styles.container}>
      <SubHeader>Information</SubHeader>
      <InfoField
        fieldName="Pages"
        fieldValue={_.isInteger(numPages) ? `${numPages} pages` : null}
      />
      <InfoField
        fieldName="Publisher"
        fieldValue={_.isString(publisher) ? publisher : null}
      />
      <InfoField fieldName="Publish Date" fieldValue={formattedDate} />
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
