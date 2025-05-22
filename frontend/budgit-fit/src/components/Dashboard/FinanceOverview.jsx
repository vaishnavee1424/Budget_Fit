import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import "./FinanceOverview.css";

const COLORS = [
  "#7c3aed", // Total Balance
  "#ef4444", // Total Expenses
  "#10b981", // Total Income
];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  return (
    <div className="finance-card card">
      <div className="finance-header">
        <h5 className="finance-title">Financial Overview</h5>
      </div>
      <div className="chart-container">
        <CustomPieChart
          data={balanceData}
          label="Total Balance"
          totalAmount={`$${totalBalance}`}
          colors={COLORS}
          showTextAnchor
        />
      </div>
    </div>
  );
};

export default FinanceOverview;

