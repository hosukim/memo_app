import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import IconButton from "../../component/button/IconButton";
import CircleButton from "../../component/button/CircleButton";
import { ScreenName } from "../../../App";

function Home({ navigation }: any) {
  const [showAppOptions, setShowAppOptions] = useState(false);
  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    // we will implement this later
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Home Screen</Text>
        <Text>Home Screen</Text>
      </ScrollView>
      <View style={styles.optionsContainer}>
        <View style={styles.optionsRow}>
          <IconButton icon="refresh" label="Reset" onPress={onReset} />
          <CircleButton onPress={onAddSticker} />
          <IconButton
            icon="settings"
            label={ScreenName.setting}
            onPress={() => {
              navigation.push(ScreenName.setting);
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
  },
  scrollView: {
    paddingHorizontal: 10,
    width: "100%",
  },
  modalContent: {
    height: "25%",
    width: "100%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "16%",
    backgroundColor: "#464C55",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  optionsContainer: {
    position: "relative",
    marginBottom: 40,
    marginTop: 20,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
