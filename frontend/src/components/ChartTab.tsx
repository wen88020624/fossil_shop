import React, { useEffect, useState } from "react";
import ReactECharts from 'echarts-for-react';
import axios from 'axios';

const ChartTab: React.FC = () => {
  const [category, setCategory] = useState<string>("month");
  const [selectedText, setSelectedText] = useState<string>("月份");
  const [chartOption, setChartOption] = useState<any>(null);  

  // 假資料
  const data_month = [
    { category: '一月', value: 120 },
    { category: '二月', value: 200 },
    { category: '三月', value: 150 },
    { category: '四月', value: 80 },
    { category: '五月', value: 70 },
    { category: '六月', value: 110 },
    { category: '七月', value: 130 },
  ];

  const data_buyer = [
    { category: '買家A', value: 120 },
    { category: '買家B', value: 200 },
    { category: '買家C', value: 150 },
    { category: '買家D', value: 80 },
    { category: '買家E', value: 70 },
    { category: '買家F', value: 110 },
    { category: '買家G', value: 130 },
  ];

  const getBuyerBarChart = async () => {
    const response = await axios.post("http://localhost:5001/api/buyerBarChart");
    const data = Object.entries(response.data).map(([buyer, total_income]) => ({
        category: buyer,
        value: total_income
    }));
    console.log(data);
    return data;
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedText(event.target.options[event.target.selectedIndex].text);
    setCategory(event.target.value);
  };

  const handleDrawChart = () => {
    const data = getBuyerBarChart();
    // const data = category === "month" ? data_month : data_buyer;

    const option = {
        title: {
            text: `按${selectedText}銷售`,
        },
        tooltip: {},
        xAxis: {
        type: 'category',
        data: data.then(data => data.map(item => item.category)),
        },
        yAxis: {
        type: 'value',
        },
        series: [
        {
            data: data.then(data => data.map(item => item.value)),
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
        <select id="category-select" value={category} onChange={handleCategoryChange}>
          <option value="month">月份</option>
          <option value="buyer_name">買家</option>
        </select>
        <button onClick={handleDrawChart}>繪製圖表</button>
      </div>
      {chartOption && <ReactECharts option={chartOption} />}
    </div>
  );
};

export default ChartTab;
