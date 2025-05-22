import React, { useEffect } from 'react'
import {useUserAuth} from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import { API_PATHS } from "../../utils/apiPaths"; // adjust the path as per your folder structure
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import Modal from "../../components/Modal";

import ExpenseList from '../../components/Expense/ExpenseList';
const Expense = () =>{
  useUserAuth();
  const [file, setFile] = useState(null);
  const [openReceiptModal, setOpenReceiptModal] = useState(false);
const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null,
    });
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    //expense details
    const fetchExpenseDetails = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE); // corrected quotes
        if (response.data) {
          setExpenseData(response.data);
        }
      } catch (error) {
        console.log("Something went wrong. Please try again.", error);
      } finally {
        setLoading(false);
      }
     };
     
     const handleAddExpense = async (expense) => {
      
     const { category, amount, date, icon , file } = expense;

       if (!category.trim()) {
         toast.error("category is required.");
         return;
       }
   
       if (!amount || isNaN(amount) || Number(amount) <= 0) { // syntax fixed here
         toast.error("Amount should be a valid number greater than 0.");
         return;
       }
   
       if (!date) {
         toast.error("Date is required.");
         return;
       }
   
       try {
         await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
           category,
           amount,
           date,
           icon,
           file
         });
   
         setOpenAddExpenseModal(false);
         toast.success("Expense added successfully");
         fetchExpenseDetails();
       } catch (error) {
         console.error(
           "Error adding expense:",
           error.response?.data?.message || error.message
         );
        }

     }   
    
    // // Delete Expense
    const deleteExpense = async (id) => {
      if (!id) return;  // Ensure ID is present
    
      try {
       await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));  // Make API call to delete
        toast.success("Expense details deleted successfully");
        fetchExpenseDetails();  // Reload the data after successful deletion
      } catch (error) {
        console.error("Error deleting expense:", error.response?.data?.message || error.message);
        toast.error("Failed to delete the expense. Please try again.");
      }
    };
    

  // // Download expense Details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_INCOME,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error("Failed to download income details. Please try again.");
    }
 };
    
     useEffect(()=>{
      fetchExpenseDetails()
      return () =>{

      }
     },[])  
     const handleViewReceipt = (receiptUrl) => {
      if (receiptUrl) {
        setSelectedReceipt(receiptUrl);
        setOpenReceiptModal(true);
      } else {
        console.log("No receipt URL provided.");
      }
    };
  
  return(
   <DashboardLayout activeMenu="Expense">
          <div className='my-5 mx-auto'>
          <div className="grid grid-cols-1 gap-6">
  {/* Expense Overview Section */}
  <div>
    <ExpenseOverview
      transactions={expenseData}
      onExpenseIncome={() => setOpenAddExpenseModal(true)}
    />
  </div>

  {/* Expense List with Delete and Receipt View */}
  <ExpenseList
    transactions={expenseData}
    openDelete={(id) => {
      setOpenDeleteAlert({ show: true, data: id });
    }}
    onDownload={handleDownloadExpenseDetails}
    onViewReceipt={handleViewReceipt}
  />

  {/* Receipt Modal */}
  <Modal
    isOpen={openReceiptModal}
    onClose={() => {
      setOpenReceiptModal(false);
      setSelectedReceipt(null);
    }}
    title="Receipt"
  >
    <div>
      {selectedReceipt ? (
        <img
          src={selectedReceipt}
          alt="Receipt"
          className="w-full max-h-[500px] object-contain"
        />
      ) : (
        <p>No receipt to show.</p>
      )}
    </div>
  </Modal>
</div>

<Modal isOpen={openAddExpenseModal} onClose={()=> setOpenAddExpenseModal(false)}>
   <AddExpenseForm 
  onAddExpense={handleAddExpense}
  onClose={() => setOpenAddExpenseModal(false)}
/>
  </Modal>
  <Modal
  isOpen={openDeleteAlert.show}
  onClose={() => setOpenDeleteAlert({ show: false, data: null })}
>
<div className="delete-confirmation-modal">
          <div className="delete-confirmation-content">
            <h3 className="delete-confirmation-title">Confirm Deletion</h3>
            <p className="delete-confirmation-message">
              Are you sure you want to delete this expense? This action cannot be undone.
            </p>
            <div className="delete-confirmation-buttons">
    <button className="delete-confirm-btn"
      onClick={() => {
        deleteExpense(openDeleteAlert.data);  // Trigger the delete action
        setOpenDeleteAlert({ show: false, data: null });
      }}
    >
      Yes, Delete
    </button>
    <button className="delete-cancel-btn" onClick={() => setOpenDeleteAlert({ show: false, data: null })}>
      Cancel
    </button>
    </div>
  </div>
  </div>
</Modal>

          </div>
   </DashboardLayout>
  )
}

export default Expense