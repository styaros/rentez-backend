const sequelize = require("../../database/sequelize");
const { DataTypes, Sequelize } = require("sequelize");

const SportgroundType = sequelize.define(
  "sportground_types",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = SportgroundType;
