// 3-dot icon button to display options for usually a screen, displayed on the
// top right of the header
import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { OFF_BLACK } from "../../design/colors";

const MoreOptionsButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={{ marginRight: 15 }} onPress={onPress}>
      <Feather name="more-horizontal" color={OFF_BLACK} size={24} />
    </TouchableOpacity>
  );
};

export default MoreOptionsButton;
