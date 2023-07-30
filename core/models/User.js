const sequelize = require("../../database/sequelize");
const { DataTypes, Sequelize } = require("sequelize");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING(20),
      allowNull: false,
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

module.exports = User;
