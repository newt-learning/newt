import React from "react";
import { Platform } from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";

export default {
  // This is for common screen options for the stacked card modal
  // (forModalPresentationIOS card interpolator)
  presentationModalOptions: {
    headerStatusBarHeight: 15, // Reduce default height
    headerBackTitle: "Cancel",
    headerBackTitleStyle: { paddingLeft: 15 },
    headerBackImage: () => {
      // For iOS, don't show 'Back' chevron icon (show nothing). For
      // Android, show 'Close' icon
      return Platform.OS === "ios" ? null : (
        <MaterialIcons name="close" size={24} />
      );
    },
    cardOverlayEnabled: true,
    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
  },
};
