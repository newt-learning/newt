import React, { useState } from "react";
import { Platform } from "react-native";
import moment from "moment";
import { ListItem } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { REGULAR } from "../../design/typography";
import { BLUE_5 } from "../../design/colors";

const ListItemWithDatePicker = ({ title, date }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <>
      <ListItem
        title={title}
        titleStyle={{ fontFamily: REGULAR }}
        rightTitle={date ? moment(date).format("MMM DD, YYYY") : "Add date"}
        onPress={() => setShowDatePicker(!showDatePicker)}
        underlayColor={BLUE_5}
        bottomDivider
      />
      {showDatePicker && (
        <DateTimePicker
          value={date ? date : new Date()}
          onChange={(e, selectedDate) => {
            setShowDatePicker(Platform.OS === "ios");
            console.log(selectedDate);
          }}
          maximumDate={new Date()}
        />
      )}
    </>
  );
};

export default ListItemWithDatePicker;
