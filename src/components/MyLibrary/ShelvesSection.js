import React, { Fragment } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
// Components
import Shelf from "./Shelf";

const ShelvesSection = ({ items }) => {
  const navigation = useNavigation();

  const filterAndOrderContentByShelf = (shelf) => {
    // Filter items by shelf and remove items that are part of a series
    const filteredContent = _.filter(
      items,
      (item) => item.shelf === shelf && !item.partOfSeries
    );
    return _.orderBy(filteredContent, "lastUpdated", "desc");
  };

  const currentlyLearningItems = filterAndOrderContentByShelf(
    "Currently Learning"
  );
  const wantToLearnItems = filterAndOrderContentByShelf("Want to Learn");
  const finishedLearningItems = filterAndOrderContentByShelf(
    "Finished Learning"
  );

  return (
    <Fragment>
      <Shelf
        name="Currently Learning"
        data={currentlyLearningItems.slice(0, 4)}
        numItems={currentlyLearningItems.length}
        onPressTitle={() =>
          navigation.navigate("IndividualShelf", {
            title: "Currently Learning",
          })
        }
      />
      <Shelf
        name="Want to Learn"
        data={wantToLearnItems.slice(0, 4)}
        numItems={wantToLearnItems.length}
        onPressTitle={() =>
          navigation.navigate("IndividualShelf", {
            title: "Want to Learn",
          })
        }
      />
      <Shelf
        name="Finished Learning"
        data={finishedLearningItems.slice(0, 4)}
        numItems={finishedLearningItems.length}
        onPressTitle={() =>
          navigation.navigate("IndividualShelf", {
            title: "Finished Learning",
          })
        }
      />
    </Fragment>
  );
};

export default ShelvesSection;
