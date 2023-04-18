import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import React, { useState } from "react";
import CircleButton from "../../../../component/button/CircleButton";
import Input from "../../../../component/input/Input";
import { getDBInstance, TABLE_TODO } from "../../../../config/SqliteConfig";

const db = getDBInstance();

const Footer = ({ inputRef, setTodos }: { inputRef: any; setTodos: any }) => {
  const [content, setContent] = useState<string>("");

  const onSubmit = () => {
    // insert 쿼리 실행
    // db insert가 끝나면 setTodos 실행
    db.transaction((tx: any) => {
      tx.executeSql(
        `INSERT INTO ${TABLE_TODO} (content, dttm, showFlag) VALUES (?, datetime("now"), ?)`,
        [content, 1],
        (_: any) => {
          console.log(`insert content: "${content}"`);
        },
        (_: any, error: any) => {
          console.log("Error insert:", error);
        }
      );
    });
    setContent("");
    setTodos((prev: TodoType[]) => [
      ...prev,
      { id: prev.length + 1, content, dttm: new Date(), showFlag: 1 },
    ]);
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
