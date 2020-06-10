import React from "react";
import { View, StyleSheet } from "react-native";
import ListItemWithDatePicker from "../components/shared/ListItemWithDatePicker";
import { H4 } from "../components/shared/Headers";

const AddEditDatesReadScreen = ({ route }) => {
  const { startFinishDates } = route.params;

  return (
    <View style={styles.container}>
      {startFinishDates.map((session, index) => {
        return (
          <View style={styles.sessionContainer} key={session.dateStarted}>
            <H4 style={styles.header}>{`#${index + 1}`}</H4>
            <ListItemWithDatePicker
              title="Start date"
              date={session.dateStarted}
            />
            <ListItemWithDatePicker
              title="Finish date"
              date={session.dateCompleted}
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
