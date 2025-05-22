import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import './Input.css';
const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label className="input-label">{label}</label>
      <div className="input-box">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className="input-field"
          value={value}
          onChange={onChange}
        />
        {type === 'password' && (
          showPassword ? (
            <FaRegEyeSlash
              size={22}
              className="input-icon"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEye
              size={22}
              className="input-icon"
              onClick={toggleShowPassword}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Input;
























