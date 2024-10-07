import React from "react";
import { Tabs } from "antd";
import OrderTab from "./components/OrderTab";
import UploadOrderTab from "./components/UploadOrderTab";
import ChartTab from "./components/ChartTab";
const App: React.FC = () => {

  return (
    <div className="App">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="訂單" key="1">
          <OrderTab />
        </Tabs.TabPane>

        <Tabs.TabPane tab="統計" key="2">
          <ChartTab />
        </Tabs.TabPane>

        <Tabs.TabPane tab="CSV上傳訂單" key="3">
          <UploadOrderTab />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default App;