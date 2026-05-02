const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/db");
const User = sequelize.define("User",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
     username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("admin","customer"),
        defaultValue: "customer"
    },
     created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
    }, {
        tableName: "users",
        timestamps: false
});
module.exports = User;