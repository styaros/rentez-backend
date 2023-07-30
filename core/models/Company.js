const sequelize = require("../../database/sequelize");
const { DataTypes, Sequelize } = require("sequelize");

const Company = sequelize.define(
  "companies",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
    },
    phone: {
      type: DataTypes.STRING(14),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Company;
