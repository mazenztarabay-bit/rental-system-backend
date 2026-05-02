const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/db");
const User = require("./User");
const Item = require("./Item");
const Rental = sequelize.define("Rental",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
      customer_name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  customer_phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rent_date: {
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    return_date: {
        type: DataTypes.DATEONLY
    },
    status:{
        type: DataTypes.ENUM("rented","returned"),
        defaultValue:"rented"
    }
},{
    tableName:"rentals",
    timestamps:false
});
Item.hasMany(Rental,{foreignKey:"item_id"});
Rental.belongsTo(Item,{foreignKey:"item_id"});
module.exports = Rental;