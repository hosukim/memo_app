import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getDBInstance, TABLE_TODO } from "../../config/SqliteConfig";

const db = getDBInstance();

const History = () => {
  const [todos, setTodos] = useState<TodoType[]>();
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${TABLE_TODO}`,
        [],
        (_, response: SQLiteResponseType) => {
          setTodos(response.rows._array);
        },
        (_, error) => {
          console.error(error);
        }
      );
    });
  }, []);
  return (
    <View>
      <Text>{JSON.stringify(todos)}</Text>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({});
