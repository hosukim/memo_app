import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { useState } from "react";
import IconButton from "../../component/button/IconButton";
import CircleButton from "../../component/button/CircleButton";
import { ScreenName } from "../../constant/Screen";
import TextItem from "../../component/item/TextItem";

function Home({ navigation }: any) {
  const [todos, setTodos] = useState<TodoTypes[] | null>([
    { index: 1, content: "TEST" },
  ]);

  const onAddSticker = () => {
    // we will implement this later

    ToastAndroid.showWithGravity(
      "등록되었습니다",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  const renderItem = ({ item }: { item: TodoTypes }) => {
    return <TextItem content={item.content} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.index)}
        style={styles.flatList}
      />

      <View style={styles.optionsContainer}>
        <View style={styles.optionsRow}>
          <IconButton
            icon="refresh"
            label="Reset"
            onPress={() => navigation.push(ScreenName.history)}
          />
          <CircleButton onPress={onAddSticker} />
          <IconButton
            icon="settings"
            label={ScreenName.setting}
            onPress={() => navigation.push(ScreenName.setting)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
  },
  flatList: {
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
