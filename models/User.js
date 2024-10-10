const { DataTypes } = require("sequelize");               
const {sequelize} = require("../config/db");


const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      require: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    username: {
      type: DataTypes.STRING,
      require:true,
      unique:true
    },
    password:{
        type:DataTypes.STRING,
        require:true
    }
  },
  { timestamps: true }
);
module.exports = User;
