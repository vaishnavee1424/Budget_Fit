const express = require("express");
const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require("../controllers/incomeController");
const {protect} = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/add",protect,addIncome);
router.get("/get", protect, getAllIncome);
router.delete("/:id", deleteIncome);

router.get("/downloadexcel", protect, downloadIncomeExcel);
router.get("/:id", protect, deleteIncome);

module.exports = router;
