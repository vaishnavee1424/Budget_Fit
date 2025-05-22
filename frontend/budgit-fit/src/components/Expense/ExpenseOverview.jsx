import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData  } from "../../utils/helper";
import CustomLineChart from "../Charts/CustomLineChart";


const ExpenseOverview = ({transactions, onExpenseIncome}) => {
    const [chartData , setChartData] = useState([]);
useEffect(()=>{
        const result = prepareExpenseLineChartData(transactions);
        console.log(chartData); // after prepareExpenseLineChartData

        setChartData(result);
        return()=>{};
    },[transactions]);
    return <div className="card1">
       <div>
  <h5 className="expense-overview-heading">Expense Overview</h5>
  <p className="expense-overview-subtitle">
    Track your Spending trends over time and gain insights into where your money goes
  </p>
</div>
<button className="add-expense-btn" onClick={onExpenseIncome}>
  <LuPlus /> Add Expense
</button>
        <div className="mt-10">
            <CustomLineChart  data={chartData}/>
        </div>
    </div>
}
export default ExpenseOverview



