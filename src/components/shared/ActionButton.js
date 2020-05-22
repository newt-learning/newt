import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import { INDIGO, GRAY_3 } from "../../design/colors";
import { SEMIBOLD } from "../../design/typography";

const ActionButton = ({
  title,
  onPress,
  showLoading,
  titleStyle,
  disabled,
  showOnlyDisabledIcon = false, // If this is true, the button will show a disabled icon instead of a title
}) => {
  const buttonTitleStyle = StyleSheet.compose(styles.buttonTitle, titleStyle);

  return (
    <Button
      title={disabled && showOnlyDisabledIcon ? null : title}
      buttonStyle={styles.button}
      titleStyle={buttonTitleStyle}
      loading={showLoading}
      onPress={onPress}
      disabled={disabled}
      icon={
        disabled && showOnlyDisabledIcon ? (
          <Feather name="slash" size={18} color={GRAY_3} />
        ) : null
      }
      raised
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: 300,
    minHeight: 45, // Should be a better way to make sure button size doesn't change when loading indicator is showing
    backgroundColor: INDIGO,
    borderRadius: 5,
  },
  buttonTitle: {
    fontFamily: SEMIBOLD,
  },
});

export default ActionButton;
