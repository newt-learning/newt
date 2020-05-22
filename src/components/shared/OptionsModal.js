// Modal that pops up from the bottom and gives additional options, like Edit/Delete
import React, { Fragment } from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import Modal from "react-native-modal";
import { GRAY_4, OFF_WHITE, RED, BLACK } from "../../design/colors";
import { REGULAR, FS14, FS16 } from "../../design/typography";

const OptionsModal = ({ isVisible, options, onBackdropPress }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      style={styles.modalBackdropContainer}
    >
      <Fragment>
        <View style={styles.mainModal}>
          {options &&
            options.map((option, index) => {
              // Merge possible options style. Default + first option (if it's
              // first) + last option (if it's last) -- basically change border
              // radius
              const optionStyle = StyleSheet.compose([
                styles.option,
                index === 0 ? styles.firstOption : null,
                index === options.length - 1 ? styles.lastOption : null,
              ]);
              // Merge default text style and delete style the option is 'delete'
              const textStyle = StyleSheet.compose([
                styles.text,
                option.isDelete ? styles.deleteText : null,
              ]);

              return (
                <TouchableHighlight
                  onPress={option.onPress}
                  style={optionStyle}
                  underlayColor={GRAY_4}
                  key={option.title}
                >
                  <Text style={textStyle}>{option.title}</Text>
                </TouchableHighlight>
              );
            })}
        </View>
        <View style={styles.cancelButton}>
          <TouchableHighlight
            style={[styles.option, styles.lastOption, { borderRadius: 8 }]}
            underlayColor={GRAY_4}
            onPress={onBackdropPress}
          >
            <Text style={styles.text}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </Fragment>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdropContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  mainModal: {
    // maxHeight: 200,
    backgroundColor: OFF_WHITE,
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 10,
  },
  cancelButton: {
    height: 55,
    backgroundColor: OFF_WHITE,
    borderRadius: 8,
  },
  option: {
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    borderBottomWidth: 1,
    borderBottomColor: GRAY_4,
  },
  firstOption: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  lastOption: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  text: {
    fontFamily: REGULAR,
    fontSize: FS16,
    color: BLACK,
  },
  deleteText: {
    color: RED,
  },
});

export default OptionsModal;
