import { Alert } from "react-native";

function displayErrorAlert(errorMessage) {
  if (__DEV__) {
    // console.log(error);
  }

  return Alert.alert("Error", errorMessage);
}

export default displayErrorAlert;
