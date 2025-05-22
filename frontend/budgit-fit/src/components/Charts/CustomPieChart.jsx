import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./CustomPieChart.css";

const COLORS = [
  "#7c3aed", // Total Balance (purple)
  "#ef4444", // Total Expenses (red)
  "#10b981", // Total Income (green)
];

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  showTextAnchor,
}) => {
  return (
    <div className="pie-chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={showTextAnchor ? 100 : 130}
            innerRadius={showTextAnchor ? 70 : 100}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend 
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              paddingTop: "20px",
              fontSize: "14px"
            }}
          />
          {showTextAnchor && (
            <>
              <text
                x="50%"
                y="50%"
                dy={-20}
                textAnchor="middle"
                className="custom-pie-label"
              >
                {label}
              </text>
              <text
                x="50%"
                y="50%"
                dy={10}
                textAnchor="middle"
                className="custom-pie-total"
              >
                {totalAmount}
              </text>
            </>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;





