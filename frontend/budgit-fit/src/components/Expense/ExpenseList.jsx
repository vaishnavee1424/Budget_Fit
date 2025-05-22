import React from "react";
import { LuDownload } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import './ExpenseList.css';
const ExpenseList = ({  transactions, openDelete, onDownload }) => {
    return (
      <div className="card">
        <div className="flex items-center justify-between">
          <h5 className="text-lg">All Expenses</h5>
          <button className="card-btn" onClick={onDownload}>
            <LuDownload className="text-base">Download</LuDownload>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {transactions?.map((expense, index) => (
  <TransactionInfoCard
    key={`${expense.id || expense._id}-${index}`} // Combination of `id` and `index` as a fallback
    title={expense.category}
    icon={expense.icon}
    date={moment(expense.date).format("Do MMM YYYY")}
    amount={expense.amount}
    type="expense"
    onDelete={() => openDelete(expense._id)}
    receipt={expense.receiptUrl}
  />
))}
        </div>
      </div>
    );
  };
  
  export default ExpenseList;
