import React, { useState, useContext, useEffect, useRef } from "react";
import { ScrollView, View, Text, StyleSheet, Platform } from "react-native";
import _ from "lodash";
import moment from "moment";
// API
import { useAddContentToChallenge } from "../../api/challenges";
// Context
import { Context as ContentContext } from "../../context/ContentContext";
import { Context as TopicsContext } from "../../context/TopicsContext";
// Components
import ListSelect from "../../components/shared/ListSelect";
import ActionButton from "../../components/shared/ActionButton";
import ClearButton from "../../components/shared/ClearButton";
import MultiItemSelect from "../../components/shared/MultiItemSelect";
import Loader from "../../components/shared/Loader";
import initiateDeleteConfirmation from "../../components/shared/initiateDeleteConfirmation";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ListItem } from "react-native-elements";
// Hooks
import useSingleCheckbox from "../../hooks/useSingleCheckbox";
import useMultiSelectCheckbox from "../../hooks/useMultiSelectCheckbox";
// Styling
import { BOLD, FS20, REGULAR } from "../../design/typography";
import { OFF_BLACK, RED, GRAY_5, BLUE_5 } from "../../design/colors";
// Helpers
import {
  initializeShelves,
  initializeMultiSelectCheckbox,
} from "../../helpers/screenHelpers";
import { figureOutShelfMovingDataChanges } from "./helpers";

const ShelfSelectScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  // State for start and end dates for Finished books, and whether to show the
  // Datepicker
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showFinishDatePicker, setShowFinishDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());

  const {
    state: contentState,
    addContent,
    deleteContent,
    updateContent,
  } = useContext(ContentContext);
  const { state: topicsState, addContentToTopics, fetchTopics } = useContext(
    TopicsContext
  );

  // Get params passed from route
  const { bookInfo, buttonText, showDeleteButton, addToLibrary } = route.params;

  // Initialize shelves and topics checkboxes/selectors
  const [shelves, toggleShelves] = useSingleCheckbox(
    initializeShelves(bookInfo.shelf)
  );
  const [
    topicsList,
    toggleTopicsList,
    setCheckboxesFromOutside,
  ] = useMultiSelectCheckbox(
    initializeMultiSelectCheckbox(topicsState.items, [])
  );

  // Get function to add content to an existing challenge (used when shelf is
  // changed to "Finished Learning")
  const [addContentToChallenge] = useAddContentToChallenge();

  // Create a ref to be used as the previous topics state for comparison with a
  // new one should it be updated (so that the new topic can be added to the
  // topics multi-checkbox)
  const topicsRef = useRef(topicsState.items);

  // This useEffect call will check if there's a change to topicState, if there
  // is (i.e. if a user creates a topic), it will add the new topic to the
  // multi-checkbox and set it as already checked. Not a fan of this
  // implementation to deal with state updates and updates to hooks, but it works.
  useEffect(() => {
    // Get previous topic state from ref
    const prevTopics = topicsRef.current;

    // If the topics items state is not the same length (if they are then
    // no useful change, we only care about whether a topic was added or not),
    // then add the new topic to the mult-checkbox
    if (prevTopics.length !== topicsState.items.length) {
      // new topic is the last item in the array
      const newTopic = topicsState.items[topicsState.items.length - 1];

      setCheckboxesFromOutside([
        ...topicsList,
        { _id: newTopic._id, name: newTopic.name, checked: true },
      ]);
      // Update ref to new topic items state
      topicsRef.current = topicsState.items;
    }
  }, [topicsState.items]);

  const addBookToLibrary = async (selectedShelf, selectedTopics) => {
    const data = {
      ...bookInfo,
      shelf: selectedShelf,
      topics: selectedTopics,
      type: "book",
    };

    // If the selected shelf is Currently Learning, set first date started as now
    if (selectedShelf === "Currently Learning") {
      data.startFinishDates = [{ dateStarted: Date.now() }];
    }

    // If the selected shelf is Finished, add the dateCompleted field
    if (selectedShelf === "Finished Learning") {
      data.startFinishDates = [
        { dateStarted: startDate, dateCompleted: finishDate },
      ];
    }

    // Send request to add book and then send bookInfo as param in navigation
    // route to 'BookScreen'. This will allow the Shelf button to change from
    // 'Add to Library' to whatever shelf was chosen (ex: 'Want to Learn').
    const newBook = await addContent(data, true);

    // Add book to selected topics
    await addContentToTopics({
      topicIds: selectedTopics,
      contentId: newBook._id,
    });
    // Update the reading challenge by adding this book to the finished list
    // if a challenge exists (if selected shelf is Finished).
    if (selectedShelf === "Finished Learning") {
      addContentToChallenge(newBook._id);
    }

    // Fetch all topics to show updates (again, inefficient because multiple
    // updates together doesn't return the updated items, so can't update global
    // state from dispatch)
    fetchTopics();

    // If the result is null, meaning there was an error in adding the book,
    // go back to previous screen.
    if (newBook === null) {
      navigation.goBack();
    } else {
      navigation.navigate("BookScreen", { bookInfo: newBook });
    }
  };
  const updateShelf = (selectedShelf) => {
    // Get the right data to change depending on which shelves the book is moving from/to.
    const updateData = figureOutShelfMovingDataChanges(
      bookInfo.shelf,
      selectedShelf,
      bookInfo
    );

    // Update data with the data gotten above
    updateContent(bookInfo._id, updateData);

    // If the selected shelf is "Finished Learning", do additional stuff like
    // updating the reading challenge
    if (selectedShelf === "Finished Learning") {
      // Update the reading challenge by adding this book to the finished list
      // if a challenge exists.
      addContentToChallenge(bookInfo._id);
    }
    navigation.goBack();
  };
  const deleteItem = async () => {
    const deleteMessage = "Are you sure you want to delete this book?";
    const deleteFlow = async () => {
      navigation.popToTop();
      await deleteContent(bookInfo._id);
      fetchTopics();
    };

    // Show delete ActionSheet/Alert
    initiateDeleteConfirmation(deleteMessage, deleteFlow);
  };

  // Function that decided what to do when the Confirm/Add To Library button is
  // pressed. If coming from the 'Add Content' screen, then add to Library.
  // Otherwise update the shelf of already existing content.
  const onConfirmShelf = (selectedShelf, selectedTopics) => {
    if (addToLibrary) {
      addBookToLibrary(selectedShelf, selectedTopics);
    } else {
      updateShelf(selectedShelf);
    }
  };

  if (contentState.isFetching || topicsState.isFetching) {
    return <Loader />;
  }

  return (
    <ScrollView
      contentContainerStyle={
        shelves[2].checked ? styles.container : { ...styles.container, flex: 1 }
      }
    >
      <View style={styles.option}>
        <Text style={styles.header}>Select Shelf</Text>
        {shelves.map((shelf, index) => (
          <ListSelect
            name={shelf.name}
            checked={shelf.checked}
            onPressCheckbox={() => {
              const currentCheckedShelfIndex = _.findIndex(
                shelves,
                (shelf) => shelf.checked
              );

              toggleShelves(currentCheckedShelfIndex, index);
            }}
            key={shelf.name}
          />
        ))}
        {showDeleteButton ? (
          <ClearButton
            title="Delete book from Library"
            onPress={deleteItem}
            containerStyle={styles.deleteButton}
            titleStyle={styles.delete}
          />
        ) : null}
        {/* If the Finished Learning shelf is selected, show input selectors for
          start and finish dates */}
        {shelves[2].checked && addToLibrary ? (
          <View style={styles.datesContainer}>
            <Text style={styles.header}>Set Start and Finish Dates</Text>
            <ListItem
              title="Start Date"
              titleStyle={{ fontFamily: REGULAR }}
              rightTitle={moment(startDate).format("MMM DD, YYYY")}
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
              titleStyle={{ fontFamily: REGULAR }}
              rightTitle={moment(finishDate).format("MMM DD, YYYY")}
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
        ) : null}
        {/* If on Add to Library screen, show Topic Selector */}
        {addToLibrary ? (
          <View>
            <Text style={styles.header}>Select Topic(s)</Text>
            <View style={styles.topicSelectContainer}>
              <MultiItemSelect
                itemsList={topicsList}
                onSelect={toggleTopicsList}
                showCreateItem={true}
                onSelectCreateItem={() => navigation.navigate("CreateTopic")}
              />
            </View>
          </View>
        ) : null}
      </View>
      <View style={styles.buttonContainer}>
        <ActionButton
          title={buttonText}
          onPress={() => {
            setIsLoading(true);
            // Get chosen shelf
            const currentShelf = _.find(shelves, (shelf) => shelf.checked);
            // filter through the topics list to get only the checked ones, then
            // from those objects only take out the ids
            const selectedTopicIds = _.chain(topicsList)
              .filter({ checked: true })
              .map((item) => item._id);
            onConfirmShelf(currentShelf.name, selectedTopicIds);
          }}
          showLoading={isLoading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    backgroundColor: GRAY_5,
  },
  option: {
    justifyContent: "flex-start",
  },
  header: {
    fontFamily: BOLD,
    fontSize: FS20,
    color: OFF_BLACK,
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 5,
  },
  buttonContainer: {
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 30,
  },
  deleteButton: {
    marginTop: 30,
  },
  delete: {
    color: RED,
  },
  topicSelectContainer: {
    marginHorizontal: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
});

export default ShelfSelectScreen;