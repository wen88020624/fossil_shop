import React, { useRef } from "react";
import { Tabs } from "antd";
import OrderTab from "./components/OrderTab";
import ChartTab from "./components/ChartTab";
import UploadOrderTab from "./components/UploadOrderTab";
import ProductTypeTab from "./components/ProductTypeTab";

interface OrderTabRef {
  refreshTable: () => void;
}

function App() {
  const orderTabRef = useRef<OrderTabRef>(null);

  const refreshOrderTable = () => {
    if (orderTabRef.current) {
      orderTabRef.current.refreshTable();
    }
  };

  return (
    <div className="App">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="訂單" key="1">
          <OrderTab ref={orderTabRef} />
        </Tabs.TabPane>
        
        <Tabs.TabPane tab="產品類型" key="2">
          <ProductTypeTab onUpdateSuccess={refreshOrderTable} />
        </Tabs.TabPane>

        <Tabs.TabPane tab="統計" key="3">
          <ChartTab />
        </Tabs.TabPane>

        <Tabs.TabPane tab="CSV上傳訂單" key="4">
          <UploadOrderTab onUploadSuccess={refreshOrderTable} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default App;