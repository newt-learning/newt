import React from "react";
import {
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Button as ElementButton } from "react-native-elements";
// Design
import { IOS_BLUE, OFF_BLACK } from "../../design/colors";
import { FS18 } from "../../design/typography";

const ModalConfirmationButton = ({ isFetching, onSubmit }) => {
  if (Platform.OS === "ios") {
    if (isFetching) {
      return (
        <ActivityIndicator
          animating={isFetching}
          color={IOS_BLUE}
          style={{ paddingRight: 15 }}
        />
      );
    } else {
      return (
        <TouchableOpacity style={{ paddingRight: 15 }} onPress={onSubmit}>
          <Text style={{ color: IOS_BLUE, fontSize: FS18 }}>Done</Text>
        </TouchableOpacity>
      );
    }
  } else {
    return (
      <ElementButton
        type="clear"
        loading={isFetching}
        loadingProps={{ color: OFF_BLACK }}
        icon={<MaterialIcons name="check" size={24} />}
        onPress={onSubmit}
      />
    );
  }
};

export default ModalConfirmationButton;
