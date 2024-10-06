import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import { AppDataSource } from "./config/data-source";
import { Order } from "./entities/order";

const app = express();
app.use(express.json());  // 讓 Express 處理 JSON 請求

// 初始化資料庫連線
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => console.log(error));

// 測試資料庫連線
app.get("/test-db", async (req, res) => {
  try {
    const result = await AppDataSource.query('SELECT NOW()');
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database connection failed');
  }
});

// 查詢所有訂單 (Read)
app.get("/orders", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await AppDataSource.manager.find(Order);
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// 新增訂單 (Create)
app.post("/orders", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderData = req.body;
    const newOrder = AppDataSource.manager.create(Order, orderData);
    const result = await AppDataSource.manager.save(newOrder);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

// 啟動伺服器
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
