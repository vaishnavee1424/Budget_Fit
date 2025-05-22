import React from 'react';
import "./CustomToolipCSS.css";

const CustomTooltip = ({ payload }) => {
    if (!payload || !payload.length) return null;
  
    return (
      <div className="custom-tooltip">
        <p className="custom-tooltip-title">{payload[0].name}</p>
        <p className="custom-tooltip-text">
          Amount: <span className="custom-tooltip-amount">${payload[0].value}</span>
        </p>
      </div>
    );
  };
  
  export default CustomTooltip;