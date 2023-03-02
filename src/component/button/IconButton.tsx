import { Pressable, StyleSheet, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type ButtonType = {
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
};

export default function IconButton({ icon, onPress }: ButtonType) {
  return (
    <Pressable
      style={styles.iconButton}
      onPress={onPress}
    >
      <MaterialIcons name={icon} size={24} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});
