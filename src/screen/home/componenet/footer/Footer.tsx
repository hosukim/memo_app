import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import React, { useState } from "react";
import CircleButton from "../../../../component/button/CircleButton";
import Input from "../../../../component/input/Input";
import { getDBInstance, TABLE_TODO } from "../../../../config/SqliteConfig";

const db = getDBInstance();

const Footer = ({ inputRef }: { inputRef: any }) => {
  const [content, setContent] = useState<string>("");

  const onSubmit = () => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'INSERT INTO tb_todoList (content, dttm, showFlag) VALUES (?, datetime("now"), ?)',
        [content, true],
        (
          _,
          { rowsAffected, insertId }: { rowsAffected: number; insertId: number }
        ) => {
          if (rowsAffected > 0) {
            console.log(
              `Inserted todo with id ${insertId} and text "${content}"`
            );
          }
        },
        (_, error: string) => {
          console.log("Error inserting todo:", error);
        }
      );
      // tx.executeSql(`select * from ${TABLE_TODO}`, [], (_, { rows }) =>
      //   console.log(JSON.stringify(rows))
      // );
    });
    setContent("");
    ToastAndroid.showWithGravity(
      "등록되었습니다",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
    inputRef.current.blur();
  };

  return (
    <View style={styles.footer}>
      <Input content={content} setContent={setContent} inputRef={inputRef} />
      <CircleButton onPress={onSubmit} />
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginRight: 180,
  },
});
