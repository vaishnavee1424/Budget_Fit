// import React, { useState } from "react";
// import Input from "../Inputs/Input";
// import EmojiPickerPopup from "../EmojiPickerPopup";
// import "./expense.css";

// const AddExpenseForm = ({ onAddExpense }) => {
//   const [income, setIncome] = useState({
//     category: "",
//     amount: "",
//     date: "",
//     icon: "",
//     receipt: null,
//   });


//   const handleChange = (key, value) => {
//     setIncome((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     handleChange("receipt", file); // ✅ Correct key
//   };


//   const handleAddExpense = () => {
//     onAddExpense(income);
//   };

//   return (
//     <div className="add-expense-form">
//       <div className="icon-picker">
//         <EmojiPickerPopup
//           icon={income.icon}
//           onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
//         />
//         <span className="icon-label">Select Icon</span>
//       </div>

//       <Input
//         value={income.category}
//         onChange={({ target }) => handleChange("category", target.value)}
//         label="Category"
//         placeholder="Rent , Groceries , etc"
//         type="text"
//       />

//       <Input
//         value={income.amount}
//         onChange={({ target }) => handleChange("amount", target.value)}
//         label="Amount"
//         type="number"
//       />

//       <Input
//         value={income.date}
//         onChange={({ target }) => handleChange("date", target.value)}
//         label="Date"
//         type="date"
//       />

//       {/* File input */}
//       <div className="form-group">
//         <label className="file-label">Upload Receipt/Bill (optional)</label>
//         <input type="file" onChange={handleFileChange} />
//         {income.receipt && <p>Selected file: {income.receipt.name}</p>}

//       </div>

//       <div className="button-container">
//         <button
//           type="button"
//           className="add-btn add-btn-fill"
//           onClick={handleAddExpense}
//         >
//           Add Expense
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddExpenseForm;
import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
import { FiX } from "react-icons/fi";
import "./expense.css";

const AddExpenseForm = ({ onAddExpense, onClose }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
    receipt: null,
  });

  const [errors, setErrors] = useState({
    category: "",
    amount: "",
    date: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      category: "",
      amount: "",
      date: "",
    };

    if (!expense.category.trim()) {
      newErrors.category = "Category is required";
      isValid = false;
    }

    if (!expense.amount || isNaN(expense.amount) || Number(expense.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
      isValid = false;
    }

    if (!expense.date) {
      newErrors.date = "Date is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (key, value) => {
    setExpense((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }
    handleChange("receipt", file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddExpense(expense);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-expense-form">
      <div className="form-header">
        <h2 className="form-title">Add Expense</h2>
        <button type="button" className="close-btn" onClick={onClose}>
          <FiX />
        </button>
      </div>
      
      <div className="icon-picker">
        <EmojiPickerPopup
          icon={expense.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />
        <span className="icon-label">Select an icon for this expense</span>
      </div>

      <div className="form-group">
        <Input
          value={expense.category}
          onChange={({ target }) => handleChange("category", target.value)}
          label="Category"
          placeholder="e.g. Rent, Groceries, Transportation"
          type="text"
          error={errors.category}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group form-group-half">
          <Input
            value={expense.amount}
            onChange={({ target }) => handleChange("amount", target.value)}
            label="Amount"
            type="number"
            error={errors.amount}
            required
          />
        </div>
        <div className="form-group form-group-half">
          <Input
            value={expense.date}
            onChange={({ target }) => handleChange("date", target.value)}
            label="Date"
            type="date"
            error={errors.date}
            required
          />
        </div>
      </div>

      <div className="file-input-container">
        <label>Upload Receipt/Bill (optional)</label>
        <input type="file" onChange={handleFileChange} />
        {expense.receipt && (
          <div className="file-preview">
            Selected file: {expense.receipt.name}
          </div>
        )}
      </div>

      <div className="button-container">
        <button
          type="submit"
          className="add"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default AddExpenseForm;