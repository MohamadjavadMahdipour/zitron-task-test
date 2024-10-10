const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/db");


const Vote = sequelize.define(
  "Vote",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      require: true,
    },
    isAgree: {
      type: DataTypes.BOOLEAN,
      require:true
    },
  },
  { timestamps: true }
);
module.exports = Vote;
