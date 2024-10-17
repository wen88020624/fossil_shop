import React, { useState } from "react";
import ReactECharts from 'echarts-for-react';
import { Button, Select } from "antd";
import axios from 'axios';

const ChartTab: React.FC = () => {
  const [category, setCategory] = useState<string>("month");
  const [selectedText, setSelectedText] = useState<string>("月份");
  const [chartOption, setChartOption] = useState<any>(null);  

  const getBuyerBarChart = async () => {
    const response = await axios.post("http://localhost:5001/api/orders/buyerBarChart");
    const data = response.data.map((item: { category: string, value: string }) => ({
        category: item.category,
        value: Number(item.value)
    }));
    console.log(data);
    return data;
  };

  const getMonthBarChart = async () => {
    const response = await axios.post("http://localhost:5001/api/orders/monthBarChart");
    const data = response.data.map((item: { category: string, value: string }) => ({
        category: item.category,
        value: Number(item.value)
    }));
    console.log(data);
    return data;
  };

  const handleCategoryChange = (value: string, option: any) => {
    setCategory(value);
    setSelectedText(option.label);
  };

  const handleDrawChart = async () => {
    console.log(category);
    let data: any;
    if (category === "month") {
        data = await getMonthBarChart();
    } else {
        data = await getBuyerBarChart();
    }
    const option = {
        title: {
            text: `按${selectedText}銷售`,
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: data.map((item: { category: string }) => item.category),
            axisLabel: {
                interval: 0,
                rotate: 45,
            }
        },
        yAxis: {
            type: 'value',
        },
        dataZoom: { 
            type: 'slider',
            start: 0,
            end: 20,
        },
        series: [ 
            {
                data: data.map((item: { value: number }) => item.value),
                type: 'bar',
            },
        ],
    };

    setChartOption(option);
  };

  return (
    <div>
      <h1>長條圖</h1>
      <div>
        <label htmlFor="category-select">選擇分類：</label>
        <Select 
            defaultValue="month"
            id="category-select"
            onChange={handleCategoryChange}
            options={[
                { value: "month", label: "月份" },
                { value: "buyer_name", label: "買家" },
            ]}
        />
        <Button onClick={handleDrawChart}>繪製圖表</Button>
      </div>
      {chartOption && <ReactECharts option={chartOption} />}
    </div>
  );
};

export default ChartTab;
