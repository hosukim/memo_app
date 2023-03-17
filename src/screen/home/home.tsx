import { View, Dimensions, StyleSheet } from "react-native";
import { useState, useEffect, useCallback, useRef } from "react";
import { getDBInstance, TABLE_TODO } from "../../config/SqliteConfig";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import SwipableItem from "./componenet/item/SwipableItem";
import Footer from "./componenet/footer/Footer";

const db = getDBInstance();

export default function Home({ navigation }: any) {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const itemRefs = useRef(new Map());
  const inputRef = useRef<any>(null);

  useEffect(() => {
    db.transaction((tx: any) => {
      tx.executeSql(
        `SELECT * FROM ${TABLE_TODO}`,
        [],
        (_: any, { rows }: SQLiteResponseType) => {
          const allTodos = [];
          for (let i = 0; i < rows.length; i++) {
            const row = rows._array[i];
            allTodos.push({
              ...row,
              key: `todo-${row.id}`,
            });
          }
          setTodos(allTodos);
        }
      );
    });
  }, [todos, db]);

  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<TodoType>) => {
      const onPressDelete = () => {
        db.transaction((tx: any) => {
          tx.executeSql(
            `DELETE FROM ${TABLE_TODO} WHERE id=(?);`,
            [item.id],
            (_: any) => {
              console.log(`delete todo with content: "${item.content}"}`);
            },
            (_: any, error: any) => {
              console.log("Error inserting todo:", error);
            }
          );
        });
        setTodos((prev) => prev.filter((todo) => todo !== item));
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

  const checkTouchPosition = (e: any) => {
    const { locationY } = e.nativeEvent;
    if (locationY > 100) {
      inputRef.current.blur();
    }
  };

  return (
    <View style={styles.block} onTouchEnd={checkTouchPosition}>
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
      <Footer inputRef={inputRef} />
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
