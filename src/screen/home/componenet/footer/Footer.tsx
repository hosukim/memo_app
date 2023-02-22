import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import React, { useState } from "react";
import IconButton from "../../../../component/button/IconButton";
import CircleButton from "../../../../component/button/CircleButton";
import { ScreenName } from "../../../../constant/Screen";
import { useNavigation } from "@react-navigation/core";
import Input from "../../../../component/input/Input";

const Footer = () => {
  const navigation = useNavigation();
  const [content, setContent] = useState<String>();
  const onAddSticker = () => {
    ToastAndroid.showWithGravity(
      "등록되었습니다",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  return (
    <View style={styles.optionsContainer}>
      <Input setContent={setContent} />
      <View style={styles.optionsRow}>
        <IconButton
          icon="refresh"
          label="Reset"
          onPress={() => navigation.navigate(ScreenName.history)}
        />
        <CircleButton onPress={onAddSticker} />
        <IconButton
          icon="settings"
          label={ScreenName.setting}
          onPress={() => navigation.navigate(ScreenName.setting)}
        />
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  optionsContainer: {
    position: "relative",
    marginBottom: 40,
    marginTop: 20,
    alignSelf: "center",
    bottom: 0,
    height: 100,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
