import React from "react";
import './InfoCard.css';  // Import the CSS file

const InfoCard = ({ icon, label, value, color }) => {
    return (
        <div className="infoCard">
            <div className={`iconWrapper ${color}`}>
                {icon}
            </div>
            <div className="infoText">
                <h6 className="label">{label}</h6>
                <span className="value">${value}</span>
            </div>
        </div>
    );
};

export default InfoCard;
