import React from "react";
import "../components/../Auth.css";
import CARD_2 from "../../assets/images/h.png";
import { LuTrendingUpDown } from "react-icons/lu";
const AuthLayout = ({ children }) => {
  return (
    <div className="auth-container">
      {/* LEFT SIDE */}
      <div className="auth-left">
        <h2 className="auth-title" style={{fontFamily:"poppins"}}>Budgit-fit</h2>
        {children}
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">
        {/* Decorative Shapes */}
        <div className="shape shape-one" />
        <div className="shape shape-two" />
        <div className="shape shape-three" />

        <div className="auth-stats">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track your Income & Expenses"
            value="430,000"
            color="bg-primary"
          />
        </div>

        <img
          src={CARD_2}
          alt="Card"
          className="auth-image"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="stats-card">
      <div className={`stats-icon ${color}`}>{icon}</div>
      <div>
        <h6 className="stats-label">{label}</h6>
        <span className="stats-value">${value}</span>
      </div>
    </div>
  );
};



















































































