import {
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  ListRenderItem,
} from "react-native";
import { useState, useEffect, useCallback, useMemo } from "react";
import IconButton from "../../component/button/IconButton";
import CircleButton from "../../component/button/CircleButton";
import { ScreenName } from "../../constant/Screen";
import { initDatabaseConfig } from "../../config/SqliteConfig";
import DraggableFlatList, {
  NestableScrollContainer,
  NestableDraggableFlatList,
  RenderItem,
  ScaleDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import SwipableItem from "../../component/item/SwipableItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const TABLE_USER = "tb_user";
const DBInstance = initDatabaseConfig();

const createUserInfo = async (): Promise<void> => {
  const query: string = `create table if not exists ${TABLE_USER} 
          (
            userSq INTEGER PRIMARY KEY AUTOINCREMENT, 
            userId TEXT, 
            userName TEXT
          )`;
  return await new Promise((resolve, reject) => {
    DBInstance.transaction(
      (tx: any) => {
        tx.executeSql(query);
      },
      () => {
        reject("Fail to create a todo table");
      },
      () => {
        resolve();
      }
    );
  });
};

const initTodos = [
  { index: 1, content: "저녁먹으러 가자" },
  {
    index: 2,
    content:
      "미리랑 뼈감자탕 먹리랑 뼈감자탕 먹리랑 뼈감자탕 먹리랑 뼈감자탕 먹리랑 뼈감자탕 먹기",
  },
  { index: 3, content: "미리야 사랑해♥" },
  { index: 4, content: "TEST4" },
  { index: 5, content: "TEST5" },
];

const initialData: TodoTypes[] = initTodos.map((d, i) => {
  return {
    index: i,
    key: `item-${i}`,
    label: `${d.content}`,
  };
});

function Home({ navigation }: any) {
  const [todos, setTodos] = useState<TodoTypes[]>(initialData);
  console.log("todos : ", todos);
  useEffect(() => {
    (async () => {
      _initConnectSqlite(); // [API] 테이블 존재 체크 이후 테이블 생성
    })();
  }, []);

  const _initConnectSqlite = useCallback(async () => {
    await createUserInfo();
  }, []);

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

  const renderItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<TodoTypes>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.rowItem,
            { backgroundColor: isActive ? "red" : "blue" },
          ]}
        >
          <SwipableItem item={item} />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <DraggableFlatList
        data={todos}
        onDragEnd={({ data }) => setTodos(data)}
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
    width: "100%",
    backgroundColor: "#ffeacd",
  },
  flatList: {
    flex: 1,
    backgroundColor: "#333",
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
    alignSelf: "center",
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  rowItem: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
