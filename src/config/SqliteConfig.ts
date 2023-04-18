import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

const DATABASE_NAME: string = "db.testDb"; // db.데이터베이스 명
let db: SQLite.WebSQLDatabase | null = null;
export const TABLE_TODO = "tb_todoList";

/**
 * 최초 데이터 베이스에 연결한다.
 * ㄴ 데이터베이스 연결을 위해서는 필수.
 * @returns {SQLite.WebSQLDatabase} db
 */
export const initDatabaseConfig = (): any => {
  // 웹 플랫폼은 지원하지 않음.
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }
  db = SQLite.openDatabase(DATABASE_NAME);
  db.transaction((tx: any) => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS ${TABLE_TODO} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT,
        dttm DATETIME,
        showFlag INTEGER
      );
    `);
  });
  // [필수] 코드가 트랜잭션내에서 작동하지 않는 경우
  db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () => {});
  return db;
};

export const getDBInstance = (): any => {
  // db가 null이면 초기화를 해주고, null이 아니면 그대로 반환
  return db === null ? initDatabaseConfig() : db;
};
