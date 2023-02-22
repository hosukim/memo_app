import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FloatingLabelInput } from "react-native-floating-label-input";

type InputType = {
  setContent: (value: String) => void;
};

export default function Input({ setContent }: InputType) {
  return (
    <View style={{ height: 50 }}>
      <FloatingLabelInput
        label="할 일을 적어주세요"
        onChangeText={(value) => setContent(value)}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
