import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import React, { useState } from "react";
import CircleButton from "../../../../component/button/CircleButton";
import Input from "../../../../component/input/Input";
import { getDBInstance, TABLE_TODO } from "../../../../config/SqliteConfig";

const db = getDBInstance();

const Footer = () => {
  const [activeInput, setActiveInput] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  const onAddSticker = () => {
    setActiveInput(true);
  };

  const onSubmit = () => {
    if (content === "") {
      setActiveInput(false);
    } else {
      db.transaction((tx: any) => {
        tx.executeSql(
          'INSERT INTO tb_todoList (content, dttm, showFlag) VALUES (?, datetime("now"), ?)',
          [content, true],
          (
            _,
            {
              rowsAffected,
              insertId,
            }: { rowsAffected: number; insertId: number }
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
      setActiveInput(false);
      ToastAndroid.showWithGravity(
        "등록되었습니다",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  return (
    <View style={styles.optionsContainer}>
      {activeInput ? (
        <Input content={content} setContent={setContent} onSubmit={onSubmit} />
      ) : (
        <View style={styles.optionsRow}>
          <CircleButton onPress={onAddSticker} />
        </View>
      )}
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  optionsContainer: {
    position: "absolute",
    alignSelf: "center",
    bottom: 0,
    width: "100%",
    justifyContent: "flex-start",
    // backgroundColor: 'red',
  },
  optionsRow: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
    marginBottom: 10,
  },
});
