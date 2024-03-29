import { View, Dimensions, StyleSheet } from "react-native";
import { useState, useEffect, useCallback, useRef } from "react";
import { getDBInstance, TABLE_TODO } from "../../config/SqliteConfig";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import SwipableItem from "./componenet/item/SwipableItem";
import Footer from "./componenet/footer/Footer";

export default function Home({ navigation }: any) {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const itemRefs = useRef(new Map());
  const inputRef = useRef<any>(null);
  const [db] = useState(getDBInstance());

  useEffect(() => {
    if (db !== null) {
      db.transaction((tx: any) => {
        tx.executeSql(
          `SELECT * FROM ${TABLE_TODO} ORDER BY showOrder ASC`,
          [],
          (_: any, { rows }: SQLiteResponseType) => {
            const allTodos = [];
            for (let i = 0; i < rows.length; i++) {
              const row = rows._array[i];
              allTodos.push({
                ...row,
                // key: `todo-${row.id}`,
              });
            }
            setTodos(allTodos);
          }
        );
      });
    }
  }, [db]);

  useEffect(() => {
    if (todos.length === 0 || db === null) {
      return;
    }
    db.transaction((tx: any) => {
      tx.executeSql(`DELETE FROM ${TABLE_TODO};`, [], (_: any) => {
        console.log("delete all data");
      });
      todos.forEach((todo, index) => {
        tx.executeSql(
          `INSERT INTO ${TABLE_TODO} (id, content, dttm, showFlag, showOrder) VALUES (?, ?, ?, ?, ?);`,
          [todo.id, todo.content, todo.dttm, todo.showFlag, index],
          (_: any) => {
            console.log(`insert content: "${JSON.stringify(todo)}"`);
          },
          (_: any, error: any) => {
            console.error(error);
          }
        );
      });
    });
  }, [todos]);

  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<TodoType>) => {
      if (!item.showFlag) {
        return null;
      }
      const onPressDelete = () => {
        db.transaction((tx: any) => {
          tx.executeSql(
            `UPDATE ${TABLE_TODO} SET showFlag=(?) WHERE id=(?);`,
            [0, item.id],
            (_: any) => {
              console.log(`update showFlag 0 content: "${item.content}"}`);
            },
            (_: any, error: any) => {
              console.log("Error update showFlag:", error);
            }
          );
        });
        setTodos((prev) => {
          return prev.map((todo) => {
            if (todo.id === item.id) {
              return {
                ...todo,
                showFlag: false,
              };
            }
            return todo;
          });
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

  const checkTouchPosition = (e: any) => {
    const { locationY } = e.nativeEvent;
    if (locationY > 100) {
      inputRef.current.blur();
    }
  };

  return (
    <View style={styles.block} onTouchEnd={checkTouchPosition}>
      <DraggableFlatList
        keyExtractor={(item) => `${item.id}`}
        data={todos}
        renderItem={renderItem}
        onDragEnd={({ data }) => {
          setScrollEnabled(true);
          setTodos(data);
        }}
        activationDistance={20}
      />
      <Footer
        inputRef={inputRef}
        todosLength={todos.length}
        setTodos={setTodos}
      />
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
