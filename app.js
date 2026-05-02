const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./config/db");

// Load models for relationships
require("./models/User");
require("./models/Item");
require("./models/Rental");


// Routes
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const rentalRoutes = require("./routes/rentalRoutes");

const app = express();
app.use(cors({
  origin: "http://127.0.0.1:8080",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.get("/", (req, res) => res.send("Rental System API is running..."));
console.log("userRoutes:", typeof userRoutes);
app.use("/api/users", userRoutes);
console.log("itemRoutes:", typeof itemRoutes);
app.use("/api/items", itemRoutes);
console.log("rentalRoutes:", typeof rentalRoutes);
app.use("/api/rentals", rentalRoutes);


connectDB()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ DB connection failed:", err));