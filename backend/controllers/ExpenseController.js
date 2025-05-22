const xlsx = require('xlsx');
const Expense = require("../models/Expense");
//add Expense src
exports.addExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const receiptPath = req.file ? req.file.path : null;

        const newExpense = new Expense({
            userId: req.user._id,
            icon,
            category,
            amount,
            date: new Date(date),
            receipt: receiptPath, // ✅ store this
          });
        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try {
      const expenses = await Expense.find({ userId }).sort({ date: -1 });
  
      const updatedExpenses = expenses.map((expense) => ({
        ...expense._doc,
        receiptUrl: expense.receipt ? `${req.protocol}://${req.get('host')}/${expense.receipt}` : null,
      }));
  
      res.json(updatedExpenses);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };
  
//delete Expense
exports.deleteExpense = async(req,res)=>{
    
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message : "Expense Deleted"});
    } catch(error){
res.status(500).json({message: "Server Error"});
    }
}
exports.downloadExpenseExcel = async(req,res)=>{
    const userId = req.user.id;
    try{
        const expense = await Expense.find({userId}).sort({date: -1});
        //data for excel
        const data = expense.map((item) => ({
            category: item.category,
        Amount : item.amount,
    Date : item.date ,
}));
const wb = xlsx.utils.book_new();
const ws = xlsx.utils.json_to_sheet(data);
xlsx.utils.book_append_sheet(wb,ws, "Expense");
xlsx.writeFile(wb,'Expense_details.xlsx');
res.download('Expense_details.xlsx');
    } catch(error){
        res.status(500).json({message: "Server Error"});
    }
};
