const express = require("express");
const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} = require("../controllers/ExpenseController");
const upload = require("../middleware/uploadMiddleware");

const {protect} = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/add", protect, upload.single("receipt"), addExpense);
router.get("/get", protect, getAllExpense);
router.get("/downloadexcel", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);


module.exports = router;
