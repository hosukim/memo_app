import { StyleSheet, Text, View } from "react-native";

function Setting() {
  return (
    <View style={styles.container}>
      <Text>Setting Screen</Text>
    </View>
  );
}

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
