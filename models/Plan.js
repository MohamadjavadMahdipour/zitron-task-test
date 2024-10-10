const { DataTypes} = require("sequelize");
const {sequelize} = require("../config/db");


const Plan = sequelize.define(
  "Plan",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      require: true,
    },
    name: {
      type: DataTypes.STRING,
      require:true
    },
    description:{
        type:DataTypes.STRING,
        require:true
    },
    endVoteTime:{
        type:DataTypes.DATE
    }
  },
  { timestamps: true }
);
module.exports = Plan;
