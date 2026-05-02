const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
 process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT, 
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