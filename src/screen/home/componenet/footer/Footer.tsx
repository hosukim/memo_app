import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import React, { useState } from "react";
import CircleButton from "../../../../component/button/CircleButton";
import Input from "../../../../component/input/Input";
import { getDBInstance, TABLE_TODO } from "../../../../config/SqliteConfig";

const Footer = ({ inputRef, todosLength, setTodos }: { inputRef: any; todosLength: number; setTodos: any }) => {
  const [content, setContent] = useState<string>("");
  // const db = getDBInstance();

  const onSubmit = () => {
    // db에 저장 insert 해야한다.
    if (content === "") {
      ToastAndroid.showWithGravity(
        "내용을 입력해주세요",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }
    // db.transaction((tx: any) => {
    //   tx.executeSql(
    //     `INSERT INTO ${TABLE_TODO} (content, dttm, showFlag, showOrder) VALUES (?, ?, ?, ?);`,
    //     [content, new Date(), 1, todosLength + 1],
    //     (_: any) => {
    //       console.log(`insert content: "${content}"`);
    //     },
    //     (_, error: any) => {
    //       console.error(error);
    //     }
    //   );
    // });

    setContent("");
    setTodos((prev: TodoType[]) => [
      ...prev,
      { id: prev.length + 1, content, dttm: new Date(), showFlag: 1, showOrder: todosLength + 1 },
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
