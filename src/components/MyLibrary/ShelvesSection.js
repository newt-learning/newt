import React, { Fragment } from "react";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
// Components
import Shelf from "./Shelf";
// Helpers
import { filterAndOrderContentByShelf } from "../../helpers/screenHelpers";

const ShelvesSection = ({ items }) => {
  const navigation = useNavigation();

  const currentlyLearningItems = filterAndOrderContentByShelf(
    "Currently Learning",
    items
  );
  const wantToLearnItems = filterAndOrderContentByShelf("Want to Learn", items);
  const finishedLearningItems = filterAndOrderContentByShelf(
    "Finished Learning",
    items
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
