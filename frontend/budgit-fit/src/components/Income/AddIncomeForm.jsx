import React, { useState } from 'react';
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../../components/EmojiPickerPopup';
import { FiX } from 'react-icons/fi';
import './income.css';

const AddIncomeForm = ({ onAddIncome, onClose }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const [errors, setErrors] = useState({
    source: "",
    amount: "",
    date: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      source: "",
      amount: "",
      date: "",
    };

    if (!income.source.trim()) {
      newErrors.source = "Income source is required";
      isValid = false;
    }

    if (!income.amount || isNaN(income.amount) || Number(income.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
      isValid = false;
    }

    if (!income.date) {
      newErrors.date = "Date is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (key, value) => {
    setIncome(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddIncome(income);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-income-form">
      <div className="form-header">
        <h2 className="form-title">Add Income</h2>
        <button 
          type="button" 
          className="close-btn" 
          onClick={onClose}
          aria-label="Close income form"
        >
          <FiX size={20} />
        </button>
      </div>
      
      {/* Rest of your form remains the same */}
      <div className="icon-picker">
        <EmojiPickerPopup
          icon={income.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />
      </div>

      <div className="form-group">
        <Input
          value={income.source}
          onChange={({ target }) => handleChange("source", target.value)}
          label="Income Source"
          placeholder="e.g. Salary, Freelance, Investment"
          type="text"
          error={errors.source}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group form-group-half">
          <Input
            value={income.amount}
            onChange={({ target }) => handleChange("amount", target.value)}
            label="Amount"
            type="number"
            error={errors.amount}
            required
          />
        </div>
        <div className="form-group form-group-half">
          <Input
            value={income.date}
            onChange={({ target }) => handleChange("date", target.value)}
            label="Date Received"
            type="date"
            error={errors.date}
            required
          />
        </div>
      </div>

      <div className="button-container" style= {{backgroundColor: 'white'}}>
        <button
          type="submit"
          className="add-btn"
        >
          Add Income
        </button>
      </div>
    </form>
  );
};

export default AddIncomeForm;