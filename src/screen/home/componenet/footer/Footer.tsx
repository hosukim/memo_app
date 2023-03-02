import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import React, { useState } from "react";
import CircleButton from "../../../../component/button/CircleButton";
import { useNavigation } from "@react-navigation/core";
import Input from "../../../../component/input/Input";

const Footer = () => {
  const [activeInput, setActiveInput] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  const onAddSticker = () => {
    setActiveInput(true);
  };

  const onSubmit = () => {
    setActiveInput(false);
    ToastAndroid.showWithGravity(
      "등록되었습니다",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  return (
    <View style={styles.optionsContainer}>
      {activeInput ? (
        <Input content={content} setContent={setContent} onSubmit={onSubmit} />
      ) : (
        <View style={styles.optionsRow}>
          <CircleButton onPress={onAddSticker} />
        </View>
      )}
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  optionsContainer: {
    position: "absolute",
    alignSelf: "center",
    bottom: 0,
    width: "100%",
    justifyContent: "flex-start",
    // backgroundColor: 'red',
  },
  optionsRow: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
    marginBottom: 10,
  },
});
