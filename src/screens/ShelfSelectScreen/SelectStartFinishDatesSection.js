import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import moment from "moment";
// Components
import { H3 } from "../../components/shared/Headers";
import { ListItem } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
// Design
import { BLUE_5 } from "../../design/colors";
import { REGULAR } from "../../design/typography";

const SelectStartFinishDatesSection = ({
  startDate,
  finishDate,
  setStartDate,
  setFinishDate,
  rounded = false,
}) => {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showFinishDatePicker, setShowFinishDatePicker] = useState(false);

  return (
    <View>
      <H3 style={styles.header}>Set Start and Finish Dates</H3>
      <ListItem
        title="Start Date"
        containerStyle={rounded && styles.firstItem}
        titleStyle={styles.text}
        rightTitle={moment(startDate).format("MMM DD, YYYY")}
        rightContentContainerStyle={styles.rightContainer}
        onPress={() => {
          setShowFinishDatePicker(false);
          setShowStartDatePicker(!showStartDatePicker);
        }}
        underlayColor={BLUE_5}
        bottomDivider
      />
      {/* If the start date input is selected, show the datepicker under it */}
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          onChange={(e, selectedDate) => {
            setShowStartDatePicker(Platform.OS === "ios");
            setStartDate(selectedDate);
          }}
          maximumDate={new Date()}
        />
      )}
      <ListItem
        title="Finish Date"
        containerStyle={rounded && styles.lastItem}
        titleStyle={styles.text}
        rightTitle={moment(finishDate).format("MMM DD, YYYY")}
        rightContentContainerStyle={styles.rightContainer}
        onPress={() => {
          setShowStartDatePicker(false);
          setShowFinishDatePicker(!showFinishDatePicker);
        }}
        underlayColor={BLUE_5}
      />
      {/* If the finish date input is selected, show the datepicker */}
      {showFinishDatePicker && (
        <DateTimePicker
          value={finishDate}
          onChange={(e, selectedDate) => {
            setShowFinishDatePicker(Platform.OS === "ios");
            setFinishDate(selectedDate);
          }}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 5,
  },
  firstItem: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  lastItem: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  text: {
    fontFamily: REGULAR,
  },
  rightContainer: {
    flex: 1,
  },
});

export default SelectStartFinishDatesSection;
