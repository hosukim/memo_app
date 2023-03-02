import { StyleSheet, Text, View } from "react-native";
import React from "react";
import IconButton from "./IconButton";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  page: string;
};

export default function RouteButton({ icon, page }: Props) {
  const navigation = useNavigation<any>();
  return <IconButton icon={icon} onPress={() => navigation.navigate(page)} />;
}

const styles = StyleSheet.create({});
