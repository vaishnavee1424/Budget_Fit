import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import "./RecentIncomeWithChart.css";

const COLORS = [
  "#7c3aed", // Primary purple
  "#10b981", // Income green
  "#ef4444", // Expense red
  "#6366f1", // Balance indigo
];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const preparedData = data.map((item) => ({
        name: item?.source,
        amount: item?.amount,
      }));
      setChartData(preparedData);
    } else {
      setChartData([]);
    }
  }, [data]);

  return (
    <div className="recent-income-chart-card">
      <div className="recent-income-chart-header">
        <h4 className="recent-income-chart-title">Last 60 Days Income</h4>
      </div>
      <div className="chart-container">
        {chartData.length > 0 ? (
          <CustomPieChart
            data={chartData}
            label="Total Income"
            totalAmount={`$${totalIncome || 0}`}
            showTextAnchor
            colors={COLORS}
          />
        ) : (
          <div className="no-data-message">
            No income data available for the last 60 days
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentIncomeWithChart;
































