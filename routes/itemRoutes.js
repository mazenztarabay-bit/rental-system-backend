const express = require("express");
const router = express.Router();

const {
  getItems,
  createItem,
  updateItem,
  deleteItem
} = require("../controllers/itemController");

const authMiddleware = require("../middleware/authMiddleware");

// 🔐 PROTECT ALL ROUTES
router.get("/", authMiddleware, getItems);
router.post("/", authMiddleware, createItem);
router.put("/:id", authMiddleware, updateItem);
router.delete("/:id", authMiddleware, deleteItem);

module.exports = router;