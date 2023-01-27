import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontSizes } from "../../constant/Fonts";

type Props = {
  content: String;
};

export default function TextItem({ content }: Props) {
  return (
    <View style={styles.block}>
      <Text style={styles.text}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingVertical: 10,
    borderBottomColor: "#333",
    display: "flex",
    backgroundColor: "yellow",
    width: "100%",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: FontSizes.l,
  },
});
