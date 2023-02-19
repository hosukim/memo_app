import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import React from "react";
import IconButton from "../../../../component/button/IconButton";
import CircleButton from "../../../../component/button/CircleButton";
import { ScreenName } from "../../../../constant/Screen";
import { useNavigation } from "@react-navigation/core";

const Footer = () => {
  const navigation = useNavigation();
  const onAddSticker = () => {
    ToastAndroid.showWithGravity(
      "등록되었습니다",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  return (
    <View style={styles.optionsContainer}>
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
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
