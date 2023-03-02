import { View, Dimensions, StyleSheet } from "react-native";
import { useState, useEffect, useCallback, useRef } from "react";
import { initDatabaseConfig } from "../../config/SqliteConfig";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import SwipableItem from "./componenet/item/SwipableItem";
import Footer from "./componenet/footer/Footer";

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
  {
    index: 3,
    content:
      "미리야 미리야미리야 미리야미리야 미리야미리야 미리야미리야 미리야미리야 미리야",
  },
  { index: 4, content: "TEST4" },
  { index: 5, content: "TEST5" },
  { index: 6, content: "TEST5" },
  { index: 7, content: "TEST5" },
  { index: 8, content: "TEST5" },
  { index: 9, content: "TEST6" },
  { index: 10, content: "TEST5" },
  { index: 11, content: "TEST5" },
  { index: 12, content: "TEST5" },
  { index: 13, content: "TEST82" },
  { index: 14, content: "TEST5" },
  { index: 15, content: "TEST5" },
  { index: 15, content: "TEST5" },
  { index: 15, content: "TEST5" },
];

const initialData: TodoType[] = initTodos.map((d, i) => {
  return {
    index: i,
    key: `todo-${i}`,
    label: `${d.content}`,
  };
});

export default function Home({ navigation }: any) {
  const [todos, setTodos] = useState<TodoType[]>(initialData);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const itemRefs = useRef(new Map());
  useEffect(() => {
    (async () => {
      _initConnectSqlite(); // [API] 테이블 존재 체크 이후 테이블 생성
    })();
  }, []);

  const _initConnectSqlite = useCallback(async () => {
    await createUserInfo();
  }, []);

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<TodoType>) => {
      const onPressDelete = () => {
        setTodos((prev) => {
          return prev.filter((todo) => todo !== item);
        });
      };

      return (
        <SwipableItem
          todo={item}
          drag={drag}
          isActive={isActive}
          todoRefs={itemRefs}
          onPressDelete={onPressDelete}
        />
      );
    },
    []
  );

  return (
    <View style={styles.block}>
      <DraggableFlatList
        keyExtractor={(item) => `${item.key}`}
        data={todos}
        renderItem={renderItem}
        onDragEnd={({ data }) => {
          setScrollEnabled(true);
          setTodos(data);
        }}
        activationDistance={20}
      />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    height: Dimensions.get("window").height - 100,
    paddingBottom: 100,
  },
});
