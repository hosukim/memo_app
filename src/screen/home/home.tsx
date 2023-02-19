import { StyleSheet, View } from "react-native";
import { useState, useEffect, useCallback, useRef } from "react";
import IconButton from "../../component/button/IconButton";
import CircleButton from "../../component/button/CircleButton";
import { initDatabaseConfig } from "../../config/SqliteConfig";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import SwipableItem from "./componenet/item/SwipableItem";
import { ScreenName } from "../../constant/Screen";
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
];

const initialData: TodoTypes[] = initTodos.map((d, i) => {
  return {
    index: i,
    key: `todo-${i}`,
    label: `${d.content}`,
  };
});

export default function Home({ navigation }: any) {
  const [todos, setTodos] = useState<TodoTypes[]>(initialData);
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
    ({ item, drag, isActive }: RenderItemParams<TodoTypes>) => {
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
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        keyExtractor={(item) => `${item.key}`}
        data={todos}
        renderItem={renderItem}
        onDragEnd={({ data }) => setTodos(data)}
        activationDistance={20}
      />

      <Footer />
    </View>
  );
}
