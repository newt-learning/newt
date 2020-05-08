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
}) => {
  const buttonTitleStyle = StyleSheet.compose(styles.buttonTitle, titleStyle);

  return (
    <Button
      title={disabled ? null : title}
      buttonStyle={styles.button}
      titleStyle={buttonTitleStyle}
      loading={showLoading}
      onPress={onPress}
      disabled={disabled}
      icon={disabled ? <Feather name="slash" size={18} color={GRAY_3} /> : null}
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
