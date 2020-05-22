// Displays ActionSheet on iOS and an Alert on Android asking user if they're
// sure they want to delete whatever
import { Platform, ActionSheetIOS, Alert } from "react-native";

const DEFAULT_DELETE_MESSAGE = "Are you sure you want to delete this?";

const initiateDeleteConfirmation = (
  deleteMessage = DEFAULT_DELETE_MESSAGE,
  onDelete
) => {
  if (Platform.OS === "ios") {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Delete"],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 1,
        message: deleteMessage,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          // If the user clicks the destructive button, delete item
          onDelete();
        }
      }
    );
  } else {
    Alert.alert("Delete", deleteMessage, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => onDelete(),
        style: "destructive",
      },
    ]);
  }
};

export default initiateDeleteConfirmation;
