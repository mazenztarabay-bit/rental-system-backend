const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./config/db");

// Load models
require("./models/User");
require("./models/Item");
require("./models/Rental");

// Routes
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const rentalRoutes = require("./routes/rentalRoutes");

const app = express();

// ✅ FIXED CORS (for deployment)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Rental System API is running...");
});

console.log("userRoutes:", typeof userRoutes);
app.use("/api/users", userRoutes);

console.log("itemRoutes:", typeof itemRoutes);
app.use("/api/items", itemRoutes);

console.log("rentalRoutes:", typeof rentalRoutes);
app.use("/api/rentals", rentalRoutes);

// ✅ FIXED RAILWAY STARTUP
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ DB connection failed:", err));