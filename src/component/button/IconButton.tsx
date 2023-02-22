import { Pressable, StyleSheet, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/core";

type ButtonType = {
  icon: keyof typeof MaterialIcons.glyphMap;
  page: String;
};

export default function IconButton({ icon, page }: ButtonType) {
  const navigation = useNavigation<any>();
  return (
    <Pressable
      style={styles.iconButton}
      onPress={() => navigation.navigate(page)}
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
