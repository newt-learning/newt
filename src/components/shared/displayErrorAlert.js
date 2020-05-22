import { Alert } from "react-native";

function displayErrorAlert(errorMessage) {
  return Alert.alert("Error", errorMessage);
}

export default displayErrorAlert;
