import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ListItemWithDatePicker from "../components/shared/ListItemWithDatePicker";
import { H4 } from "../components/shared/Headers";

const AddEditDatesReadScreen = ({ route }) => {
  const { startFinishDates } = route.params;
  const [datesRead, setDatesRead] = useState(startFinishDates);

  const handleDateChange = (index, title, selectedDate) => {
    let updatedDatesRead = [...datesRead];
    switch (title) {
      case "Start date":
        updatedDatesRead[index].dateStarted = selectedDate;
        setDatesRead(updatedDatesRead);
        return;
      case "Finish date":
        updatedDatesRead[index].dateCompleted = selectedDate;
        setDatesRead(updatedDatesRead);
        return;
      default:
        return;
    }
  };

  return (
    <View style={styles.container}>
      {datesRead.map((session, index) => {
        return (
          <View style={styles.sessionContainer} key={index}>
            <H4 style={styles.header}>{`#${index + 1}`}</H4>
            <ListItemWithDatePicker
              title="Start date"
              date={session.dateStarted}
              onDateChange={(selectedDate) =>
                handleDateChange(index, "Start date", selectedDate)
              }
            />
            <ListItemWithDatePicker
              title="Finish date"
              date={session.dateCompleted}
              onDateChange={(selectedDate) =>
                handleDateChange(index, "Finish date", selectedDate)
              }
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  sessionContainer: {
    marginBottom: 15,
  },
  header: {
    marginHorizontal: 15,
    marginBottom: 5,
  },
});

export default AddEditDatesReadScreen;
