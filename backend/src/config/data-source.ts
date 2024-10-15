import { DataSource } from "typeorm";
import { Order } from "../entities/order";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 8080,
  username: "postgres",
  password: "admin",
  database: "postgres",
  entities: [Order],
  synchronize: false,   // 開啟時會自動同步資料庫，要設定成 false，千萬不可定為 true，否則可能一不小心就會把本地暫時修改的 table schema 同步到遠端的資料庫上造成資料遺失
  logging: false,     // debug SQL 語句時才打開，否則耗費資源
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export default AppDataSource;