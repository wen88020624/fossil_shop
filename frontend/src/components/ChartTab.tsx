import React, { useEffect, useState } from "react";
import ReactECharts from 'echarts-for-react';
import axios from 'axios';

const ChartTab: React.FC = () => {
  const [category, setCategory] = useState<string>("month");
  const [selectedText, setSelectedText] = useState<string>("月份");
  const [chartOption, setChartOption] = useState<any>(null);  

  const getBuyerBarChart = async () => {
    const response = await axios.post("http://localhost:5001/api/buyerBarChart");
    const data = response.data.map((item: { category: string, value: string }) => ({
        category: item.category,
        value: Number(item.value)
    }));
    console.log(data);
    return data;
  };

  const getMonthBarChart = async () => {
    const response = await axios.post("http://localhost:5001/api/monthBarChart");
    const data = response.data.map((item: { category: string, value: string }) => ({
        category: item.category,
        value: Number(item.value)
    }));
    console.log(data);
    return data;
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedText(event.target.options[event.target.selectedIndex].text);
    setCategory(event.target.value);
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
