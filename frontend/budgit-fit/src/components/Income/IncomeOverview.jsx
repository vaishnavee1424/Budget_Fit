import React, { useState, useEffect } from 'react';
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeChartBarChartData } from "../../utils/helper";
import "./IncomeOverview.css"; // 💡 Importing the CSS

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeChartBarChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="income-card">
      <div className="income-header">
        <div>
          <h5 className="income-title">Income Overview</h5>
          <p className="income-subtitle">
            Track your earnings over time and analyze your income trend
          </p>
        </div>

        <button className="add-income-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>

      <div className="income-chart-container">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
