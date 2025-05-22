import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
  LuFileText,
} from "react-icons/lu";
import "./TransactionInfoCard.css";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
  receipt
}) => {
  const getAmountStyles = () =>
    type === "income" ? "income-amount" : "expense-amount";

  return (
    <div className="transaction-card group">
      <div className="transaction-icon">
        {icon ? (
          <img src={icon} alt={title} className="icon-img" />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="transaction-details">
        <div>
          <p className="transaction-title">{title}</p>
          <p className="transaction-date">{date}</p>
        </div>

        <div className="transaction-right">
          {!hideDeleteBtn && (
            <button
            className="delete-icon" 
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <div className={`amount-chip ${getAmountStyles()}`}>
            <h6 className="amount-text">
              {type === "income" ? "+" : "-"} ${amount}
            </h6>
            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
      {receipt && console.log('Receipt URL:', receipt)}
{receipt && (
  <a href={receipt} target="_blank" rel="noopener noreferrer" className="view-receipt-btn">
    View Receipt
  </a>
)}
    </div>
  );
};

export default TransactionInfoCard;
