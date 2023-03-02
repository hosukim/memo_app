import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FloatingLabelInput } from "react-native-floating-label-input";
import IconButton from "../button/IconButton";
import { MaterialIcons } from "@expo/vector-icons";

type InputType = {
  content: string;
  setContent: (value: string) => void;
  onSubmit: () => void;
};

export default function Input({ content, setContent, onSubmit }: InputType) {
  return (
    <View style={styles.block}>
      <FloatingLabelInput
        label="할 일을 적어주세요"
        onChangeText={(value) => setContent(value)}
        style={{ flex: 1 }}
        value={content}
        // onSubmit={onSubmit}
        hint={"메모는 습관입니다"}
        rightComponent={<IconButton icon="done" onPress={onSubmit} />}
        onFocus={(e) => e.target.focus()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    marginBottom: 20,
  },
});
