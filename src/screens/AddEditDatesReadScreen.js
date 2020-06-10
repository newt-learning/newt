import React, { useState, useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
// Context
import { Context as ContentContext } from "../context/ContentContext";
// Components
import { H4 } from "../components/shared/Headers";
import ClearButton from "../components/shared/ClearButton";
import ModalConfirmationButton from "../components/shared/ModalConfirmationButton";
import ListItemWithDatePicker from "../components/shared/ListItemWithDatePicker";
// Design
import { RED } from "../design/colors";

const AddEditDatesReadScreen = ({ route, navigation }) => {
  const { bookId, startFinishDates } = route.params;
  const [datesRead, setDatesRead] = useState(JSON.parse(startFinishDates));

  const {
    state: { isFetching },
    updateContent,
  } = useContext(ContentContext);

  // Add the button for confirmation to the screen header: "Done" button for iOS
  // and check mark icon for Android (and pass the update functions)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ModalConfirmationButton
          isFetching={isFetching}
          onSubmit={async () => {
            await updateContent(bookId, { startFinishDates: datesRead });
            navigation.goBack();
          }}
        />
      ),
    });
  });

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
            <View style={styles.titleContainer}>
              <H4>{`#${index + 1}`}</H4>
              <ClearButton
                title="Delete"
                onPress={() => console.log("delete")}
                titleStyle={{ color: RED }}
                buttonStyle={{ paddingRight: 15 }}
              />
            </View>
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
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 15,
    marginBottom: 5,
  },
});

export default AddEditDatesReadScreen;
