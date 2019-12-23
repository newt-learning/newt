import { Platform } from "react-native";

// Font family
export const REGULAR =
  Platform.OS === "ios" ? "AvenirNext-Regular" : "Muli-Regular";
export const SEMIBOLD =
  Platform.OS === "ios" ? "AvenirNext-DemiBold" : "Muli-SemiBold";
export const BOLD = Platform.OS === "ios" ? "AvenirNext-Bold" : "Muli-Bold";

// Font sizes
export const FS12 = 12;
export const FS14 = 14;
export const FS16 = 16;
export const FS18 = 18;
export const FS20 = 20;
export const FS24 = 24;
export const FS36 = 36;
export const FS48 = 48;
export const FS72 = 72;
