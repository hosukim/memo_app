import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FloatingLabelInput } from "react-native-floating-label-input";

type InputType = {
  content: string;
  setContent: (value: string) => void;
  inputRef: any;
};

export default function Input({ content, setContent, inputRef }: InputType) {
  return (
    <FloatingLabelInput
      label="할 일을 적어주세요"
      onChangeText={(value) => setContent(value)}
      style={styles.input}
      value={content}
      hint={"메모는 습관입니다"}
      onFocus={(e) => e.target.focus()}
      ref={inputRef}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    backgroundColor: "#fff",
    marginRight: 10,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 5,
  },
});
