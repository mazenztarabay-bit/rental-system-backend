const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/db");
const Item = sequelize.define("Item",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
     name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    pricePerDay: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
     available_quantity: {
        type: DataTypes.INTEGER,
         defaultValue: 1
    },
      created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  user_id:{
    type: DataTypes.INTEGER,
    allowNull:false
  }
    }, {
        tableName: "items",
        timestamps: false
});
module.exports = Item;