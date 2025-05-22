import React from 'react';
import './CustomLegend.css';

const CustomLegend= ({payload}) => {
  return (
    <div className="custom-legend-container">
    {payload.map((entry, index) => (
      <div key={`legend-${index}`} className="legend-item">
        <div
          className="legend-dot"
          style={{ backgroundColor: entry.color }}
        ></div>
        <span className="legend-label">{entry.value}</span>
      </div>
    ))}
  </div>
  
  );
};

export default CustomLegend;
