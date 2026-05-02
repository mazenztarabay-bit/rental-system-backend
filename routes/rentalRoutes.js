const express = require("express");
const router = express.Router();

const {
  getmyRentals,
  rentItem,
  returnItem
} = require("../controllers/rentalController");

const authMiddleware = require("../middleware/authMiddleware");

// 🔐 PROTECT ALL
router.get("/", authMiddleware, getmyRentals);
router.post("/rent", authMiddleware, rentItem);
router.put("/return/:id", authMiddleware, returnItem);

module.exports = router;