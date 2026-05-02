const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, 
    dialect: "mysql",
    logging: false, // cleaner logs
     dialectOptions: {
      connectTimeout: 10000 // increase timeout
    }
  }
);

const connectDB = async () => {
  try {
    console.log("Attempting DB connection...");
    await sequelize.authenticate();
    console.log("✅ DB connected successfully");

   await sequelize.sync();

    console.log("✅ Models synced successfully");
    return true;
  } catch (error) {
    console.error("❌ DB connection failed:", error);
    throw error;
  }
};

module.exports = { sequelize, connectDB };