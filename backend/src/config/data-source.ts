import { DataSource } from "typeorm";
import { Order } from "../entities/order";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",  // 這裡設定資料庫的主機
  port: 8080,         // PostgreSQL 預設端口
  username: "postgres",  // 你的資料庫用戶名
  password: "admin",  // 你的資料庫密碼
  database: "postgres",  // 你要使用的資料庫名稱
  entities: [Order],  // 會在這裡存放實體類別
  synchronize: false,   // 開啟時會自動同步資料庫，要設定成 false，千萬不可定為 true，否則可能一不小心就會把本地暫時修改的 table schema 同步到遠端的資料庫上造成資料遺失
});
